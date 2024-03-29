import * as types from '../types';
export interface AggregatorOpenRoundParamsFields {
    stateBump: number;
    leaseBump: number;
    permissionBump: number;
    jitter: number;
}
export interface AggregatorOpenRoundParamsJSON {
    stateBump: number;
    leaseBump: number;
    permissionBump: number;
    jitter: number;
}
export declare class AggregatorOpenRoundParams {
    readonly stateBump: number;
    readonly leaseBump: number;
    readonly permissionBump: number;
    readonly jitter: number;
    constructor(fields: AggregatorOpenRoundParamsFields);
    static layout(property?: string): any;
    static fromDecoded(obj: any): types.AggregatorOpenRoundParams;
    static toEncodable(fields: AggregatorOpenRoundParamsFields): {
        stateBump: number;
        leaseBump: number;
        permissionBump: number;
        jitter: number;
    };
    toJSON(): AggregatorOpenRoundParamsJSON;
    static fromJSON(obj: AggregatorOpenRoundParamsJSON): AggregatorOpenRoundParams;
    toEncodable(): {
        stateBump: number;
        leaseBump: number;
        permissionBump: number;
        jitter: number;
    };
}
//# sourceMappingURL=AggregatorOpenRoundParams.d.ts.map