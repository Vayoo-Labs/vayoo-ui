/// <reference types="node" />
import { PublicKey } from '@solana/web3.js';
import { BN } from '@switchboard-xyz/common';
import * as types from '../types';
export interface LeaseInitParamsFields {
    loadAmount: BN;
    withdrawAuthority: PublicKey;
    leaseBump: number;
    stateBump: number;
    walletBumps: Uint8Array;
}
export interface LeaseInitParamsJSON {
    loadAmount: string;
    withdrawAuthority: string;
    leaseBump: number;
    stateBump: number;
    walletBumps: Array<number>;
}
export declare class LeaseInitParams {
    readonly loadAmount: BN;
    readonly withdrawAuthority: PublicKey;
    readonly leaseBump: number;
    readonly stateBump: number;
    readonly walletBumps: Uint8Array;
    constructor(fields: LeaseInitParamsFields);
    static layout(property?: string): any;
    static fromDecoded(obj: any): types.LeaseInitParams;
    static toEncodable(fields: LeaseInitParamsFields): {
        loadAmount: BN;
        withdrawAuthority: PublicKey;
        leaseBump: number;
        stateBump: number;
        walletBumps: Buffer;
    };
    toJSON(): LeaseInitParamsJSON;
    static fromJSON(obj: LeaseInitParamsJSON): LeaseInitParams;
    toEncodable(): {
        loadAmount: BN;
        withdrawAuthority: PublicKey;
        leaseBump: number;
        stateBump: number;
        walletBumps: Buffer;
    };
}
//# sourceMappingURL=LeaseInitParams.d.ts.map