import { PublicKey } from '@solana/web3.js';
import { BN } from '@switchboard-xyz/common'; // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from '@coral-xyz/borsh'; // eslint-disable-line @typescript-eslint/no-unused-vars
import * as types from '../types'; // eslint-disable-line @typescript-eslint/no-unused-vars
export class OracleQueueAccountData {
    constructor(fields) {
        this.name = fields.name;
        this.metadata = fields.metadata;
        this.authority = fields.authority;
        this.oracleTimeout = fields.oracleTimeout;
        this.reward = fields.reward;
        this.minStake = fields.minStake;
        this.slashingEnabled = fields.slashingEnabled;
        this.varianceToleranceMultiplier = new types.SwitchboardDecimal({
            ...fields.varianceToleranceMultiplier,
        });
        this.feedProbationPeriod = fields.feedProbationPeriod;
        this.currIdx = fields.currIdx;
        this.size = fields.size;
        this.gcIdx = fields.gcIdx;
        this.consecutiveFeedFailureLimit = fields.consecutiveFeedFailureLimit;
        this.consecutiveOracleFailureLimit = fields.consecutiveOracleFailureLimit;
        this.unpermissionedFeedsEnabled = fields.unpermissionedFeedsEnabled;
        this.unpermissionedVrfEnabled = fields.unpermissionedVrfEnabled;
        this.curatorRewardCut = new types.SwitchboardDecimal({
            ...fields.curatorRewardCut,
        });
        this.lockLeaseFunding = fields.lockLeaseFunding;
        this.mint = fields.mint;
        this.enableBufferRelayers = fields.enableBufferRelayers;
        this.ebuf = fields.ebuf;
        this.maxSize = fields.maxSize;
        this.dataBuffer = fields.dataBuffer;
    }
    static async fetch(program, address) {
        const info = await program.connection.getAccountInfo(address);
        if (info === null) {
            return null;
        }
        if (!info.owner.equals(program.programId)) {
            throw new Error("account doesn't belong to this program");
        }
        return this.decode(info.data);
    }
    static async fetchMultiple(program, addresses) {
        const infos = await program.connection.getMultipleAccountsInfo(addresses);
        return infos.map(info => {
            if (info === null) {
                return null;
            }
            if (!info.owner.equals(program.programId)) {
                throw new Error("account doesn't belong to this program");
            }
            return this.decode(info.data);
        });
    }
    static decode(data) {
        if (!data.slice(0, 8).equals(OracleQueueAccountData.discriminator)) {
            throw new Error('invalid account discriminator');
        }
        const dec = OracleQueueAccountData.layout.decode(data.slice(8));
        return new OracleQueueAccountData({
            name: dec.name,
            metadata: dec.metadata,
            authority: dec.authority,
            oracleTimeout: dec.oracleTimeout,
            reward: dec.reward,
            minStake: dec.minStake,
            slashingEnabled: dec.slashingEnabled,
            varianceToleranceMultiplier: types.SwitchboardDecimal.fromDecoded(dec.varianceToleranceMultiplier),
            feedProbationPeriod: dec.feedProbationPeriod,
            currIdx: dec.currIdx,
            size: dec.size,
            gcIdx: dec.gcIdx,
            consecutiveFeedFailureLimit: dec.consecutiveFeedFailureLimit,
            consecutiveOracleFailureLimit: dec.consecutiveOracleFailureLimit,
            unpermissionedFeedsEnabled: dec.unpermissionedFeedsEnabled,
            unpermissionedVrfEnabled: dec.unpermissionedVrfEnabled,
            curatorRewardCut: types.SwitchboardDecimal.fromDecoded(dec.curatorRewardCut),
            lockLeaseFunding: dec.lockLeaseFunding,
            mint: dec.mint,
            enableBufferRelayers: dec.enableBufferRelayers,
            ebuf: dec.ebuf,
            maxSize: dec.maxSize,
            dataBuffer: dec.dataBuffer,
        });
    }
    toJSON() {
        return {
            name: this.name,
            metadata: this.metadata,
            authority: this.authority.toString(),
            oracleTimeout: this.oracleTimeout,
            reward: this.reward.toString(),
            minStake: this.minStake.toString(),
            slashingEnabled: this.slashingEnabled,
            varianceToleranceMultiplier: this.varianceToleranceMultiplier.toJSON(),
            feedProbationPeriod: this.feedProbationPeriod,
            currIdx: this.currIdx,
            size: this.size,
            gcIdx: this.gcIdx,
            consecutiveFeedFailureLimit: this.consecutiveFeedFailureLimit.toString(),
            consecutiveOracleFailureLimit: this.consecutiveOracleFailureLimit.toString(),
            unpermissionedFeedsEnabled: this.unpermissionedFeedsEnabled,
            unpermissionedVrfEnabled: this.unpermissionedVrfEnabled,
            curatorRewardCut: this.curatorRewardCut.toJSON(),
            lockLeaseFunding: this.lockLeaseFunding,
            mint: this.mint.toString(),
            enableBufferRelayers: this.enableBufferRelayers,
            ebuf: this.ebuf,
            maxSize: this.maxSize,
            dataBuffer: this.dataBuffer.toString(),
        };
    }
    static fromJSON(obj) {
        return new OracleQueueAccountData({
            name: obj.name,
            metadata: obj.metadata,
            authority: new PublicKey(obj.authority),
            oracleTimeout: obj.oracleTimeout,
            reward: new BN(obj.reward),
            minStake: new BN(obj.minStake),
            slashingEnabled: obj.slashingEnabled,
            varianceToleranceMultiplier: types.SwitchboardDecimal.fromJSON(obj.varianceToleranceMultiplier),
            feedProbationPeriod: obj.feedProbationPeriod,
            currIdx: obj.currIdx,
            size: obj.size,
            gcIdx: obj.gcIdx,
            consecutiveFeedFailureLimit: new BN(obj.consecutiveFeedFailureLimit),
            consecutiveOracleFailureLimit: new BN(obj.consecutiveOracleFailureLimit),
            unpermissionedFeedsEnabled: obj.unpermissionedFeedsEnabled,
            unpermissionedVrfEnabled: obj.unpermissionedVrfEnabled,
            curatorRewardCut: types.SwitchboardDecimal.fromJSON(obj.curatorRewardCut),
            lockLeaseFunding: obj.lockLeaseFunding,
            mint: new PublicKey(obj.mint),
            enableBufferRelayers: obj.enableBufferRelayers,
            ebuf: obj.ebuf,
            maxSize: obj.maxSize,
            dataBuffer: new PublicKey(obj.dataBuffer),
        });
    }
}
OracleQueueAccountData.discriminator = Buffer.from([
    164, 207, 200, 51, 199, 113, 35, 109,
]);
OracleQueueAccountData.layout = borsh.struct([
    borsh.array(borsh.u8(), 32, 'name'),
    borsh.array(borsh.u8(), 64, 'metadata'),
    borsh.publicKey('authority'),
    borsh.u32('oracleTimeout'),
    borsh.u64('reward'),
    borsh.u64('minStake'),
    borsh.bool('slashingEnabled'),
    types.SwitchboardDecimal.layout('varianceToleranceMultiplier'),
    borsh.u32('feedProbationPeriod'),
    borsh.u32('currIdx'),
    borsh.u32('size'),
    borsh.u32('gcIdx'),
    borsh.u64('consecutiveFeedFailureLimit'),
    borsh.u64('consecutiveOracleFailureLimit'),
    borsh.bool('unpermissionedFeedsEnabled'),
    borsh.bool('unpermissionedVrfEnabled'),
    types.SwitchboardDecimal.layout('curatorRewardCut'),
    borsh.bool('lockLeaseFunding'),
    borsh.publicKey('mint'),
    borsh.bool('enableBufferRelayers'),
    borsh.array(borsh.u8(), 968, 'ebuf'),
    borsh.u32('maxSize'),
    borsh.publicKey('dataBuffer'),
]);
//# sourceMappingURL=OracleQueueAccountData.js.map