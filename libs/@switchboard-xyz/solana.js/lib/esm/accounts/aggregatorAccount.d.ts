/// <reference types="node" />
/// <reference types="node" />
import * as types from '../generated';
import { SwitchboardProgram } from '../SwitchboardProgram';
import { TransactionObject, TransactionObjectOptions, TransactionPackOptions } from '../TransactionObject';
import { Account, OnAccountChangeCallback } from './account';
import { AggregatorHistoryBuffer } from './aggregatorHistoryBuffer';
import { CrankAccount } from './crankAccount';
import { JobAccount } from './jobAccount';
import { LeaseAccount, LeaseExtendParams } from './leaseAccount';
import { OracleAccount } from './oracleAccount';
import { PermissionAccount } from './permissionAccount';
import { QueueAccount } from './queueAccount';
import * as anchor from '@coral-xyz/anchor';
import { AccountInfo, Commitment, Keypair, PublicKey, TransactionSignature } from '@solana/web3.js';
import { Big, OracleJob } from '@switchboard-xyz/common';
import crypto from 'crypto';
/**
 * Account type holding a data feed's update configuration, job accounts, and its current result.
 *
 * Data: {@linkcode types.AggregatorAccountData}
 *
 * Result: {@linkcode types.SwitchboardDecimal}
 *
 * HistoryBuffer?: Array<{@linkcode types.AggregatorHistoryRow}>
 *
 * An aggregator account belongs to a single {@linkcode QueueAccount} but can later be transferred by the aggregator's authority. In order for an {@linkcode OracleAccount} to respond to an aggregator's update request, the aggregator must initialize a {@linkcode PermissionAccount} and {@linkcode LeaseAccount}. These will need to be recreated when transferring queues.
 *
 * Optionally, An aggregator can be pushed onto a {@linkcode CrankAccount} in order to be updated
 *
 * Optionally, an aggregator can add a history buffer to store the last N historical samples along with their update timestamp.
 */
