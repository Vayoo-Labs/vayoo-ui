import * as types from '../types';
export interface AggregatorSetQueueParamsFields {
}
export interface AggregatorSetQueueParamsJSON {
}
export declare class AggregatorSetQueueParams {
    constructor(fields: AggregatorSetQueueParamsFields);
    static layout(property?: string): any;
    static fromDecoded(obj: any): types.AggregatorSetQueueParams;
    static toEncodable(fields: AggregatorSetQueueParamsFields): {};
    toJSON(): AggregatorSetQueueParamsJSON;
    static fromJSON(obj: AggregatorSetQueueParamsJSON): AggregatorSetQueueParams;
    toEncodable(): {};
}
//# sourceMappingURL=AggregatorSetQueueParams.d.ts.map