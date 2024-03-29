import { BN } from '@switchboard-xyz/common';
import * as types from '../types';
export interface AggregatorSetConfigParamsFields {
    name: Array<number> | null;
    metadata: Array<number> | null;
    minUpdateDelaySeconds: number | null;
    minJobResults: number | null;
    batchSize: number | null;
    minOracleResults: number | null;
    forceReportPeriod: number | null;
    varianceThreshold: types.BorshDecimalFields | null;
    basePriorityFee: number | null;
    priorityFeeBump: number | null;
    priorityFeeBumpPeriod: number | null;
    maxPriorityFeeMultiplier: number | null;
}
export interface AggregatorSetConfigParamsJSON {
    name: Array<number> | null;
    metadata: Array<number> | null;
    minUpdateDelaySeconds: number | null;
    minJobResults: number | null;
    batchSize: number | null;
    minOracleResults: number | null;
    forceReportPeriod: number | null;
    varianceThreshold: types.BorshDecimalJSON | null;
    basePriorityFee: number | null;
    priorityFeeBump: number | null;
    priorityFeeBumpPeriod: number | null;
    maxPriorityFeeMultiplier: number | null;
}
export declare class AggregatorSetConfigParams {
    readonly name: Array<number> | null;
    readonly metadata: Array<number> | null;
    readonly minUpdateDelaySeconds: number | null;
    readonly minJobResults: number | null;
    readonly batchSize: number | null;
    readonly minOracleResults: number | null;
    readonly forceReportPeriod: number | null;
    readonly varianceThreshold: types.BorshDecimal | null;
    readonly basePriorityFee: number | null;
    readonly priorityFeeBump: number | null;
    readonly priorityFeeBumpPeriod: number | null;
    readonly maxPriorityFeeMultiplier: number | null;
    constructor(fields: AggregatorSetConfigParamsFields);
    static layout(property?: string): any;
    static fromDecoded(obj: any): types.AggregatorSetConfigParams;
    static toEncodable(fields: AggregatorSetConfigParamsFields): {
        name: number[] | null;
        metadata: number[] | null;
        minUpdateDelaySeconds: number | null;
        minJobResults: number | null;
        batchSize: number | null;
        minOracleResults: number | null;
        forceReportPeriod: number | null;
        varianceThreshold: {
            mantissa: BN;
            scale: number;
        } | null;
        basePriorityFee: number | null;
        priorityFeeBump: number | null;
        priorityFeeBumpPeriod: number | null;
        maxPriorityFeeMultiplier: number | null;
    };
    toJSON(): AggregatorSetConfigParamsJSON;
    static fromJSON(obj: AggregatorSetConfigParamsJSON): AggregatorSetConfigParams;
    toEncodable(): {
        name: number[] | null;
        metadata: number[] | null;
        minUpdateDelaySeconds: number | null;
        minJobResults: number | null;
        batchSize: number | null;
        minOracleResults: number | null;
        forceReportPeriod: number | null;
        varianceThreshold: {
            mantissa: BN;
            scale: number;
        } | null;
        basePriorityFee: number | null;
        priorityFeeBump: number | null;
        priorityFeeBumpPeriod: number | null;
        maxPriorityFeeMultiplier: number | null;
    };
}
//# sourceMappingURL=AggregatorSetConfigParams.d.ts.map