export declare class AggregatorAccount extends Account<types.AggregatorAccountData> {
    static accountName: string;
    history?: AggregatorHistoryBuffer;
    /**
     * Returns the aggregator's name buffer in a stringified format.
     */
    static getName: (aggregator: types.AggregatorAccountData) => string;
    /**
     * Returns the aggregator's metadata buffer in a stringified format.
     */
    static getMetadata: (aggregator: types.AggregatorAccountData) => string;
    static size: number;
    /**
     * Get the size of an {@linkcode AggregatorAccount} on-chain.
     */
    size: number;
    decode(data: Buffer): types.AggregatorAccountData;
    /**
     * Return an aggregator account state initialized to the default values.
     */
    static default(): types.AggregatorAccountData;
    /**
     * Create a mock account info for a given aggregator config. Useful for test integrations.
     */
    static createMock(programId: PublicKey, data: Partial<types.AggregatorAccountData>, options?: {
        lamports?: number;
        rentEpoch?: number;
    }): AccountInfo<Buffer>;
    /**
     * Invoke a callback each time an AggregatorAccount's data has changed on-chain.
     * @param callback - the callback invoked when the aggregator state changes
     * @param commitment - optional, the desired transaction finality. defaults to 'confirmed'
     * @returns the websocket subscription id
     */
    onChange(callback: OnAccountChangeCallback<types.AggregatorAccountData>, commitment?: Commitment): number;
    /**
     * Retrieve and decode the {@linkcode types.AggregatorAccountData} stored in this account.
     */
    loadData(): Promise<types.AggregatorAccountData>;
    get slidingWindowKey(): PublicKey;
    /** Load an existing AggregatorAccount with its current on-chain state */
    static load(program: SwitchboardProgram, publicKey: PublicKey | string): Promise<[AggregatorAccount, types.AggregatorAccountData]>;
    /**
     * Creates a transaction object with aggregatorInit instructions.
     * @param program The SwitchboardProgram.
     * @param payer The account that will pay for the new accounts.
     * @param params aggregator configuration parameters.
     * @return {@linkcode TransactionObject} that will create the aggregatorAccount.
     *
     * Basic usage example:
     *
     * ```ts
     * import {AggregatorAccount} from '@switchboard-xyz/solana.js';
     * const [aggregatorAccount, aggregatorInit ] = await AggregatorAccount.createInstruction(program, payer, {
     *    queueAccount,
     *    queueAuthority,
     *    batchSize: 5,
     *    minRequiredOracleResults: 3,
     *    minRequiredJobResults: 1,
     *    minUpdateDelaySeconds: 30,
     * });
     * const txnSignature = await program.signAndSend(aggregatorInit);
     * ```
     */
    static createInstruction(program: SwitchboardProgram, payer: PublicKey, params: AggregatorInitParams): Promise<[AggregatorAccount, TransactionObject]>;
    /**
     * Creates an aggregator on-chain and return the transaction signature and created account resource.
     * @param program The SwitchboardProgram.
     * @param params aggregator configuration parameters.
     * @return Transaction signature and the newly created aggregatorAccount.
     *
     * Basic usage example:
     *
     * ```ts
     * import {AggregatorAccount} from '@switchboard-xyz/solana.js';
     * const [aggregatorAccount, txnSignature] = await AggregatorAccount.create(program, {
     *    queueAccount,
     *    queueAuthority,
     *    batchSize: 5,
     *    minRequiredOracleResults: 3,
     *    minRequiredJobResults: 1,
     *    minUpdateDelaySeconds: 30,
     * });
     * const aggregator = await aggregatorAccount.loadData();
     * ```
     */
    static create(program: SwitchboardProgram, params: AggregatorInitParams): Promise<[AggregatorAccount, TransactionSignature]>;
    /**
     * Create the {@linkcode PermissionAccount} and {@linkcode LeaseAccount} for a new oracle queue without affecting the feed's rhythm. This does not evict a feed from the current queue.
     */
    transferQueuePart1Instructions(payer: PublicKey, params: {
        newQueue: QueueAccount;
    } & LeaseExtendParams): Promise<[TransactionObject, PermissionAccount, LeaseAccount]>;
    /**
     * Create the {@linkcode PermissionAccount} and {@linkcode LeaseAccount} for a new oracle queue without affecting the feed's rhythm. This does not evict a feed from the current queue.
     */
    transferQueuePart1(params: {
        newQueue: QueueAccount;
    } & LeaseExtendParams): Promise<[PermissionAccount, LeaseAccount, TransactionSignature]>;
    /**
     * Approve the feed to use the new queue. Must be signed by the {@linkcode QueueAccount} authority.
     *
     * This does not affect the feed's rhythm nor evict it from the current queue. The Aggregator authority is still required to sign a transaction to move the feed.
     */
    transferQueuePart2Instructions(payer: PublicKey, params: {
        newQueue: QueueAccount;
        enable: boolean;
        queueAuthority?: Keypair;
        force?: boolean;
    }): Promise<[TransactionObject | undefined, PermissionAccount]>;
    /**
     * Approve the feed to use the new queue. Must be signed by the {@linkcode QueueAccount} authority.
     *
     * This does not affect the feed's rhythm nor evict it from the current queue. The Aggregator authority is still required to sign a transaction to move the feed.
     */
    transferQueuePart2(params: {
        newQueue: QueueAccount;
        enable: boolean;
        queueAuthority?: Keypair;
        force?: boolean;
    }): Promise<[PermissionAccount, TransactionSignature | undefined]>;
    /**
     * Transfer the feed to the new {@linkcode QueueAccount} and optionally push it on a crank. Must be signed by the Aggregator authority to approve the transfer.
     *
     * This will evict a feed from the previous queue and crank.
     */
    transferQueuePart3Instructions(payer: PublicKey, params: {
        newQueue: QueueAccount;
        authority?: Keypair;
        newCrank?: CrankAccount;
        force?: boolean;
    }): Promise<Array<TransactionObject>>;
    /**
     * Transfer the feed to the new {@linkcode QueueAccount} and optionally push it on a crank. Must be signed by the Aggregator authority to approve the transfer.
     *
     * This will evict a feed from the previous queue and crank.
     */
    transferQueuePart3(params: {
        newQueue: QueueAccount;
        authority?: Keypair;
        newCrank?: CrankAccount;
        force?: boolean;
    }): Promise<Array<TransactionSignature>>;
    transferQueueInstructions(payer: PublicKey, params: {
        authority?: Keypair;
        newQueue: QueueAccount;
        newCrank?: CrankAccount;
        enable: boolean;
        queueAuthority?: Keypair;
    } & LeaseExtendParams, opts?: TransactionObjectOptions): Promise<[Array<TransactionObject>, PermissionAccount, LeaseAccount]>;
    transferQueue(params: {
        authority?: Keypair;
        newQueue: QueueAccount;
        newCrank?: CrankAccount;
        enable: boolean;
        queueAuthority?: Keypair;
    } & LeaseExtendParams): Promise<[PermissionAccount, LeaseAccount, Array<TransactionSignature>]>;
    getPermissionAccount(queuePubkey: PublicKey, queueAuthority: PublicKey): [PermissionAccount, number];
    getLeaseAccount(queuePubkey: PublicKey): [LeaseAccount, PublicKey, number];
    /**
     * Derives the Program Derived Accounts (PDAs) for the Aggregator, based on its currently assigned oracle queue.
     *
     * @param queueAccount The QueueAccount associated with the Aggregator.
     * @param queueAuthority The PublicKey of the oracle queue authority.
     *
     * @return An object containing the Aggregator PDA accounts, including:
     *   - permissionAccount: The permission account.
     *   - permissionBump: The nonce value used to generate the permission account.
     *   - leaseAccount: The lease account.
     *   - leaseBump: The nonce value used to generate the lease account.
     *   - leaseEscrow: The lease escrow account.
     *
     * Basic usage example:
     *
     * ```ts
     * const aggregatorPdaAccounts = aggregator.getAccounts(queueAccount, queueAuthority);
     * console.log("Aggregator PDA accounts:", aggregatorPdaAccounts);
     * ```
     */
    getAccounts(queueAccount: QueueAccount, queueAuthority: PublicKey): AggregatorPdaAccounts;
    /**
     * Retrieves the latest confirmed value stored in the aggregator account from a pre-fetched account state.
     *
     * @param aggregator The pre-fetched aggregator account data.
     *
     * @return The latest feed value as a Big instance, or null if no successful rounds have been confirmed yet.
     *
     * Basic usage example:
     *
     * ```ts
     * const latestValue = AggregatorAccount.decodeLatestValue(aggregatorAccountData);
     * console.log("Latest confirmed value:", latestValue?.toString() ?? "No successful rounds yet");
     * ```
     */
    static decodeLatestValue(aggregator: types.AggregatorAccountData): Big | null;
    /**
     * Retrieves the latest confirmed value stored in the aggregator account.
     *
     * @return A Promise that resolves to the latest feed value as a Big instance, or null if the value is not populated or no successful rounds have been confirmed yet.
     *
     * Basic usage example:
     *
     * ```ts
     * const latestValue = await aggregatorAccount.fetchLatestValue();
     * console.log("Latest confirmed value:", latestValue?.toString() ?? "No successful rounds yet");
     * ```
     */
    fetchLatestValue(): Promise<Big | null>;
    /**
     * Retrieves the timestamp of the latest confirmed round stored in the aggregator account from a pre-fetched account state.
     *
     * @param aggregator The pre-fetched aggregator account data.
     *
     * @return The latest feed timestamp as an anchor.BN instance.
     *
     * @throws Error if the aggregator currently holds no value or no successful rounds have been confirmed yet.
     *
     * Basic usage example:
     *
     * ```ts
     * const latestTimestamp = AggregatorAccount.decodeLatestTimestamp(aggregatorAccountData);
     * console.log("Latest confirmed round timestamp:", latestTimestamp.toString());
     * ```
     */
    static decodeLatestTimestamp(aggregator: types.AggregatorAccountData): anchor.BN;
    /**
     * Decodes the confirmed round results of the aggregator account from a pre-fetched account state.
     *
     * @param aggregator The pre-fetched aggregator account data.
     *
     * @return An array of objects containing the oracle public keys and their respective reported values as Big instances.
     *
     * @throws Error if the aggregator currently holds no value or no successful rounds have been confirmed yet.
     *
     * Basic usage example:
     *
     * ```ts
     * const confirmedRoundResults = AggregatorAccount.decodeConfirmedRoundResults(aggregatorAccountData);
     * console.log("Confirmed round results:", confirmedRoundResults);
     * ```
     */
    static decodeConfirmedRoundResults(aggregator: types.AggregatorAccountData): Array<{
        oraclePubkeys: PublicKey;
        value: Big;
    }>;
    /**
     * Retrieves the individual oracle results of the latest confirmed round from a pre-fetched account state.
     *
     * @param aggregator The pre-fetched aggregator account data.
     *
     * @return An array of objects containing the oracle account instances and their respective reported values as Big instances.
     *
     * Basic usage example:
     *
     * ```ts
     * const aggregatorAccountData = await aggregatorAccount.loadData();
     * const confirmedRoundResults = aggregatorAccount.getConfirmedRoundResults(aggregatorAccountData);
     * console.log("Confirmed round results by oracle account:", confirmedRoundResults);
     * ```
     */
    getConfirmedRoundResults(aggregator: types.AggregatorAccountData): Array<{
        oracleAccount: OracleAccount;
        value: Big;
    }>;
    /**
     * Generates a SHA-256 hash of all the oracle jobs currently in the aggregator.
     *
     * @param jobs An array of OracleJob instances representing the jobs in the aggregator.
     *
     * @return A crypto.Hash object representing the hash of all the feed jobs.
     *
     * Basic usage example:
     *
     * ```ts
     * const jobs = [job1, job2, job3];
     * const jobsHash = aggregatorAccount.produceJobsHash(jobs);
     * console.log("Hash of all the feed jobs:", jobsHash);
     * ```
     */
    produceJobsHash(jobs: Array<OracleJob>): crypto.Hash;
    static decodeCurrentRoundOracles(aggregator: types.AggregatorAccountData): Array<PublicKey>;
    loadCurrentRoundOracles(aggregator: types.AggregatorAccountData): Promise<Array<{
        account: OracleAccount;
        state: types.OracleAccountData;
    }>>;
    static decodeJobPubkeys(aggregator: types.AggregatorAccountData): Array<PublicKey>;
    loadJobs(aggregator: types.AggregatorAccountData): Promise<Array<{
        account: JobAccount;
        state: types.JobAccountData;
        job: OracleJob;
        weight: number;
    }>>;
    getJobHashes(jobs: Array<{
        account: JobAccount;
        state: types.JobAccountData;
    }>): Array<Buffer>;
    /**
     * Validates an aggregator's configuration.
     *
     * @param aggregator An object containing the aggregator's account data or a partial configuration.
     * @param queue An object containing the OracleQueueAccountData.
     * @param target An object containing the target configuration values to be verified.
     *
     * @throws {AggregatorConfigError} If any of the following conditions are met:
     * - minUpdateDelaySeconds is less than 5 seconds
     * - batchSize is greater than the queue size
     * - minOracleResults is greater than batchSize
     * - minJobResults is greater than the aggregator's jobPubkeysSize
     *
     * Basic usage example:
     *
     * ```ts
     * aggregatorAccount.verifyConfig(
     *   aggregatorData,
     *   queueData,
     *   {
     *     batchSize: 10,
     *     minOracleResults: 5,
     *     minJobResults: 4,
     *     minUpdateDelaySeconds: 10,
     *   }
     * );
     * ```
     */
    verifyConfig(aggregator: types.AggregatorAccountData | {
        oracleRequestBatchSize: number;
        minOracleResults: number;
        minJobResults: number;
        minUpdateDelaySeconds: number;
        jobPubkeysSize: number;
    }, queue: types.OracleQueueAccountData, target: {
        batchSize?: number;
        minOracleResults?: number;
        minJobResults?: number;
        minUpdateDelaySeconds?: number;
    }): void;
    /**
     * Creates a transaction object to set aggregator configuration parameters.
     *
     * @param payer The public key of the payer account.
     * @param params An object containing partial configuration parameters to be set.
     * @param options Optional transaction object options.
     *
     * @return A promise that resolves to a transaction object containing the setConfig instruction.
     *
     * Basic usage example:
     *
     * ```ts
     * const transactionObject = await aggregatorAccount.setConfigInstruction(
     *   payerPublicKey,
     *   {
     *     name: 'New Aggregator Name',
     *     metadata: 'New Aggregator Metadata',
     *     batchSize: 10,
     *     minOracleResults: 5,
     *     minJobResults: 4,
     *     minUpdateDelaySeconds: 10,
     *     forceReportPeriod: 20,
     *     varianceThreshold: 0.01,
     *     basePriorityFee: 1,
     *     priorityFeeBump: 0.1,
     *     priorityFeeBumpPeriod: 60,
     *     maxPriorityFeeMultiplier: 5,
     *     force: false,
     *   }
     * );
     * ```
     */
    setConfigInstruction(payer: PublicKey, params: Partial<{
        name: string;
        metadata: string;
        batchSize: number;
        minOracleResults: number;
        minJobResults: number;
        minUpdateDelaySeconds: number;
        forceReportPeriod: number;
        varianceThreshold: number;
        authority: Keypair;
        basePriorityFee: number;
        priorityFeeBump: number;
        priorityFeeBumpPeriod: number;
        maxPriorityFeeMultiplier: number;
        force: boolean;
    }>, options?: TransactionObjectOptions): Promise<TransactionObject>;
    /**
     * Sets an aggregator configuration parameters.
     *
     * @param params An object containing partial configuration parameters to be set.
     * @param options Optional transaction object options.
     *
     * @return A promise that resolves to a transaction object containing the setConfig instruction.
     *
     * Basic usage example:
     *
     * ```ts
     * const transactionObject = await aggregatorAccount.setConfig(
     *   {
     *     name: 'New Aggregator Name',
     *     metadata: 'New Aggregator Metadata',
     *     batchSize: 10,
     *     minOracleResults: 5,
     *     minJobResults: 4,
     *     minUpdateDelaySeconds: 10,
     *     forceReportPeriod: 20,
     *     varianceThreshold: 0.01,
     *     basePriorityFee: 1,
     *     priorityFeeBump: 0.1,
     *     priorityFeeBumpPeriod: 60,
     *     maxPriorityFeeMultiplier: 5,
     *     force: false,
     *   }
     * );
     * ```
     */
    setConfig(params: Partial<{
        name: string;
        metadata: string;
        batchSize: number;
        minOracleResults: number;
        minJobResults: number;
        minUpdateDelaySeconds: number;
        forceReportPeriod: number;
        varianceThreshold: number;
        authority?: Keypair;
        basePriorityFee?: number;
        priorityFeeBump?: number;
        priorityFeeBumpPeriod?: number;
        maxPriorityFeeMultiplier?: number;
        force: boolean;
    }>, options?: TransactionObjectOptions): Promise<TransactionSignature>;
    setQueueInstruction(payer: PublicKey, params: {
        queueAccount: QueueAccount;
        authority?: Keypair;
    }, options?: TransactionObjectOptions): TransactionObject;
    setQueue(params: {
        queueAccount: QueueAccount;
        authority?: Keypair;
    }, options?: TransactionObjectOptions): Promise<TransactionSignature>;
    addJobInstruction(payer: PublicKey, params: {
        job: JobAccount;
        weight?: number;
        authority?: Keypair;
    }, options?: TransactionObjectOptions): TransactionObject;
    addJob(params: {
        job: JobAccount;
        weight?: number;
        authority?: Keypair;
    }, options?: TransactionObjectOptions): Promise<TransactionSignature>;
    lockInstruction(payer: PublicKey, params: {
        authority?: Keypair;
    }, options?: TransactionObjectOptions): TransactionObject;
    lock(params: {
        authority?: Keypair;
    }, options?: TransactionObjectOptions): Promise<TransactionSignature>;
    setAuthorityInstruction(payer: PublicKey, params: {
        newAuthority: PublicKey;
        authority?: Keypair;
    }, options?: TransactionObjectOptions): TransactionObject;
    setAuthority(params: {
        newAuthority: PublicKey;
        authority?: Keypair;
    }, options?: TransactionObjectOptions): Promise<TransactionSignature>;
    updateJobWeightInstruction(payer: PublicKey, params: {
        job: JobAccount;
        jobIdx: number;
        weight: number;
        authority?: Keypair;
    }, options?: TransactionObjectOptions): TransactionObject;
    updateJobWeight(params: {
        job: JobAccount;
        jobIdx: number;
        weight: number;
        authority?: Keypair;
    }, options?: TransactionObjectOptions): Promise<TransactionSignature>;
    removeJobInstruction(payer: PublicKey, params: {
        job: JobAccount;
        jobIdx: number;
        authority?: Keypair;
    }, options?: TransactionObjectOptions): TransactionObject;
    removeJob(params: {
        job: JobAccount;
        jobIdx: number;
        authority?: Keypair;
    }, options?: TransactionObjectOptions): Promise<TransactionSignature>;
    openRoundInstruction(payer: PublicKey, params?: {
        payoutWallet?: PublicKey;
    }, options?: TransactionObjectOptions): Promise<TransactionObject>;
    openRound(params?: {
        payoutWallet?: PublicKey;
    }, options?: TransactionObjectOptions): Promise<TransactionSignature>;
    saveResultInstructionSync(payer: PublicKey, params: AggregatorSaveResultSyncParams, options?: TransactionObjectOptions): TransactionObject;
    saveResultInstruction(payer: PublicKey, params: AggregatorSaveResultAsyncParams, options?: TransactionObjectOptions): Promise<TransactionObject>;
    saveResult(params: AggregatorSaveResultAsyncParams, options?: TransactionObjectOptions): Promise<TransactionSignature>;
    fetchAccounts(_aggregator?: types.AggregatorAccountData, _queueAccount?: QueueAccount, _queue?: types.OracleQueueAccountData, commitment?: Commitment): Promise<AggregatorAccounts>;
    toAccountsJSON(_aggregator?: types.AggregatorAccountData, _queueAccount?: QueueAccount, _queue?: types.OracleQueueAccountData): Promise<AggregatorAccountsJSON>;
    setSlidingWindowInstruction(payer: PublicKey, params: {
        authority?: Keypair;
        mode: types.AggregatorResolutionModeKind;
    }, options?: TransactionObjectOptions): TransactionObject;
    setSlidingWindow(params: {
        authority?: Keypair;
        mode: types.AggregatorResolutionModeKind;
    }, options?: TransactionObjectOptions): Promise<TransactionSignature>;
    openRoundAndAwaitResult(params?: {
        payoutWallet?: PublicKey;
    } & {
        aggregator?: types.AggregatorAccountData;
    }, timeout?: number, options?: TransactionObjectOptions): Promise<[types.AggregatorAccountData, TransactionSignature | undefined]>;
    /**
     * Await for the next round to close and return the aggregator round result
     *
     * @param roundOpenSlot - optional, the slot when the current round was opened. if not provided then it will be loaded.
     * @param timeout - the number of milliseconds to wait for the round to close
     *
     * @throws {string} when the timeout interval is exceeded or when the latestConfirmedRound.roundOpenSlot exceeds the target roundOpenSlot
     */
    nextRound(roundOpenSlot?: anchor.BN, timeout?: number): Promise<types.AggregatorAccountData>;
    /**
     * Load an aggregators {@linkcode AggregatorHistoryBuffer}.
     * @return the list of historical samples attached to the aggregator.
     */
    loadHistory(startTimestamp?: number, endTimestamp?: number): Promise<Array<types.AggregatorHistoryRow>>;
    static fetchMultiple(program: SwitchboardProgram, publicKeys: Array<PublicKey>, commitment?: Commitment): Promise<Array<{
        account: AggregatorAccount;
        data: types.AggregatorAccountData;
    }>>;
    /**
     * Calculates the required priority fee for a given aggregator
     *
     * Multiplier = the minimum of maxPriorityFeeMultiplier and (timestamp - lastUpdatedTimestamp) / priorityFeeBumpPeriod
     * Fee = baseFee + basePriorityFee + priorityFeeBump * multiplier
     *
     * @param aggregator - the current aggregator state including its last updated timestamp and priority fee config
     * @param timestamp - optional, the current unix timestamp. can provide the SolanaClock timestamp for better accuracy
     * @param baseFee - optional, the Solana compute unit base fee
     *
     * @returns the solana priority fee to include in the save_result action
     */
    static calculatePriorityFee(aggregator: types.AggregatorAccountData, timestamp?: number, baseFee?: number): number;
    /** Fetch the balance of an aggregator's lease */
    fetchBalance(leaseEscrow?: PublicKey, queuePubkey?: PublicKey): Promise<number>;
    /** Create a transaction object that will fund an aggregator's lease up to a given balance */
    fundUpToInstruction(payer: PublicKey, fundUpTo: number, disableWrap?: boolean): Promise<[TransactionObject | undefined, number | undefined]>;
    /** Fund an aggregator's lease up to a given balance */
    fundUpTo(payer: PublicKey, fundUpTo: number, disableWrap?: boolean): Promise<[TransactionSignature | undefined, number | undefined]>;
    /** Create a set of transactions that will fund an aggregator's lease up to a given balance */
    static fundMultipleUpToInstructions(payer: PublicKey, fundUpTo: number, aggregators: Array<AggregatorAccount>, options?: TransactionPackOptions | undefined): Promise<Array<TransactionObject>>;
    /** Fund multiple aggregator account lease's up to a given balance */
    static fundMultipleUpTo(fundUpTo: number, aggregators: Array<AggregatorAccount>, options?: TransactionPackOptions | undefined): Promise<Array<TransactionSignature>>;
    closeInstructions(payer: PublicKey, params?: {
        authority?: Keypair;
        tokenWallet?: PublicKey;
    }, opts?: TransactionObjectOptions): Promise<TransactionObject>;
    close(params?: {
        authority?: Keypair;
        tokenWallet?: PublicKey;
    }, opts?: TransactionObjectOptions): Promise<TransactionSignature>;
}
/**
 * Parameters to initialize an aggregator account.
 */
