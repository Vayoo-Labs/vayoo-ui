import { BN } from '@switchboard-xyz/common';
import * as types from '../types';
export interface CompletedPointZCFields {
    x: types.FieldElementZCFields;
    y: types.FieldElementZCFields;
    z: types.FieldElementZCFields;
    t: types.FieldElementZCFields;
}
export interface CompletedPointZCJSON {
    x: types.FieldElementZCJSON;
    y: types.FieldElementZCJSON;
    z: types.FieldElementZCJSON;
    t: types.FieldElementZCJSON;
}
export declare class CompletedPointZC {
    readonly x: types.FieldElementZC;
    readonly y: types.FieldElementZC;
    readonly z: types.FieldElementZC;
    readonly t: types.FieldElementZC;
    constructor(fields: CompletedPointZCFields);
    static layout(property?: string): any;
    static fromDecoded(obj: any): types.CompletedPointZC;
    static toEncodable(fields: CompletedPointZCFields): {
        x: {
            bytes: BN[];
        };
        y: {
            bytes: BN[];
        };
        z: {
            bytes: BN[];
        };
        t: {
            bytes: BN[];
        };
    };
    toJSON(): CompletedPointZCJSON;
    static fromJSON(obj: CompletedPointZCJSON): CompletedPointZC;
    toEncodable(): {
        x: {
            bytes: BN[];
        };
        y: {
            bytes: BN[];
        };
        z: {
            bytes: BN[];
        };
        t: {
            bytes: BN[];
        };
    };
}
//# sourceMappingURL=CompletedPointZC.d.ts.map