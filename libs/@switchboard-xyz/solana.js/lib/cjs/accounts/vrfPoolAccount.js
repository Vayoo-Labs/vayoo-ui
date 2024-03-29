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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.VrfPoolAccount = void 0;
const const_1 = require("../const");
const errors_1 = require("../errors");
const types = __importStar(require("../generated"));
const TransactionObject_1 = require("../TransactionObject");
const account_1 = require("./account");
const permissionAccount_1 = require("./permissionAccount");
const queueAccount_1 = require("./queueAccount");
const vrfLiteAccount_1 = require("./vrfLiteAccount");
const spl_token_1 = require("@solana/spl-token-v2");
const web3_js_1 = require("@solana/web3.js");
const common_1 = require("@switchboard-xyz/common");
const lodash_1 = __importDefault(require("lodash"));
class VrfPoolAccount extends account_1.Account {
    constructor() {
        super(...arguments);
        this.size = this.program.account.vrfPoolAccountData.size;
    }
    /**
     * Invoke a callback each time a VrfAccount's data has changed on-chain.
     * @param callback - the callback invoked when the vrf state changes
     * @param commitment - optional, the desired transaction finality. defaults to 'confirmed'
     * @returns the websocket subscription id
     */
    onChange(callback, commitment = 'confirmed') {
        return this.program.connection.onAccountChange(this.publicKey, accountInfo => callback(VrfPoolAccount.decode(accountInfo.data)), commitment);
    }
    static decode(data) {
        const accountData = types.VrfPoolAccountData.decode(data.slice(0, 8 + types.VrfPoolAccountData.layout.span));
        const poolBytes = data.slice(8 + types.VrfPoolAccountData.layout.span);
        const ROW_SIZE = types.VrfPoolRow.layout().span;
        const pool = [];
        for (let i = 0; i < poolBytes.length; i += ROW_SIZE) {
            if (i + ROW_SIZE > poolBytes.length) {
                break;
            }
            const row = types.VrfPoolRow.fromDecoded(types.VrfPoolRow.layout().decode(poolBytes, i));
            if (row.pubkey.equals(web3_js_1.PublicKey.default)) {
                break;
            }
            pool.push(row);
        }
        accountData['pool'] = pool;
        return accountData;
    }
    async loadData() {
        const info = await this.program.connection.getAccountInfo(this.publicKey);
        if (info === null) {
            throw new errors_1.AccountNotFoundError('VrfPool', this.publicKey);
        }
        if (!info.owner.equals(this.program.programId)) {
            throw new Error("account doesn't belong to this program");
        }
        return VrfPoolAccount.decode(info.data);
    }
    static getSize(program, maxRows) {
        return 8 + types.VrfPoolAccountData.layout.span + maxRows * 40;
    }
    static async createInstruction(program, payer, params) {
        const vrfPoolKeypair = params.keypair ?? web3_js_1.Keypair.generate();
        const space = VrfPoolAccount.getSize(program, params.maxRows);
        const vrfPoolAccount = new VrfPoolAccount(program, vrfPoolKeypair.publicKey);
        const vrfPoolEscrow = program.mint.getAssociatedAddress(vrfPoolKeypair.publicKey);
        const vrfPoolInitTxn = new TransactionObject_1.TransactionObject(payer, [
            web3_js_1.SystemProgram.createAccount({
                fromPubkey: payer,
                newAccountPubkey: vrfPoolKeypair.publicKey,
                lamports: await program.connection.getMinimumBalanceForRentExemption(space),
                space: space,
                programId: program.programId,
            }),
            types.vrfPoolInit(program, {
                params: {
                    maxRows: params.maxRows,
                    minInterval: params.minInterval ?? 0,
                    stateBump: program.programState.bump,
                },
            }, {
                vrfPool: vrfPoolKeypair.publicKey,
                authority: params.authority ?? payer,
                queue: params.queueAccount.publicKey,
                mint: program.mint.address,
                escrow: vrfPoolEscrow,
                programState: program.programState.publicKey,
                payer: payer,
                tokenProgram: spl_token_1.TOKEN_PROGRAM_ID,
                associatedTokenProgram: spl_token_1.ASSOCIATED_TOKEN_PROGRAM_ID,
                systemProgram: web3_js_1.SystemProgram.programId,
                rent: web3_js_1.SYSVAR_RENT_PUBKEY,
            }),
        ], [vrfPoolKeypair]);
        return [vrfPoolAccount, vrfPoolInitTxn];
    }
    static async create(program, params) {
        const [account, transaction] = await VrfPoolAccount.createInstruction(program, program.walletPubkey, params);
        const txnSignature = await program.signAndSend(transaction, {
            skipPreflight: true,
        });
        return [account, txnSignature];
    }
    async pushNewInstruction(payer, params) {
        const vrfPool = params?.vrfPool ?? (await this.loadData());
        const queueAccount = params?.queueAccount ?? new queueAccount_1.QueueAccount(this.program, vrfPool.queue);
        const [vrfLiteAccount, vrfLiteInit] = await queueAccount.createVrfLiteInstructions(payer, {
            ...params,
            authority: vrfPool.authority,
        });
        const pushTxn = await this.pushInstruction(payer, {
            ...params,
            vrf: vrfLiteAccount,
        });
        const packed = TransactionObject_1.TransactionObject.pack([vrfLiteInit, pushTxn]);
        if (packed.length > 1) {
            throw new Error(`Packing error`);
        }
        return [vrfLiteAccount, packed[0]];
    }
    async pushNew(params) {
        const [vrfLiteAccount, transaction] = await this.pushNewInstruction(this.program.walletPubkey, params);
        const txnSignature = await this.program.signAndSend(transaction, {
            skipPreflight: true,
        });
        return [vrfLiteAccount, txnSignature];
    }
    async pushInstruction(payer, params) {
        const vrfPool = await this.loadData();
        const [queueAccount, queue] = await queueAccount_1.QueueAccount.load(this.program, vrfPool.queue);
        const [permissionAccount] = params.vrf.getPermissionAccount(queueAccount.publicKey, queue.authority);
        // verify permissions
        const pushIxn = types.vrfPoolAdd(this.program, { params: {} }, {
            vrfPool: this.publicKey,
            authority: vrfPool.authority,
            vrfLite: params.vrf.publicKey,
            queue: queueAccount.publicKey,
            permission: permissionAccount.publicKey,
        });
        return new TransactionObject_1.TransactionObject(payer, [pushIxn], params.authority ? [params.authority] : []);
    }
    async push(params) {
        const transaction = await this.pushInstruction(this.program.walletPubkey, params);
        const txnSignature = await this.program.signAndSend(transaction, {
            skipPreflight: true,
        });
        return txnSignature;
    }
    async popInstructions(payer, params) {
        const vrfPool = await this.loadData();
        const [queueAccount, queue] = await queueAccount_1.QueueAccount.load(this.program, vrfPool.queue);
        const vrfs = vrfPool.pool.slice(-5);
        const popIxn = types.vrfPoolRemove(this.program, { params: {} }, {
            vrfPool: this.publicKey,
            authority: vrfPool.authority,
            queue: queueAccount.publicKey,
        });
        popIxn.keys = popIxn.keys.concat(vrfs.map((v) => {
            return {
                pubkey: v.pubkey,
                isSigner: false,
                isWritable: true,
            };
        }));
        return new TransactionObject_1.TransactionObject(payer, [popIxn], params?.authority ? [params.authority] : []);
    }
    async pop(params) {
        const transaction = await this.popInstructions(this.program.walletPubkey, params);
        const txnSignature = await this.program.signAndSend(transaction, {
            skipPreflight: true,
        });
        return txnSignature;
    }
    /** Returns the sorted, next {@param size} rows in the pool */
    getRemainingAccounts(vrfPool, queueAuthority, size = 7) {
        const vrfRows = [
            ...vrfPool.pool.slice(vrfPool.idx),
            ...vrfPool.pool.slice(0, vrfPool.idx),
        ].slice(0, size);
        const accountMetas = vrfRows.map((row) => {
            const escrow = this.program.mint.getAssociatedAddress(row.pubkey);
            const vrfLiteAccount = new vrfLiteAccount_1.VrfLiteAccount(this.program, row.pubkey);
            const [permission] = vrfLiteAccount.getPermissionAccount(vrfPool.queue, queueAuthority);
            return [
                {
                    pubkey: row.pubkey,
                    isSigner: false,
                    isWritable: true,
                },
                {
                    pubkey: permission.publicKey,
                    isSigner: false,
                    isWritable: true,
                },
                {
                    pubkey: escrow,
                    isSigner: false,
                    isWritable: true,
                },
            ];
        });
        const remainingAccounts = lodash_1.default.flatten(accountMetas).sort((a, b) => Buffer.compare(a.pubkey.toBuffer(), b.pubkey.toBuffer()));
        return remainingAccounts;
    }
    async requestInstructions(payer, params, size = 7) {
        const vrfPool = await this.loadData();
        const [queueAccount, queue] = await queueAccount_1.QueueAccount.load(this.program, vrfPool.queue);
        const remainingAccounts = this.getRemainingAccounts(vrfPool, queue.authority, size);
        // we dont want to wrap any funds. it will take up space in the txn needed for remainingAccounts
        // to increase probability of popping the next row
        const vrfPoolBalance = await this.fetchBalance(vrfPool.escrow);
        if (vrfPoolBalance < const_1.VRF_POOL_REQUEST_AMOUNT) {
            throw new errors_1.InsufficientFundsError(const_1.VRF_POOL_REQUEST_AMOUNT, vrfPoolBalance);
        }
        const requestIxn = types.vrfPoolRequest(this.program, {
            params: {
                callback: params?.callback ?? null,
            },
        }, {
            vrfPool: this.publicKey,
            authority: vrfPool.authority,
            escrow: vrfPool.escrow,
            mint: this.program.mint.address,
            queue: queueAccount.publicKey,
            queueAuthority: queue.authority,
            dataBuffer: queue.dataBuffer,
            recentBlockhashes: web3_js_1.SYSVAR_RECENT_BLOCKHASHES_PUBKEY,
            programState: this.program.programState.publicKey,
            tokenProgram: spl_token_1.TOKEN_PROGRAM_ID,
        });
        requestIxn.keys = requestIxn.keys.concat(remainingAccounts);
        const requestTxn = new TransactionObject_1.TransactionObject(payer, [requestIxn], params?.authority ? [params.authority] : []);
        return requestTxn;
    }
    async request(params) {
        const transaction = await this.requestInstructions(this.program.walletPubkey, params);
        const txnSignature = await this.program.signAndSend(transaction, {
            skipPreflight: true,
        });
        return txnSignature;
    }
    // public requestSync(
    //   payer: PublicKey,
    //   params: {
    //     payoutTokenWallet: PublicKey;
    //     queuePubkey: PublicKey;
    //     queueAuthority: PublicKey;
    //     queueDataBuffer: PublicKey;
    //     crankDataBuffer: PublicKey;
    //     readyAggregators: Array<[AggregatorAccount, AggregatorPdaAccounts]>;
    //     nonce?: number;
    //     failOpenOnMismatch?: boolean;
    //     popIdx?: number;
    //   },
    //   options?: TransactionObjectOptions
    // ): TransactionObject {
    //   if (params.readyAggregators.length < 1) {
    //     throw new Error(`No aggregators ready`);
    //   }
    //   let remainingAccounts: PublicKey[] = [];
    //   let txn: TransactionObject | undefined = undefined;
    //   const allLeaseBumps = params.readyAggregators.reduce(
    //     (map, [aggregatorAccount, pdaAccounts]) => {
    //       map.set(aggregatorAccount.publicKey.toBase58(), pdaAccounts.leaseBump);
    //       return map;
    //     },
    //     new Map<string, number>()
    //   );
    //   const allPermissionBumps = params.readyAggregators.reduce(
    //     (map, [aggregatorAccount, pdaAccounts]) => {
    //       map.set(
    //         aggregatorAccount.publicKey.toBase58(),
    //         pdaAccounts.permissionBump
    //       );
    //       return map;
    //     },
    //     new Map<string, number>()
    //   );
    //   // add as many readyAggregators until the txn overflows
    //   for (const [
    //     readyAggregator,
    //     aggregatorPdaAccounts,
    //   ] of params.readyAggregators) {
    //     const { leaseAccount, leaseEscrow, permissionAccount } =
    //       aggregatorPdaAccounts;
    //     const newRemainingAccounts = [
    //       ...remainingAccounts,
    //       readyAggregator.publicKey,
    //       leaseAccount.publicKey,
    //       leaseEscrow,
    //       permissionAccount.publicKey,
    //     ];
    //     try {
    //       const newTxn = this.getPopTxn(
    //         payer,
    //         {
    //           ...params,
    //           remainingAccounts: newRemainingAccounts,
    //           leaseBumps: allLeaseBumps,
    //           permissionBumps: allPermissionBumps,
    //         },
    //         options
    //       );
    //       // succeeded, so set running txn and remaining accounts and try again
    //       txn = newTxn;
    //       remainingAccounts = newRemainingAccounts;
    //     } catch (error) {
    //       if (error instanceof errors.TransactionOverflowError) {
    //         if (txn === undefined) {
    //           throw new Error(`Failed to create crank pop transaction, ${error}`);
    //         }
    //         return txn;
    //       }
    //       throw error;
    //     }
    //   }
    //   if (txn === undefined) {
    //     throw new Error(`Failed to create crank pop transaction`);
    //   }
    //   return txn;
    // }
    async depositInstructions(payer, params) {
        const userTokenAddress = params.tokenWallet ??
            this.program.mint.getAssociatedAddress(params.tokenAuthority?.publicKey ?? payer);
        const userBalance = await this.program.mint.fetchBalance(userTokenAddress);
        if (params.disableWrap && !userBalance) {
            throw new errors_1.InsufficientFundsError(params.amount, 0);
        }
        if (params.disableWrap && params.amount > (userBalance ?? 0)) {
            throw new errors_1.InsufficientFundsError(params.amount, userBalance ?? 0);
        }
        const transferTxn = new TransactionObject_1.TransactionObject(payer, [
            (0, spl_token_1.createTransferInstruction)(userTokenAddress, this.getEscrow(), params.tokenAuthority?.publicKey ?? payer, this.program.mint.toTokenAmount(params.amount)),
        ], params.tokenAuthority ? [params.tokenAuthority] : []);
        if (params.amount > (userBalance ?? 0)) {
            const [wrapAccount, wrapIxn] = await this.program.mint.getOrCreateWrappedUserInstructions(payer, { amount: params.amount }, params.tokenAuthority);
            if (wrapIxn) {
                if (!wrapAccount.equals(userTokenAddress)) {
                    throw new Error(`Incorrect token account, expected ${userTokenAddress}, received ${wrapAccount}`);
                }
                return wrapIxn.combine(transferTxn);
            }
        }
        return transferTxn;
    }
    async deposit(params) {
        const transaction = await this.depositInstructions(this.program.walletPubkey, params);
        const txnSignature = await this.program.signAndSend(transaction);
        return txnSignature;
    }
    async requestAndAwaitEvent(params, timeout = 30000) {
        let ws = undefined;
        const closeWebsocket = async () => {
            if (ws !== undefined) {
                await this.program.removeEventListener(ws).catch();
                ws = undefined;
            }
        };
        const eventPromise = (0, common_1.promiseWithTimeout)(timeout, new Promise((resolve) => {
            ws = this.program.addEventListener('VrfPoolRequestEvent', (event, slot, signature) => {
                if (event.vrfPoolPubkey.equals(this.publicKey)) {
                    resolve(event);
                }
            });
        })).finally(async () => {
            await closeWebsocket();
        });
        let requestRandomnessSignature = undefined;
        if (params && 'requestFunction' in params) {
            requestRandomnessSignature = await params
                .requestFunction()
                .catch(async (error) => {
                await closeWebsocket();
                throw new Error(`Failed to call requestRandomness, ${error}`);
            });
        }
        else {
            requestRandomnessSignature = await this.request(params).catch(async (error) => {
                await closeWebsocket();
                throw new Error(`Failed to call requestRandomness, ${error}`);
            });
        }
        const event = await eventPromise;
        await closeWebsocket();
        return [event, requestRandomnessSignature];
    }
    getPermissionAccount(queuePubkey, queueAuthority) {
        return permissionAccount_1.PermissionAccount.fromSeed(this.program, queueAuthority, queuePubkey, this.publicKey);
    }
    getEscrow() {
        return this.program.mint.getAssociatedAddress(this.publicKey);
    }
    async fetchBalance(escrow) {
        const escrowPubkey = escrow ?? this.program.mint.getAssociatedAddress(this.publicKey);
        const escrowBalance = await this.program.mint.fetchBalance(escrowPubkey);
        if (escrowBalance === null) {
            throw new errors_1.AccountNotFoundError('VrfPool Escrow', escrowPubkey);
        }
        return escrowBalance;
    }
    async fundUpToInstruction(payer, fundUpTo, disableWrap = false) {
        const escrowPubkey = this.getEscrow();
        const balance = await this.fetchBalance(escrowPubkey);
        if (balance >= fundUpTo) {
            return [undefined, undefined];
        }
        const fundAmount = fundUpTo - balance;
        const depositTxn = await this.depositInstructions(payer, {
            amount: fundAmount,
            disableWrap,
        });
        return [depositTxn, fundAmount];
    }
    async fundUpTo(payer, fundUpTo, disableWrap = false) {
        const [fundUpToTxn, fundAmount] = await this.fundUpToInstruction(payer, fundUpTo, disableWrap);
        if (!fundUpToTxn) {
            return [undefined, undefined];
        }
        const txnSignature = await this.program.signAndSend(fundUpToTxn);
        return [txnSignature, fundAmount];
    }
}
exports.VrfPoolAccount = VrfPoolAccount;
//# sourceMappingURL=vrfPoolAccount.js.map