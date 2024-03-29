import { PublicKey } from '@solana/web3.js'; // eslint-disable-line @typescript-eslint/no-unused-vars
import { BN } from '@switchboard-xyz/common'; // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from '@coral-xyz/borsh';
export class VrfPoolRow {
    constructor(fields) {
        this.timestamp = fields.timestamp;
        this.pubkey = fields.pubkey;
    }
    static layout(property) {
        return borsh.struct([borsh.i64('timestamp'), borsh.publicKey('pubkey')], property);
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    static fromDecoded(obj) {
        return new VrfPoolRow({
            timestamp: obj.timestamp,
            pubkey: obj.pubkey,
        });
    }
    static toEncodable(fields) {
        return {
            timestamp: fields.timestamp,
            pubkey: fields.pubkey,
        };
    }
    toJSON() {
        return {
            timestamp: this.timestamp.toString(),
            pubkey: this.pubkey.toString(),
        };
    }
    static fromJSON(obj) {
        return new VrfPoolRow({
            timestamp: new BN(obj.timestamp),
            pubkey: new PublicKey(obj.pubkey),
        });
    }
    toEncodable() {
        return VrfPoolRow.toEncodable(this);
    }
}
//# sourceMappingURL=VrfPoolRow.js.map