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
exports.CrankAccount = void 0;
const errors = __importStar(require("../errors"));
const types = __importStar(require("../generated"));
const TransactionObject_1 = require("../TransactionObject");
const account_1 = require("./account");
const aggregatorAccount_1 = require("./aggregatorAccount");
const crankDataBuffer_1 = require("./crankDataBuffer");
const queueAccount_1 = require("./queueAccount");
const anchor = __importStar(require("@coral-xyz/anchor"));
const spl_token_1 = require("@solana/spl-token-v2");
const web3_js_1 = require("@solana/web3.js");
/**
 * Account holding a priority queue of aggregators and their next available update time. This is a scheduling mechanism to ensure {@linkcode AggregatorAccount}'s are updated as close as possible to their specified update interval.
 *
 * Data: {@linkcode types.CrankAccountData}
 *
 * Buffer: {@linkcode CrankDataBuffer}
 */
class CrankAccount extends account_1.Account {
    constructor() {
        super(...arguments);
        /**
         * Get the size of an {@linkcode CrankAccount} on-chain.
         */
        this.size = this.program.account.crankAccountData.size;
    }
    /**
     * Return a crank account initialized to the default values.
     */
    static default() {
        const buffer = Buffer.alloc(432, 0);
        types.CrankAccountData.discriminator.copy(buffer, 0);
        return types.CrankAccountData.decode(buffer);
    }
    /**
     * Invoke a callback each time a CrankAccount's data has changed on-chain.
     * @param callback - the callback invoked when the cranks state changes
     * @param commitment - optional, the desired transaction finality. defaults to 'confirmed'
     * @returns the websocket subscription id
     */
    onChange(callback, commitment = 'confirmed') {
        return this.program.connection.onAccountChange(this.publicKey, accountInfo => callback(types.CrankAccountData.decode(accountInfo.data)), commitment);
    }
    /** Load an existing CrankAccount with its current on-chain state */
    static async load(program, publicKey) {
        const account = new CrankAccount(program, typeof publicKey === 'string' ? new web3_js_1.PublicKey(publicKey) : publicKey);
        const state = await account.loadData();
        return [account, state];
    }
    /**
     * Retrieve and decode the {@linkcode types.CrankAccountData} stored in this account.
     */
    async loadData() {
        const data = await types.CrankAccountData.fetch(this.program, this.publicKey);
        if (data === null)
            throw new errors.AccountNotFoundError('Crank', this.publicKey);
        if (!this.dataBuffer) {
            this.dataBuffer = crankDataBuffer_1.CrankDataBuffer.fromCrank(this.program, data);
        }
        return data;
    }
    static async createInstructions(program, payer, params) {
        const keypair = params.keypair ?? web3_js_1.Keypair.generate();
        program.verifyNewKeypair(keypair);
        const buffer = params.dataBufferKeypair ?? anchor.web3.Keypair.generate();
        program.verifyNewKeypair(buffer);
        const maxRows = params.maxRows ?? 500;
        const crankSize = crankDataBuffer_1.CrankDataBuffer.getAccountSize(maxRows);
        const crankInit = new TransactionObject_1.TransactionObject(payer, [
            web3_js_1.SystemProgram.createAccount({
                fromPubkey: payer,
                newAccountPubkey: buffer.publicKey,
                space: crankSize,
                lamports: await program.connection.getMinimumBalanceForRentExemption(crankSize),
                programId: program.programId,
            }),
            types.crankInit(program, {
                params: {
                    name: Buffer.from(params.name ?? '').slice(0, 32),
                    metadata: Buffer.from(params.metadata ?? '').slice(0, 64),
                    crankSize: maxRows,
                },
            }, {
                crank: keypair.publicKey,
                queue: params.queueAccount.publicKey,
                buffer: buffer.publicKey,
                systemProgram: web3_js_1.SystemProgram.programId,
                payer: payer,
            }),
        ], [keypair, buffer]);
        const crankAccount = new CrankAccount(program, keypair.publicKey);
        crankAccount.dataBuffer = new crankDataBuffer_1.CrankDataBuffer(program, buffer.publicKey);
        return [crankAccount, crankInit];
    }
    static async create(program, params) {
        const [crankAccount, crankInit] = await CrankAccount.createInstructions(program, program.walletPubkey, params);
        const txnSignature = await program.signAndSend(crankInit);
        return [crankAccount, txnSignature];
    }
    /**
     * Pushes a new aggregator onto the crank.
     * @param params The crank push parameters.
     * @return TransactionSignature
     */
    async pushInstruction(payer, params) {
        const crankData = await this.loadData();
        const queueAccount = new queueAccount_1.QueueAccount(this.program, crankData.queuePubkey);
        const queue = await queueAccount.loadData();
        const { permissionAccount, permissionBump, leaseAccount, leaseEscrow } = params.aggregatorAccount.getAccounts(queueAccount, queue.authority);
        return new TransactionObject_1.TransactionObject(payer, [
            types.crankPush(this.program, {
                params: {
                    stateBump: this.program.programState.bump,
                    permissionBump: permissionBump,
                    notifiRef: null,
                },
            }, {
                crank: this.publicKey,
                aggregator: params.aggregatorAccount.publicKey,
                oracleQueue: queueAccount.publicKey,
                queueAuthority: queue.authority,
                permission: permissionAccount.publicKey,
                lease: leaseAccount.publicKey,
                escrow: leaseEscrow,
                programState: this.program.programState.publicKey,
                dataBuffer: this.dataBuffer?.publicKey ?? (await this.loadData()).dataBuffer,
            }),
        ], []);
    }
    pushInstructionSync(payer, params) {
        const queueAccount = new queueAccount_1.QueueAccount(this.program, params.crank.queuePubkey);
        const { permissionAccount, permissionBump, leaseAccount, leaseEscrow } = params.aggregatorAccount.getAccounts(queueAccount, params.queue.authority);
        return new TransactionObject_1.TransactionObject(payer, [
            types.crankPush(this.program, {
                params: {
                    stateBump: this.program.programState.bump,
                    permissionBump: permissionBump,
                    notifiRef: null,
                },
            }, {
                crank: this.publicKey,
                aggregator: params.aggregatorAccount.publicKey,
                oracleQueue: queueAccount.publicKey,
                queueAuthority: params.queue.authority,
                permission: permissionAccount.publicKey,
                lease: leaseAccount.publicKey,
                escrow: leaseEscrow,
                programState: this.program.programState.publicKey,
                dataBuffer: this.dataBuffer?.publicKey ?? params.crank.dataBuffer,
            }),
        ], []);
    }
    /**
     * Pushes a new aggregator onto the crank.
     * @param params The crank push parameters.
     * @return TransactionSignature
     */
    async push(params) {
        const pushTxn = await this.pushInstruction(this.program.walletPubkey, params);
        const txnSignature = await this.program.signAndSend(pushTxn);
        return txnSignature;
    }
    async popInstruction(payer, params) {
        const next = params.readyPubkeys ??
            (await this.peakNextReady(5, params.unixTimestamp));
        if (next.length === 0)
            throw new Error('Crank is not ready to be turned.');
        const remainingAccounts = [];
        const leaseBumpsMap = new Map();
        const permissionBumpsMap = new Map();
        const crankData = await this.loadData();
        const queueAccount = new queueAccount_1.QueueAccount(this.program, crankData.queuePubkey);
        const queueData = await queueAccount.loadData();
        const toBumps = (bumpMap) => new Uint8Array(Array.from(bumpMap.values()));
        for (const row of next) {
            const aggregatorAccount = new aggregatorAccount_1.AggregatorAccount(this.program, row);
            const { leaseAccount, leaseBump, permissionAccount, permissionBump, leaseEscrow, } = aggregatorAccount.getAccounts(queueAccount, queueData.authority);
            remainingAccounts.push(aggregatorAccount.publicKey);
            remainingAccounts.push(leaseAccount.publicKey);
            remainingAccounts.push(leaseEscrow);
            remainingAccounts.push(permissionAccount.publicKey);
            leaseBumpsMap.set(row.toBase58(), leaseBump);
            permissionBumpsMap.set(row.toBase58(), permissionBump);
        }
        remainingAccounts.sort((a, b) => a.toBuffer().compare(b.toBuffer()));
        const payoutWallet = params?.payoutWallet ?? this.program.mint.getAssociatedAddress(payer);
        const crankPopIxn = types.crankPop(this.program, {
            params: {
                stateBump: this.program.programState.bump,
                leaseBumps: toBumps(leaseBumpsMap),
                permissionBumps: toBumps(permissionBumpsMap),
                nonce: params.nonce ?? null,
                failOpenOnAccountMismatch: false,
            },
        }, {
            crank: this.publicKey,
            oracleQueue: queueAccount.publicKey,
            queueAuthority: queueData.authority,
            programState: this.program.programState.publicKey,
            payoutWallet: payoutWallet,
            tokenProgram: spl_token_1.TOKEN_PROGRAM_ID,
            crankDataBuffer: crankData.dataBuffer,
            queueDataBuffer: queueData.dataBuffer,
            mint: this.program.mint.address,
        });
        crankPopIxn.keys.push(...remainingAccounts.map((pubkey) => {
            return { isSigner: false, isWritable: true, pubkey };
        }));
        const txnObject = new TransactionObject_1.TransactionObject(payer, [crankPopIxn], []);
        return txnObject;
    }
    async pop(params) {
        const popTxn = await this.popInstruction(this.program.walletPubkey, params);
        const txnSignature = await this.program.signAndSend(popTxn);
        return txnSignature;
    }
    getPopTxn(payer, params, options) {
        const remainingAccounts = params.remainingAccounts.sort((a, b) => a.toBuffer().compare(b.toBuffer()));
        const leaseBumps = [];
        const permissionBumps = [];
        for (const remainingAccount of remainingAccounts) {
            leaseBumps.push(params.leaseBumps.get(remainingAccount.toBase58()) ?? 0);
            permissionBumps.push(params.permissionBumps.get(remainingAccount.toBase58()) ?? 0);
        }
        const crankPopIxn = types.crankPop(this.program, {
            params: {
                stateBump: this.program.programState.bump,
                leaseBumps: new Uint8Array(leaseBumps),
                permissionBumps: new Uint8Array(permissionBumps),
                nonce: params.nonce ?? null,
                failOpenOnAccountMismatch: params.failOpenOnMismatch ?? false,
            },
        }, {
            crank: this.publicKey,
            oracleQueue: params.queuePubkey,
            queueAuthority: params.queueAuthority,
            programState: this.program.programState.publicKey,
            payoutWallet: params.payoutTokenWallet,
            tokenProgram: spl_token_1.TOKEN_PROGRAM_ID,
            crankDataBuffer: params.crankDataBuffer,
            queueDataBuffer: params.queueDataBuffer,
            mint: this.program.mint.address,
        });
        crankPopIxn.keys.push(...remainingAccounts.map((pubkey) => {
            return { isSigner: false, isWritable: true, pubkey };
        }));
        return new TransactionObject_1.TransactionObject(payer, [crankPopIxn], [], options);
    }
    popSync(payer, params, options) {
        if (params.readyAggregators.length < 1) {
            throw new Error(`No aggregators ready`);
        }
        let remainingAccounts = [];
        let txn = undefined;
        const allLeaseBumps = params.readyAggregators.reduce((map, [aggregatorAccount, pdaAccounts]) => {
            map.set(aggregatorAccount.publicKey.toBase58(), pdaAccounts.leaseBump);
            return map;
        }, new Map());
        const allPermissionBumps = params.readyAggregators.reduce((map, [aggregatorAccount, pdaAccounts]) => {
            map.set(aggregatorAccount.publicKey.toBase58(), pdaAccounts.permissionBump);
            return map;
        }, new Map());
        // add as many readyAggregators until the txn overflows
        for (const [readyAggregator, aggregatorPdaAccounts,] of params.readyAggregators) {
            const { leaseAccount, leaseEscrow, permissionAccount } = aggregatorPdaAccounts;
            const newRemainingAccounts = [
                ...remainingAccounts,
                readyAggregator.publicKey,
                leaseAccount.publicKey,
                leaseEscrow,
                permissionAccount.publicKey,
            ];
            try {
                const newTxn = this.getPopTxn(payer, {
                    ...params,
                    remainingAccounts: newRemainingAccounts,
                    leaseBumps: allLeaseBumps,
                    permissionBumps: allPermissionBumps,
                }, options);
                // succeeded, so set running txn and remaining accounts and try again
                txn = newTxn;
                remainingAccounts = newRemainingAccounts;
            }
            catch (error) {
                if (error instanceof errors.TransactionOverflowError) {
                    if (txn === undefined) {
                        throw new Error(`Failed to create crank pop transaction, ${error}`);
                    }
                    return txn;
                }
                throw error;
            }
        }
        if (txn === undefined) {
            throw new Error(`Failed to create crank pop transaction`);
        }
        return txn;
    }
    packAndPopInstructions(payer, params, options) {
        const numReady = params.readyAggregators.length;
        // stagger priority fees so feeds are procssed in order of staleness
        const getTxnOptions = (index) => {
            return params.priorityFeeMultiplier && params.priorityFeeMultiplier > 0
                ? {
                    ...options,
                    computeUnitPrice: (options?.computeUnitPrice ?? 1) +
                        (numReady - index) * params.priorityFeeMultiplier,
                }
                : options;
        };
        if (numReady < 6) {
            // send as-is
            return Array.from(Array(numReady).keys()).map(n => {
                return this.popSync(payer, {
                    ...params,
                    readyAggregators: params.readyAggregators,
                    nonce: Math.random(),
                }, getTxnOptions(n));
            });
        }
        else {
            // stagger the ready accounts
            return Array.from(Array(numReady).keys()).map(n => {
                return this.popSync(payer, {
                    ...params,
                    readyAggregators: params.readyAggregators.slice(Math.max(0, n - 4)),
                    nonce: Math.random(),
                }, getTxnOptions(n));
            });
        }
    }
    async packAndPop(params, options) {
        const popTxns = this.packAndPopInstructions(this.program.walletPubkey, params, options);
        const txnSignatures = await this.program.signAndSendAll(popTxns, {
            skipPreflight: true,
            skipConfrimation: true,
        }, undefined, 10 // 10ms delay between txns to help ordering
        );
        return txnSignatures;
    }
    getPopTxnV2(payer, params, options) {
        const remainingAccounts = params.remainingAccounts.sort((a, b) => a.toBuffer().compare(b.toBuffer()));
        const leaseBumps = [];
        const permissionBumps = [];
        for (const remainingAccount of remainingAccounts) {
            leaseBumps.push(params.leaseBumps.get(remainingAccount.toBase58()) ?? 0);
            permissionBumps.push(params.permissionBumps.get(remainingAccount.toBase58()) ?? 0);
        }
        const crankPopIxn = types.crankPopV2(this.program, {
            params: {
                stateBump: this.program.programState.bump,
                leaseBumps: new Uint8Array(leaseBumps),
                permissionBumps: new Uint8Array(permissionBumps),
                nonce: params.nonce ?? null,
                failOpenOnAccountMismatch: params.failOpenOnMismatch ?? false,
                popIdx: params.idx,
            },
        }, {
            crank: this.publicKey,
            oracleQueue: params.queuePubkey,
            queueAuthority: params.queueAuthority,
            programState: this.program.programState.publicKey,
            payoutWallet: params.payoutTokenWallet,
            tokenProgram: spl_token_1.TOKEN_PROGRAM_ID,
            crankDataBuffer: params.crankDataBuffer,
            queueDataBuffer: params.queueDataBuffer,
            mint: this.program.mint.address,
        });
        crankPopIxn.keys.push(...remainingAccounts.map((pubkey) => {
            return { isSigner: false, isWritable: true, pubkey };
        }));
        return new TransactionObject_1.TransactionObject(payer, [crankPopIxn], [], options);
    }
    popSyncV2(payer, params, options) {
        if (params.readyAggregators.length < 1) {
            throw new Error(`No aggregators ready`);
        }
        let remainingAccounts = [];
        let txn = undefined;
        const allLeaseBumps = params.readyAggregators.reduce((map, [idx, aggregatorAccount, pdaAccounts]) => {
            map.set(aggregatorAccount.publicKey.toBase58(), pdaAccounts.leaseBump);
            return map;
        }, new Map());
        const allPermissionBumps = params.readyAggregators.reduce((map, [idx, aggregatorAccount, pdaAccounts]) => {
            map.set(aggregatorAccount.publicKey.toBase58(), pdaAccounts.permissionBump);
            return map;
        }, new Map());
        // add as many readyAggregators until the txn overflows
        for (const [idx, readyAggregator, aggregatorPdaAccounts,] of params.readyAggregators) {
            const { leaseAccount, leaseEscrow, permissionAccount } = aggregatorPdaAccounts;
            const newRemainingAccounts = [
                ...remainingAccounts,
                readyAggregator.publicKey,
                leaseAccount.publicKey,
                leaseEscrow,
                permissionAccount.publicKey,
            ];
            try {
                const newTxn = this.getPopTxnV2(payer, {
                    ...params,
                    remainingAccounts: newRemainingAccounts,
                    leaseBumps: allLeaseBumps,
                    permissionBumps: allPermissionBumps,
                    idx,
                }, options);
                // succeeded, so set running txn and remaining accounts and try again
                txn = newTxn;
                remainingAccounts = newRemainingAccounts;
            }
            catch (error) {
                if (error instanceof errors.TransactionOverflowError) {
                    if (txn === undefined) {
                        throw new Error(`Failed to create crank pop transaction, ${error}`);
                    }
                    return txn;
                }
                throw error;
            }
        }
        if (txn === undefined) {
            throw new Error(`Failed to create crank pop transaction`);
        }
        return txn;
    }
    packAndPopInstructionsV2(payer, params, options) {
        if (params.readyAggregators.length < 6) {
            // send as-is
            return Array.from(Array(params.readyAggregators.length).keys()).map(() => {
                return this.popSyncV2(payer, {
                    ...params,
                    readyAggregators: params.readyAggregators,
                    nonce: Math.random(),
                }, options);
            });
        }
        else {
            // stagger the ready accounts
            return Array.from(Array(params.readyAggregators.length).keys()).map(n => {
                return this.popSyncV2(payer, {
                    ...params,
                    readyAggregators: params.readyAggregators.slice(Math.max(0, n - 4)),
                    nonce: Math.random(),
                }, options);
            });
        }
    }
    /**
     * Get an array of the next aggregator pubkeys to be popped from the crank, limited by n
     * @param num The limit of pubkeys to return.
     * @return List of {@linkcode types.CrankRow}, ordered by timestamp.
     */
    async peakNextWithTime(num) {
        const crankRows = await this.loadCrank();
        return crankRows.slice(0, num ?? crankRows.length);
    }
    /**
     * Get an array of the next readily updateable aggregator pubkeys to be popped
     * from the crank, limited by n
     * @param num The limit of pubkeys to return.
     * @return Pubkey list of Aggregator pubkeys.
     */
    async peakNextReady(num, unixTimestamp) {
        const now = unixTimestamp ?? Math.floor(Date.now() / 1000);
        const crankRows = await this.peakNextWithTime(num);
        return crankRows
            .filter(row => now >= row.nextTimestamp.toNumber())
            .map(row => row.pubkey);
    }
    /**
     * Get an array of the next aggregator pubkeys to be popped from the crank, limited by n
     * @param num The limit of pubkeys to return.
     * @return Pubkey list of Aggregators next up to be popped.
     */
    async peakNext(num) {
        const crankRows = await this.peakNextWithTime(num);
        return crankRows.map(row => row.pubkey);
    }
    /**
     * Load a cranks {@linkcode CrankDataBuffer}.
     * @return the list of aggregtors and their next available update time.
     */
    async loadCrank(sorted = true) {
        if (!this.dataBuffer) {
            this.dataBuffer = new crankDataBuffer_1.CrankDataBuffer(this.program, (await this.loadData()).dataBuffer);
        }
        const crankRows = await this.dataBuffer.loadData();
        if (sorted) {
            return crankDataBuffer_1.CrankDataBuffer.sort(crankRows);
        }
        return crankRows;
    }
    getCrankAccounts(crankRows, queueAccount, queueAuthority) {
        const crankAccounts = new Map();
        for (const row of crankRows) {
            const aggregatorAccount = new aggregatorAccount_1.AggregatorAccount(this.program, row.pubkey);
            const accounts = aggregatorAccount.getAccounts(queueAccount, queueAuthority);
            crankAccounts.set(aggregatorAccount.publicKey.toBase58(), accounts);
        }
        return crankAccounts;
    }
    /** Whether an aggregator pubkey is active on a Crank */
    async isOnCrank(pubkey, crankRows) {
        const rows = crankRows ?? (await this.loadCrank());
        const idx = rows.findIndex(r => r.pubkey.equals(pubkey));
        if (idx === -1) {
            return false;
        }
        return true;
    }
    async fetchAccounts(_crank, _queueAccount, _queue) {
        const crank = _crank ?? (await this.loadData());
        const queueAccount = _queueAccount ?? new queueAccount_1.QueueAccount(this.program, crank.queuePubkey);
        const queue = _queue ?? (await queueAccount.loadData());
        const crankRows = await this.loadCrank();
        const aggregatorPubkeys = crankRows.map(r => r.pubkey);
        const aggregators = await aggregatorAccount_1.AggregatorAccount.fetchMultiple(this.program, aggregatorPubkeys);
        return {
            crank: {
                publicKey: this.publicKey,
                data: crank,
            },
            queue: {
                publicKey: queueAccount.publicKey,
                data: queue,
            },
            dataBuffer: {
                publicKey: crank.dataBuffer,
                data: crankRows,
            },
            aggregators: aggregators.map(a => {
                return {
                    publicKey: a.account.publicKey,
                    data: a.data,
                };
            }),
        };
    }
    async toAccountsJSON(_crank, _crankRows) {
        const crank = _crank ?? (await this.loadData());
        const crankRows = _crankRows ?? (await this.loadCrank());
        return {
            publicKey: this.publicKey,
            ...crank.toJSON(),
            dataBuffer: {
                publicKey: crank.dataBuffer,
                data: crankRows,
            },
        };
    }
}
exports.CrankAccount = CrankAccount;
CrankAccount.accountName = 'CrankAccountData';
//# sourceMappingURL=crankAccount.js.map