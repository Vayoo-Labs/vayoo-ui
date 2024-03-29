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
exports.BufferRelayerRound = void 0;
const web3_js_1 = require("@solana/web3.js"); // eslint-disable-line @typescript-eslint/no-unused-vars
const common_1 = require("@switchboard-xyz/common"); // eslint-disable-line @typescript-eslint/no-unused-vars
const borsh = __importStar(require("@coral-xyz/borsh"));
class BufferRelayerRound {
    constructor(fields) {
        this.numSuccess = fields.numSuccess;
        this.numError = fields.numError;
        this.roundOpenSlot = fields.roundOpenSlot;
        this.roundOpenTimestamp = fields.roundOpenTimestamp;
        this.oraclePubkey = fields.oraclePubkey;
    }
    static layout(property) {
        return borsh.struct([
            borsh.u32('numSuccess'),
            borsh.u32('numError'),
            borsh.u64('roundOpenSlot'),
            borsh.i64('roundOpenTimestamp'),
            borsh.publicKey('oraclePubkey'),
        ], property);
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    static fromDecoded(obj) {
        return new BufferRelayerRound({
            numSuccess: obj.numSuccess,
            numError: obj.numError,
            roundOpenSlot: obj.roundOpenSlot,
            roundOpenTimestamp: obj.roundOpenTimestamp,
            oraclePubkey: obj.oraclePubkey,
        });
    }
    static toEncodable(fields) {
        return {
            numSuccess: fields.numSuccess,
            numError: fields.numError,
            roundOpenSlot: fields.roundOpenSlot,
            roundOpenTimestamp: fields.roundOpenTimestamp,
            oraclePubkey: fields.oraclePubkey,
        };
    }
    toJSON() {
        return {
            numSuccess: this.numSuccess,
            numError: this.numError,
            roundOpenSlot: this.roundOpenSlot.toString(),
            roundOpenTimestamp: this.roundOpenTimestamp.toString(),
            oraclePubkey: this.oraclePubkey.toString(),
        };
    }
    static fromJSON(obj) {
        return new BufferRelayerRound({
            numSuccess: obj.numSuccess,
            numError: obj.numError,
            roundOpenSlot: new common_1.BN(obj.roundOpenSlot),
            roundOpenTimestamp: new common_1.BN(obj.roundOpenTimestamp),
            oraclePubkey: new web3_js_1.PublicKey(obj.oraclePubkey),
        });
    }
    toEncodable() {
        return BufferRelayerRound.toEncodable(this);
    }
}
exports.BufferRelayerRound = BufferRelayerRound;
//# sourceMappingURL=BufferRelayerRound.js.map