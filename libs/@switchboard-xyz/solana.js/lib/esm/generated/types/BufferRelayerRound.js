import { PublicKey } from '@solana/web3.js'; // eslint-disable-line @typescript-eslint/no-unused-vars
import { BN } from '@switchboard-xyz/common'; // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from '@coral-xyz/borsh';
export class BufferRelayerRound {
    constructor(fields) {
        this.numSuccess = fields.numSuccess;
        this.numError = fields.numError;
        this.roundOpenSlot = fields.roundOpenSlot;
        this.roundOpenTimestamp = fields.roundOpenTimestamp;
        this.oraclePubkey = fields.oraclePubkey;
    }
    static layout(property) {
        return borsh.struct([
            borsh.u32('numSuccess'),
            borsh.u32('numError'),
            borsh.u64('roundOpenSlot'),
            borsh.i64('roundOpenTimestamp'),
            borsh.publicKey('oraclePubkey'),
        ], property);
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    static fromDecoded(obj) {
        return new BufferRelayerRound({
            numSuccess: obj.numSuccess,
            numError: obj.numError,
            roundOpenSlot: obj.roundOpenSlot,
            roundOpenTimestamp: obj.roundOpenTimestamp,
            oraclePubkey: obj.oraclePubkey,
        });
    }
    static toEncodable(fields) {
        return {
            numSuccess: fields.numSuccess,
            numError: fields.numError,
            roundOpenSlot: fields.roundOpenSlot,
            roundOpenTimestamp: fields.roundOpenTimestamp,
            oraclePubkey: fields.oraclePubkey,
        };
    }
    toJSON() {
        return {
            numSuccess: this.numSuccess,
            numError: this.numError,
            roundOpenSlot: this.roundOpenSlot.toString(),
            roundOpenTimestamp: this.roundOpenTimestamp.toString(),
            oraclePubkey: this.oraclePubkey.toString(),
        };
    }
    static fromJSON(obj) {
        return new BufferRelayerRound({
            numSuccess: obj.numSuccess,
            numError: obj.numError,
            roundOpenSlot: new BN(obj.roundOpenSlot),
            roundOpenTimestamp: new BN(obj.roundOpenTimestamp),
            oraclePubkey: new PublicKey(obj.oraclePubkey),
        });
    }
    toEncodable() {
        return BufferRelayerRound.toEncodable(this);
    }
}
//# sourceMappingURL=BufferRelayerRound.js.map