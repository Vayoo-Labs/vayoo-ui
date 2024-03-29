import { BN } from '@switchboard-xyz/common';
import * as types from '../types';
export interface ProjectivePointZCFields {
    x: types.FieldElementZCFields;
    y: types.FieldElementZCFields;
    z: types.FieldElementZCFields;
}
export interface ProjectivePointZCJSON {
    x: types.FieldElementZCJSON;
    y: types.FieldElementZCJSON;
    z: types.FieldElementZCJSON;
}
export declare class ProjectivePointZC {
    readonly x: types.FieldElementZC;
    readonly y: types.FieldElementZC;
    readonly z: types.FieldElementZC;
    constructor(fields: ProjectivePointZCFields);
    static layout(property?: string): any;
    static fromDecoded(obj: any): types.ProjectivePointZC;
    static toEncodable(fields: ProjectivePointZCFields): {
        x: {
            bytes: BN[];
        };
        y: {
            bytes: BN[];
        };
        z: {
            bytes: BN[];
        };
    };
    toJSON(): ProjectivePointZCJSON;
    static fromJSON(obj: ProjectivePointZCJSON): ProjectivePointZC;
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
    };
}
//# sourceMappingURL=ProjectivePointZC.d.ts.map