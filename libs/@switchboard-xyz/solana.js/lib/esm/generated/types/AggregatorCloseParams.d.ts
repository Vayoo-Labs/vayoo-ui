import * as types from '../types';
export interface AggregatorCloseParamsFields {
    stateBump: number;
    permissionBump: number;
    leaseBump: number;
}
export interface AggregatorCloseParamsJSON {
    stateBump: number;
    permissionBump: number;
    leaseBump: number;
}
export declare class AggregatorCloseParams {
    readonly stateBump: number;
    readonly permissionBump: number;
    readonly leaseBump: number;
    constructor(fields: AggregatorCloseParamsFields);
    static layout(property?: string): any;
    static fromDecoded(obj: any): types.AggregatorCloseParams;
    static toEncodable(fields: AggregatorCloseParamsFields): {
        stateBump: number;
        permissionBump: number;
        leaseBump: number;
    };
    toJSON(): AggregatorCloseParamsJSON;
    static fromJSON(obj: AggregatorCloseParamsJSON): AggregatorCloseParams;
    toEncodable(): {
        stateBump: number;
        permissionBump: number;
        leaseBump: number;
    };
}
//# sourceMappingURL=AggregatorCloseParams.d.ts.map