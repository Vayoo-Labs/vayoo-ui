import * as borsh from '@coral-xyz/borsh';
export class JobSetDataParams {
    constructor(fields) {
        this.data = fields.data;
        this.chunkIdx = fields.chunkIdx;
    }
    static layout(property) {
        return borsh.struct([borsh.vecU8('data'), borsh.u8('chunkIdx')], property);
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    static fromDecoded(obj) {
        return new JobSetDataParams({
            data: new Uint8Array(obj.data.buffer, obj.data.byteOffset, obj.data.length),
            chunkIdx: obj.chunkIdx,
        });
    }
    static toEncodable(fields) {
        return {
            data: Buffer.from(fields.data.buffer, fields.data.byteOffset, fields.data.length),
            chunkIdx: fields.chunkIdx,
        };
    }
    toJSON() {
        return {
            data: Array.from(this.data.values()),
            chunkIdx: this.chunkIdx,
        };
    }
    static fromJSON(obj) {
        return new JobSetDataParams({
            data: Uint8Array.from(obj.data),
            chunkIdx: obj.chunkIdx,
        });
    }
    toEncodable() {
        return JobSetDataParams.toEncodable(this);
    }
}
//# sourceMappingURL=JobSetDataParams.js.map