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
exports.AggregatorSetBatchSizeParams = void 0;
const borsh = __importStar(require("@coral-xyz/borsh"));
class AggregatorSetBatchSizeParams {
    constructor(fields) {
        this.batchSize = fields.batchSize;
    }
    static layout(property) {
        return borsh.struct([borsh.u32('batchSize')], property);
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    static fromDecoded(obj) {
        return new AggregatorSetBatchSizeParams({
            batchSize: obj.batchSize,
        });
    }
    static toEncodable(fields) {
        return {
            batchSize: fields.batchSize,
        };
    }
    toJSON() {
        return {
            batchSize: this.batchSize,
        };
    }
    static fromJSON(obj) {
        return new AggregatorSetBatchSizeParams({
            batchSize: obj.batchSize,
        });
    }
    toEncodable() {
        return AggregatorSetBatchSizeParams.toEncodable(this);
    }
}
exports.AggregatorSetBatchSizeParams = AggregatorSetBatchSizeParams;
//# sourceMappingURL=AggregatorSetBatchSizeParams.js.map