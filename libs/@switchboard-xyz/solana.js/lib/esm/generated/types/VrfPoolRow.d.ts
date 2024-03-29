import { PublicKey } from '@solana/web3.js';
import { BN } from '@switchboard-xyz/common';
import * as types from '../types';
export interface VrfPoolRowFields {
    timestamp: BN;
    pubkey: PublicKey;
}
export interface VrfPoolRowJSON {
    timestamp: string;
    pubkey: string;
}
export declare class VrfPoolRow {
    readonly timestamp: BN;
    readonly pubkey: PublicKey;
    constructor(fields: VrfPoolRowFields);
    static layout(property?: string): any;
    static fromDecoded(obj: any): types.VrfPoolRow;
    static toEncodable(fields: VrfPoolRowFields): {
        timestamp: BN;
        pubkey: PublicKey;
    };
    toJSON(): VrfPoolRowJSON;
    static fromJSON(obj: VrfPoolRowJSON): VrfPoolRow;
    toEncodable(): {
        timestamp: BN;
        pubkey: PublicKey;
    };
}
//# sourceMappingURL=VrfPoolRow.d.ts.map