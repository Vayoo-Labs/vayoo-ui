import * as types from '../types';
export interface AggregatorLockParamsFields {
}
export interface AggregatorLockParamsJSON {
}
export declare class AggregatorLockParams {
    constructor(fields: AggregatorLockParamsFields);
    static layout(property?: string): any;
    static fromDecoded(obj: any): types.AggregatorLockParams;
    static toEncodable(fields: AggregatorLockParamsFields): {};
    toJSON(): AggregatorLockParamsJSON;
    static fromJSON(obj: AggregatorLockParamsJSON): AggregatorLockParams;
    toEncodable(): {};
}
//# sourceMappingURL=AggregatorLockParams.d.ts.map