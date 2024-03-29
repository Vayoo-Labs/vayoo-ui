import * as borsh from '@coral-xyz/borsh';
import { SYSVAR_CLOCK_PUBKEY } from '@solana/web3.js';
export class SolanaClock {
    constructor(fields) {
        this.slot = fields.slot;
        this.epochStartTimestamp = fields.epochStartTimestamp;
        this.epoch = fields.epoch;
        this.leaderScheduleEpoch = fields.epochStartTimestamp;
        this.unixTimestamp = fields.unixTimestamp;
    }
    static decode(data) {
        const dec = SolanaClock.layout.decode(data);
        return new SolanaClock({
            slot: dec.slot,
            epochStartTimestamp: dec.epochStartTimestamp,
            epoch: dec.epoch,
            leaderScheduleEpoch: dec.leaderScheduleEpoch,
            unixTimestamp: dec.unixTimestamp,
        });
    }
    static decodeUnixTimestamp(data) {
        return borsh.u64('unixTimestamp').decode(data, data.byteLength - 8);
    }
    static async fetch(connection) {
        const sysclockInfo = await connection.getAccountInfo(SYSVAR_CLOCK_PUBKEY);
        if (!sysclockInfo) {
            throw new Error(`Failed to fetch SYSVAR_CLOCK AccountInfo`);
        }
        const clock = SolanaClock.decode(sysclockInfo.data);
        return clock;
    }
}
SolanaClock.layout = borsh.struct([
    borsh.u64('slot'),
    borsh.i64('epochStartTimestamp'),
    borsh.u64('epoch'),
    borsh.u64('leaderScheduleEpoch'),
    borsh.i64('unixTimestamp'),
]);
//# sourceMappingURL=SolanaClock.js.map