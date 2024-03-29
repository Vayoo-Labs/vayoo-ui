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
exports.LeaseWithdrawParams = void 0;
const common_1 = require("@switchboard-xyz/common"); // eslint-disable-line @typescript-eslint/no-unused-vars
const borsh = __importStar(require("@coral-xyz/borsh"));
class LeaseWithdrawParams {
    constructor(fields) {
        this.stateBump = fields.stateBump;
        this.leaseBump = fields.leaseBump;
        this.amount = fields.amount;
    }
    static layout(property) {
        return borsh.struct([borsh.u8('stateBump'), borsh.u8('leaseBump'), borsh.u64('amount')], property);
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    static fromDecoded(obj) {
        return new LeaseWithdrawParams({
            stateBump: obj.stateBump,
            leaseBump: obj.leaseBump,
            amount: obj.amount,
        });
    }
    static toEncodable(fields) {
        return {
            stateBump: fields.stateBump,
            leaseBump: fields.leaseBump,
            amount: fields.amount,
        };
    }
    toJSON() {
        return {
            stateBump: this.stateBump,
            leaseBump: this.leaseBump,
            amount: this.amount.toString(),
        };
    }
    static fromJSON(obj) {
        return new LeaseWithdrawParams({
            stateBump: obj.stateBump,
            leaseBump: obj.leaseBump,
            amount: new common_1.BN(obj.amount),
        });
    }
    toEncodable() {
        return LeaseWithdrawParams.toEncodable(this);
    }
}
exports.LeaseWithdrawParams = LeaseWithdrawParams;
//# sourceMappingURL=LeaseWithdrawParams.js.map