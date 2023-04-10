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
exports.OracleMetrics = void 0;
const common_1 = require("@switchboard-xyz/common"); // eslint-disable-line @typescript-eslint/no-unused-vars
const borsh = __importStar(require("@coral-xyz/borsh"));
class OracleMetrics {
    constructor(fields) {
        this.consecutiveSuccess = fields.consecutiveSuccess;
        this.consecutiveError = fields.consecutiveError;
        this.consecutiveDisagreement = fields.consecutiveDisagreement;
        this.consecutiveLateResponse = fields.consecutiveLateResponse;
        this.consecutiveFailure = fields.consecutiveFailure;
        this.totalSuccess = fields.totalSuccess;
        this.totalError = fields.totalError;
        this.totalDisagreement = fields.totalDisagreement;
        this.totalLateResponse = fields.totalLateResponse;
    }
    static layout(property) {
        return borsh.struct([
            borsh.u64('consecutiveSuccess'),
            borsh.u64('consecutiveError'),
            borsh.u64('consecutiveDisagreement'),
            borsh.u64('consecutiveLateResponse'),
            borsh.u64('consecutiveFailure'),
            borsh.u128('totalSuccess'),
            borsh.u128('totalError'),
            borsh.u128('totalDisagreement'),
            borsh.u128('totalLateResponse'),
        ], property);
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    static fromDecoded(obj) {
        return new OracleMetrics({
            consecutiveSuccess: obj.consecutiveSuccess,
            consecutiveError: obj.consecutiveError,
            consecutiveDisagreement: obj.consecutiveDisagreement,
            consecutiveLateResponse: obj.consecutiveLateResponse,
            consecutiveFailure: obj.consecutiveFailure,
            totalSuccess: obj.totalSuccess,
            totalError: obj.totalError,
            totalDisagreement: obj.totalDisagreement,
            totalLateResponse: obj.totalLateResponse,
        });
    }
    static toEncodable(fields) {
        return {
            consecutiveSuccess: fields.consecutiveSuccess,
            consecutiveError: fields.consecutiveError,
            consecutiveDisagreement: fields.consecutiveDisagreement,
            consecutiveLateResponse: fields.consecutiveLateResponse,
            consecutiveFailure: fields.consecutiveFailure,
            totalSuccess: fields.totalSuccess,
            totalError: fields.totalError,
            totalDisagreement: fields.totalDisagreement,
            totalLateResponse: fields.totalLateResponse,
        };
    }
    toJSON() {
        return {
            consecutiveSuccess: this.consecutiveSuccess.toString(),
            consecutiveError: this.consecutiveError.toString(),
            consecutiveDisagreement: this.consecutiveDisagreement.toString(),
            consecutiveLateResponse: this.consecutiveLateResponse.toString(),
            consecutiveFailure: this.consecutiveFailure.toString(),
            totalSuccess: this.totalSuccess.toString(),
            totalError: this.totalError.toString(),
            totalDisagreement: this.totalDisagreement.toString(),
            totalLateResponse: this.totalLateResponse.toString(),
        };
    }
    static fromJSON(obj) {
        return new OracleMetrics({
            consecutiveSuccess: new common_1.BN(obj.consecutiveSuccess),
            consecutiveError: new common_1.BN(obj.consecutiveError),
            consecutiveDisagreement: new common_1.BN(obj.consecutiveDisagreement),
            consecutiveLateResponse: new common_1.BN(obj.consecutiveLateResponse),
            consecutiveFailure: new common_1.BN(obj.consecutiveFailure),
            totalSuccess: new common_1.BN(obj.totalSuccess),
            totalError: new common_1.BN(obj.totalError),
            totalDisagreement: new common_1.BN(obj.totalDisagreement),
            totalLateResponse: new common_1.BN(obj.totalLateResponse),
        });
    }
    toEncodable() {
        return OracleMetrics.toEncodable(this);
    }
}
exports.OracleMetrics = OracleMetrics;
//# sourceMappingURL=OracleMetrics.js.map