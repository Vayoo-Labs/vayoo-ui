/// <reference types="node" />
import * as anchor from '@coral-xyz/anchor';
import { Connection } from '@solana/web3.js';
export interface SolanaClockDataFields {
    slot: anchor.BN;
    epochStartTimestamp: anchor.BN;
    epoch: anchor.BN;
    leaderScheduleEpoch: anchor.BN;
    unixTimestamp: anchor.BN;
}
export declare class SolanaClock {
    slot: anchor.BN;
    epochStartTimestamp: anchor.BN;
    epoch: anchor.BN;
    leaderScheduleEpoch: anchor.BN;
    unixTimestamp: anchor.BN;
    static readonly layout: any;
    constructor(fields: SolanaClockDataFields);
    static decode(data: Buffer): SolanaClock;
    static decodeUnixTimestamp(data: Buffer): anchor.BN;
    static fetch(connection: Connection): Promise<SolanaClock>;
}
//# sourceMappingURL=SolanaClock.d.ts.map