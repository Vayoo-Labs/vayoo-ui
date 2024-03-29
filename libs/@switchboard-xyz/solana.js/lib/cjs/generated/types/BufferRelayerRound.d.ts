import { PublicKey } from '@solana/web3.js';
import { BN } from '@switchboard-xyz/common';
import * as types from '../types';
export interface BufferRelayerRoundFields {
    /** Number of successful responses. */
    numSuccess: number;
    /** Number of error responses. */
    numError: number;
    /** Slot when the buffer relayer round was opened. */
    roundOpenSlot: BN;
    /** Timestamp when the buffer relayer round was opened. */
    roundOpenTimestamp: BN;
    /** The public key of the oracle fulfilling the buffer relayer update request. */
    oraclePubkey: PublicKey;
}
export interface BufferRelayerRoundJSON {
    /** Number of successful responses. */
    numSuccess: number;
    /** Number of error responses. */
    numError: number;
    /** Slot when the buffer relayer round was opened. */
    roundOpenSlot: string;
    /** Timestamp when the buffer relayer round was opened. */
    roundOpenTimestamp: string;
    /** The public key of the oracle fulfilling the buffer relayer update request. */
    oraclePubkey: string;
}
export declare class BufferRelayerRound {
    /** Number of successful responses. */
    readonly numSuccess: number;
    /** Number of error responses. */
    readonly numError: number;
    /** Slot when the buffer relayer round was opened. */
    readonly roundOpenSlot: BN;
    /** Timestamp when the buffer relayer round was opened. */
    readonly roundOpenTimestamp: BN;
    /** The public key of the oracle fulfilling the buffer relayer update request. */
    readonly oraclePubkey: PublicKey;
    constructor(fields: BufferRelayerRoundFields);
    static layout(property?: string): any;
    static fromDecoded(obj: any): types.BufferRelayerRound;
    static toEncodable(fields: BufferRelayerRoundFields): {
        numSuccess: number;
        numError: number;
        roundOpenSlot: BN;
        roundOpenTimestamp: BN;
        oraclePubkey: PublicKey;
    };
    toJSON(): BufferRelayerRoundJSON;
    static fromJSON(obj: BufferRelayerRoundJSON): BufferRelayerRound;
    toEncodable(): {
        numSuccess: number;
        numError: number;
        roundOpenSlot: BN;
        roundOpenTimestamp: BN;
        oraclePubkey: PublicKey;
    };
}
//# sourceMappingURL=BufferRelayerRound.d.ts.map