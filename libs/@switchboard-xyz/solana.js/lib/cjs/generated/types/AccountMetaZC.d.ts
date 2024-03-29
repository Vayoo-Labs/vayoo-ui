import { PublicKey } from '@solana/web3.js';
import * as types from '../types';
export interface AccountMetaZCFields {
    pubkey: PublicKey;
    isSigner: boolean;
    isWritable: boolean;
}
export interface AccountMetaZCJSON {
    pubkey: string;
    isSigner: boolean;
    isWritable: boolean;
}
export declare class AccountMetaZC {
    readonly pubkey: PublicKey;
    readonly isSigner: boolean;
    readonly isWritable: boolean;
    constructor(fields: AccountMetaZCFields);
    static layout(property?: string): any;
    static fromDecoded(obj: any): types.AccountMetaZC;
    static toEncodable(fields: AccountMetaZCFields): {
        pubkey: PublicKey;
        isSigner: boolean;
        isWritable: boolean;
    };
    toJSON(): AccountMetaZCJSON;
    static fromJSON(obj: AccountMetaZCJSON): AccountMetaZC;
    toEncodable(): {
        pubkey: PublicKey;
        isSigner: boolean;
        isWritable: boolean;
    };
}
//# sourceMappingURL=AccountMetaZC.d.ts.map