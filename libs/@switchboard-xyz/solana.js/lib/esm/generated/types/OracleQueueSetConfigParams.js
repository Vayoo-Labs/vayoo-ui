import { BN } from '@switchboard-xyz/common'; // eslint-disable-line @typescript-eslint/no-unused-vars
import * as types from '../types'; // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from '@coral-xyz/borsh';
export class OracleQueueSetConfigParams {
    constructor(fields) {
        this.name = fields.name;
        this.metadata = fields.metadata;
        this.unpermissionedFeedsEnabled = fields.unpermissionedFeedsEnabled;
        this.unpermissionedVrfEnabled = fields.unpermissionedVrfEnabled;
        this.enableBufferRelayers = fields.enableBufferRelayers;
        this.varianceToleranceMultiplier =
            (fields.varianceToleranceMultiplier &&
                new types.BorshDecimal({ ...fields.varianceToleranceMultiplier })) ||
                null;
        this.slashingEnabled = fields.slashingEnabled;
        this.reward = fields.reward;
        this.minStake = fields.minStake;
        this.oracleTimeout = fields.oracleTimeout;
        this.consecutiveFeedFailureLimit = fields.consecutiveFeedFailureLimit;
        this.consecutiveOracleFailureLimit = fields.consecutiveOracleFailureLimit;
    }
    static layout(property) {
        return borsh.struct([
            borsh.option(borsh.array(borsh.u8(), 32), 'name'),
            borsh.option(borsh.array(borsh.u8(), 64), 'metadata'),
            borsh.option(borsh.bool(), 'unpermissionedFeedsEnabled'),
            borsh.option(borsh.bool(), 'unpermissionedVrfEnabled'),
            borsh.option(borsh.bool(), 'enableBufferRelayers'),
            borsh.option(types.BorshDecimal.layout(), 'varianceToleranceMultiplier'),
            borsh.option(borsh.bool(), 'slashingEnabled'),
            borsh.option(borsh.u64(), 'reward'),
            borsh.option(borsh.u64(), 'minStake'),
            borsh.option(borsh.u32(), 'oracleTimeout'),
            borsh.option(borsh.u64(), 'consecutiveFeedFailureLimit'),
            borsh.option(borsh.u64(), 'consecutiveOracleFailureLimit'),
        ], property);
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    static fromDecoded(obj) {
        return new OracleQueueSetConfigParams({
            name: obj.name,
            metadata: obj.metadata,
            unpermissionedFeedsEnabled: obj.unpermissionedFeedsEnabled,
            unpermissionedVrfEnabled: obj.unpermissionedVrfEnabled,
            enableBufferRelayers: obj.enableBufferRelayers,
            varianceToleranceMultiplier: (obj.varianceToleranceMultiplier &&
                types.BorshDecimal.fromDecoded(obj.varianceToleranceMultiplier)) ||
                null,
            slashingEnabled: obj.slashingEnabled,
            reward: obj.reward,
            minStake: obj.minStake,
            oracleTimeout: obj.oracleTimeout,
            consecutiveFeedFailureLimit: obj.consecutiveFeedFailureLimit,
            consecutiveOracleFailureLimit: obj.consecutiveOracleFailureLimit,
        });
    }
    static toEncodable(fields) {
        return {
            name: fields.name,
            metadata: fields.metadata,
            unpermissionedFeedsEnabled: fields.unpermissionedFeedsEnabled,
            unpermissionedVrfEnabled: fields.unpermissionedVrfEnabled,
            enableBufferRelayers: fields.enableBufferRelayers,
            varianceToleranceMultiplier: (fields.varianceToleranceMultiplier &&
                types.BorshDecimal.toEncodable(fields.varianceToleranceMultiplier)) ||
                null,
            slashingEnabled: fields.slashingEnabled,
            reward: fields.reward,
            minStake: fields.minStake,
            oracleTimeout: fields.oracleTimeout,
            consecutiveFeedFailureLimit: fields.consecutiveFeedFailureLimit,
            consecutiveOracleFailureLimit: fields.consecutiveOracleFailureLimit,
        };
    }
    toJSON() {
        return {
            name: this.name,
            metadata: this.metadata,
            unpermissionedFeedsEnabled: this.unpermissionedFeedsEnabled,
            unpermissionedVrfEnabled: this.unpermissionedVrfEnabled,
            enableBufferRelayers: this.enableBufferRelayers,
            varianceToleranceMultiplier: (this.varianceToleranceMultiplier &&
                this.varianceToleranceMultiplier.toJSON()) ||
                null,
            slashingEnabled: this.slashingEnabled,
            reward: (this.reward && this.reward.toString()) || null,
            minStake: (this.minStake && this.minStake.toString()) || null,
            oracleTimeout: this.oracleTimeout,
            consecutiveFeedFailureLimit: (this.consecutiveFeedFailureLimit &&
                this.consecutiveFeedFailureLimit.toString()) ||
                null,
            consecutiveOracleFailureLimit: (this.consecutiveOracleFailureLimit &&
                this.consecutiveOracleFailureLimit.toString()) ||
                null,
        };
    }
    static fromJSON(obj) {
        return new OracleQueueSetConfigParams({
            name: obj.name,
            metadata: obj.metadata,
            unpermissionedFeedsEnabled: obj.unpermissionedFeedsEnabled,
            unpermissionedVrfEnabled: obj.unpermissionedVrfEnabled,
            enableBufferRelayers: obj.enableBufferRelayers,
            varianceToleranceMultiplier: (obj.varianceToleranceMultiplier &&
                types.BorshDecimal.fromJSON(obj.varianceToleranceMultiplier)) ||
                null,
            slashingEnabled: obj.slashingEnabled,
            reward: (obj.reward && new BN(obj.reward)) || null,
            minStake: (obj.minStake && new BN(obj.minStake)) || null,
            oracleTimeout: obj.oracleTimeout,
            consecutiveFeedFailureLimit: (obj.consecutiveFeedFailureLimit &&
                new BN(obj.consecutiveFeedFailureLimit)) ||
                null,
            consecutiveOracleFailureLimit: (obj.consecutiveOracleFailureLimit &&
                new BN(obj.consecutiveOracleFailureLimit)) ||
                null,
        });
    }
    toEncodable() {
        return OracleQueueSetConfigParams.toEncodable(this);
    }
}
//# sourceMappingURL=OracleQueueSetConfigParams.js.map