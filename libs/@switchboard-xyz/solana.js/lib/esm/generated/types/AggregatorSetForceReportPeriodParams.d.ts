import * as types from '../types';
export interface AggregatorSetForceReportPeriodParamsFields {
    forceReportPeriod: number;
}
export interface AggregatorSetForceReportPeriodParamsJSON {
    forceReportPeriod: number;
}
export declare class AggregatorSetForceReportPeriodParams {
    readonly forceReportPeriod: number;
    constructor(fields: AggregatorSetForceReportPeriodParamsFields);
    static layout(property?: string): any;
    static fromDecoded(obj: any): types.AggregatorSetForceReportPeriodParams;
    static toEncodable(fields: AggregatorSetForceReportPeriodParamsFields): {
        forceReportPeriod: number;
    };
    toJSON(): AggregatorSetForceReportPeriodParamsJSON;
    static fromJSON(obj: AggregatorSetForceReportPeriodParamsJSON): AggregatorSetForceReportPeriodParams;
    toEncodable(): {
        forceReportPeriod: number;
    };
}
//# sourceMappingURL=AggregatorSetForceReportPeriodParams.d.ts.map