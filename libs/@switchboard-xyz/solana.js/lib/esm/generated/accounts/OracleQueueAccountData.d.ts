/// <reference types="node" />
import { SwitchboardProgram } from '../../SwitchboardProgram';
import { PublicKey } from '@solana/web3.js';
import { BN } from '@switchboard-xyz/common';
import * as types from '../types';
export interface OracleQueueAccountDataFields {
    /** Name of the queue to store on-chain. */
    name: Array<number>;
    /** Metadata of the queue to store on-chain. */
    metadata: Array<number>;
    /** The account delegated as the authority for making account changes or assigning permissions targeted at the queue. */
    authority: PublicKey;
    /** Interval when stale oracles will be removed if they fail to heartbeat. */
    oracleTimeout: number;
    /** Rewards to provide oracles and round openers on this queue. */
    reward: BN;
    /** The minimum amount of stake oracles must present to remain on the queue. */
    minStake: BN;
    /** Whether slashing is enabled on this queue. */
    slashingEnabled: boolean;
    /**
     * The tolerated variance amount oracle results can have from the accepted round result before being slashed.
     * slashBound = varianceToleranceMultiplier * stdDeviation Default: 2
     */
    varianceToleranceMultiplier: types.SwitchboardDecimalFields;
    /**
     * Number of update rounds new feeds are on probation for.
     * If a feed returns 429s within probation period, auto disable permissions.
     */
    feedProbationPeriod: number;
    /** Current index of the oracle rotation. */
    currIdx: number;
    /** Current number of oracles on a queue. */
    size: number;
    /** Garbage collection index. */
    gcIdx: number;
    /** Consecutive failure limit for a feed before feed permission is revoked. */
    consecutiveFeedFailureLimit: BN;
    /** Consecutive failure limit for an oracle before oracle permission is revoked. */
    consecutiveOracleFailureLimit: BN;
    /** Enabling this setting means data feeds do not need explicit permission to join the queue and request new values from its oracles. */
    unpermissionedFeedsEnabled: boolean;
    /** Enabling this setting means VRF accounts do not need explicit permission to join the queue and request new values from its oracles. */
    unpermissionedVrfEnabled: boolean;
    /** TODO: Revenue percentage rewarded to job curators overall. */
    curatorRewardCut: types.SwitchboardDecimalFields;
    /**
     * Prevent new leases from being funded n this queue.
     * Useful to turn down a queue for migrations, since authority is always immutable.
     */
    lockLeaseFunding: boolean;
    /** Token mint used for the oracle queue rewards and slashing. */
    mint: PublicKey;
    /** Whether oracles are permitted to fulfill buffer relayer update request. */
    enableBufferRelayers: boolean;
    /** Reserved for future info. */
    ebuf: Array<number>;
    /** Maximum number of oracles a queue can support. */
    maxSize: number;
    /** The public key of the OracleQueueBuffer account holding a collection of Oracle pubkeys that haver successfully heartbeated before the queues `oracleTimeout`. */
    dataBuffer: PublicKey;
}
export interface OracleQueueAccountDataJSON {
    /** Name of the queue to store on-chain. */
    name: Array<number>;
    /** Metadata of the queue to store on-chain. */
    metadata: Array<number>;
    /** The account delegated as the authority for making account changes or assigning permissions targeted at the queue. */
    authority: string;
    /** Interval when stale oracles will be removed if they fail to heartbeat. */
    oracleTimeout: number;
    /** Rewards to provide oracles and round openers on this queue. */
    reward: string;
    /** The minimum amount of stake oracles must present to remain on the queue. */
    minStake: string;
    /** Whether slashing is enabled on this queue. */
    slashingEnabled: boolean;
    /**
     * The tolerated variance amount oracle results can have from the accepted round result before being slashed.
     * slashBound = varianceToleranceMultiplier * stdDeviation Default: 2
     */
    varianceToleranceMultiplier: types.SwitchboardDecimalJSON;
    /**
     * Number of update rounds new feeds are on probation for.
     * If a feed returns 429s within probation period, auto disable permissions.
     */
    feedProbationPeriod: number;
    /** Current index of the oracle rotation. */
    currIdx: number;
    /** Current number of oracles on a queue. */
    size: number;
    /** Garbage collection index. */
    gcIdx: number;
    /** Consecutive failure limit for a feed before feed permission is revoked. */
    consecutiveFeedFailureLimit: string;
    /** Consecutive failure limit for an oracle before oracle permission is revoked. */
    consecutiveOracleFailureLimit: string;
    /** Enabling this setting means data feeds do not need explicit permission to join the queue and request new values from its oracles. */
    unpermissionedFeedsEnabled: boolean;
    /** Enabling this setting means VRF accounts do not need explicit permission to join the queue and request new values from its oracles. */
    unpermissionedVrfEnabled: boolean;
    /** TODO: Revenue percentage rewarded to job curators overall. */
    curatorRewardCut: types.SwitchboardDecimalJSON;
    /**
     * Prevent new leases from being funded n this queue.
     * Useful to turn down a queue for migrations, since authority is always immutable.
     */
    lockLeaseFunding: boolean;
    /** Token mint used for the oracle queue rewards and slashing. */
    mint: string;
    /** Whether oracles are permitted to fulfill buffer relayer update request. */
    enableBufferRelayers: boolean;
    /** Reserved for future info. */
    ebuf: Array<number>;
    /** Maximum number of oracles a queue can support. */
    maxSize: number;
    /** The public key of the OracleQueueBuffer account holding a collection of Oracle pubkeys that haver successfully heartbeated before the queues `oracleTimeout`. */
    dataBuffer: string;
}
export declare class OracleQueueAccountData {
    /** Name of the queue to store on-chain. */
    readonly name: Array<number>;
    /** Metadata of the queue to store on-chain. */
    readonly metadata: Array<number>;
    /** The account delegated as the authority for making account changes or assigning permissions targeted at the queue. */
    readonly authority: PublicKey;
    /** Interval when stale oracles will be removed if they fail to heartbeat. */
    readonly oracleTimeout: number;
    /** Rewards to provide oracles and round openers on this queue. */
    readonly reward: BN;
    /** The minimum amount of stake oracles must present to remain on the queue. */
    readonly minStake: BN;
    /** Whether slashing is enabled on this queue. */
    readonly slashingEnabled: boolean;
    /**
     * The tolerated variance amount oracle results can have from the accepted round result before being slashed.
     * slashBound = varianceToleranceMultiplier * stdDeviation Default: 2
     */
    readonly varianceToleranceMultiplier: types.SwitchboardDecimal;
    /**
     * Number of update rounds new feeds are on probation for.
     * If a feed returns 429s within probation period, auto disable permissions.
     */
    readonly feedProbationPeriod: number;
    /** Current index of the oracle rotation. */
    readonly currIdx: number;
    /** Current number of oracles on a queue. */
    readonly size: number;
    /** Garbage collection index. */
    readonly gcIdx: number;
    /** Consecutive failure limit for a feed before feed permission is revoked. */
    readonly consecutiveFeedFailureLimit: BN;
    /** Consecutive failure limit for an oracle before oracle permission is revoked. */
    readonly consecutiveOracleFailureLimit: BN;
    /** Enabling this setting means data feeds do not need explicit permission to join the queue and request new values from its oracles. */
    readonly unpermissionedFeedsEnabled: boolean;
    /** Enabling this setting means VRF accounts do not need explicit permission to join the queue and request new values from its oracles. */
    readonly unpermissionedVrfEnabled: boolean;
    /** TODO: Revenue percentage rewarded to job curators overall. */
    readonly curatorRewardCut: types.SwitchboardDecimal;
    /**
     * Prevent new leases from being funded n this queue.
     * Useful to turn down a queue for migrations, since authority is always immutable.
     */
    readonly lockLeaseFunding: boolean;
    /** Token mint used for the oracle queue rewards and slashing. */
    readonly mint: PublicKey;
    /** Whether oracles are permitted to fulfill buffer relayer update request. */
    readonly enableBufferRelayers: boolean;
    /** Reserved for future info. */
    readonly ebuf: Array<number>;
    /** Maximum number of oracles a queue can support. */
    readonly maxSize: number;
    /** The public key of the OracleQueueBuffer account holding a collection of Oracle pubkeys that haver successfully heartbeated before the queues `oracleTimeout`. */
    readonly dataBuffer: PublicKey;
    static readonly discriminator: Buffer;
    static readonly layout: any;
    constructor(fields: OracleQueueAccountDataFields);
    static fetch(program: SwitchboardProgram, address: PublicKey): Promise<OracleQueueAccountData | null>;
    static fetchMultiple(program: SwitchboardProgram, addresses: PublicKey[]): Promise<Array<OracleQueueAccountData | null>>;
    static decode(data: Buffer): OracleQueueAccountData;
    toJSON(): OracleQueueAccountDataJSON;
    static fromJSON(obj: OracleQueueAccountDataJSON): OracleQueueAccountData;
}
//# sourceMappingURL=OracleQueueAccountData.d.ts.map