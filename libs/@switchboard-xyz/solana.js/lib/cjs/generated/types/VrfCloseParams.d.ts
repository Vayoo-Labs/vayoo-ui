import * as types from '../types';
export interface VrfCloseParamsFields {
    stateBump: number;
    permissionBump: number;
}
export interface VrfCloseParamsJSON {
    stateBump: number;
    permissionBump: number;
}
export declare class VrfCloseParams {
    readonly stateBump: number;
    readonly permissionBump: number;
    constructor(fields: VrfCloseParamsFields);
    static layout(property?: string): any;
    static fromDecoded(obj: any): types.VrfCloseParams;
    static toEncodable(fields: VrfCloseParamsFields): {
        stateBump: number;
        permissionBump: number;
    };
    toJSON(): VrfCloseParamsJSON;
    static fromJSON(obj: VrfCloseParamsJSON): VrfCloseParams;
    toEncodable(): {
        stateBump: number;
        permissionBump: number;
    };
}
//# sourceMappingURL=VrfCloseParams.d.ts.map