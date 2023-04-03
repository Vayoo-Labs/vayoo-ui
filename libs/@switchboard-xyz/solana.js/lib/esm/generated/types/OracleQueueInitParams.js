import { BN } from '@switchboard-xyz/common'; // eslint-disable-line @typescript-eslint/no-unused-vars
import * as types from '../types'; // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from '@coral-xyz/borsh';
export class OracleQueueInitParams {
    constructor(fields) {
        this.name = fields.name;
        this.metadata = fields.metadata;
        this.reward = fields.reward;
        this.minStake = fields.minStake;
        this.feedProbationPeriod = fields.feedProbationPeriod;
        this.oracleTimeout = fields.oracleTimeout;
        this.slashingEnabled = fields.slashingEnabled;
        this.varianceToleranceMultiplier = new types.BorshDecimal({
            ...fields.varianceToleranceMultiplier,
        });
        this.consecutiveFeedFailureLimit = fields.consecutiveFeedFailureLimit;
        this.consecutiveOracleFailureLimit = fields.consecutiveOracleFailureLimit;
        this.queueSize = fields.queueSize;
        this.unpermissionedFeeds = fields.unpermissionedFeeds;
        this.unpermissionedVrf = fields.unpermissionedVrf;
        this.enableBufferRelayers = fields.enableBufferRelayers;
    }
    static layout(property) {
        return borsh.struct([
            borsh.array(borsh.u8(), 32, 'name'),
            borsh.array(borsh.u8(), 64, 'metadata'),
            borsh.u64('reward'),
            borsh.u64('minStake'),
            borsh.u32('feedProbationPeriod'),
            borsh.u32('oracleTimeout'),
            borsh.bool('slashingEnabled'),
            types.BorshDecimal.layout('varianceToleranceMultiplier'),
            borsh.u64('consecutiveFeedFailureLimit'),
            borsh.u64('consecutiveOracleFailureLimit'),
            borsh.u32('queueSize'),
            borsh.bool('unpermissionedFeeds'),
            borsh.bool('unpermissionedVrf'),
            borsh.bool('enableBufferRelayers'),
        ], property);
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    static fromDecoded(obj) {
        return new OracleQueueInitParams({
            name: obj.name,
            metadata: obj.metadata,
            reward: obj.reward,
            minStake: obj.minStake,
            feedProbationPeriod: obj.feedProbationPeriod,
            oracleTimeout: obj.oracleTimeout,
            slashingEnabled: obj.slashingEnabled,
            varianceToleranceMultiplier: types.BorshDecimal.fromDecoded(obj.varianceToleranceMultiplier),
            consecutiveFeedFailureLimit: obj.consecutiveFeedFailureLimit,
            consecutiveOracleFailureLimit: obj.consecutiveOracleFailureLimit,
            queueSize: obj.queueSize,
            unpermissionedFeeds: obj.unpermissionedFeeds,
            unpermissionedVrf: obj.unpermissionedVrf,
            enableBufferRelayers: obj.enableBufferRelayers,
        });
    }
    static toEncodable(fields) {
        return {
            name: fields.name,
            metadata: fields.metadata,
            reward: fields.reward,
            minStake: fields.minStake,
            feedProbationPeriod: fields.feedProbationPeriod,
            oracleTimeout: fields.oracleTimeout,
            slashingEnabled: fields.slashingEnabled,
            varianceToleranceMultiplier: types.BorshDecimal.toEncodable(fields.varianceToleranceMultiplier),
            consecutiveFeedFailureLimit: fields.consecutiveFeedFailureLimit,
            consecutiveOracleFailureLimit: fields.consecutiveOracleFailureLimit,
            queueSize: fields.queueSize,
            unpermissionedFeeds: fields.unpermissionedFeeds,
            unpermissionedVrf: fields.unpermissionedVrf,
            enableBufferRelayers: fields.enableBufferRelayers,
        };
    }
    toJSON() {
        return {
            name: this.name,
            metadata: this.metadata,
            reward: this.reward.toString(),
            minStake: this.minStake.toString(),
            feedProbationPeriod: this.feedProbationPeriod,
            oracleTimeout: this.oracleTimeout,
            slashingEnabled: this.slashingEnabled,
            varianceToleranceMultiplier: this.varianceToleranceMultiplier.toJSON(),
            consecutiveFeedFailureLimit: this.consecutiveFeedFailureLimit.toString(),
            consecutiveOracleFailureLimit: this.consecutiveOracleFailureLimit.toString(),
            queueSize: this.queueSize,
            unpermissionedFeeds: this.unpermissionedFeeds,
            unpermissionedVrf: this.unpermissionedVrf,
            enableBufferRelayers: this.enableBufferRelayers,
        };
    }
    static fromJSON(obj) {
        return new OracleQueueInitParams({
            name: obj.name,
            metadata: obj.metadata,
            reward: new BN(obj.reward),
            minStake: new BN(obj.minStake),
            feedProbationPeriod: obj.feedProbationPeriod,
            oracleTimeout: obj.oracleTimeout,
            slashingEnabled: obj.slashingEnabled,
            varianceToleranceMultiplier: types.BorshDecimal.fromJSON(obj.varianceToleranceMultiplier),
            consecutiveFeedFailureLimit: new BN(obj.consecutiveFeedFailureLimit),
            consecutiveOracleFailureLimit: new BN(obj.consecutiveOracleFailureLimit),
            queueSize: obj.queueSize,
            unpermissionedFeeds: obj.unpermissionedFeeds,
            unpermissionedVrf: obj.unpermissionedVrf,
            enableBufferRelayers: obj.enableBufferRelayers,
        });
    }
    toEncodable() {
        return OracleQueueInitParams.toEncodable(this);
    }
}
//# sourceMappingURL=OracleQueueInitParams.js.map