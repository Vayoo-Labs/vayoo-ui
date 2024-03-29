import { PublicKey } from '@solana/web3.js';
import * as types from '../types';
export interface AccountMetaBorshFields {
    pubkey: PublicKey;
    isSigner: boolean;
    isWritable: boolean;
}
export interface AccountMetaBorshJSON {
    pubkey: string;
    isSigner: boolean;
    isWritable: boolean;
}
export declare class AccountMetaBorsh {
    readonly pubkey: PublicKey;
    readonly isSigner: boolean;
    readonly isWritable: boolean;
    constructor(fields: AccountMetaBorshFields);
    static layout(property?: string): any;
    static fromDecoded(obj: any): types.AccountMetaBorsh;
    static toEncodable(fields: AccountMetaBorshFields): {
        pubkey: PublicKey;
        isSigner: boolean;
        isWritable: boolean;
    };
    toJSON(): AccountMetaBorshJSON;
    static fromJSON(obj: AccountMetaBorshJSON): AccountMetaBorsh;
    toEncodable(): {
        pubkey: PublicKey;
        isSigner: boolean;
        isWritable: boolean;
    };
}
//# sourceMappingURL=AccountMetaBorsh.d.ts.map