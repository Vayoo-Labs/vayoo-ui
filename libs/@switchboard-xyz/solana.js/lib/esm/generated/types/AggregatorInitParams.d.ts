import { BN } from '@switchboard-xyz/common';
import * as types from '../types';
export interface AggregatorInitParamsFields {
    name: Array<number>;
    metadata: Array<number>;
    batchSize: number;
    minOracleResults: number;
    minJobResults: number;
    minUpdateDelaySeconds: number;
    startAfter: BN;
    varianceThreshold: types.BorshDecimalFields;
    forceReportPeriod: BN;
    expiration: BN;
    stateBump: number;
    disableCrank: boolean;
}
export interface AggregatorInitParamsJSON {
    name: Array<number>;
    metadata: Array<number>;
    batchSize: number;
    minOracleResults: number;
    minJobResults: number;
    minUpdateDelaySeconds: number;
    startAfter: string;
    varianceThreshold: types.BorshDecimalJSON;
    forceReportPeriod: string;
    expiration: string;
    stateBump: number;
    disableCrank: boolean;
}
export declare class AggregatorInitParams {
    readonly name: Array<number>;
    readonly metadata: Array<number>;
    readonly batchSize: number;
    readonly minOracleResults: number;
    readonly minJobResults: number;
    readonly minUpdateDelaySeconds: number;
    readonly startAfter: BN;
    readonly varianceThreshold: types.BorshDecimal;
    readonly forceReportPeriod: BN;
    readonly expiration: BN;
    readonly stateBump: number;
    readonly disableCrank: boolean;
    constructor(fields: AggregatorInitParamsFields);
    static layout(property?: string): any;
    static fromDecoded(obj: any): types.AggregatorInitParams;
    static toEncodable(fields: AggregatorInitParamsFields): {
        name: number[];
        metadata: number[];
        batchSize: number;
        minOracleResults: number;
        minJobResults: number;
        minUpdateDelaySeconds: number;
        startAfter: BN;
        varianceThreshold: {
            mantissa: BN;
            scale: number;
        };
        forceReportPeriod: BN;
        expiration: BN;
        stateBump: number;
        disableCrank: boolean;
    };
    toJSON(): AggregatorInitParamsJSON;
    static fromJSON(obj: AggregatorInitParamsJSON): AggregatorInitParams;
    toEncodable(): {
        name: number[];
        metadata: number[];
        batchSize: number;
        minOracleResults: number;
        minJobResults: number;
        minUpdateDelaySeconds: number;
        startAfter: BN;
        varianceThreshold: {
            mantissa: BN;
            scale: number;
        };
        forceReportPeriod: BN;
        expiration: BN;
        stateBump: number;
        disableCrank: boolean;
    };
}
//# sourceMappingURL=AggregatorInitParams.d.ts.map