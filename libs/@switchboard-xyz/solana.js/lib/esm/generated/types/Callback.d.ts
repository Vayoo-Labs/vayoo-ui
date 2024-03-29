/// <reference types="node" />
import { PublicKey } from '@solana/web3.js';
import * as types from '../types';
export interface CallbackFields {
    programId: PublicKey;
    accounts: Array<types.AccountMetaBorshFields>;
    ixData: Uint8Array;
}
export interface CallbackJSON {
    programId: string;
    accounts: Array<types.AccountMetaBorshJSON>;
    ixData: Array<number>;
}
export declare class Callback {
    readonly programId: PublicKey;
    readonly accounts: Array<types.AccountMetaBorsh>;
    readonly ixData: Uint8Array;
    constructor(fields: CallbackFields);
    static layout(property?: string): any;
    static fromDecoded(obj: any): types.Callback;
    static toEncodable(fields: CallbackFields): {
        programId: PublicKey;
        accounts: {
            pubkey: PublicKey;
            isSigner: boolean;
            isWritable: boolean;
        }[];
        ixData: Buffer;
    };
    toJSON(): CallbackJSON;
    static fromJSON(obj: CallbackJSON): Callback;
    toEncodable(): {
        programId: PublicKey;
        accounts: {
            pubkey: PublicKey;
            isSigner: boolean;
            isWritable: boolean;
        }[];
        ixData: Buffer;
    };
}
//# sourceMappingURL=Callback.d.ts.map