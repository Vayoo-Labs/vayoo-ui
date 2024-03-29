import { BN } from '@switchboard-xyz/common';
import * as types from '../types';
export interface AggregatorSetVarianceThresholdParamsFields {
    varianceThreshold: types.BorshDecimalFields;
}
export interface AggregatorSetVarianceThresholdParamsJSON {
    varianceThreshold: types.BorshDecimalJSON;
}
export declare class AggregatorSetVarianceThresholdParams {
    readonly varianceThreshold: types.BorshDecimal;
    constructor(fields: AggregatorSetVarianceThresholdParamsFields);
    static layout(property?: string): any;
    static fromDecoded(obj: any): types.AggregatorSetVarianceThresholdParams;
    static toEncodable(fields: AggregatorSetVarianceThresholdParamsFields): {
        varianceThreshold: {
            mantissa: BN;
            scale: number;
        };
    };
    toJSON(): AggregatorSetVarianceThresholdParamsJSON;
    static fromJSON(obj: AggregatorSetVarianceThresholdParamsJSON): AggregatorSetVarianceThresholdParams;
    toEncodable(): {
        varianceThreshold: {
            mantissa: BN;
            scale: number;
        };
    };
}
//# sourceMappingURL=AggregatorSetVarianceThresholdParams.d.ts.map