import { BN } from '@switchboard-xyz/common';
import * as types from '../types';
export interface AggregatorSaveResultParamsV2Fields {
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
    jobValues: Array<types.BorshDecimalFields | null>;
}
export interface AggregatorSaveResultParamsV2JSON {
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
    jobValues: Array<types.BorshDecimalJSON | null>;
}
export declare class AggregatorSaveResultParamsV2 {
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
    readonly jobValues: Array<types.BorshDecimal | null>;
    constructor(fields: AggregatorSaveResultParamsV2Fields);
    static layout(property?: string): any;
    static fromDecoded(obj: any): types.AggregatorSaveResultParamsV2;
    static toEncodable(fields: AggregatorSaveResultParamsV2Fields): {
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
        jobValues: ({
            mantissa: BN;
            scale: number;
        } | null)[];
    };
    toJSON(): AggregatorSaveResultParamsV2JSON;
    static fromJSON(obj: AggregatorSaveResultParamsV2JSON): AggregatorSaveResultParamsV2;
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
        jobValues: ({
            mantissa: BN;
            scale: number;
        } | null)[];
    };
}
//# sourceMappingURL=AggregatorSaveResultParamsV2.d.ts.map