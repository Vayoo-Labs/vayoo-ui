import { BN } from '@switchboard-xyz/common'; // eslint-disable-line @typescript-eslint/no-unused-vars
import * as types from '../types'; // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from '@coral-xyz/borsh';
export class AggregatorHistoryRow {
    constructor(fields) {
        this.timestamp = fields.timestamp;
        this.value = new types.SwitchboardDecimal({ ...fields.value });
    }
    static layout(property) {
        return borsh.struct([borsh.i64('timestamp'), types.SwitchboardDecimal.layout('value')], property);
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    static fromDecoded(obj) {
        return new AggregatorHistoryRow({
            timestamp: obj.timestamp,
            value: types.SwitchboardDecimal.fromDecoded(obj.value),
        });
    }
    static toEncodable(fields) {
        return {
            timestamp: fields.timestamp,
            value: types.SwitchboardDecimal.toEncodable(fields.value),
        };
    }
    toJSON() {
        return {
            timestamp: this.timestamp.toString(),
            value: this.value.toJSON(),
        };
    }
    static fromJSON(obj) {
        return new AggregatorHistoryRow({
            timestamp: new BN(obj.timestamp),
            value: types.SwitchboardDecimal.fromJSON(obj.value),
        });
    }
    toEncodable() {
        return AggregatorHistoryRow.toEncodable(this);
    }
}
//# sourceMappingURL=AggregatorHistoryRow.js.map