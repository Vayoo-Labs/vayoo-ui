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
exports.VaultTransferParams = void 0;
const common_1 = require("@switchboard-xyz/common"); // eslint-disable-line @typescript-eslint/no-unused-vars
const borsh = __importStar(require("@coral-xyz/borsh"));
class VaultTransferParams {
    constructor(fields) {
        this.stateBump = fields.stateBump;
        this.amount = fields.amount;
    }
    static layout(property) {
        return borsh.struct([borsh.u8('stateBump'), borsh.u64('amount')], property);
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    static fromDecoded(obj) {
        return new VaultTransferParams({
            stateBump: obj.stateBump,
            amount: obj.amount,
        });
    }
    static toEncodable(fields) {
        return {
            stateBump: fields.stateBump,
            amount: fields.amount,
        };
    }
    toJSON() {
        return {
            stateBump: this.stateBump,
            amount: this.amount.toString(),
        };
    }
    static fromJSON(obj) {
        return new VaultTransferParams({
            stateBump: obj.stateBump,
            amount: new common_1.BN(obj.amount),
        });
    }
    toEncodable() {
        return VaultTransferParams.toEncodable(this);
    }
}
exports.VaultTransferParams = VaultTransferParams;
//# sourceMappingURL=VaultTransferParams.js.map