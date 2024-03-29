import * as borsh from '@coral-xyz/borsh';
export class VrfProveParams {
    constructor(fields) {
        this.proof = fields.proof;
        this.idx = fields.idx;
    }
    static layout(property) {
        return borsh.struct([borsh.vecU8('proof'), borsh.u32('idx')], property);
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    static fromDecoded(obj) {
        return new VrfProveParams({
            proof: new Uint8Array(obj.proof.buffer, obj.proof.byteOffset, obj.proof.length),
            idx: obj.idx,
        });
    }
    static toEncodable(fields) {
        return {
            proof: Buffer.from(fields.proof.buffer, fields.proof.byteOffset, fields.proof.length),
            idx: fields.idx,
        };
    }
    toJSON() {
        return {
            proof: Array.from(this.proof.values()),
            idx: this.idx,
        };
    }
    static fromJSON(obj) {
        return new VrfProveParams({
            proof: Uint8Array.from(obj.proof),
            idx: obj.idx,
        });
    }
    toEncodable() {
        return VrfProveParams.toEncodable(this);
    }
}
//# sourceMappingURL=VrfProveParams.js.map