import { BN } from '@switchboard-xyz/common'; // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from '@coral-xyz/borsh';
export class VrfRound {
    constructor(fields) {
        this.alpha = fields.alpha;
        this.alphaLen = fields.alphaLen;
        this.requestSlot = fields.requestSlot;
        this.requestTimestamp = fields.requestTimestamp;
        this.result = fields.result;
        this.numVerified = fields.numVerified;
        this.ebuf = fields.ebuf;
    }
    static layout(property) {
        return borsh.struct([
            borsh.array(borsh.u8(), 256, 'alpha'),
            borsh.u32('alphaLen'),
            borsh.u64('requestSlot'),
            borsh.i64('requestTimestamp'),
            borsh.array(borsh.u8(), 32, 'result'),
            borsh.u32('numVerified'),
            borsh.array(borsh.u8(), 256, 'ebuf'),
        ], property);
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    static fromDecoded(obj) {
        return new VrfRound({
            alpha: obj.alpha,
            alphaLen: obj.alphaLen,
            requestSlot: obj.requestSlot,
            requestTimestamp: obj.requestTimestamp,
            result: obj.result,
            numVerified: obj.numVerified,
            ebuf: obj.ebuf,
        });
    }
    static toEncodable(fields) {
        return {
            alpha: fields.alpha,
            alphaLen: fields.alphaLen,
            requestSlot: fields.requestSlot,
            requestTimestamp: fields.requestTimestamp,
            result: fields.result,
            numVerified: fields.numVerified,
            ebuf: fields.ebuf,
        };
    }
    toJSON() {
        return {
            alpha: this.alpha,
            alphaLen: this.alphaLen,
            requestSlot: this.requestSlot.toString(),
            requestTimestamp: this.requestTimestamp.toString(),
            result: this.result,
            numVerified: this.numVerified,
            ebuf: this.ebuf,
        };
    }
    static fromJSON(obj) {
        return new VrfRound({
            alpha: obj.alpha,
            alphaLen: obj.alphaLen,
            requestSlot: new BN(obj.requestSlot),
            requestTimestamp: new BN(obj.requestTimestamp),
            result: obj.result,
            numVerified: obj.numVerified,
            ebuf: obj.ebuf,
        });
    }
    toEncodable() {
        return VrfRound.toEncodable(this);
    }
}
//# sourceMappingURL=VrfRound.js.map