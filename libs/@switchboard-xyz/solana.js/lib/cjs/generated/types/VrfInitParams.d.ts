/// <reference types="node" />
import { PublicKey } from '@solana/web3.js';
import * as types from '../types';
export interface VrfInitParamsFields {
    callback: types.CallbackFields;
    stateBump: number;
}
export interface VrfInitParamsJSON {
    callback: types.CallbackJSON;
    stateBump: number;
}
export declare class VrfInitParams {
    readonly callback: types.Callback;
    readonly stateBump: number;
    constructor(fields: VrfInitParamsFields);
    static layout(property?: string): any;
    static fromDecoded(obj: any): types.VrfInitParams;
    static toEncodable(fields: VrfInitParamsFields): {
        callback: {
            programId: PublicKey;
            accounts: {
                pubkey: PublicKey;
                isSigner: boolean;
                isWritable: boolean;
            }[];
            ixData: Buffer;
        };
        stateBump: number;
    };
    toJSON(): VrfInitParamsJSON;
    static fromJSON(obj: VrfInitParamsJSON): VrfInitParams;
    toEncodable(): {
        callback: {
            programId: PublicKey;
            accounts: {
                pubkey: PublicKey;
                isSigner: boolean;
                isWritable: boolean;
            }[];
            ixData: Buffer;
        };
        stateBump: number;
    };
}
//# sourceMappingURL=VrfInitParams.d.ts.map