import { BN } from '@switchboard-xyz/common';
import * as types from '../types';
export interface EcvrfProofZCFields {
    gamma: types.EdwardsPointZCFields;
    c: types.ScalarFields;
    s: types.ScalarFields;
}
export interface EcvrfProofZCJSON {
    gamma: types.EdwardsPointZCJSON;
    c: types.ScalarJSON;
    s: types.ScalarJSON;
}
export declare class EcvrfProofZC {
    readonly gamma: types.EdwardsPointZC;
    readonly c: types.Scalar;
    readonly s: types.Scalar;
    constructor(fields: EcvrfProofZCFields);
    static layout(property?: string): any;
    static fromDecoded(obj: any): types.EcvrfProofZC;
    static toEncodable(fields: EcvrfProofZCFields): {
        gamma: {
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
        c: {
            bytes: number[];
        };
        s: {
            bytes: number[];
        };
    };
    toJSON(): EcvrfProofZCJSON;
    static fromJSON(obj: EcvrfProofZCJSON): EcvrfProofZC;
    toEncodable(): {
        gamma: {
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
        c: {
            bytes: number[];
        };
        s: {
            bytes: number[];
        };
    };
}
//# sourceMappingURL=EcvrfProofZC.d.ts.map