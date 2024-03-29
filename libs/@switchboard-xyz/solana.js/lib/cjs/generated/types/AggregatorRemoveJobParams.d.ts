import * as types from '../types';
export interface AggregatorRemoveJobParamsFields {
    jobIdx: number;
}
export interface AggregatorRemoveJobParamsJSON {
    jobIdx: number;
}
export declare class AggregatorRemoveJobParams {
    readonly jobIdx: number;
    constructor(fields: AggregatorRemoveJobParamsFields);
    static layout(property?: string): any;
    static fromDecoded(obj: any): types.AggregatorRemoveJobParams;
    static toEncodable(fields: AggregatorRemoveJobParamsFields): {
        jobIdx: number;
    };
    toJSON(): AggregatorRemoveJobParamsJSON;
    static fromJSON(obj: AggregatorRemoveJobParamsJSON): AggregatorRemoveJobParams;
    toEncodable(): {
        jobIdx: number;
    };
}
//# sourceMappingURL=AggregatorRemoveJobParams.d.ts.map