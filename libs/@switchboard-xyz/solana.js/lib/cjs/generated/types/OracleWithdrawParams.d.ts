import { BN } from '@switchboard-xyz/common';
import * as types from '../types';
export interface OracleWithdrawParamsFields {
    stateBump: number;
    permissionBump: number;
    amount: BN;
}
export interface OracleWithdrawParamsJSON {
    stateBump: number;
    permissionBump: number;
    amount: string;
}
export declare class OracleWithdrawParams {
    readonly stateBump: number;
    readonly permissionBump: number;
    readonly amount: BN;
    constructor(fields: OracleWithdrawParamsFields);
    static layout(property?: string): any;
    static fromDecoded(obj: any): types.OracleWithdrawParams;
    static toEncodable(fields: OracleWithdrawParamsFields): {
        stateBump: number;
        permissionBump: number;
        amount: BN;
    };
    toJSON(): OracleWithdrawParamsJSON;
    static fromJSON(obj: OracleWithdrawParamsJSON): OracleWithdrawParams;
    toEncodable(): {
        stateBump: number;
        permissionBump: number;
        amount: BN;
    };
}
//# sourceMappingURL=OracleWithdrawParams.d.ts.map