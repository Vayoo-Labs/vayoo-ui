import * as types from '../types';
export interface AggregatorSetMinJobsParamsFields {
    minJobResults: number;
}
export interface AggregatorSetMinJobsParamsJSON {
    minJobResults: number;
}
export declare class AggregatorSetMinJobsParams {
    readonly minJobResults: number;
    constructor(fields: AggregatorSetMinJobsParamsFields);
    static layout(property?: string): any;
    static fromDecoded(obj: any): types.AggregatorSetMinJobsParams;
    static toEncodable(fields: AggregatorSetMinJobsParamsFields): {
        minJobResults: number;
    };
    toJSON(): AggregatorSetMinJobsParamsJSON;
    static fromJSON(obj: AggregatorSetMinJobsParamsJSON): AggregatorSetMinJobsParams;
    toEncodable(): {
        minJobResults: number;
    };
}
//# sourceMappingURL=AggregatorSetMinJobsParams.d.ts.map