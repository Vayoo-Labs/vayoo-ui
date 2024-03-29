"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.VrfAccount = void 0;
const errors = __importStar(require("../errors"));
const types = __importStar(require("../generated"));
const generated_1 = require("../generated");
const TransactionObject_1 = require("../TransactionObject");
const account_1 = require("./account");
const oracleAccount_1 = require("./oracleAccount");
const permissionAccount_1 = require("./permissionAccount");
const queueAccount_1 = require("./queueAccount");
const anchor = __importStar(require("@coral-xyz/anchor"));
const spl = __importStar(require("@solana/spl-token-v2"));
const spl_token_1 = require("@solana/spl-token-v2");
const web3_js_1 = require("@solana/web3.js");
const common_1 = require("@switchboard-xyz/common");
/**
 * Account holding a Verifiable Random Function result with a callback instruction for consuming on-chain pseudo-randomness.
 *
 * Data: {@linkcode types.VrfAccountData}
 * Result: [u8;32]
 */
class VrfAccount extends account_1.Account {
    constructor() {
        super(...arguments);
        /**
         * Returns the size of an on-chain {@linkcode VrfAccount}.
         */
        this.size = this.program.account.vrfAccountData.size;
    }
    /**
     * Return a vrf account state initialized to the default values.
     */
    static default() {
        const buffer = Buffer.alloc(29058, 0);
        types.VrfAccountData.discriminator.copy(buffer, 0);
        return types.VrfAccountData.decode(buffer);
    }
    /** Load an existing VrfAccount with its current on-chain state */
    static async load(program, publicKey) {
        const account = new VrfAccount(program, typeof publicKey === 'string' ? new web3_js_1.PublicKey(publicKey) : publicKey);
        const state = await account.loadData();
        return [account, state];
    }
    /**
     * Invoke a callback each time a VrfAccount's data has changed on-chain.
     * @param callback - the callback invoked when the vrf state changes
     * @param commitment - optional, the desired transaction finality. defaults to 'confirmed'
     * @returns the websocket subscription id
     */
    onChange(callback, commitment = 'confirmed') {
        return this.program.connection.onAccountChange(this.publicKey, accountInfo => callback(types.VrfAccountData.decode(accountInfo.data)), commitment);
    }
    /**
     * Retrieve and decode the {@linkcode types.VrfAccountData} stored in this account.
     */
    async loadData() {
        const data = await types.VrfAccountData.fetch(this.program, this.publicKey);
        if (data === null)
            throw new errors.AccountNotFoundError('Vrf', this.publicKey);
        return data;
    }
    /**
     *  Creates a list of instructions that will produce a {@linkcode VrfAccount}.
     *
     *  _NOTE_: The transaction that includes these instructions should be signed by both
     *  payer and vrfKeypair.
     */
    static async createInstructions(program, payer, params) {
        program.verifyNewKeypair(params.vrfKeypair);
        const vrfAccount = new VrfAccount(program, params.vrfKeypair.publicKey);
        const size = program.account.vrfAccountData.size;
        const escrow = program.mint.getAssociatedAddress(vrfAccount.publicKey);
        const ixns = [
            spl.createAssociatedTokenAccountInstruction(payer, escrow, params.vrfKeypair.publicKey, program.mint.address),
            spl.createSetAuthorityInstruction(escrow, params.vrfKeypair.publicKey, spl.AuthorityType.AccountOwner, program.programState.publicKey),
            web3_js_1.SystemProgram.createAccount({
                fromPubkey: payer,
                newAccountPubkey: params.vrfKeypair.publicKey,
                space: size,
                lamports: await program.connection.getMinimumBalanceForRentExemption(size),
                programId: program.programId,
            }),
            types.vrfInit(program, {
                params: {
                    stateBump: program.programState.bump,
                    callback: params.callback,
                },
            }, {
                vrf: params.vrfKeypair.publicKey,
                authority: params.authority ?? payer,
                escrow,
                oracleQueue: params.queueAccount.publicKey,
                programState: program.programState.publicKey,
                tokenProgram: spl.TOKEN_PROGRAM_ID,
            }),
        ];
        return [
            vrfAccount,
            new TransactionObject_1.TransactionObject(payer, ixns, [params.vrfKeypair]),
        ];
    }
    /**
     *  Produces a Switchboard {@linkcode VrfAccount}.
     *
     *  _NOTE_: program wallet is used to sign the transaction.
     */
    static async create(program, params) {
        const [vrfAccount, vrfInitTxn] = await VrfAccount.createInstructions(program, program.walletPubkey, params);
        const txnSignature = await program.signAndSend(vrfInitTxn);
        return [vrfAccount, txnSignature];
    }
    async requestRandomnessInstruction(payer, params, options) {
        const vrf = params.vrf ?? (await this.loadData());
        const queueAccount = params.queueAccount ?? new queueAccount_1.QueueAccount(this.program, vrf.oracleQueue);
        const queue = params.queue ?? (await queueAccount.loadData());
        const [permissionAccount, permissionBump] = this.getPermissionAccount(queueAccount.publicKey, queue.authority);
        const requestRandomness = new TransactionObject_1.TransactionObject(payer, [
            types.vrfRequestRandomness(this.program, {
                params: {
                    stateBump: this.program.programState.bump,
                    permissionBump,
                },
            }, {
                authority: params.authority?.publicKey ?? payer,
                vrf: this.publicKey,
                oracleQueue: queueAccount.publicKey,
                queueAuthority: queue.authority,
                dataBuffer: queue.dataBuffer,
                permission: permissionAccount.publicKey,
                escrow: vrf.escrow,
                payerWallet: params.payerTokenWallet,
                payerAuthority: params.payerAuthority
                    ? params.payerAuthority.publicKey
                    : payer,
                recentBlockhashes: web3_js_1.SYSVAR_RECENT_BLOCKHASHES_PUBKEY,
                programState: this.program.programState.publicKey,
                tokenProgram: spl_token_1.TOKEN_PROGRAM_ID,
            }),
        ], params.authority ? [params.authority] : [], options);
        return requestRandomness;
    }
    async requestRandomness(params, options) {
        const requestRandomness = await this.requestRandomnessInstruction(this.program.walletPubkey, params, options);
        const txnSignature = await this.program.signAndSend(requestRandomness);
        return txnSignature;
    }
    proveAndVerifyInstructions(params, options, numTxns = 40) {
        const idx = params.idx ??
            params.vrf.builders.findIndex(builder => params.oraclePubkey.equals(builder.producer));
        if (idx === -1) {
            throw new Error('OracleNotFoundError');
        }
        const remainingAccounts = params.vrf.callback.accounts.slice(0, params.vrf.callback.accountsLen);
        const txns = Array.from(Array(numTxns).keys()).map(i => {
            const proveIxn = types.vrfProveAndVerify(this.program, {
                params: {
                    nonce: i,
                    stateBump: this.program.programState.bump,
                    idx: idx,
                    proof: new Uint8Array(),
                    proofEncoded: params.proof,
                    counter: params.counter ?? params.vrf.counter,
                },
            }, {
                vrf: this.publicKey,
                callbackPid: params.vrf.callback.programId,
                tokenProgram: spl_token_1.TOKEN_PROGRAM_ID,
                escrow: params.vrf.escrow,
                programState: this.program.programState.publicKey,
                oracle: params.oraclePubkey,
                oracleAuthority: params.oracleAuthority,
                oracleWallet: params.oracleTokenWallet,
                instructionsSysvar: web3_js_1.SYSVAR_INSTRUCTIONS_PUBKEY,
            });
            proveIxn.keys = proveIxn.keys.concat(remainingAccounts);
            return new TransactionObject_1.TransactionObject(this.program.walletPubkey, [proveIxn], [], {
                computeUnitLimit: 1400000,
                ...options,
            });
        });
        return txns;
    }
    async proveAndVerify(params, options, numTxns = 40) {
        const vrf = params.vrf ?? (await this.loadData());
        const oraclePubkey = params.oraclePubkey ?? vrf.builders[0].producer;
        let oracleTokenWallet = params.oracleTokenWallet;
        let oracleAuthority = params.oracleAuthority;
        if (!oracleTokenWallet || !oracleAuthority) {
            const oracleAccount = new oracleAccount_1.OracleAccount(this.program, oraclePubkey);
            const oracle = await oracleAccount.loadData();
            oracleTokenWallet = oracle.tokenAccount;
            oracleAuthority = oracle.oracleAuthority;
        }
        const txns = this.proveAndVerifyInstructions({
            vrf,
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
    setCallbackInstruction(payer, params) {
        const authorityPubkey = params.authority instanceof web3_js_1.PublicKey
            ? params.authority
            : params.authority.publicKey;
        return new TransactionObject_1.TransactionObject(payer, [
            types.vrfSetCallback(this.program, {
                params: {
                    callback: params.callback,
                },
            }, {
                vrf: this.publicKey,
                authority: authorityPubkey,
            }),
        ], params.authority instanceof web3_js_1.Keypair ? [params.authority] : []);
    }
    async setCallback(params) {
        const setCallbackTxn = this.setCallbackInstruction(this.program.walletPubkey, params);
        const txnSignature = await this.program.signAndSend(setCallbackTxn);
        return txnSignature;
    }
    /** Return parsed transactions for a VRF request */
    async getCallbackTransactions(requestSlot, txnLimit = 50) {
        const slot = requestSlot ?? (await this.loadData()).currentRound.requestSlot;
        // TODO: Add options and allow getting signatures by slot
        const transactions = await this.program.connection.getSignaturesForAddress(this.publicKey, { limit: txnLimit, minContextSlot: slot.toNumber() }, 'confirmed');
        const signatures = transactions.map(txn => txn.signature);
        const parsedTransactions = await this.program.connection.getParsedTransactions(signatures, 'confirmed');
        const callbackTransactions = [];
        for (const txn of parsedTransactions) {
            if (txn === null) {
                continue;
            }
            const logs = txn.meta?.logMessages?.join('\n') ?? '';
            if (logs.includes('Invoking callback')) {
                callbackTransactions.push(txn);
            }
        }
        return callbackTransactions;
    }
    getAccounts(params) {
        const queueAccount = params.queueAccount;
        const [permissionAccount, permissionBump] = this.getPermissionAccount(queueAccount.publicKey, params.queueAuthority);
        return {
            queueAccount,
            permissionAccount,
            permissionBump,
        };
    }
    async fetchAccounts(_vrf, _queueAccount, _queue) {
        const vrf = _vrf ?? (await this.loadData());
        const queueAccount = _queueAccount ?? new queueAccount_1.QueueAccount(this.program, vrf.oracleQueue);
        const queue = _queue ?? (await queueAccount.loadData());
        const { permissionAccount, permissionBump } = this.getAccounts({
            queueAccount,
            queueAuthority: queue.authority,
        });
        const permission = await permissionAccount.loadData();
        const vrfEscrow = await this.program.mint.getAccount(vrf.escrow);
        if (!vrfEscrow) {
            throw new errors.AccountNotFoundError('Vrf Escrow', vrf.escrow);
        }
        const vrfEscrowBalance = this.program.mint.fromTokenAmount(vrfEscrow.amount);
        return {
            vrf: { publicKey: this.publicKey, data: vrf },
            queue: {
                publicKey: queueAccount.publicKey,
                data: queue,
            },
            permission: {
                publicKey: permissionAccount.publicKey,
                bump: permissionBump,
                data: permission,
            },
            escrow: {
                publicKey: vrf.escrow,
                data: vrfEscrow,
                balance: vrfEscrowBalance,
            },
        };
    }
    async toAccountsJSON(_vrf, _queueAccount, _queue) {
        const accounts = await this.fetchAccounts(_vrf, _queueAccount, _queue);
        return {
            publicKey: this.publicKey,
            ...accounts.vrf.data.toJSON(),
            queue: {
                publicKey: accounts.queue.publicKey,
                ...accounts.queue.data.toJSON(),
            },
            permission: {
                publicKey: accounts.permission.publicKey,
                ...accounts.permission.data.toJSON(),
            },
            escrow: {
                publicKey: accounts.escrow.publicKey,
                balance: accounts.escrow.balance,
            },
        };
    }
    async requestAndAwaitResult(params, timeout = 30000, options) {
        const vrf = params?.vrf ?? (await this.loadData());
        const currentRoundOpenSlot = vrf.currentRound.requestSlot;
        let ws = undefined;
        const closeWebsocket = async () => {
            if (ws !== undefined) {
                await this.program.connection.removeAccountChangeListener(ws);
                ws = undefined;
            }
        };
        const statePromise = (0, common_1.promiseWithTimeout)(timeout, new Promise((resolve, reject) => {
            ws = this.onChange(vrf => {
                if (vrf.currentRound.requestSlot.gt(currentRoundOpenSlot)) {
                    if (vrf.status.kind ===
                        types.VrfStatus.StatusCallbackSuccess.kind ||
                        vrf.status.kind === types.VrfStatus.StatusVerified.kind) {
                        resolve(vrf);
                    }
                    if (vrf.status.kind === types.VrfStatus.StatusVerifyFailure.kind) {
                        reject(`Vrf failed to verify with status ${vrf.status.kind} (${vrf.status.discriminator})`);
                    }
                }
            });
        })).finally(async () => {
            await closeWebsocket();
        });
        let requestRandomnessSignature = undefined;
        if ('requestFunction' in params) {
            requestRandomnessSignature = await params
                .requestFunction()
                .catch(async (error) => {
                await closeWebsocket();
                throw new Error(`Failed to call requestRandomness, ${error}`);
            });
        }
        else {
            requestRandomnessSignature = await this.requestRandomness(params, options).catch(async (error) => {
                await closeWebsocket();
                throw new Error(`Failed to call requestRandomness, ${error}`);
            });
        }
        const state = await statePromise;
        await closeWebsocket();
        return [state, requestRandomnessSignature];
    }
    /**
     * Await for the next vrf result
     *
     * @param roundId - optional, the id associated with the VRF round to watch. If not provided the current round Id will be used.
     * @param timeout - the number of milliseconds to wait for the round to close
     *
     * @throws {string} when the timeout interval is exceeded or when the latestConfirmedRound.roundOpenSlot exceeds the target roundOpenSlot
     */
    async nextResult(roundId, timeout = 30000) {
        let id;
        if (roundId) {
            id = roundId;
        }
        else {
            const vrf = await this.loadData();
            if (vrf.status.kind === 'StatusVerifying') {
                id = vrf.counter;
            }
            else {
                // wait for the next round
                id = vrf.counter.add(new anchor.BN(1));
            }
        }
        let ws;
        const closeWebsocket = async () => {
            if (ws !== undefined) {
                await this.program.connection.removeAccountChangeListener(ws);
                ws = undefined;
            }
        };
        let result;
        try {
            result = await (0, common_1.promiseWithTimeout)(timeout, new Promise((resolve, reject) => {
                ws = this.onChange(vrf => {
                    if (vrf.counter.gt(id)) {
                        reject(`Current counter is higher than requested roundId`);
                    }
                    if (vrf.counter.eq(id)) {
                        switch (vrf.status.kind) {
                            case 'StatusCallbackSuccess': {
                                resolve({
                                    success: true,
                                    result: new Uint8Array(vrf.currentRound.result),
                                    status: vrf.status,
                                });
                                break;
                            }
                            case 'StatusVerifyFailure': {
                                resolve({
                                    success: false,
                                    result: new Uint8Array(),
                                    status: vrf.status,
                                });
                                break;
                            }
                        }
                    }
                });
            }));
        }
        finally {
            await closeWebsocket();
        }
        await closeWebsocket();
        return result;
    }
    async closeAccountInstruction(payer, params) {
        const vrfLite = await this.loadData();
        const queueAccount = params?.queueAccount ??
            new queueAccount_1.QueueAccount(this.program, vrfLite.oracleQueue);
        const queueAuthority = params?.queueAuthority ?? (await queueAccount.loadData()).authority;
        const [permissionAccount, permissionBump] = this.getPermissionAccount(queueAccount.publicKey, queueAuthority);
        const [escrowDest, escrowInit] = await this.program.mint.getOrCreateWrappedUserInstructions(payer, {
            fundUpTo: 0,
        });
        const vrfClose = new TransactionObject_1.TransactionObject(payer, [
            (0, generated_1.vrfCloseAction)(this.program, {
                params: {
                    stateBump: this.program.programState.bump,
                    permissionBump: permissionBump,
                },
            }, {
                vrf: this.publicKey,
                permission: permissionAccount.publicKey,
                authority: vrfLite.authority,
                oracleQueue: queueAccount.publicKey,
                queueAuthority,
                programState: this.program.programState.publicKey,
                escrow: vrfLite.escrow,
                solDest: params?.destination ?? payer,
                escrowDest: escrowDest,
                tokenProgram: spl_token_1.TOKEN_PROGRAM_ID,
            }),
        ], params?.authority ? [params.authority] : []);
        if (escrowInit) {
            return escrowInit.combine(vrfClose);
        }
        return vrfClose;
    }
    async closeAccount(params) {
        const transaction = await this.closeAccountInstruction(this.program.walletPubkey, params);
        const txnSignature = await this.program.signAndSend(transaction, {
            skipPreflight: true,
        });
        return txnSignature;
    }
    getPermissionAccount(queuePubkey, queueAuthority) {
        return permissionAccount_1.PermissionAccount.fromSeed(this.program, queueAuthority, queuePubkey, this.publicKey);
    }
}
exports.VrfAccount = VrfAccount;
VrfAccount.accountName = 'VrfAccountData';
//# sourceMappingURL=vrfAccount.js.map