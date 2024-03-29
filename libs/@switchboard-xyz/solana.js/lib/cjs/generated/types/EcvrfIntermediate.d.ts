import { BN } from '@switchboard-xyz/common';
import * as types from '../types';
export interface EcvrfIntermediateFields {
    r: types.FieldElementZCFields;
    nS: types.FieldElementZCFields;
    d: types.FieldElementZCFields;
    t13: types.FieldElementZCFields;
    t15: types.FieldElementZCFields;
}
export interface EcvrfIntermediateJSON {
    r: types.FieldElementZCJSON;
    nS: types.FieldElementZCJSON;
    d: types.FieldElementZCJSON;
    t13: types.FieldElementZCJSON;
    t15: types.FieldElementZCJSON;
}
export declare class EcvrfIntermediate {
    readonly r: types.FieldElementZC;
    readonly nS: types.FieldElementZC;
    readonly d: types.FieldElementZC;
    readonly t13: types.FieldElementZC;
    readonly t15: types.FieldElementZC;
    constructor(fields: EcvrfIntermediateFields);
    static layout(property?: string): any;
    static fromDecoded(obj: any): types.EcvrfIntermediate;
    static toEncodable(fields: EcvrfIntermediateFields): {
        r: {
            bytes: BN[];
        };
        nS: {
            bytes: BN[];
        };
        d: {
            bytes: BN[];
        };
        t13: {
            bytes: BN[];
        };
        t15: {
            bytes: BN[];
        };
    };
    toJSON(): EcvrfIntermediateJSON;
    static fromJSON(obj: EcvrfIntermediateJSON): EcvrfIntermediate;
    toEncodable(): {
        r: {
            bytes: BN[];
        };
        nS: {
            bytes: BN[];
        };
        d: {
            bytes: BN[];
        };
        t13: {
            bytes: BN[];
        };
        t15: {
            bytes: BN[];
        };
    };
}
//# sourceMappingURL=EcvrfIntermediate.d.ts.map