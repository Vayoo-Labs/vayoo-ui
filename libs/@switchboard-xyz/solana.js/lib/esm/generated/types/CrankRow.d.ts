import { PublicKey } from '@solana/web3.js';
import { BN } from '@switchboard-xyz/common';
import * as types from '../types';
export interface CrankRowFields {
    /** The PublicKey of the AggregatorAccountData. */
    pubkey: PublicKey;
    /** The aggregator's next available update time. */
    nextTimestamp: BN;
}
export interface CrankRowJSON {
    /** The PublicKey of the AggregatorAccountData. */
    pubkey: string;
    /** The aggregator's next available update time. */
    nextTimestamp: string;
}
export declare class CrankRow {
    /** The PublicKey of the AggregatorAccountData. */
    readonly pubkey: PublicKey;
    /** The aggregator's next available update time. */
    readonly nextTimestamp: BN;
    constructor(fields: CrankRowFields);
    static layout(property?: string): any;
    static fromDecoded(obj: any): types.CrankRow;
    static toEncodable(fields: CrankRowFields): {
        pubkey: PublicKey;
        nextTimestamp: BN;
    };
    toJSON(): CrankRowJSON;
    static fromJSON(obj: CrankRowJSON): CrankRow;
    toEncodable(): {
        pubkey: PublicKey;
        nextTimestamp: BN;
    };
}
//# sourceMappingURL=CrankRow.d.ts.map