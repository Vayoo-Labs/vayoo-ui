import { BN } from '@switchboard-xyz/common';
import * as types from '../types';
export interface OracleMetricsFields {
    /** Number of consecutive successful update request. */
    consecutiveSuccess: BN;
    /** Number of consecutive update request that resulted in an error. */
    consecutiveError: BN;
    /** Number of consecutive update request that resulted in a disagreement with the accepted median result. */
    consecutiveDisagreement: BN;
    /** Number of consecutive update request that were posted on-chain late and not included in an accepted result. */
    consecutiveLateResponse: BN;
    /** Number of consecutive update request that resulted in a failure. */
    consecutiveFailure: BN;
    /** Total number of successful update request. */
    totalSuccess: BN;
    /** Total number of update request that resulted in an error. */
    totalError: BN;
    /** Total number of update request that resulted in a disagreement with the accepted median result. */
    totalDisagreement: BN;
    /** Total number of update request that were posted on-chain late and not included in an accepted result. */
    totalLateResponse: BN;
}
export interface OracleMetricsJSON {
    /** Number of consecutive successful update request. */
    consecutiveSuccess: string;
    /** Number of consecutive update request that resulted in an error. */
    consecutiveError: string;
    /** Number of consecutive update request that resulted in a disagreement with the accepted median result. */
    consecutiveDisagreement: string;
    /** Number of consecutive update request that were posted on-chain late and not included in an accepted result. */
    consecutiveLateResponse: string;
    /** Number of consecutive update request that resulted in a failure. */
    consecutiveFailure: string;
    /** Total number of successful update request. */
    totalSuccess: string;
    /** Total number of update request that resulted in an error. */
    totalError: string;
    /** Total number of update request that resulted in a disagreement with the accepted median result. */
    totalDisagreement: string;
    /** Total number of update request that were posted on-chain late and not included in an accepted result. */
    totalLateResponse: string;
}
export declare class OracleMetrics {
    /** Number of consecutive successful update request. */
    readonly consecutiveSuccess: BN;
    /** Number of consecutive update request that resulted in an error. */
    readonly consecutiveError: BN;
    /** Number of consecutive update request that resulted in a disagreement with the accepted median result. */
    readonly consecutiveDisagreement: BN;
    /** Number of consecutive update request that were posted on-chain late and not included in an accepted result. */
    readonly consecutiveLateResponse: BN;
    /** Number of consecutive update request that resulted in a failure. */
    readonly consecutiveFailure: BN;
    /** Total number of successful update request. */
    readonly totalSuccess: BN;
    /** Total number of update request that resulted in an error. */
    readonly totalError: BN;
    /** Total number of update request that resulted in a disagreement with the accepted median result. */
    readonly totalDisagreement: BN;
    /** Total number of update request that were posted on-chain late and not included in an accepted result. */
    readonly totalLateResponse: BN;
    constructor(fields: OracleMetricsFields);
    static layout(property?: string): any;
    static fromDecoded(obj: any): types.OracleMetrics;
    static toEncodable(fields: OracleMetricsFields): {
        consecutiveSuccess: BN;
        consecutiveError: BN;
        consecutiveDisagreement: BN;
        consecutiveLateResponse: BN;
        consecutiveFailure: BN;
        totalSuccess: BN;
        totalError: BN;
        totalDisagreement: BN;
        totalLateResponse: BN;
    };
    toJSON(): OracleMetricsJSON;
    static fromJSON(obj: OracleMetricsJSON): OracleMetrics;
    toEncodable(): {
        consecutiveSuccess: BN;
        consecutiveError: BN;
        consecutiveDisagreement: BN;
        consecutiveLateResponse: BN;
        consecutiveFailure: BN;
        totalSuccess: BN;
        totalError: BN;
        totalDisagreement: BN;
        totalLateResponse: BN;
    };
}
//# sourceMappingURL=OracleMetrics.d.ts.map