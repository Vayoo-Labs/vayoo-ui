import * as types from '../types'; // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from '@coral-xyz/borsh';
export class CompletedPointZC {
    constructor(fields) {
        this.x = new types.FieldElementZC({ ...fields.x });
        this.y = new types.FieldElementZC({ ...fields.y });
        this.z = new types.FieldElementZC({ ...fields.z });
        this.t = new types.FieldElementZC({ ...fields.t });
    }
    static layout(property) {
        return borsh.struct([
            types.FieldElementZC.layout('x'),
            types.FieldElementZC.layout('y'),
            types.FieldElementZC.layout('z'),
            types.FieldElementZC.layout('t'),
        ], property);
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    static fromDecoded(obj) {
        return new CompletedPointZC({
            x: types.FieldElementZC.fromDecoded(obj.x),
            y: types.FieldElementZC.fromDecoded(obj.y),
            z: types.FieldElementZC.fromDecoded(obj.z),
            t: types.FieldElementZC.fromDecoded(obj.t),
        });
    }
    static toEncodable(fields) {
        return {
            x: types.FieldElementZC.toEncodable(fields.x),
            y: types.FieldElementZC.toEncodable(fields.y),
            z: types.FieldElementZC.toEncodable(fields.z),
            t: types.FieldElementZC.toEncodable(fields.t),
        };
    }
    toJSON() {
        return {
            x: this.x.toJSON(),
            y: this.y.toJSON(),
            z: this.z.toJSON(),
            t: this.t.toJSON(),
        };
    }
    static fromJSON(obj) {
        return new CompletedPointZC({
            x: types.FieldElementZC.fromJSON(obj.x),
            y: types.FieldElementZC.fromJSON(obj.y),
            z: types.FieldElementZC.fromJSON(obj.z),
            t: types.FieldElementZC.fromJSON(obj.t),
        });
    }
    toEncodable() {
        return CompletedPointZC.toEncodable(this);
    }
}
//# sourceMappingURL=CompletedPointZC.js.map