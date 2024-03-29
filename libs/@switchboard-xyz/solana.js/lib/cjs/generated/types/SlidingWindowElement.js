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
exports.SlidingWindowElement = void 0;
const web3_js_1 = require("@solana/web3.js"); // eslint-disable-line @typescript-eslint/no-unused-vars
const common_1 = require("@switchboard-xyz/common"); // eslint-disable-line @typescript-eslint/no-unused-vars
const types = __importStar(require("../types")); // eslint-disable-line @typescript-eslint/no-unused-vars
const borsh = __importStar(require("@coral-xyz/borsh"));
class SlidingWindowElement {
    constructor(fields) {
        this.oracleKey = fields.oracleKey;
        this.value = new types.SwitchboardDecimal({ ...fields.value });
        this.slot = fields.slot;
        this.timestamp = fields.timestamp;
    }
    static layout(property) {
        return borsh.struct([
            borsh.publicKey('oracleKey'),
            types.SwitchboardDecimal.layout('value'),
            borsh.u64('slot'),
            borsh.i64('timestamp'),
        ], property);
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    static fromDecoded(obj) {
        return new SlidingWindowElement({
            oracleKey: obj.oracleKey,
            value: types.SwitchboardDecimal.fromDecoded(obj.value),
            slot: obj.slot,
            timestamp: obj.timestamp,
        });
    }
    static toEncodable(fields) {
        return {
            oracleKey: fields.oracleKey,
            value: types.SwitchboardDecimal.toEncodable(fields.value),
            slot: fields.slot,
            timestamp: fields.timestamp,
        };
    }
    toJSON() {
        return {
            oracleKey: this.oracleKey.toString(),
            value: this.value.toJSON(),
            slot: this.slot.toString(),
            timestamp: this.timestamp.toString(),
        };
    }
    static fromJSON(obj) {
        return new SlidingWindowElement({
            oracleKey: new web3_js_1.PublicKey(obj.oracleKey),
            value: types.SwitchboardDecimal.fromJSON(obj.value),
            slot: new common_1.BN(obj.slot),
            timestamp: new common_1.BN(obj.timestamp),
        });
    }
    toEncodable() {
        return SlidingWindowElement.toEncodable(this);
    }
}
exports.SlidingWindowElement = SlidingWindowElement;
//# sourceMappingURL=SlidingWindowElement.js.map