export interface AggregatorInitParams {
    /**
     *  Name of the aggregator to store on-chain.
     */
    name?: string;
    /**
     *  Metadata of the aggregator to store on-chain.
     */
    metadata?: string;
    /**
     *  Number of oracles to request on aggregator update.
     */
    batchSize: number;
    /**
     *  Minimum number of oracle responses required before a round is validated.
     */
    minRequiredOracleResults: number;
    /**
     *  Minimum number of feed jobs suggested to be successful before an oracle
     *  sends a response.
     */
    minRequiredJobResults: number;
    /**
     *  Minimum number of seconds required between aggregator rounds.
     */
    minUpdateDelaySeconds: number;
    /**
     *  unix_timestamp for which no feed update will occur before.
     */
    startAfter?: number;
    /**
     *  Change percentage required between a previous round and the current round.
     *  If variance percentage is not met, reject new oracle responses.
     */
    varianceThreshold?: number;
    /**
     *  Number of seconds for which, even if the variance threshold is not passed,
     *  accept new responses from oracles.
     */
    forceReportPeriod?: number;
    /**
     *  unix_timestamp after which funds may be withdrawn from the aggregator.
     *  null/undefined/0 means the feed has no expiration.
     */
    expiration?: number;
    /**
     *  If true, this aggregator is disallowed from being updated by a crank on the queue.
     */
    disableCrank?: boolean;
    /**
     *  Optional pre-existing keypair to use for aggregator initialization.
     */
    keypair?: Keypair;
    /**
     *  If included, this keypair will be the aggregator authority rather than
     *  the aggregator keypair.
     */
    authority?: PublicKey;
    /**
     *  The queue to which this aggregator will be linked
     */
    queueAccount: QueueAccount;
    /**
     * The authority of the queue.
     */
    queueAuthority: PublicKey;
}
export interface AggregatorSetQueueParams {
    queueAccount: QueueAccount;
    authority?: Keypair;
}
/**
 * Parameters required to open an aggregator round
 */
