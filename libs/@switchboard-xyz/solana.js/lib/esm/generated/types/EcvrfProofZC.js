import * as types from '../types'; // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from '@coral-xyz/borsh';
export class EcvrfProofZC {
    constructor(fields) {
        this.gamma = new types.EdwardsPointZC({ ...fields.gamma });
        this.c = new types.Scalar({ ...fields.c });
        this.s = new types.Scalar({ ...fields.s });
    }
    static layout(property) {
        return borsh.struct([
            types.EdwardsPointZC.layout('gamma'),
            types.Scalar.layout('c'),
            types.Scalar.layout('s'),
        ], property);
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    static fromDecoded(obj) {
        return new EcvrfProofZC({
            gamma: types.EdwardsPointZC.fromDecoded(obj.gamma),
            c: types.Scalar.fromDecoded(obj.c),
            s: types.Scalar.fromDecoded(obj.s),
        });
    }
    static toEncodable(fields) {
        return {
            gamma: types.EdwardsPointZC.toEncodable(fields.gamma),
            c: types.Scalar.toEncodable(fields.c),
            s: types.Scalar.toEncodable(fields.s),
        };
    }
    toJSON() {
        return {
            gamma: this.gamma.toJSON(),
            c: this.c.toJSON(),
            s: this.s.toJSON(),
        };
    }
    static fromJSON(obj) {
        return new EcvrfProofZC({
            gamma: types.EdwardsPointZC.fromJSON(obj.gamma),
            c: types.Scalar.fromJSON(obj.c),
            s: types.Scalar.fromJSON(obj.s),
        });
    }
    toEncodable() {
        return EcvrfProofZC.toEncodable(this);
    }
}
//# sourceMappingURL=EcvrfProofZC.js.map