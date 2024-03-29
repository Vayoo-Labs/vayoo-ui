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
exports.JobSetDataParams = void 0;
const borsh = __importStar(require("@coral-xyz/borsh"));
class JobSetDataParams {
    constructor(fields) {
        this.data = fields.data;
        this.chunkIdx = fields.chunkIdx;
    }
    static layout(property) {
        return borsh.struct([borsh.vecU8('data'), borsh.u8('chunkIdx')], property);
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    static fromDecoded(obj) {
        return new JobSetDataParams({
            data: new Uint8Array(obj.data.buffer, obj.data.byteOffset, obj.data.length),
            chunkIdx: obj.chunkIdx,
        });
    }
    static toEncodable(fields) {
        return {
            data: Buffer.from(fields.data.buffer, fields.data.byteOffset, fields.data.length),
            chunkIdx: fields.chunkIdx,
        };
    }
    toJSON() {
        return {
            data: Array.from(this.data.values()),
            chunkIdx: this.chunkIdx,
        };
    }
    static fromJSON(obj) {
        return new JobSetDataParams({
            data: Uint8Array.from(obj.data),
            chunkIdx: obj.chunkIdx,
        });
    }
    toEncodable() {
        return JobSetDataParams.toEncodable(this);
    }
}
exports.JobSetDataParams = JobSetDataParams;
//# sourceMappingURL=JobSetDataParams.js.map