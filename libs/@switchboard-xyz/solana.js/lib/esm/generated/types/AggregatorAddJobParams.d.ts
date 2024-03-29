import * as types from '../types';
export interface AggregatorAddJobParamsFields {
    weight: number | null;
}
export interface AggregatorAddJobParamsJSON {
    weight: number | null;
}
export declare class AggregatorAddJobParams {
    readonly weight: number | null;
    constructor(fields: AggregatorAddJobParamsFields);
    static layout(property?: string): any;
    static fromDecoded(obj: any): types.AggregatorAddJobParams;
    static toEncodable(fields: AggregatorAddJobParamsFields): {
        weight: number | null;
    };
    toJSON(): AggregatorAddJobParamsJSON;
    static fromJSON(obj: AggregatorAddJobParamsJSON): AggregatorAddJobParams;
    toEncodable(): {
        weight: number | null;
    };
}
//# sourceMappingURL=AggregatorAddJobParams.d.ts.map