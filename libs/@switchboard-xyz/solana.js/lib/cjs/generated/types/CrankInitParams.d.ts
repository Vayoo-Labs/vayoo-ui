/// <reference types="node" />
import * as types from '../types';
export interface CrankInitParamsFields {
    name: Uint8Array;
    metadata: Uint8Array;
    crankSize: number;
}
export interface CrankInitParamsJSON {
    name: Array<number>;
    metadata: Array<number>;
    crankSize: number;
}
export declare class CrankInitParams {
    readonly name: Uint8Array;
    readonly metadata: Uint8Array;
    readonly crankSize: number;
    constructor(fields: CrankInitParamsFields);
    static layout(property?: string): any;
    static fromDecoded(obj: any): types.CrankInitParams;
    static toEncodable(fields: CrankInitParamsFields): {
        name: Buffer;
        metadata: Buffer;
        crankSize: number;
    };
    toJSON(): CrankInitParamsJSON;
    static fromJSON(obj: CrankInitParamsJSON): CrankInitParams;
    toEncodable(): {
        name: Buffer;
        metadata: Buffer;
        crankSize: number;
    };
}
//# sourceMappingURL=CrankInitParams.d.ts.map