export interface AggregatorOpenRoundParams {
    /**
     *  The oracle queue from which oracles are assigned this update.
     */
    oracleQueueAccount: QueueAccount;
    /**
     *  The token wallet which will receive rewards for calling update on this feed.
     */
    payoutWallet: PublicKey;
}
/**
 * Parameters for creating and setting a history buffer for an aggregator
 */
export interface AggregatorSetHistoryBufferParams {
    /**
     * Authority keypair for the aggregator.
     */
    authority?: Keypair;
    /**
     * Number of elements for the history buffer to fit.
     */
    size: number;
}
/**
 * Parameters for which oracles must submit for responding to update requests.
 */
export interface AggregatorSaveResultParams {
    /**
     *  Index in the list of oracles in the aggregator assigned to this round update.
     */
    oracleIdx: number;
    /**
     *  Reports that an error occured and the oracle could not send a value.
     */
    error: boolean;
    /**
     *  Value the oracle is responding with for this update.
     */
    value: Big;
    /**
     *  The minimum value this oracle has seen this round for the jobs listed in the
     *  aggregator.
     */
    minResponse: Big;
    /**
     *  The maximum value this oracle has seen this round for the jobs listed in the
     *  aggregator.
     */
    maxResponse: Big;
    /**
     *  List of OracleJobs that were performed to produce this result.
     */
    jobs: Array<OracleJob>;
    /**
     *  Authority of the queue the aggregator is attached to.
     */
    queueAuthority: PublicKey;
    /**
     *  Program token mint.
     */
    tokenMint: PublicKey;
    /**
     *  List of parsed oracles.
     */
    oracles: Array<types.OracleAccountData>;
}
export type AggregatorAccountsJSON = types.AggregatorAccountDataJSON & {
    publicKey: PublicKey;
    queue: types.OracleQueueAccountDataJSON & {
        publicKey: PublicKey;
    };
    permission: types.PermissionAccountDataJSON & {
        bump: number;
        publicKey: PublicKey;
    };
    lease: types.LeaseAccountDataJSON & {
        bump: number;
        publicKey: PublicKey;
    } & {
        balance: number;
    };
    jobs: Array<types.JobAccountDataJSON & {
        publicKey: PublicKey;
        tasks: Array<OracleJob.ITask>;
    }>;
};
export type AggregatorAccounts = {
    aggregator: {
        publicKey: PublicKey;
        data: types.AggregatorAccountData;
    };
    queue: {
        publicKey: PublicKey;
        data: types.OracleQueueAccountData;
    };
    permission: {
        publicKey: PublicKey;
        bump: number;
        data: types.PermissionAccountData;
    };
    lease: {
        publicKey: PublicKey;
        bump: number;
        balance: number;
        data: types.LeaseAccountData;
    };
    jobs: Array<{
        publicKey: PublicKey;
        data: types.JobAccountData;
        tasks: Array<OracleJob.ITask>;
    }>;
};
export type AggregatorPdaAccounts = {
    permissionAccount: PermissionAccount;
    permissionBump: number;
    leaseAccount: LeaseAccount;
    leaseBump: number;
    leaseEscrow: PublicKey;
};
export type SaveResultResponse = {
    jobs: Array<OracleJob>;
    value: Big;
    minResponse: Big;
    maxResponse: Big;
    error?: boolean;
};
export type SaveResultAccounts = AggregatorPdaAccounts & {
    aggregator: types.AggregatorAccountData;
    queueAccount: QueueAccount;
    queueAuthority: PublicKey;
    oraclePermission: [PermissionAccount, number];
    oracles: Array<{
        account: OracleAccount;
        state: types.OracleAccountData;
    }>;
    oracleIdx: number;
    historyBuffer?: PublicKey;
};
export type AggregatorSaveResultSyncParams = SaveResultResponse & SaveResultAccounts;
export type AggregatorSaveResultAsyncParams = SaveResultResponse & (Partial<SaveResultAccounts> & {
    oracleAccount: OracleAccount;
});
//# sourceMappingURL=aggregatorAccount.d.ts.map