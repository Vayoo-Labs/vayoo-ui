import { PublicKey } from '@solana/web3.js';
import * as types from '../types';
export interface CallbackZCFields {
    /** The program ID of the callback program being invoked. */
    programId: PublicKey;
    /** The accounts being used in the callback instruction. */
    accounts: Array<types.AccountMetaZCFields>;
    /** The number of accounts used in the callback */
    accountsLen: number;
    /** The serialized instruction data. */
    ixData: Array<number>;
    /** The number of serialized bytes in the instruction data. */
    ixDataLen: number;
}
export interface CallbackZCJSON {
    /** The program ID of the callback program being invoked. */
    programId: string;
    /** The accounts being used in the callback instruction. */
    accounts: Array<types.AccountMetaZCJSON>;
    /** The number of accounts used in the callback */
    accountsLen: number;
    /** The serialized instruction data. */
    ixData: Array<number>;
    /** The number of serialized bytes in the instruction data. */
    ixDataLen: number;
}
export declare class CallbackZC {
    /** The program ID of the callback program being invoked. */
    readonly programId: PublicKey;
    /** The accounts being used in the callback instruction. */
    readonly accounts: Array<types.AccountMetaZC>;
    /** The number of accounts used in the callback */
    readonly accountsLen: number;
    /** The serialized instruction data. */
    readonly ixData: Array<number>;
    /** The number of serialized bytes in the instruction data. */
    readonly ixDataLen: number;
    constructor(fields: CallbackZCFields);
    static layout(property?: string): any;
    static fromDecoded(obj: any): types.CallbackZC;
    static toEncodable(fields: CallbackZCFields): {
        programId: PublicKey;
        accounts: {
            pubkey: PublicKey;
            isSigner: boolean;
            isWritable: boolean;
        }[];
        accountsLen: number;
        ixData: number[];
        ixDataLen: number;
    };
    toJSON(): CallbackZCJSON;
    static fromJSON(obj: CallbackZCJSON): CallbackZC;
    toEncodable(): {
        programId: PublicKey;
        accounts: {
            pubkey: PublicKey;
            isSigner: boolean;
            isWritable: boolean;
        }[];
        accountsLen: number;
        ixData: number[];
        ixDataLen: number;
    };
}
//# sourceMappingURL=CallbackZC.d.ts.map