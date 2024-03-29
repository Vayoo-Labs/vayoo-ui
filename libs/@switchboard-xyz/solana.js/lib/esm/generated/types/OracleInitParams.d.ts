/// <reference types="node" />
import * as types from '../types';
export interface OracleInitParamsFields {
    name: Uint8Array;
    metadata: Uint8Array;
    stateBump: number;
    oracleBump: number;
}
export interface OracleInitParamsJSON {
    name: Array<number>;
    metadata: Array<number>;
    stateBump: number;
    oracleBump: number;
}
export declare class OracleInitParams {
    readonly name: Uint8Array;
    readonly metadata: Uint8Array;
    readonly stateBump: number;
    readonly oracleBump: number;
    constructor(fields: OracleInitParamsFields);
    static layout(property?: string): any;
    static fromDecoded(obj: any): types.OracleInitParams;
    static toEncodable(fields: OracleInitParamsFields): {
        name: Buffer;
        metadata: Buffer;
        stateBump: number;
        oracleBump: number;
    };
    toJSON(): OracleInitParamsJSON;
    static fromJSON(obj: OracleInitParamsJSON): OracleInitParams;
    toEncodable(): {
        name: Buffer;
        metadata: Buffer;
        stateBump: number;
        oracleBump: number;
    };
}
//# sourceMappingURL=OracleInitParams.d.ts.map