import { BN } from '@switchboard-xyz/common'; // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from '@coral-xyz/borsh';
export class OracleMetrics {
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
            consecutiveSuccess: new BN(obj.consecutiveSuccess),
            consecutiveError: new BN(obj.consecutiveError),
            consecutiveDisagreement: new BN(obj.consecutiveDisagreement),
            consecutiveLateResponse: new BN(obj.consecutiveLateResponse),
            consecutiveFailure: new BN(obj.consecutiveFailure),
            totalSuccess: new BN(obj.totalSuccess),
            totalError: new BN(obj.totalError),
            totalDisagreement: new BN(obj.totalDisagreement),
            totalLateResponse: new BN(obj.totalLateResponse),
        });
    }
    toEncodable() {
        return OracleMetrics.toEncodable(this);
    }
}
//# sourceMappingURL=OracleMetrics.js.map