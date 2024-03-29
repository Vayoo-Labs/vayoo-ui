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
exports.AggregatorHistoryRow = void 0;
const common_1 = require("@switchboard-xyz/common"); // eslint-disable-line @typescript-eslint/no-unused-vars
const types = __importStar(require("../types")); // eslint-disable-line @typescript-eslint/no-unused-vars
const borsh = __importStar(require("@coral-xyz/borsh"));
class AggregatorHistoryRow {
    constructor(fields) {
        this.timestamp = fields.timestamp;
        this.value = new types.SwitchboardDecimal({ ...fields.value });
    }
    static layout(property) {
        return borsh.struct([borsh.i64('timestamp'), types.SwitchboardDecimal.layout('value')], property);
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    static fromDecoded(obj) {
        return new AggregatorHistoryRow({
            timestamp: obj.timestamp,
            value: types.SwitchboardDecimal.fromDecoded(obj.value),
        });
    }
    static toEncodable(fields) {
        return {
            timestamp: fields.timestamp,
            value: types.SwitchboardDecimal.toEncodable(fields.value),
        };
    }
    toJSON() {
        return {
            timestamp: this.timestamp.toString(),
            value: this.value.toJSON(),
        };
    }
    static fromJSON(obj) {
        return new AggregatorHistoryRow({
            timestamp: new common_1.BN(obj.timestamp),
            value: types.SwitchboardDecimal.fromJSON(obj.value),
        });
    }
    toEncodable() {
        return AggregatorHistoryRow.toEncodable(this);
    }
}
exports.AggregatorHistoryRow = AggregatorHistoryRow;
//# sourceMappingURL=AggregatorHistoryRow.js.map