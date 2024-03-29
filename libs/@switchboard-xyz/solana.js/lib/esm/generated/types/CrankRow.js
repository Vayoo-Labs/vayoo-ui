import { PublicKey } from '@solana/web3.js'; // eslint-disable-line @typescript-eslint/no-unused-vars
import { BN } from '@switchboard-xyz/common'; // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from '@coral-xyz/borsh';
export class CrankRow {
    constructor(fields) {
        this.pubkey = fields.pubkey;
        this.nextTimestamp = fields.nextTimestamp;
    }
    static layout(property) {
        return borsh.struct([borsh.publicKey('pubkey'), borsh.i64('nextTimestamp')], property);
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    static fromDecoded(obj) {
        return new CrankRow({
            pubkey: obj.pubkey,
            nextTimestamp: obj.nextTimestamp,
        });
    }
    static toEncodable(fields) {
        return {
            pubkey: fields.pubkey,
            nextTimestamp: fields.nextTimestamp,
        };
    }
    toJSON() {
        return {
            pubkey: this.pubkey.toString(),
            nextTimestamp: this.nextTimestamp.toString(),
        };
    }
    static fromJSON(obj) {
        return new CrankRow({
            pubkey: new PublicKey(obj.pubkey),
            nextTimestamp: new BN(obj.nextTimestamp),
        });
    }
    toEncodable() {
        return CrankRow.toEncodable(this);
    }
}
//# sourceMappingURL=CrankRow.js.map