import { BN } from '@switchboard-xyz/common'; // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from '@coral-xyz/borsh';
export class VrfLiteProveAndVerifyParams {
    constructor(fields) {
        this.nonce = fields.nonce;
        this.proof = fields.proof;
        this.proofEncoded = fields.proofEncoded;
        this.counter = fields.counter;
    }
    static layout(property) {
        return borsh.struct([
            borsh.option(borsh.u32(), 'nonce'),
            borsh.vecU8('proof'),
            borsh.str('proofEncoded'),
            borsh.u128('counter'),
        ], property);
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    static fromDecoded(obj) {
        return new VrfLiteProveAndVerifyParams({
            nonce: obj.nonce,
            proof: new Uint8Array(obj.proof.buffer, obj.proof.byteOffset, obj.proof.length),
            proofEncoded: obj.proofEncoded,
            counter: obj.counter,
        });
    }
    static toEncodable(fields) {
        return {
            nonce: fields.nonce,
            proof: Buffer.from(fields.proof.buffer, fields.proof.byteOffset, fields.proof.length),
            proofEncoded: fields.proofEncoded,
            counter: fields.counter,
        };
    }
    toJSON() {
        return {
            nonce: this.nonce,
            proof: Array.from(this.proof.values()),
            proofEncoded: this.proofEncoded,
            counter: this.counter.toString(),
        };
    }
    static fromJSON(obj) {
        return new VrfLiteProveAndVerifyParams({
            nonce: obj.nonce,
            proof: Uint8Array.from(obj.proof),
            proofEncoded: obj.proofEncoded,
            counter: new BN(obj.counter),
        });
    }
    toEncodable() {
        return VrfLiteProveAndVerifyParams.toEncodable(this);
    }
}
//# sourceMappingURL=VrfLiteProveAndVerifyParams.js.map