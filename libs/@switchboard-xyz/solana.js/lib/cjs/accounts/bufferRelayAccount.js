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
exports.BufferRelayerAccount = void 0;
const errors = __importStar(require("../errors"));
const types = __importStar(require("../generated"));
const generated_1 = require("../generated");
const TransactionObject_1 = require("../TransactionObject");
const account_1 = require("./account");
const oracleAccount_1 = require("./oracleAccount");
const permissionAccount_1 = require("./permissionAccount");
const queueAccount_1 = require("./queueAccount");
const spl = __importStar(require("@solana/spl-token-v2"));
const spl_token_1 = require("@solana/spl-token-v2");
const web3_js_1 = require("@solana/web3.js");
const common_1 = require("@switchboard-xyz/common");
/**
 * Account type holding a buffer of data sourced from the buffers sole {@linkcode JobAccount}. A buffer relayer has no consensus mechanism and relies on trusting an {@linkcode OracleAccount} to respond honestly. A buffer relayer has a max capacity of 500 bytes.
 *
 * Data: {@linkcode types.BufferRelayerAccountData}
 */
class BufferRelayerAccount extends account_1.Account {
    /**
     * Returns the size of an on-chain {@linkcode BufferRelayerAccount}.
     */
    get size() {
        return this.program.account.bufferRelayerAccountData.size;
    }
    decode(data) {
        try {
            return types.BufferRelayerAccountData.decode(data);
        }
        catch {
            return this.program.coder.decode(BufferRelayerAccount.accountName, data);
        }
    }
    /**
     * Invoke a callback each time a BufferRelayerAccount's data has changed on-chain.
     * @param callback - the callback invoked when the buffer relayer state changes
     * @param commitment - optional, the desired transaction finality. defaults to 'confirmed'
     * @returns the websocket subscription id
     */
    onChange(callback, commitment = 'confirmed') {
        return this.program.connection.onAccountChange(this.publicKey, accountInfo => {
            callback(this.decode(accountInfo.data));
        }, commitment);
    }
    /** Load an existing BufferRelayer with its current on-chain state */
    static async load(program, publicKey) {
        const account = new BufferRelayerAccount(program, typeof publicKey === 'string' ? new web3_js_1.PublicKey(publicKey) : publicKey);
        const state = await account.loadData();
        return [account, state];
    }
    /**
     * Load and parse {@linkcode BufferRelayerAccount} data based on the program IDL.
     */
    async loadData() {
        const data = await types.BufferRelayerAccountData.fetch(this.program, this.publicKey);
        if (data === null)
            throw new errors.AccountNotFoundError('Buffer Relayer', this.publicKey);
        return data;
    }
    static async createInstructions(program, payer, params) {
        const keypair = params.keypair ?? web3_js_1.Keypair.generate();
        program.verifyNewKeypair(keypair);
        const size = 2048;
        const ixns = [];
        const escrow = program.mint.getAssociatedAddress(keypair.publicKey);
        ixns.push(web3_js_1.SystemProgram.createAccount({
            fromPubkey: payer,
            newAccountPubkey: keypair.publicKey,
            space: size,
            lamports: await program.provider.connection.getMinimumBalanceForRentExemption(size),
            programId: program.programId,
        }));
        ixns.push(types.bufferRelayerInit(program, {
            params: {
                name: [...Buffer.from(params.name ?? '', 'utf8').slice(0, 32)],
                minUpdateDelaySeconds: params.minUpdateDelaySeconds ?? 30,
                stateBump: program.programState.bump,
            },
        }, {
            bufferRelayer: keypair.publicKey,
            escrow: escrow,
            authority: params.authority ?? payer,
            queue: params.queueAccount.publicKey,
            job: params.jobAccount.publicKey,
            programState: program.programState.publicKey,
            mint: program.mint.address,
            payer: payer,
            tokenProgram: spl_token_1.TOKEN_PROGRAM_ID,
            associatedTokenProgram: spl_token_1.ASSOCIATED_TOKEN_PROGRAM_ID,
            systemProgram: web3_js_1.SystemProgram.programId,
            rent: web3_js_1.SYSVAR_RENT_PUBKEY,
        }));
        return [
            new BufferRelayerAccount(program, keypair.publicKey),
            new TransactionObject_1.TransactionObject(payer, ixns, [keypair]),
        ];
    }
    static async create(program, params) {
        const [bufferAccount, bufferInit] = await BufferRelayerAccount.createInstructions(program, program.walletPubkey, params);
        const txnSignature = await program.signAndSend(bufferInit);
        return [bufferAccount, txnSignature];
    }
    async openRoundInstructions(payer, params) {
        const txns = [];
        const bufferRelayer = params?.bufferRelayer ?? (await this.loadData());
        const queueAccount = params?.queueAccount ??
            new queueAccount_1.QueueAccount(this.program, bufferRelayer.queuePubkey);
        const queue = params?.queue ?? (await queueAccount.loadData());
        const openRoundAmount = this.program.mint.fromTokenAmountBN(queue.reward);
        let tokenWallet;
        if (params?.tokenWallet) {
            tokenWallet = params.tokenWallet;
            // check if we need to wrap any funds
            const tokenAccount = await (0, spl_token_1.getAccount)(this.program.connection, tokenWallet);
            const tokenAmountBN = new common_1.BN(tokenAccount.amount.toString());
            if (tokenAmountBN.lt(queue.reward)) {
                const wrapTxn = await this.program.mint.wrapInstructions(payer, {
                    fundUpTo: openRoundAmount,
                });
                txns.push(wrapTxn);
            }
        }
        else {
            const [userTokenWallet, txn] = await this.program.mint.getOrCreateWrappedUserInstructions(payer, {
                fundUpTo: openRoundAmount,
            });
            tokenWallet = userTokenWallet;
            if (txn !== undefined) {
                txns.push(txn);
            }
        }
        const [permissionAccount, permissionBump] = this.getPermissionAccount(queueAccount.publicKey, queue.authority);
        const openRoundTxn = new TransactionObject_1.TransactionObject(payer, [
            (0, spl_token_1.createTransferInstruction)(tokenWallet, bufferRelayer.escrow, payer, BigInt(queue.reward.toString())),
            types.bufferRelayerOpenRound(this.program, {
                params: {
                    stateBump: this.program.programState.bump,
                    permissionBump,
                },
            }, {
                bufferRelayer: this.publicKey,
                oracleQueue: queueAccount.publicKey,
                dataBuffer: queue.dataBuffer,
                permission: permissionAccount.publicKey,
                escrow: bufferRelayer.escrow,
                programState: this.program.programState.publicKey,
            }),
        ], []);
        txns.push(openRoundTxn);
        const packed = TransactionObject_1.TransactionObject.pack(txns);
        if (packed.length > 1) {
            throw new Error(`Failed to pack instructions into a single txn`);
        }
        return packed[0];
    }
    async openRound(params) {
        const openRound = await this.openRoundInstructions(this.program.walletPubkey, params);
        const txnSignature = await this.program.signAndSend(openRound);
        return txnSignature;
    }
    async openRoundAndAwaitResult(params, timeout = 30000) {
        const bufferRelayer = params?.bufferRelayer ?? (await this.loadData());
        const currentRoundOpenSlot = bufferRelayer.currentRound.roundOpenSlot;
        let ws = undefined;
        const closeWebsocket = async () => {
            if (ws !== undefined) {
                await this.program.connection.removeAccountChangeListener(ws);
                ws = undefined;
            }
        };
        const statePromise = (0, common_1.promiseWithTimeout)(timeout, new Promise((resolve, reject) => {
            ws = this.onChange(bufferRelayer => {
                if (bufferRelayer.currentRound.roundOpenSlot.gt(currentRoundOpenSlot) &&
                    bufferRelayer.currentRound.numSuccess > 0) {
                    resolve(bufferRelayer);
                }
            });
        })).finally(async () => {
            await closeWebsocket();
        });
        const openRoundSignature = await this.openRound(params);
        const state = await statePromise;
        await closeWebsocket();
        return [state, openRoundSignature];
    }
    async saveResultInstructions(payer, params, options) {
        const bufferRelayer = await this.loadData();
        const [queueAccount, queue] = await queueAccount_1.QueueAccount.load(this.program, bufferRelayer.queuePubkey);
        const { permissionAccount, permissionBump } = this.getAccounts(queueAccount, queue.authority);
        const [oracleAccount, oracle] = await oracleAccount_1.OracleAccount.load(this.program, bufferRelayer.currentRound.oraclePubkey);
        return this.saveResultSyncInstructions(payer, {
            ...params,
            escrow: bufferRelayer.escrow,
            queueAccount: queueAccount,
            queueAuthority: queue.authority,
            queueDataBuffer: queue.dataBuffer,
            oracleAccount: oracleAccount,
            oracleAuthority: oracle.oracleAuthority,
            oracleTokenAccount: oracle.tokenAccount,
            permissionAccount: permissionAccount,
            permissionBump: permissionBump,
        }, options);
    }
    async saveResult(params, options) {
        const saveResult = await this.saveResultInstructions(this.program.walletPubkey, params, options);
        const txnSignature = await this.program.signAndSend(saveResult);
        return txnSignature;
    }
    saveResultSyncInstructions(payer, params, options) {
        const saveResultIxn = (0, generated_1.bufferRelayerSaveResult)(this.program, {
            params: {
                stateBump: this.program.programState.bump,
                permissionBump: params.permissionBump,
                result: params.result,
                success: params.success,
            },
        }, {
            bufferRelayer: this.publicKey,
            oracleAuthority: params.oracleAuthority,
            oracle: params.oracleAccount.publicKey,
            oracleQueue: params.queueAccount.publicKey,
            dataBuffer: params.queueDataBuffer,
            queueAuthority: params.queueAuthority,
            permission: params.permissionAccount.publicKey,
            escrow: params.escrow,
            programState: this.program.programState.publicKey,
            oracleWallet: params.oracleTokenAccount,
            tokenProgram: spl.TOKEN_PROGRAM_ID,
        });
        return new TransactionObject_1.TransactionObject(payer, [saveResultIxn], [], options);
    }
    async saveResultSync(params, options) {
        const saveResult = await this.saveResultSyncInstructions(this.program.walletPubkey, params, options);
        const txnSignature = await this.program.signAndSend(saveResult);
        return txnSignature;
    }
    getAccounts(queueAccount, queueAuthority) {
        const [permissionAccount, permissionBump] = this.getPermissionAccount(queueAccount.publicKey, queueAuthority);
        return {
            queueAccount,
            permissionAccount,
            permissionBump,
        };
    }
    async toAccountsJSON(_bufferRelayer, _queueAccount, _queue) {
        const { bufferRelayer, queue, permission, escrow } = await this.fetchAccounts(_bufferRelayer, _queueAccount, _queue);
        return {
            publicKey: this.publicKey,
            balance: this.program.mint.fromTokenAmount(escrow.data.amount),
            ...bufferRelayer.data.toJSON(),
            queue: {
                publicKey: queue.publicKey,
                ...queue.data.toJSON(),
            },
            permission: {
                publicKey: permission.publicKey,
                ...permission.data.toJSON(),
                bump: permission.bump,
            },
        };
    }
    async fetchAccounts(_bufferRelayer, _queueAccount, _queue) {
        const bufferRelayer = _bufferRelayer ?? (await this.loadData());
        const queueAccount = _queueAccount ??
            new queueAccount_1.QueueAccount(this.program, bufferRelayer.queuePubkey);
        const queue = _queue ?? (await queueAccount.loadData());
        const { permissionAccount, permissionBump } = this.getAccounts(queueAccount, queue.authority);
        const permission = await permissionAccount.loadData();
        const bufferEscrow = await this.program.mint.getAccount(bufferRelayer.escrow);
        if (!bufferEscrow) {
            throw new errors.AccountNotFoundError('Buffer Relayer Escrow', bufferRelayer.escrow);
        }
        const vrfEscrowBalance = this.program.mint.fromTokenAmount(bufferEscrow.amount);
        return {
            bufferRelayer: { publicKey: this.publicKey, data: bufferRelayer },
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
                publicKey: bufferRelayer.escrow,
                data: bufferEscrow,
                balance: vrfEscrowBalance,
            },
        };
    }
    getPermissionAccount(queuePubkey, queueAuthority) {
        return permissionAccount_1.PermissionAccount.fromSeed(this.program, queueAuthority, queuePubkey, this.publicKey);
    }
    getEscrow() {
        return this.program.mint.getAssociatedAddress(this.publicKey);
    }
}
exports.BufferRelayerAccount = BufferRelayerAccount;
BufferRelayerAccount.accountName = 'BufferRelayerAccountData';
//# sourceMappingURL=bufferRelayAccount.js.map