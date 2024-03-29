import * as types from '../types';
export interface CrankPushParamsFields {
    stateBump: number;
    permissionBump: number;
    notifiRef: Array<number> | null;
}
export interface CrankPushParamsJSON {
    stateBump: number;
    permissionBump: number;
    notifiRef: Array<number> | null;
}
export declare class CrankPushParams {
    readonly stateBump: number;
    readonly permissionBump: number;
    readonly notifiRef: Array<number> | null;
    constructor(fields: CrankPushParamsFields);
    static layout(property?: string): any;
    static fromDecoded(obj: any): types.CrankPushParams;
    static toEncodable(fields: CrankPushParamsFields): {
        stateBump: number;
        permissionBump: number;
        notifiRef: number[] | null;
    };
    toJSON(): CrankPushParamsJSON;
    static fromJSON(obj: CrankPushParamsJSON): CrankPushParams;
    toEncodable(): {
        stateBump: number;
        permissionBump: number;
        notifiRef: number[] | null;
    };
}
//# sourceMappingURL=CrankPushParams.d.ts.map