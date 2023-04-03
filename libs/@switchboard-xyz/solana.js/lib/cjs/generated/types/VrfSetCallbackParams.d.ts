/// <reference types="node" />
import { PublicKey } from '@solana/web3.js';
import * as types from '../types';
export interface VrfSetCallbackParamsFields {
    callback: types.CallbackFields;
}
export interface VrfSetCallbackParamsJSON {
    callback: types.CallbackJSON;
}
export declare class VrfSetCallbackParams {
    readonly callback: types.Callback;
    constructor(fields: VrfSetCallbackParamsFields);
    static layout(property?: string): any;
    static fromDecoded(obj: any): types.VrfSetCallbackParams;
    static toEncodable(fields: VrfSetCallbackParamsFields): {
        callback: {
            programId: PublicKey;
            accounts: {
                pubkey: PublicKey;
                isSigner: boolean;
                isWritable: boolean;
            }[];
            ixData: Buffer;
        };
    };
    toJSON(): VrfSetCallbackParamsJSON;
    static fromJSON(obj: VrfSetCallbackParamsJSON): VrfSetCallbackParams;
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
    };
}
//# sourceMappingURL=VrfSetCallbackParams.d.ts.map