import * as types from '../types'; // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from '@coral-xyz/borsh';
export class EcvrfIntermediate {
    constructor(fields) {
        this.r = new types.FieldElementZC({ ...fields.r });
        this.nS = new types.FieldElementZC({ ...fields.nS });
        this.d = new types.FieldElementZC({ ...fields.d });
        this.t13 = new types.FieldElementZC({ ...fields.t13 });
        this.t15 = new types.FieldElementZC({ ...fields.t15 });
    }
    static layout(property) {
        return borsh.struct([
            types.FieldElementZC.layout('r'),
            types.FieldElementZC.layout('nS'),
            types.FieldElementZC.layout('d'),
            types.FieldElementZC.layout('t13'),
            types.FieldElementZC.layout('t15'),
        ], property);
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    static fromDecoded(obj) {
        return new EcvrfIntermediate({
            r: types.FieldElementZC.fromDecoded(obj.r),
            nS: types.FieldElementZC.fromDecoded(obj.nS),
            d: types.FieldElementZC.fromDecoded(obj.d),
            t13: types.FieldElementZC.fromDecoded(obj.t13),
            t15: types.FieldElementZC.fromDecoded(obj.t15),
        });
    }
    static toEncodable(fields) {
        return {
            r: types.FieldElementZC.toEncodable(fields.r),
            nS: types.FieldElementZC.toEncodable(fields.nS),
            d: types.FieldElementZC.toEncodable(fields.d),
            t13: types.FieldElementZC.toEncodable(fields.t13),
            t15: types.FieldElementZC.toEncodable(fields.t15),
        };
    }
    toJSON() {
        return {
            r: this.r.toJSON(),
            nS: this.nS.toJSON(),
            d: this.d.toJSON(),
            t13: this.t13.toJSON(),
            t15: this.t15.toJSON(),
        };
    }
    static fromJSON(obj) {
        return new EcvrfIntermediate({
            r: types.FieldElementZC.fromJSON(obj.r),
            nS: types.FieldElementZC.fromJSON(obj.nS),
            d: types.FieldElementZC.fromJSON(obj.d),
            t13: types.FieldElementZC.fromJSON(obj.t13),
            t15: types.FieldElementZC.fromJSON(obj.t15),
        });
    }
    toEncodable() {
        return EcvrfIntermediate.toEncodable(this);
    }
}
//# sourceMappingURL=EcvrfIntermediate.js.map