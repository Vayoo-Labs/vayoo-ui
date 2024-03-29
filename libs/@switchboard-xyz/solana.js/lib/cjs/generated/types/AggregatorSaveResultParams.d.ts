import { BN } from '@switchboard-xyz/common';
import * as types from '../types';
export interface AggregatorSaveResultParamsFields {
    oracleIdx: number;
    error: boolean;
    value: types.BorshDecimalFields;
    jobsChecksum: Array<number>;
    minResponse: types.BorshDecimalFields;
    maxResponse: types.BorshDecimalFields;
    feedPermissionBump: number;
    oraclePermissionBump: number;
    leaseBump: number;
    stateBump: number;
}
export interface AggregatorSaveResultParamsJSON {
    oracleIdx: number;
    error: boolean;
    value: types.BorshDecimalJSON;
    jobsChecksum: Array<number>;
    minResponse: types.BorshDecimalJSON;
    maxResponse: types.BorshDecimalJSON;
    feedPermissionBump: number;
    oraclePermissionBump: number;
    leaseBump: number;
    stateBump: number;
}
export declare class AggregatorSaveResultParams {
    readonly oracleIdx: number;
    readonly error: boolean;
    readonly value: types.BorshDecimal;
    readonly jobsChecksum: Array<number>;
    readonly minResponse: types.BorshDecimal;
    readonly maxResponse: types.BorshDecimal;
    readonly feedPermissionBump: number;
    readonly oraclePermissionBump: number;
    readonly leaseBump: number;
    readonly stateBump: number;
    constructor(fields: AggregatorSaveResultParamsFields);
    static layout(property?: string): any;
    static fromDecoded(obj: any): types.AggregatorSaveResultParams;
    static toEncodable(fields: AggregatorSaveResultParamsFields): {
        oracleIdx: number;
        error: boolean;
        value: {
            mantissa: BN;
            scale: number;
        };
        jobsChecksum: number[];
        minResponse: {
            mantissa: BN;
            scale: number;
        };
        maxResponse: {
            mantissa: BN;
            scale: number;
        };
        feedPermissionBump: number;
        oraclePermissionBump: number;
        leaseBump: number;
        stateBump: number;
    };
    toJSON(): AggregatorSaveResultParamsJSON;
    static fromJSON(obj: AggregatorSaveResultParamsJSON): AggregatorSaveResultParams;
    toEncodable(): {
        oracleIdx: number;
        error: boolean;
        value: {
            mantissa: BN;
            scale: number;
        };
        jobsChecksum: number[];
        minResponse: {
            mantissa: BN;
            scale: number;
        };
        maxResponse: {
            mantissa: BN;
            scale: number;
        };
        feedPermissionBump: number;
        oraclePermissionBump: number;
        leaseBump: number;
        stateBump: number;
    };
}
//# sourceMappingURL=AggregatorSaveResultParams.d.ts.map