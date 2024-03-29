import * as borsh from '@coral-xyz/borsh';
export class Hash {
    constructor(fields) {
        this.data = fields.data;
    }
    static layout(property) {
        return borsh.struct([borsh.array(borsh.u8(), 32, 'data')], property);
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    static fromDecoded(obj) {
        return new Hash({
            data: obj.data,
        });
    }
    static toEncodable(fields) {
        return {
            data: fields.data,
        };
    }
    toJSON() {
        return {
            data: this.data,
        };
    }
    static fromJSON(obj) {
        return new Hash({
            data: obj.data,
        });
    }
    toEncodable() {
        return Hash.toEncodable(this);
    }
}
//# sourceMappingURL=Hash.js.map