import * as types from '../types'; // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from '@coral-xyz/borsh';
export class ProjectivePointZC {
    constructor(fields) {
        this.x = new types.FieldElementZC({ ...fields.x });
        this.y = new types.FieldElementZC({ ...fields.y });
        this.z = new types.FieldElementZC({ ...fields.z });
    }
    static layout(property) {
        return borsh.struct([
            types.FieldElementZC.layout('x'),
            types.FieldElementZC.layout('y'),
            types.FieldElementZC.layout('z'),
        ], property);
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    static fromDecoded(obj) {
        return new ProjectivePointZC({
            x: types.FieldElementZC.fromDecoded(obj.x),
            y: types.FieldElementZC.fromDecoded(obj.y),
            z: types.FieldElementZC.fromDecoded(obj.z),
        });
    }
    static toEncodable(fields) {
        return {
            x: types.FieldElementZC.toEncodable(fields.x),
            y: types.FieldElementZC.toEncodable(fields.y),
            z: types.FieldElementZC.toEncodable(fields.z),
        };
    }
    toJSON() {
        return {
            x: this.x.toJSON(),
            y: this.y.toJSON(),
            z: this.z.toJSON(),
        };
    }
    static fromJSON(obj) {
        return new ProjectivePointZC({
            x: types.FieldElementZC.fromJSON(obj.x),
            y: types.FieldElementZC.fromJSON(obj.y),
            z: types.FieldElementZC.fromJSON(obj.z),
        });
    }
    toEncodable() {
        return ProjectivePointZC.toEncodable(this);
    }
}
//# sourceMappingURL=ProjectivePointZC.js.map