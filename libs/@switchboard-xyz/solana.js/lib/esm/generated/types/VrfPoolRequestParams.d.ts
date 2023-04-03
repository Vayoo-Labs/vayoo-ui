/// <reference types="node" />
import { PublicKey } from '@solana/web3.js';
import * as types from '../types';
export interface VrfPoolRequestParamsFields {
    callback: types.CallbackFields | null;
}
export interface VrfPoolRequestParamsJSON {
    callback: types.CallbackJSON | null;
}
export declare class VrfPoolRequestParams {
    readonly callback: types.Callback | null;
    constructor(fields: VrfPoolRequestParamsFields);
    static layout(property?: string): any;
    static fromDecoded(obj: any): types.VrfPoolRequestParams;
    static toEncodable(fields: VrfPoolRequestParamsFields): {
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
    toJSON(): VrfPoolRequestParamsJSON;
    static fromJSON(obj: VrfPoolRequestParamsJSON): VrfPoolRequestParams;
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
//# sourceMappingURL=VrfPoolRequestParams.d.ts.map