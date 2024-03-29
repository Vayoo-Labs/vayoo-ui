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
exports.LeaseAccount = void 0;
const errors = __importStar(require("../errors"));
const types = __importStar(require("../generated"));
const TransactionObject_1 = require("../TransactionObject");
const account_1 = require("./account");
const aggregatorAccount_1 = require("./aggregatorAccount");
const queueAccount_1 = require("./queueAccount");
const spl = __importStar(require("@solana/spl-token-v2"));
const web3_js_1 = require("@solana/web3.js");
const common_1 = require("@switchboard-xyz/common");
/**
 * Account type representing an {@linkcode AggregatorAccount}'s pre-funded escrow used to reward {@linkcode OracleAccount}'s for responding to open round requests.
 *
 * Data: {@linkcode types.LeaseAccountData}
 */
class LeaseAccount extends account_1.Account {
    constructor() {
        super(...arguments);
        /**
         * Get the size of an {@linkcode LeaseAccount} on-chain.
         */
        this.size = this.program.account.leaseAccountData.size;
    }
    /**
     * Return a lease account state initialized to the default values.
     */
    static default() {
        const buffer = Buffer.alloc(LeaseAccount.size, 0);
        types.LeaseAccountData.discriminator.copy(buffer, 0);
        return types.LeaseAccountData.decode(buffer);
    }
    /**
     * Create a mock account info for a given lease config. Useful for test integrations.
     */
    static createMock(programId, data, options) {
        const fields = {
            ...LeaseAccount.default(),
            ...data,
            // any cleanup actions here
        };
        const state = new types.LeaseAccountData(fields);
        const buffer = Buffer.alloc(LeaseAccount.size, 0);
        types.LeaseAccountData.discriminator.copy(buffer, 0);
        types.LeaseAccountData.layout.encode(state, buffer, 8);
        return {
            executable: false,
            owner: programId,
            lamports: options?.lamports ?? 1 * web3_js_1.LAMPORTS_PER_SOL,
            data: buffer,
            rentEpoch: options?.rentEpoch ?? 0,
        };
    }
    /** Load an existing LeaseAccount with its current on-chain state */
    static async load(program, queue, aggregator) {
        const [account, bump] = LeaseAccount.fromSeed(program, typeof queue === 'string' ? new web3_js_1.PublicKey(queue) : queue, typeof aggregator === 'string' ? new web3_js_1.PublicKey(aggregator) : aggregator);
        const state = await account.loadData();
        return [account, state, bump];
    }
    /**
     * Loads a LeaseAccount from the expected PDA seed format.
     * @param program The Switchboard program for the current connection.
     * @param queue The queue pubkey to be incorporated into the account seed.
     * @param aggregator The aggregator pubkey to be incorporated into the account seed.
     * @return LeaseAccount and PDA bump.
     */
    static fromSeed(program, queue, aggregator) {
        const [publicKey, bump] = web3_js_1.PublicKey.findProgramAddressSync([Buffer.from('LeaseAccountData'), queue.toBytes(), aggregator.toBytes()], program.programId);
        return [new LeaseAccount(program, publicKey), bump];
    }
    /**
     * Retrieve and decode the {@linkcode types.LeaseAccountData} stored in this account.
     */
    async loadData() {
        const data = await types.LeaseAccountData.fetch(this.program, this.publicKey);
        if (data === null)
            throw new errors.AccountNotFoundError('Lease', this.publicKey);
        return data;
    }
    /**
     * Creates instructions to initialize a LeaseAccount and optionally funds it with wrapped tokens.
     *
     * @param program The SwitchboardProgram instance.
     * @param payer The PublicKey of the account that will pay for the transaction fees.
     * @param params Lease initialization parameters including:
     *   - aggregatorAccount (required): The AggregatorAccount to be used.
     *   - queueAccount (required): The QueueAccount to be used.
     *   - jobAuthorities (optional): Array of PublicKey for job authorities.
     *   - jobPubkeys (optional): Array of PublicKey for job pubkeys.
     *   - withdrawAuthority (optional): The PublicKey for the account that has permission to withdraw funds.
     *
     * @return A Promise that resolves to a tuple containing the LeaseAccount and the corresponding TransactionObject.
     *
     * Basic usage example:
     *
     * ```ts
     * import { LeaseAccount } from '@switchboard-xyz/solana.js';
     * const [leaseAccount, leaseInitTxn] = await LeaseAccount.createInstructions(program, payer, {
     *   queueAccount,
     *   aggregatorAccount,
     *   fundAmount: 1,
     *   funderAuthority: null,
     *   funderTokenWallet: null,
     *   disableWrap: false,
     *   withdrawAuthority: null,
     *   jobPubkeys: null,
     *   jobAuthorities: null,
     * });
     * const leaseInitSignature = await program.signAndSend(leaseInitTxn);
     * const lease = await leaseAccount.loadData();
     * ```
     */
    static async createInstructions(program, payer, params) {
        const txns = [];
        const loadAmount = params.fundAmount ?? 0;
        const loadTokenAmountBN = program.mint.toTokenAmountBN(loadAmount);
        const owner = params.funderAuthority
            ? params.funderAuthority.publicKey
            : payer;
        let funderTokenWallet;
        if (params.disableWrap === true) {
            funderTokenWallet =
                params.funderTokenWallet ?? program.mint.getAssociatedAddress(owner);
        }
        else {
            let tokenTxn;
            // now we need to wrap some funds
            if (params.funderTokenWallet) {
                funderTokenWallet = params.funderTokenWallet;
                tokenTxn = await program.mint.wrapInstructions(payer, {
                    fundUpTo: params.fundAmount ?? 0,
                }, params.funderAuthority);
            }
            else {
                [funderTokenWallet, tokenTxn] =
                    await program.mint.getOrCreateWrappedUserInstructions(payer, { fundUpTo: params.fundAmount ?? 0 }, params.funderAuthority);
            }
            if (tokenTxn) {
                txns.push(tokenTxn);
            }
        }
        const [leaseAccount, leaseBump] = LeaseAccount.fromSeed(program, params.queueAccount.publicKey, params.aggregatorAccount.publicKey);
        const escrow = program.mint.getAssociatedAddress(leaseAccount.publicKey);
        const escrowBalance = await program.mint.getAssociatedBalance(leaseAccount.publicKey);
        // load jobPubkeys and authorities ONLY if undefined
        // we need to allow empty arrays for initial job creation or else loading aggregator will fail
        let jobPubkeys = params.jobPubkeys;
        let jobAuthorities = params.jobAuthorities;
        if (jobPubkeys === undefined || jobAuthorities === undefined) {
            const aggregator = await params.aggregatorAccount.loadData();
            jobPubkeys = aggregator.jobPubkeysData.slice(0, aggregator.jobPubkeysSize);
            const jobs = await params.aggregatorAccount.loadJobs(aggregator);
            jobAuthorities = jobs.map(j => j.state.authority);
        }
        const wallets = LeaseAccount.getWallets(jobAuthorities ?? [], program.mint.address);
        const walletBumps = new Uint8Array(wallets.map(w => w.bump));
        const remainingAccounts = (jobPubkeys ?? [])
            .concat(wallets.map(w => w.publicKey))
            .map(pubkey => {
            return { isSigner: false, isWritable: true, pubkey };
        });
        const createTokenAccountIxn = spl.createAssociatedTokenAccountInstruction(payer, escrow, leaseAccount.publicKey, program.mint.address);
        const leaseInitIxn = types.leaseInit(program, {
            params: {
                loadAmount: loadTokenAmountBN,
                withdrawAuthority: params.withdrawAuthority ?? payer,
                leaseBump: leaseBump,
                stateBump: program.programState.bump,
                walletBumps: walletBumps,
            },
        }, {
            lease: leaseAccount.publicKey,
            queue: params.queueAccount.publicKey,
            aggregator: params.aggregatorAccount.publicKey,
            payer: payer,
            systemProgram: web3_js_1.SystemProgram.programId,
            tokenProgram: spl.TOKEN_PROGRAM_ID,
            funder: funderTokenWallet,
            owner: owner,
            escrow: escrow,
            programState: program.programState.publicKey,
            mint: program.mint.address,
        });
        leaseInitIxn.keys.push(...remainingAccounts);
        txns.push(new TransactionObject_1.TransactionObject(payer, escrowBalance === null // lease might already exist if account was closed and re-opened
            ? [createTokenAccountIxn, leaseInitIxn]
            : [leaseInitIxn], params.funderAuthority ? [params.funderAuthority] : []));
        const packed = TransactionObject_1.TransactionObject.pack(txns);
        if (packed.length > 1) {
            throw new Error(`Failed to pack transactions into a single transactions`);
        }
        return [leaseAccount, packed[0]];
    }
    /**
     * Creates a LeaseAccount and optionally funds it with wrapped tokens.
     *
     * @param program The SwitchboardProgram instance.
     * @param payer The PublicKey of the account that will pay for the transaction fees.
     * @param params Lease initialization parameters including:
     *   - aggregatorAccount (required): The AggregatorAccount to be used.
     *   - queueAccount (required): The QueueAccount to be used.
     *   - jobAuthorities (optional): Array of PublicKey for job authorities.
     *   - jobPubkeys (optional): Array of PublicKey for job pubkeys.
     *   - withdrawAuthority (optional): The PublicKey for the account that has permission to withdraw funds.
     *
     * @return A Promise that resolves to a tuple containing the LeaseAccount and the corresponding TransactionObject.
     *
     * Basic usage example:
     *
     * ```ts
     * import { LeaseAccount } from '@switchboard-xyz/solana.js';
     * const [leaseAccount, leaseInitSignature] = await LeaseAccount.create(program, {
     *   queueAccount,
     *   aggregatorAccount,
     *   fundAmount: 1,
     *   funderAuthority: null,
     *   funderTokenWallet: null,
     *   disableWrap: false,
     *   withdrawAuthority: null,
     *   jobPubkeys: null,
     *   jobAuthorities: null,
     * });
     * const lease = await leaseAccount.loadData();
     * ```
     */
    static async create(program, params) {
        const [leaseAccount, transaction] = await LeaseAccount.createInstructions(program, program.walletPubkey, params);
        const signature = await program.signAndSend(transaction);
        return [leaseAccount, signature];
    }
    /**
     * Fetches the balance of a Lease escrow in decimal format.
     *
     * @param escrow (optional) The PublicKey of the escrow account. If not provided, the associated escrow account for the current LeaseAccount will be used.
     *
     * @return A Promise that resolves to the escrow balance as a number in decimal format.
     *
     * @throws AccountNotFoundError If the Lease escrow account is not found.
     *
     * Basic usage example:
     *
     * ```ts
     * const leaseEscrowBalance = await leaseAccount.fetchBalance();
     * console.log("Lease escrow balance:", leaseEscrowBalance);
     * ```
     */
    async fetchBalance(escrow) {
        const escrowPubkey = escrow ?? this.program.mint.getAssociatedAddress(this.publicKey);
        const escrowBalance = await this.program.mint.fetchBalance(escrowPubkey);
        if (escrowBalance === null) {
            throw new errors.AccountNotFoundError('Lease Escrow', escrowPubkey);
        }
        return escrowBalance;
    }
    /**
     * Fetches the balance of a Lease escrow in the raw token amount using the bn.js format.
     *
     * @param escrow (optional) The PublicKey of the escrow account. If not provided, the associated escrow account for the current LeaseAccount will be used.
     *
     * @return A Promise that resolves to the escrow balance as a BN instance.
     *
     * @throws AccountNotFoundError If the Lease escrow account is not found.
     *
     * Basic usage example:
     *
     * ```ts
     * const leaseEscrowBalanceBN = await leaseAccount.fetchBalanceBN();
     * console.log("Lease escrow balance:", leaseEscrowBalanceBN.toString());
     * ```
     */
    async fetchBalanceBN(escrow) {
        const escrowPubkey = escrow ?? this.program.mint.getAssociatedAddress(this.publicKey);
        const escrowBalance = await this.program.mint.fetchBalanceBN(escrowPubkey);
        if (escrowBalance === null) {
            throw new errors.AccountNotFoundError('Lease Escrow', escrowPubkey);
        }
        return escrowBalance;
    }
    async extendInstruction(payer, params) {
        const owner = params.funderAuthority
            ? params.funderAuthority.publicKey
            : payer;
        const funderTokenWallet = params.funderTokenWallet ?? this.program.mint.getAssociatedAddress(owner);
        const { lease, jobs, wallets } = await this.fetchAllAccounts();
        const leaseBump = LeaseAccount.fromSeed(this.program, lease.queue, lease.aggregator)[1];
        const walletBumps = new Uint8Array(wallets.map(w => w.bump));
        const leaseExtend = types.leaseExtend(this.program, {
            params: {
                loadAmount: this.program.mint.toTokenAmountBN(params.fundAmount),
                stateBump: this.program.programState.bump,
                leaseBump,
                walletBumps: new Uint8Array(walletBumps),
            },
        }, {
            lease: this.publicKey,
            escrow: lease.escrow,
            aggregator: lease.aggregator,
            queue: lease.queue,
            funder: funderTokenWallet,
            owner: owner,
            tokenProgram: spl.TOKEN_PROGRAM_ID,
            programState: this.program.programState.publicKey,
            mint: this.program.mint.address,
        });
        // add job and job authority associated token accounts to remaining accounts for lease payouts
        const jobPubkeys = jobs.map(j => j.account.publicKey);
        const walletPubkeys = wallets.map(w => w.publicKey);
        const remainingAccounts = jobPubkeys
            .concat(walletPubkeys)
            .map((pubkey) => {
            return { isSigner: false, isWritable: true, pubkey };
        });
        leaseExtend.keys.push(...remainingAccounts);
        return new TransactionObject_1.TransactionObject(payer, [leaseExtend], params.funderAuthority ? [params.funderAuthority] : []);
    }
    async extend(params) {
        const leaseExtend = await this.extendInstruction(this.program.walletPubkey, params);
        const txnSignature = await this.program.signAndSend(leaseExtend);
        return txnSignature;
    }
    async withdrawInstruction(payer, params) {
        const { lease, queue, aggregatorAccount, aggregator, balance } = await this.fetchAccounts();
        // calculate expected final balance
        const leaseBalance = this.program.mint.toTokenAmountBN(balance);
        const minRequiredBalance = LeaseAccount.minimumLeaseAmount(aggregator.oracleRequestBatchSize, queue.reward);
        const maxWithdrawAmount = leaseBalance.sub(minRequiredBalance);
        const withdrawAmount = (() => {
            if (params.amount === 'all')
                return maxWithdrawAmount;
            const requestedWithdrawAmount = this.program.mint.toTokenAmountBN(params.amount);
            return requestedWithdrawAmount.lte(maxWithdrawAmount)
                ? requestedWithdrawAmount
                : maxWithdrawAmount;
        })();
        const leaseBump = LeaseAccount.fromSeed(this.program, lease.queue, lease.aggregator)[1];
        if (params.unwrap) {
            const ephemeralWallet = web3_js_1.Keypair.generate();
            const ixns = [
                // initialize space for ephemeral token account
                web3_js_1.SystemProgram.createAccount({
                    fromPubkey: payer,
                    newAccountPubkey: ephemeralWallet.publicKey,
                    lamports: await this.program.connection.getMinimumBalanceForRentExemption(spl.ACCOUNT_SIZE),
                    space: spl.ACCOUNT_SIZE,
                    programId: spl.TOKEN_PROGRAM_ID,
                }),
                // initialize ephemeral token account
                spl.createInitializeAccountInstruction(ephemeralWallet.publicKey, this.program.mint.address, payer, spl.TOKEN_PROGRAM_ID),
                types.leaseWithdraw(this.program, {
                    params: {
                        stateBump: this.program.programState.bump,
                        leaseBump: leaseBump,
                        amount: withdrawAmount,
                    },
                }, {
                    lease: this.publicKey,
                    escrow: lease.escrow,
                    aggregator: aggregatorAccount.publicKey,
                    queue: lease.queue,
                    withdrawAuthority: payer,
                    withdrawAccount: ephemeralWallet.publicKey,
                    tokenProgram: spl.TOKEN_PROGRAM_ID,
                    programState: this.program.programState.publicKey,
                    mint: this.program.mint.address,
                }),
                spl.createCloseAccountInstruction(ephemeralWallet.publicKey, payer, payer),
            ];
            const txn = new TransactionObject_1.TransactionObject(payer, ixns, [ephemeralWallet]);
            return txn;
        }
        const withdrawAuthority = params.withdrawAuthority
            ? params.withdrawAuthority.publicKey
            : payer;
        const withdrawWallet = params.withdrawWallet;
        const txn = new TransactionObject_1.TransactionObject(payer, [
            types.leaseWithdraw(this.program, {
                params: {
                    stateBump: this.program.programState.bump,
                    leaseBump: leaseBump,
                    amount: withdrawAmount,
                },
            }, {
                lease: this.publicKey,
                escrow: lease.escrow,
                aggregator: aggregatorAccount.publicKey,
                queue: lease.queue,
                withdrawAuthority: withdrawAuthority,
                withdrawAccount: withdrawWallet,
                tokenProgram: spl.TOKEN_PROGRAM_ID,
                programState: this.program.programState.publicKey,
                mint: this.program.mint.address,
            }),
        ], params.withdrawAuthority ? [params.withdrawAuthority] : []);
        return txn;
    }
    async withdraw(params) {
        const withdrawTxn = await this.withdrawInstruction(this.program.walletPubkey, params);
        const txnSignature = await this.program.signAndSend(withdrawTxn);
        return txnSignature;
    }
    async setAuthority(params) {
        const setAuthorityTxn = this.setAuthorityInstruction(this.program.walletPubkey, params);
        const txnSignature = await this.program.signAndSend(setAuthorityTxn);
        return txnSignature;
    }
    setAuthorityInstruction(payer, params) {
        return new TransactionObject_1.TransactionObject(payer, [
            types.leaseSetAuthority(this.program, {
                params: {},
            }, {
                lease: this.publicKey,
                withdrawAuthority: params.withdrawAuthority
                    ? params.withdrawAuthority.publicKey
                    : payer,
                newAuthority: params.newAuthority,
            }),
        ], params.withdrawAuthority ? [params.withdrawAuthority] : []);
    }
    static minimumLeaseAmount(oracleRequestBatchSize, queueReward) {
        return queueReward.mul(new common_1.BN(oracleRequestBatchSize + 1)).mul(new common_1.BN(2));
    }
    /**
     * Estimate the time remaining on a given lease
     * @param oracleRequestBatchSize - the number of oracles to request per openRound call, for a given aggregator.
     * @param minUpdateDelaySeconds - the number of seconds between openRound calls, for a given aggregator.
     * @param queueReward - the number of tokens deducted from an aggregator's lease for each successful openRound call. This is dependent on the queue an aggregator belongs to.
     * @param leaseBalance - the current balance in a lease in decimal format.
     * @returns a tuple containing the number of milliseconds left in a lease and the estimated end date
     */
    static estimatedLeaseTimeRemaining(oracleRequestBatchSize, minUpdateDelaySeconds, queueReward, leaseBalance) {
        const now = Date.now();
        const msPerDay = 24 * 60 * 60 * 1000; // ms in a day
        const updatesPerDay = (60 * 60 * 24) / (minUpdateDelaySeconds * 1.5); // account for jitter
        const costPerDay = (oracleRequestBatchSize + 1) * // add 1 to reward crank turner
            queueReward.toNumber() *
            updatesPerDay;
        const endDate = new Date();
        endDate.setTime((now + leaseBalance * msPerDay) / costPerDay);
        return [endDate.getTime() - now, endDate];
    }
    /**
     * Estimate the time remaining on a given lease
     * @returns number milliseconds left in lease (estimate)
     */
    async estimatedLeaseTimeRemaining() {
        const { queue, aggregator, balance } = await this.fetchAccounts();
        const batchSize = aggregator.oracleRequestBatchSize + 1;
        const minUpdateDelaySeconds = aggregator.minUpdateDelaySeconds * 1.5; // account for jitters with * 1.5
        const updatesPerDay = (60 * 60 * 24) / minUpdateDelaySeconds;
        const costPerDay = batchSize * queue.reward.toNumber() * updatesPerDay;
        const msPerDay = 24 * 60 * 60 * 1000;
        const endDate = new Date();
        endDate.setTime(endDate.getTime() + (balance * msPerDay) / costPerDay);
        const timeLeft = endDate.getTime() - Date.now();
        return timeLeft;
    }
    static getWallets(jobAuthorities, mint) {
        const wallets = [];
        for (const jobAuthority of jobAuthorities) {
            if (!jobAuthority || web3_js_1.PublicKey.default.equals(jobAuthority)) {
                continue;
            }
            const [jobWallet, bump] = web3_js_1.PublicKey.findProgramAddressSync([
                jobAuthority.toBuffer(),
                spl.TOKEN_PROGRAM_ID.toBuffer(),
                mint.toBuffer(),
            ], spl.ASSOCIATED_TOKEN_PROGRAM_ID);
            wallets.push({ publicKey: jobWallet, bump });
        }
        return wallets;
    }
    async fetchAccounts(_lease) {
        const lease = _lease ?? (await this.loadData());
        const aggregatorAccount = new aggregatorAccount_1.AggregatorAccount(this.program, lease.aggregator);
        const queueAccount = new queueAccount_1.QueueAccount(this.program, lease.queue);
        const accountInfos = await this.program.connection.getMultipleAccountsInfo([
            lease.aggregator,
            lease.queue,
            lease.escrow,
        ]);
        // decode aggregator
        const aggregatorAccountInfo = accountInfos.shift();
        if (!aggregatorAccountInfo) {
            throw new errors.AccountNotFoundError('Aggregator', lease.aggregator);
        }
        const aggregator = types.AggregatorAccountData.decode(aggregatorAccountInfo.data);
        // decode queue
        const queueAccountInfo = accountInfos.shift();
        if (!queueAccountInfo) {
            throw new errors.AccountNotFoundError('Queue', lease.queue);
        }
        const queue = types.OracleQueueAccountData.decode(queueAccountInfo.data);
        const leaseAccountInfo = accountInfos.shift();
        if (!leaseAccountInfo) {
            throw new errors.AccountNotFoundError('LeaseEscrow', lease.escrow);
        }
        const escrow = spl.unpackAccount(lease.escrow, leaseAccountInfo);
        const balance = this.program.mint.fromTokenAmount(escrow.amount);
        return {
            lease,
            queueAccount,
            queue,
            aggregatorAccount,
            aggregator,
            escrow,
            balance,
        };
    }
    async fetchAllAccounts(_lease) {
        const { lease, queueAccount, queue, aggregatorAccount, aggregator, escrow, balance, } = await this.fetchAccounts(_lease);
        // load aggregator jobs for lease bumps
        const jobs = await aggregatorAccount.loadJobs(aggregator);
        const jobAuthorities = jobs.map(j => j.state.authority);
        const wallets = LeaseAccount.getWallets(jobAuthorities ?? [], this.program.mint.address);
        return {
            lease,
            queueAccount,
            queue,
            aggregatorAccount,
            aggregator,
            escrow,
            balance,
            jobs,
            wallets,
        };
    }
}
exports.LeaseAccount = LeaseAccount;
LeaseAccount.accountName = 'LeaseAccountData';
LeaseAccount.size = 453;
//# sourceMappingURL=leaseAccount.js.map