/// <reference types="node" />
import { SwitchboardProgram } from '../../SwitchboardProgram';
import { PublicKey } from '@solana/web3.js';
import { BN } from '@switchboard-xyz/common';
import * as types from '../types';
export interface AggregatorAccountDataFields {
    /** Name of the aggregator to store on-chain. */
    name: Array<number>;
    /** Metadata of the aggregator to store on-chain. */
    metadata: Array<number>;
    /** Reserved. */
    reserved1: Array<number>;
    /** Pubkey of the queue the aggregator belongs to. */
    queuePubkey: PublicKey;
    /**
     * CONFIGS
     * Number of oracles assigned to an update request.
     */
    oracleRequestBatchSize: number;
    /** Minimum number of oracle responses required before a round is validated. */
    minOracleResults: number;
    /** Minimum number of job results before an oracle accepts a result. */
    minJobResults: number;
    /** Minimum number of seconds required between aggregator rounds. */
    minUpdateDelaySeconds: number;
    /** Unix timestamp for which no feed update will occur before. */
    startAfter: BN;
    /** Change percentage required between a previous round and the current round. If variance percentage is not met, reject new oracle responses. */
    varianceThreshold: types.SwitchboardDecimalFields;
    /** Number of seconds for which, even if the variance threshold is not passed, accept new responses from oracles. */
    forceReportPeriod: BN;
    /** Timestamp when the feed is no longer needed. */
    expiration: BN;
    /** Counter for the number of consecutive failures before a feed is removed from a queue. If set to 0, failed feeds will remain on the queue. */
    consecutiveFailureCount: BN;
    /** Timestamp when the next update request will be available. */
    nextAllowedUpdateTime: BN;
    /** Flag for whether an aggregators configuration is locked for editing. */
    isLocked: boolean;
    /** Optional, public key of the crank the aggregator is currently using. Event based feeds do not need a crank. */
    crankPubkey: PublicKey;
    /** Latest confirmed update request result that has been accepted as valid. */
    latestConfirmedRound: types.AggregatorRoundFields;
    /** Oracle results from the current round of update request that has not been accepted as valid yet. */
    currentRound: types.AggregatorRoundFields;
    /** List of public keys containing the job definitions for how data is sourced off-chain by oracles. */
    jobPubkeysData: Array<PublicKey>;
    /** Used to protect against malicious RPC nodes providing incorrect task definitions to oracles before fulfillment. */
    jobHashes: Array<types.HashFields>;
    /** Number of jobs assigned to an oracle. */
    jobPubkeysSize: number;
    /** Used to protect against malicious RPC nodes providing incorrect task definitions to oracles before fulfillment. */
    jobsChecksum: Array<number>;
    /** The account delegated as the authority for making account changes. */
    authority: PublicKey;
    /** Optional, public key of a history buffer account storing the last N accepted results and their timestamps. */
    historyBuffer: PublicKey;
    /** The previous confirmed round result. */
    previousConfirmedRoundResult: types.SwitchboardDecimalFields;
    /** The slot when the previous confirmed round was opened. */
    previousConfirmedRoundSlot: BN;
    /** Whether an aggregator is permitted to join a crank. */
    disableCrank: boolean;
    /** Job weights used for the weighted median of the aggregator's assigned job accounts. */
    jobWeights: Array<number>;
    /** Unix timestamp when the feed was created. */
    creationTimestamp: BN;
    /**
     * Use sliding window or round based resolution
     * NOTE: This changes result propogation in latest_round_result
     */
    resolutionMode: types.AggregatorResolutionModeKind;
    basePriorityFee: number;
    priorityFeeBump: number;
    priorityFeeBumpPeriod: number;
    maxPriorityFeeMultiplier: number;
    /** Reserved for future info. */
    ebuf: Array<number>;
}
export interface AggregatorAccountDataJSON {
    /** Name of the aggregator to store on-chain. */
    name: Array<number>;
    /** Metadata of the aggregator to store on-chain. */
    metadata: Array<number>;
    /** Reserved. */
    reserved1: Array<number>;
    /** Pubkey of the queue the aggregator belongs to. */
    queuePubkey: string;
    /**
     * CONFIGS
     * Number of oracles assigned to an update request.
     */
    oracleRequestBatchSize: number;
    /** Minimum number of oracle responses required before a round is validated. */
    minOracleResults: number;
    /** Minimum number of job results before an oracle accepts a result. */
    minJobResults: number;
    /** Minimum number of seconds required between aggregator rounds. */
    minUpdateDelaySeconds: number;
    /** Unix timestamp for which no feed update will occur before. */
    startAfter: string;
    /** Change percentage required between a previous round and the current round. If variance percentage is not met, reject new oracle responses. */
    varianceThreshold: types.SwitchboardDecimalJSON;
    /** Number of seconds for which, even if the variance threshold is not passed, accept new responses from oracles. */
    forceReportPeriod: string;
    /** Timestamp when the feed is no longer needed. */
    expiration: string;
    /** Counter for the number of consecutive failures before a feed is removed from a queue. If set to 0, failed feeds will remain on the queue. */
    consecutiveFailureCount: string;
    /** Timestamp when the next update request will be available. */
    nextAllowedUpdateTime: string;
    /** Flag for whether an aggregators configuration is locked for editing. */
    isLocked: boolean;
    /** Optional, public key of the crank the aggregator is currently using. Event based feeds do not need a crank. */
    crankPubkey: string;
    /** Latest confirmed update request result that has been accepted as valid. */
    latestConfirmedRound: types.AggregatorRoundJSON;
    /** Oracle results from the current round of update request that has not been accepted as valid yet. */
    currentRound: types.AggregatorRoundJSON;
    /** List of public keys containing the job definitions for how data is sourced off-chain by oracles. */
    jobPubkeysData: Array<string>;
    /** Used to protect against malicious RPC nodes providing incorrect task definitions to oracles before fulfillment. */
    jobHashes: Array<types.HashJSON>;
    /** Number of jobs assigned to an oracle. */
    jobPubkeysSize: number;
    /** Used to protect against malicious RPC nodes providing incorrect task definitions to oracles before fulfillment. */
    jobsChecksum: Array<number>;
    /** The account delegated as the authority for making account changes. */
    authority: string;
    /** Optional, public key of a history buffer account storing the last N accepted results and their timestamps. */
    historyBuffer: string;
    /** The previous confirmed round result. */
    previousConfirmedRoundResult: types.SwitchboardDecimalJSON;
    /** The slot when the previous confirmed round was opened. */
    previousConfirmedRoundSlot: string;
    /** Whether an aggregator is permitted to join a crank. */
    disableCrank: boolean;
    /** Job weights used for the weighted median of the aggregator's assigned job accounts. */
    jobWeights: Array<number>;
    /** Unix timestamp when the feed was created. */
    creationTimestamp: string;
    /**
     * Use sliding window or round based resolution
     * NOTE: This changes result propogation in latest_round_result
     */
    resolutionMode: types.AggregatorResolutionModeJSON;
    basePriorityFee: number;
    priorityFeeBump: number;
    priorityFeeBumpPeriod: number;
    maxPriorityFeeMultiplier: number;
    /** Reserved for future info. */
    ebuf: Array<number>;
}
export declare class AggregatorAccountData {
    /** Name of the aggregator to store on-chain. */
    readonly name: Array<number>;
    /** Metadata of the aggregator to store on-chain. */
    readonly metadata: Array<number>;
    /** Reserved. */
    readonly reserved1: Array<number>;
    /** Pubkey of the queue the aggregator belongs to. */
    readonly queuePubkey: PublicKey;
    /**
     * CONFIGS
     * Number of oracles assigned to an update request.
     */
    readonly oracleRequestBatchSize: number;
    /** Minimum number of oracle responses required before a round is validated. */
    readonly minOracleResults: number;
    /** Minimum number of job results before an oracle accepts a result. */
    readonly minJobResults: number;
    /** Minimum number of seconds required between aggregator rounds. */
    readonly minUpdateDelaySeconds: number;
    /** Unix timestamp for which no feed update will occur before. */
    readonly startAfter: BN;
    /** Change percentage required between a previous round and the current round. If variance percentage is not met, reject new oracle responses. */
    readonly varianceThreshold: types.SwitchboardDecimal;
    /** Number of seconds for which, even if the variance threshold is not passed, accept new responses from oracles. */
    readonly forceReportPeriod: BN;
    /** Timestamp when the feed is no longer needed. */
    readonly expiration: BN;
    /** Counter for the number of consecutive failures before a feed is removed from a queue. If set to 0, failed feeds will remain on the queue. */
    readonly consecutiveFailureCount: BN;
    /** Timestamp when the next update request will be available. */
    readonly nextAllowedUpdateTime: BN;
    /** Flag for whether an aggregators configuration is locked for editing. */
    readonly isLocked: boolean;
    /** Optional, public key of the crank the aggregator is currently using. Event based feeds do not need a crank. */
    readonly crankPubkey: PublicKey;
    /** Latest confirmed update request result that has been accepted as valid. */
    readonly latestConfirmedRound: types.AggregatorRound;
    /** Oracle results from the current round of update request that has not been accepted as valid yet. */
    readonly currentRound: types.AggregatorRound;
    /** List of public keys containing the job definitions for how data is sourced off-chain by oracles. */
    readonly jobPubkeysData: Array<PublicKey>;
    /** Used to protect against malicious RPC nodes providing incorrect task definitions to oracles before fulfillment. */
    readonly jobHashes: Array<types.Hash>;
    /** Number of jobs assigned to an oracle. */
    readonly jobPubkeysSize: number;
    /** Used to protect against malicious RPC nodes providing incorrect task definitions to oracles before fulfillment. */
    readonly jobsChecksum: Array<number>;
    /** The account delegated as the authority for making account changes. */
    readonly authority: PublicKey;
    /** Optional, public key of a history buffer account storing the last N accepted results and their timestamps. */
    readonly historyBuffer: PublicKey;
    /** The previous confirmed round result. */
    readonly previousConfirmedRoundResult: types.SwitchboardDecimal;
    /** The slot when the previous confirmed round was opened. */
    readonly previousConfirmedRoundSlot: BN;
    /** Whether an aggregator is permitted to join a crank. */
    readonly disableCrank: boolean;
    /** Job weights used for the weighted median of the aggregator's assigned job accounts. */
    readonly jobWeights: Array<number>;
    /** Unix timestamp when the feed was created. */
    readonly creationTimestamp: BN;
    /**
     * Use sliding window or round based resolution
     * NOTE: This changes result propogation in latest_round_result
     */
    readonly resolutionMode: types.AggregatorResolutionModeKind;
    readonly basePriorityFee: number;
    readonly priorityFeeBump: number;
    readonly priorityFeeBumpPeriod: number;
    readonly maxPriorityFeeMultiplier: number;
    /** Reserved for future info. */
    readonly ebuf: Array<number>;
    static readonly discriminator: Buffer;
    static readonly layout: any;
    constructor(fields: AggregatorAccountDataFields);
    static fetch(program: SwitchboardProgram, address: PublicKey): Promise<AggregatorAccountData | null>;
    static fetchMultiple(program: SwitchboardProgram, addresses: PublicKey[]): Promise<Array<AggregatorAccountData | null>>;
    static decode(data: Buffer): AggregatorAccountData;
    toJSON(): AggregatorAccountDataJSON;
    static fromJSON(obj: AggregatorAccountDataJSON): AggregatorAccountData;
}
//# sourceMappingURL=AggregatorAccountData.d.ts.map