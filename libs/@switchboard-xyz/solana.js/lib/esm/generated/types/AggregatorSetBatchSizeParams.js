import * as borsh from '@coral-xyz/borsh';
export class AggregatorSetBatchSizeParams {
    constructor(fields) {
        this.batchSize = fields.batchSize;
    }
    static layout(property) {
        return borsh.struct([borsh.u32('batchSize')], property);
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    static fromDecoded(obj) {
        return new AggregatorSetBatchSizeParams({
            batchSize: obj.batchSize,
        });
    }
    static toEncodable(fields) {
        return {
            batchSize: fields.batchSize,
        };
    }
    toJSON() {
        return {
            batchSize: this.batchSize,
        };
    }
    static fromJSON(obj) {
        return new AggregatorSetBatchSizeParams({
            batchSize: obj.batchSize,
        });
    }
    toEncodable() {
        return AggregatorSetBatchSizeParams.toEncodable(this);
    }
}
//# sourceMappingURL=AggregatorSetBatchSizeParams.js.map