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
exports.OracleQueueAccountData = void 0;
const web3_js_1 = require("@solana/web3.js");
const common_1 = require("@switchboard-xyz/common"); // eslint-disable-line @typescript-eslint/no-unused-vars
const borsh = __importStar(require("@coral-xyz/borsh")); // eslint-disable-line @typescript-eslint/no-unused-vars
const types = __importStar(require("../types")); // eslint-disable-line @typescript-eslint/no-unused-vars
class OracleQueueAccountData {
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
            authority: new web3_js_1.PublicKey(obj.authority),
            oracleTimeout: obj.oracleTimeout,
            reward: new common_1.BN(obj.reward),
            minStake: new common_1.BN(obj.minStake),
            slashingEnabled: obj.slashingEnabled,
            varianceToleranceMultiplier: types.SwitchboardDecimal.fromJSON(obj.varianceToleranceMultiplier),
            feedProbationPeriod: obj.feedProbationPeriod,
            currIdx: obj.currIdx,
            size: obj.size,
            gcIdx: obj.gcIdx,
            consecutiveFeedFailureLimit: new common_1.BN(obj.consecutiveFeedFailureLimit),
            consecutiveOracleFailureLimit: new common_1.BN(obj.consecutiveOracleFailureLimit),
            unpermissionedFeedsEnabled: obj.unpermissionedFeedsEnabled,
            unpermissionedVrfEnabled: obj.unpermissionedVrfEnabled,
            curatorRewardCut: types.SwitchboardDecimal.fromJSON(obj.curatorRewardCut),
            lockLeaseFunding: obj.lockLeaseFunding,
            mint: new web3_js_1.PublicKey(obj.mint),
            enableBufferRelayers: obj.enableBufferRelayers,
            ebuf: obj.ebuf,
            maxSize: obj.maxSize,
            dataBuffer: new web3_js_1.PublicKey(obj.dataBuffer),
        });
    }
}
exports.OracleQueueAccountData = OracleQueueAccountData;
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