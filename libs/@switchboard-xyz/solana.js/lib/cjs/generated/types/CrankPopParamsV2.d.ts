/// <reference types="node" />
import * as types from '../types';
export interface CrankPopParamsV2Fields {
    stateBump: number;
    leaseBumps: Uint8Array;
    permissionBumps: Uint8Array;
    nonce: number | null;
    failOpenOnAccountMismatch: boolean | null;
    popIdx: number | null;
}
export interface CrankPopParamsV2JSON {
    stateBump: number;
    leaseBumps: Array<number>;
    permissionBumps: Array<number>;
    nonce: number | null;
    failOpenOnAccountMismatch: boolean | null;
    popIdx: number | null;
}
export declare class CrankPopParamsV2 {
    readonly stateBump: number;
    readonly leaseBumps: Uint8Array;
    readonly permissionBumps: Uint8Array;
    readonly nonce: number | null;
    readonly failOpenOnAccountMismatch: boolean | null;
    readonly popIdx: number | null;
    constructor(fields: CrankPopParamsV2Fields);
    static layout(property?: string): any;
    static fromDecoded(obj: any): types.CrankPopParamsV2;
    static toEncodable(fields: CrankPopParamsV2Fields): {
        stateBump: number;
        leaseBumps: Buffer;
        permissionBumps: Buffer;
        nonce: number | null;
        failOpenOnAccountMismatch: boolean | null;
        popIdx: number | null;
    };
    toJSON(): CrankPopParamsV2JSON;
    static fromJSON(obj: CrankPopParamsV2JSON): CrankPopParamsV2;
    toEncodable(): {
        stateBump: number;
        leaseBumps: Buffer;
        permissionBumps: Buffer;
        nonce: number | null;
        failOpenOnAccountMismatch: boolean | null;
        popIdx: number | null;
    };
}
//# sourceMappingURL=CrankPopParamsV2.d.ts.map