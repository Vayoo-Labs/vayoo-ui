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
exports.VrfRound = void 0;
const common_1 = require("@switchboard-xyz/common"); // eslint-disable-line @typescript-eslint/no-unused-vars
const borsh = __importStar(require("@coral-xyz/borsh"));
class VrfRound {
    constructor(fields) {
        this.alpha = fields.alpha;
        this.alphaLen = fields.alphaLen;
        this.requestSlot = fields.requestSlot;
        this.requestTimestamp = fields.requestTimestamp;
        this.result = fields.result;
        this.numVerified = fields.numVerified;
        this.ebuf = fields.ebuf;
    }
    static layout(property) {
        return borsh.struct([
            borsh.array(borsh.u8(), 256, 'alpha'),
            borsh.u32('alphaLen'),
            borsh.u64('requestSlot'),
            borsh.i64('requestTimestamp'),
            borsh.array(borsh.u8(), 32, 'result'),
            borsh.u32('numVerified'),
            borsh.array(borsh.u8(), 256, 'ebuf'),
        ], property);
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    static fromDecoded(obj) {
        return new VrfRound({
            alpha: obj.alpha,
            alphaLen: obj.alphaLen,
            requestSlot: obj.requestSlot,
            requestTimestamp: obj.requestTimestamp,
            result: obj.result,
            numVerified: obj.numVerified,
            ebuf: obj.ebuf,
        });
    }
    static toEncodable(fields) {
        return {
            alpha: fields.alpha,
            alphaLen: fields.alphaLen,
            requestSlot: fields.requestSlot,
            requestTimestamp: fields.requestTimestamp,
            result: fields.result,
            numVerified: fields.numVerified,
            ebuf: fields.ebuf,
        };
    }
    toJSON() {
        return {
            alpha: this.alpha,
            alphaLen: this.alphaLen,
            requestSlot: this.requestSlot.toString(),
            requestTimestamp: this.requestTimestamp.toString(),
            result: this.result,
            numVerified: this.numVerified,
            ebuf: this.ebuf,
        };
    }
    static fromJSON(obj) {
        return new VrfRound({
            alpha: obj.alpha,
            alphaLen: obj.alphaLen,
            requestSlot: new common_1.BN(obj.requestSlot),
            requestTimestamp: new common_1.BN(obj.requestTimestamp),
            result: obj.result,
            numVerified: obj.numVerified,
            ebuf: obj.ebuf,
        });
    }
    toEncodable() {
        return VrfRound.toEncodable(this);
    }
}
exports.VrfRound = VrfRound;
//# sourceMappingURL=VrfRound.js.map