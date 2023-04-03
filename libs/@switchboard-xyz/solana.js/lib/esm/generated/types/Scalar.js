import * as borsh from '@coral-xyz/borsh';
/**
 * The `Scalar` struct holds an integer \\(s < 2\^{255} \\) which
 * represents an element of \\(\mathbb Z / \ell\\).
 */
export class Scalar {
    constructor(fields) {
        this.bytes = fields.bytes;
    }
    static layout(property) {
        return borsh.struct([borsh.array(borsh.u8(), 32, 'bytes')], property);
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    static fromDecoded(obj) {
        return new Scalar({
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
            bytes: this.bytes,
        };
    }
    static fromJSON(obj) {
        return new Scalar({
            bytes: obj.bytes,
        });
    }
    toEncodable() {
        return Scalar.toEncodable(this);
    }
}
//# sourceMappingURL=Scalar.js.map