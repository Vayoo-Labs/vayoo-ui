import { BN } from '@switchboard-xyz/common'; // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from '@coral-xyz/borsh';
export class VrfProveAndVerifyParams {
    constructor(fields) {
        this.nonce = fields.nonce;
        this.stateBump = fields.stateBump;
        this.idx = fields.idx;
        this.proof = fields.proof;
        this.proofEncoded = fields.proofEncoded;
        this.counter = fields.counter;
    }
    static layout(property) {
        return borsh.struct([
            borsh.option(borsh.u32(), 'nonce'),
            borsh.u8('stateBump'),
            borsh.u32('idx'),
            borsh.vecU8('proof'),
            borsh.str('proofEncoded'),
            borsh.u128('counter'),
        ], property);
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    static fromDecoded(obj) {
        return new VrfProveAndVerifyParams({
            nonce: obj.nonce,
            stateBump: obj.stateBump,
            idx: obj.idx,
            proof: new Uint8Array(obj.proof.buffer, obj.proof.byteOffset, obj.proof.length),
            proofEncoded: obj.proofEncoded,
            counter: obj.counter,
        });
    }
    static toEncodable(fields) {
        return {
            nonce: fields.nonce,
            stateBump: fields.stateBump,
            idx: fields.idx,
            proof: Buffer.from(fields.proof.buffer, fields.proof.byteOffset, fields.proof.length),
            proofEncoded: fields.proofEncoded,
            counter: fields.counter,
        };
    }
    toJSON() {
        return {
            nonce: this.nonce,
            stateBump: this.stateBump,
            idx: this.idx,
            proof: Array.from(this.proof.values()),
            proofEncoded: this.proofEncoded,
            counter: this.counter.toString(),
        };
    }
    static fromJSON(obj) {
        return new VrfProveAndVerifyParams({
            nonce: obj.nonce,
            stateBump: obj.stateBump,
            idx: obj.idx,
            proof: Uint8Array.from(obj.proof),
            proofEncoded: obj.proofEncoded,
            counter: new BN(obj.counter),
        });
    }
    toEncodable() {
        return VrfProveAndVerifyParams.toEncodable(this);
    }
}
//# sourceMappingURL=VrfProveAndVerifyParams.js.map