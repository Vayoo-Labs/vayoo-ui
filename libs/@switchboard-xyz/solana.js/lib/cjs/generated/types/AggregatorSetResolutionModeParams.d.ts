import * as types from '../types';
export interface AggregatorSetResolutionModeParamsFields {
    mode: number;
}
export interface AggregatorSetResolutionModeParamsJSON {
    mode: number;
}
export declare class AggregatorSetResolutionModeParams {
    readonly mode: number;
    constructor(fields: AggregatorSetResolutionModeParamsFields);
    static layout(property?: string): any;
    static fromDecoded(obj: any): types.AggregatorSetResolutionModeParams;
    static toEncodable(fields: AggregatorSetResolutionModeParamsFields): {
        mode: number;
    };
    toJSON(): AggregatorSetResolutionModeParamsJSON;
    static fromJSON(obj: AggregatorSetResolutionModeParamsJSON): AggregatorSetResolutionModeParams;
    toEncodable(): {
        mode: number;
    };
}
//# sourceMappingURL=AggregatorSetResolutionModeParams.d.ts.map