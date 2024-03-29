/// <reference types="node" />
import { BN } from '@switchboard-xyz/common';
import * as types from '../types';
export interface JobInitParamsFields {
    name: Array<number>;
    expiration: BN;
    stateBump: number;
    data: Uint8Array;
    size: number | null;
}
export interface JobInitParamsJSON {
    name: Array<number>;
    expiration: string;
    stateBump: number;
    data: Array<number>;
    size: number | null;
}
export declare class JobInitParams {
    readonly name: Array<number>;
    readonly expiration: BN;
    readonly stateBump: number;
    readonly data: Uint8Array;
    readonly size: number | null;
    constructor(fields: JobInitParamsFields);
    static layout(property?: string): any;
    static fromDecoded(obj: any): types.JobInitParams;
    static toEncodable(fields: JobInitParamsFields): {
        name: number[];
        expiration: BN;
        stateBump: number;
        data: Buffer;
        size: number | null;
    };
    toJSON(): JobInitParamsJSON;
    static fromJSON(obj: JobInitParamsJSON): JobInitParams;
    toEncodable(): {
        name: number[];
        expiration: BN;
        stateBump: number;
        data: Buffer;
        size: number | null;
    };
}
//# sourceMappingURL=JobInitParams.d.ts.map