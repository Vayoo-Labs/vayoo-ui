import { BN } from '@switchboard-xyz/common'; // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from '@coral-xyz/borsh';
export class FieldElementZC {
    constructor(fields) {
        this.bytes = fields.bytes;
    }
    static layout(property) {
        return borsh.struct([borsh.array(borsh.u64(), 5, 'bytes')], property);
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    static fromDecoded(obj) {
        return new FieldElementZC({
            bytes: obj.bytes,
        });
    }
    static toEncodable(fields) {
        return {
            bytes: fields.bytes,
        };
    }
    toJSON() {
        return {
            bytes: this.bytes.map(item => item.toString()),
        };
    }
    static fromJSON(obj) {
        return new FieldElementZC({
            bytes: obj.bytes.map(item => new BN(item)),
        });
    }
    toEncodable() {
        return FieldElementZC.toEncodable(this);
    }
}
//# sourceMappingURL=FieldElementZC.js.map