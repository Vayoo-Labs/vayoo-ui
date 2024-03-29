import { BN } from '@switchboard-xyz/common';
import * as types from '../types';
export interface EdwardsPointZCFields {
    x: types.FieldElementZCFields;
    y: types.FieldElementZCFields;
    z: types.FieldElementZCFields;
    t: types.FieldElementZCFields;
}
export interface EdwardsPointZCJSON {
    x: types.FieldElementZCJSON;
    y: types.FieldElementZCJSON;
    z: types.FieldElementZCJSON;
    t: types.FieldElementZCJSON;
}
export declare class EdwardsPointZC {
    readonly x: types.FieldElementZC;
    readonly y: types.FieldElementZC;
    readonly z: types.FieldElementZC;
    readonly t: types.FieldElementZC;
    constructor(fields: EdwardsPointZCFields);
    static layout(property?: string): any;
    static fromDecoded(obj: any): types.EdwardsPointZC;
    static toEncodable(fields: EdwardsPointZCFields): {
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
    toJSON(): EdwardsPointZCJSON;
    static fromJSON(obj: EdwardsPointZCJSON): EdwardsPointZC;
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
//# sourceMappingURL=EdwardsPointZC.d.ts.map