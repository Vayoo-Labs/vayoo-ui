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
exports.VrfLiteProveAndVerifyParams = void 0;
const common_1 = require("@switchboard-xyz/common"); // eslint-disable-line @typescript-eslint/no-unused-vars
const borsh = __importStar(require("@coral-xyz/borsh"));
class VrfLiteProveAndVerifyParams {
    constructor(fields) {
        this.nonce = fields.nonce;
        this.proof = fields.proof;
        this.proofEncoded = fields.proofEncoded;
        this.counter = fields.counter;
    }
    static layout(property) {
        return borsh.struct([
            borsh.option(borsh.u32(), 'nonce'),
            borsh.vecU8('proof'),
            borsh.str('proofEncoded'),
            borsh.u128('counter'),
        ], property);
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    static fromDecoded(obj) {
        return new VrfLiteProveAndVerifyParams({
            nonce: obj.nonce,
            proof: new Uint8Array(obj.proof.buffer, obj.proof.byteOffset, obj.proof.length),
            proofEncoded: obj.proofEncoded,
            counter: obj.counter,
        });
    }
    static toEncodable(fields) {
        return {
            nonce: fields.nonce,
            proof: Buffer.from(fields.proof.buffer, fields.proof.byteOffset, fields.proof.length),
            proofEncoded: fields.proofEncoded,
            counter: fields.counter,
        };
    }
    toJSON() {
        return {
            nonce: this.nonce,
            proof: Array.from(this.proof.values()),
            proofEncoded: this.proofEncoded,
            counter: this.counter.toString(),
        };
    }
    static fromJSON(obj) {
        return new VrfLiteProveAndVerifyParams({
            nonce: obj.nonce,
            proof: Uint8Array.from(obj.proof),
            proofEncoded: obj.proofEncoded,
            counter: new common_1.BN(obj.counter),
        });
    }
    toEncodable() {
        return VrfLiteProveAndVerifyParams.toEncodable(this);
    }
}
exports.VrfLiteProveAndVerifyParams = VrfLiteProveAndVerifyParams;
//# sourceMappingURL=VrfLiteProveAndVerifyParams.js.map