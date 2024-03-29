import { PublicKey } from '@solana/web3.js'; // eslint-disable-line @typescript-eslint/no-unused-vars
import { BN } from '@switchboard-xyz/common'; // eslint-disable-line @typescript-eslint/no-unused-vars
import * as types from '../types'; // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from '@coral-xyz/borsh';
export class SlidingWindowElement {
    constructor(fields) {
        this.oracleKey = fields.oracleKey;
        this.value = new types.SwitchboardDecimal({ ...fields.value });
        this.slot = fields.slot;
        this.timestamp = fields.timestamp;
    }
    static layout(property) {
        return borsh.struct([
            borsh.publicKey('oracleKey'),
            types.SwitchboardDecimal.layout('value'),
            borsh.u64('slot'),
            borsh.i64('timestamp'),
        ], property);
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    static fromDecoded(obj) {
        return new SlidingWindowElement({
            oracleKey: obj.oracleKey,
            value: types.SwitchboardDecimal.fromDecoded(obj.value),
            slot: obj.slot,
            timestamp: obj.timestamp,
        });
    }
    static toEncodable(fields) {
        return {
            oracleKey: fields.oracleKey,
            value: types.SwitchboardDecimal.toEncodable(fields.value),
            slot: fields.slot,
            timestamp: fields.timestamp,
        };
    }
    toJSON() {
        return {
            oracleKey: this.oracleKey.toString(),
            value: this.value.toJSON(),
            slot: this.slot.toString(),
            timestamp: this.timestamp.toString(),
        };
    }
    static fromJSON(obj) {
        return new SlidingWindowElement({
            oracleKey: new PublicKey(obj.oracleKey),
            value: types.SwitchboardDecimal.fromJSON(obj.value),
            slot: new BN(obj.slot),
            timestamp: new BN(obj.timestamp),
        });
    }
    toEncodable() {
        return SlidingWindowElement.toEncodable(this);
    }
}
//# sourceMappingURL=SlidingWindowElement.js.map