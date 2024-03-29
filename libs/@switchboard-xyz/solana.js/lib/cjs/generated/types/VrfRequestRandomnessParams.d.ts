import * as types from '../types';
export interface VrfRequestRandomnessParamsFields {
    permissionBump: number;
    stateBump: number;
}
export interface VrfRequestRandomnessParamsJSON {
    permissionBump: number;
    stateBump: number;
}
export declare class VrfRequestRandomnessParams {
    readonly permissionBump: number;
    readonly stateBump: number;
    constructor(fields: VrfRequestRandomnessParamsFields);
    static layout(property?: string): any;
    static fromDecoded(obj: any): types.VrfRequestRandomnessParams;
    static toEncodable(fields: VrfRequestRandomnessParamsFields): {
        permissionBump: number;
        stateBump: number;
    };
    toJSON(): VrfRequestRandomnessParamsJSON;
    static fromJSON(obj: VrfRequestRandomnessParamsJSON): VrfRequestRandomnessParams;
    toEncodable(): {
        permissionBump: number;
        stateBump: number;
    };
}
//# sourceMappingURL=VrfRequestRandomnessParams.d.ts.map