import * as errors from '../errors';
import * as types from '../generated';
import { vrfLiteInit } from '../generated';
import { vrfLiteCloseAction } from '../generated/instructions/vrfLiteCloseAction';
import { TransactionObject, } from '../TransactionObject';
import { Account } from './account';
import { OracleAccount } from './oracleAccount';
import { PermissionAccount } from './permissionAccount';
import { QueueAccount } from './queueAccount';
import { ASSOCIATED_TOKEN_PROGRAM_ID, createTransferInstruction, TOKEN_PROGRAM_ID, } from '@solana/spl-token';
import { Keypair, SystemProgram, SYSVAR_INSTRUCTIONS_PUBKEY, SYSVAR_RENT_PUBKEY, } from '@solana/web3.js';
import { BN, promiseWithTimeout } from '@switchboard-xyz/common';
export class VrfLiteAccount extends Account {
    constructor() {
        super(...arguments);
        this.size = this.program.account.vrfLiteAccountData.size;
    }
    /**
     * Invoke a callback each time a VrfAccount's data has changed on-chain.
     * @param callback - the callback invoked when the vrf state changes
     * @param commitment - optional, the desired transaction finality. defaults to 'confirmed'
     * @returns the websocket subscription id
     */
    onChange(callback, commitment = 'confirmed') {
        return this.program.connection.onAccountChange(this.publicKey, accountInfo => callback(types.VrfLiteAccountData.decode(accountInfo.data)), commitment);
    }
    async loadData() {
        const data = await types.VrfLiteAccountData.fetch(this.program, this.publicKey);
        if (data === null)
            throw new errors.AccountNotFoundError('VrfLite', this.publicKey);
        return data;
    }
    static async createInstruction(program, payer, params) {
        const queue = await params.queueAccount.loadData();
        const vrfLiteKeypair = params.keypair ?? Keypair.generate();
        const vrfLiteAccount = new VrfLiteAccount(program, vrfLiteKeypair.publicKey);
        const vrfPoolEscrow = program.mint.getAssociatedAddress(vrfLiteKeypair.publicKey);
        const [permissionAccount, permissionBump] = PermissionAccount.fromSeed(program, queue.authority, params.queueAccount.publicKey, vrfLiteKeypair.publicKey);
        const vrfLiteInitIxn = vrfLiteInit(program, {
            params: {
                callback: params.callback ?? null,
                stateBump: program.programState.bump,
                expiration: new BN(params.expiration ?? 0),
            },
        }, {
            vrf: vrfLiteKeypair.publicKey,
            authority: params.authority ?? payer,
            mint: program.mint.address,
            escrow: vrfPoolEscrow,
            queueAuthority: queue.authority,
            queue: params.queueAccount.publicKey,
            permission: permissionAccount.publicKey,
            programState: program.programState.publicKey,
            payer: payer,
            tokenProgram: TOKEN_PROGRAM_ID,
            associatedTokenProgram: ASSOCIATED_TOKEN_PROGRAM_ID,
            systemProgram: SystemProgram.programId,
            rent: SYSVAR_RENT_PUBKEY,
        });
        const vrfLiteInitTxn = new TransactionObject(payer, [vrfLiteInitIxn], [vrfLiteKeypair]);
        return [vrfLiteAccount, vrfLiteInitTxn];
    }
    static async create(program, params) {
        const [account, transaction] = await VrfLiteAccount.createInstruction(program, program.walletPubkey, params);
        const txnSignature = await program.signAndSend(transaction);
        return [account, txnSignature];
    }
    async depositInstructions(payer, params) {
        const userTokenAddress = params.tokenWallet ??
            this.program.mint.getAssociatedAddress(params.tokenAuthority?.publicKey ?? payer);
        const transferTxn = new TransactionObject(payer, [
            createTransferInstruction(userTokenAddress, this.program.mint.getAssociatedAddress(this.publicKey), params.tokenAuthority?.publicKey ?? payer, this.program.mint.toTokenAmount(params.amount)),
        ], params.tokenAuthority ? [params.tokenAuthority] : []);
        return transferTxn;
    }
    async deposit(params) {
        const transaction = await this.depositInstructions(this.program.walletPubkey, params);
        const txnSignature = await this.program.signAndSend(transaction);
        return txnSignature;
    }
    proveAndVerifyInstructions(params, options, numTxns = 40) {
        const remainingAccounts = params.vrfLite.callback.accounts.slice(0, params.vrfLite.callback.accountsLen);
        const txns = Array.from(Array(numTxns).keys()).map(i => {
            const proveIxn = types.vrfLiteProveAndVerify(this.program, {
                params: {
                    nonce: i,
                    proof: new Uint8Array(),
                    proofEncoded: params.proof,
                    counter: params.counter ?? params.vrfLite.counter,
                },
            }, {
                vrfLite: this.publicKey,
                callbackPid: params.vrfLite.callback.programId,
                tokenProgram: TOKEN_PROGRAM_ID,
                escrow: params.vrfLite.escrow,
                programState: this.program.programState.publicKey,
                oracle: params.oraclePubkey,
                oracleAuthority: params.oracleAuthority,
                oracleWallet: params.oracleTokenWallet,
                instructionsSysvar: SYSVAR_INSTRUCTIONS_PUBKEY,
            });
            proveIxn.keys = proveIxn.keys.concat(remainingAccounts);
            return new TransactionObject(this.program.walletPubkey, [proveIxn], [], {
                computeUnitLimit: 1400000,
                ...options,
            });
        });
        return txns;
    }
    async proveAndVerify(params, options, numTxns = 40) {
        const vrfLite = params.vrfLite ?? (await this.loadData());
        const oraclePubkey = params.oraclePubkey ?? vrfLite.builder.producer;
        let oracleTokenWallet = params.oracleTokenWallet;
        let oracleAuthority = params.oracleAuthority;
        if (!oracleTokenWallet || !oracleAuthority) {
            const oracleAccount = new OracleAccount(this.program, oraclePubkey);
            const oracle = await oracleAccount.loadData();
            oracleTokenWallet = oracle.tokenAccount;
            oracleAuthority = oracle.oracleAuthority;
        }
        const txns = this.proveAndVerifyInstructions({
            vrfLite,
            proof: params.proof ?? '',
            oraclePubkey,
            oracleTokenWallet,
            oracleAuthority,
        }, options, numTxns);
        const txnSignatures = await this.program.signAndSendAll(txns, {
            skipPreflight: params.skipPreflight ?? true,
        });
        return txnSignatures;
    }
    async awaitRandomness(params, timeout = 30000) {
        let ws = undefined;
        const closeWebsocket = async () => {
            if (ws !== undefined) {
                await this.program.connection.removeAccountChangeListener(ws).catch();
                ws = undefined;
            }
        };
        // const vrfLite = await this.loadData();
        // if (vrfLite.requestSlot.gt(params.requestSlot)) {
        //   throw new Error(`VRF request expired`);
        // }
        const statePromise = promiseWithTimeout(timeout, new Promise((resolve, reject) => {
            ws = this.onChange(vrfLite => {
                if (vrfLite.requestSlot.gt(params.requestSlot)) {
                    reject(`VRF request expired`);
                }
                if (vrfLite.status.kind ===
                    types.VrfStatus.StatusCallbackSuccess.kind ||
                    vrfLite.status.kind === types.VrfStatus.StatusVerified.kind) {
                    resolve(vrfLite);
                }
                if (vrfLite.status.kind === types.VrfStatus.StatusVerifyFailure.kind) {
                    reject(`Vrf failed to verify with status ${vrfLite.status.kind} (${vrfLite.status.discriminator})`);
                }
            });
        })).finally(async () => {
            await closeWebsocket();
        });
        const state = await statePromise;
        // .catch(async e => {
        //   await closeWebsocket();
        //   throw e;
        // })
        // .finally(async () => {
        //   await closeWebsocket();
        // });
        await closeWebsocket();
        return state;
    }
    async closeAccountInstruction(payer, params) {
        const vrfLite = await this.loadData();
        const queueAccount = params?.queueAccount ?? new QueueAccount(this.program, vrfLite.queue);
        const queueAuthority = params?.queueAuthority ?? (await queueAccount.loadData()).authority;
        const [permissionAccount] = this.getPermissionAccount(queueAccount.publicKey, queueAuthority);
        const [escrowDest, escrowInit] = await this.program.mint.getOrCreateWrappedUserInstructions(payer, {
            fundUpTo: 0,
        });
        const vrfLiteClose = new TransactionObject(payer, [
            vrfLiteCloseAction(this.program, { params: {} }, {
                vrfLite: this.publicKey,
                permission: permissionAccount.publicKey,
                authority: vrfLite.authority,
                queue: queueAccount.publicKey,
                queueAuthority,
                programState: this.program.programState.publicKey,
                escrow: vrfLite.escrow,
                solDest: params?.destination ?? payer,
                escrowDest: escrowDest,
                tokenProgram: TOKEN_PROGRAM_ID,
            }),
        ], params?.authority ? [params.authority] : []);
        if (escrowInit) {
            return escrowInit.combine(vrfLiteClose);
        }
        return vrfLiteClose;
    }
    async closeAccount(params) {
        const transaction = await this.closeAccountInstruction(this.program.walletPubkey, params);
        const txnSignature = await this.program.signAndSend(transaction, {
            skipPreflight: true,
        });
        return txnSignature;
    }
    getPermissionAccount(queuePubkey, queueAuthority) {
        return PermissionAccount.fromSeed(this.program, queueAuthority, queuePubkey, this.publicKey);
    }
    getEscrow() {
        return this.program.mint.getAssociatedAddress(this.publicKey);
    }
}
//# sourceMappingURL=vrfLiteAccount.js.map