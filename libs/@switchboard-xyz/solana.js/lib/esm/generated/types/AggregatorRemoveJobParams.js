import * as borsh from '@coral-xyz/borsh';
export class AggregatorRemoveJobParams {
    constructor(fields) {
        this.jobIdx = fields.jobIdx;
    }
    static layout(property) {
        return borsh.struct([borsh.u32('jobIdx')], property);
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    static fromDecoded(obj) {
        return new AggregatorRemoveJobParams({
            jobIdx: obj.jobIdx,
        });
    }
    static toEncodable(fields) {
        return {
            jobIdx: fields.jobIdx,
        };
    }
    toJSON() {
        return {
            jobIdx: this.jobIdx,
        };
    }
    static fromJSON(obj) {
        return new AggregatorRemoveJobParams({
            jobIdx: obj.jobIdx,
        });
    }
    toEncodable() {
        return AggregatorRemoveJobParams.toEncodable(this);
    }
}
//# sourceMappingURL=AggregatorRemoveJobParams.js.map