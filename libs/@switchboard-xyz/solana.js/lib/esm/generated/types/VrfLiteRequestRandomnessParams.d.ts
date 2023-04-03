/// <reference types="node" />
import { PublicKey } from '@solana/web3.js';
import * as types from '../types';
export interface VrfLiteRequestRandomnessParamsFields {
    callback: types.CallbackFields | null;
}
export interface VrfLiteRequestRandomnessParamsJSON {
    callback: types.CallbackJSON | null;
}
export declare class VrfLiteRequestRandomnessParams {
    readonly callback: types.Callback | null;
    constructor(fields: VrfLiteRequestRandomnessParamsFields);
    static layout(property?: string): any;
    static fromDecoded(obj: any): types.VrfLiteRequestRandomnessParams;
    static toEncodable(fields: VrfLiteRequestRandomnessParamsFields): {
        callback: {
            programId: PublicKey;
            accounts: {
                pubkey: PublicKey;
                isSigner: boolean;
                isWritable: boolean;
            }[];
            ixData: Buffer;
        } | null;
    };
    toJSON(): VrfLiteRequestRandomnessParamsJSON;
    static fromJSON(obj: VrfLiteRequestRandomnessParamsJSON): VrfLiteRequestRandomnessParams;
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
    };
}
//# sourceMappingURL=VrfLiteRequestRandomnessParams.d.ts.map