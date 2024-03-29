/// <reference types="node" />
import { PublicKey } from '@solana/web3.js';
import { BN } from '@switchboard-xyz/common';
import * as types from '../types';
export interface VrfLiteInitParamsFields {
    callback: types.CallbackFields | null;
    stateBump: number;
    expiration: BN | null;
}
export interface VrfLiteInitParamsJSON {
    callback: types.CallbackJSON | null;
    stateBump: number;
    expiration: string | null;
}
export declare class VrfLiteInitParams {
    readonly callback: types.Callback | null;
    readonly stateBump: number;
    readonly expiration: BN | null;
    constructor(fields: VrfLiteInitParamsFields);
    static layout(property?: string): any;
    static fromDecoded(obj: any): types.VrfLiteInitParams;
    static toEncodable(fields: VrfLiteInitParamsFields): {
        callback: {
            programId: PublicKey;
            accounts: {
                pubkey: PublicKey;
                isSigner: boolean;
                isWritable: boolean;
            }[];
            ixData: Buffer;
        } | null;
        stateBump: number;
        expiration: BN | null;
    };
    toJSON(): VrfLiteInitParamsJSON;
    static fromJSON(obj: VrfLiteInitParamsJSON): VrfLiteInitParams;
    toEncodable(): {
        callback: {
            programId: PublicKey;
            accounts: {
                pubkey: PublicKey;
                isSigner: boolean;
                isWritable: boolean;
            }[];
            ixData: Buffer;
        } | null;
        stateBump: number;
        expiration: BN | null;
    };
}
//# sourceMappingURL=VrfLiteInitParams.d.ts.map