import * as borsh from '@coral-xyz/borsh';
export class AggregatorSetMinJobsParams {
    constructor(fields) {
        this.minJobResults = fields.minJobResults;
    }
    static layout(property) {
        return borsh.struct([borsh.u32('minJobResults')], property);
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    static fromDecoded(obj) {
        return new AggregatorSetMinJobsParams({
            minJobResults: obj.minJobResults,
        });
    }
    static toEncodable(fields) {
        return {
            minJobResults: fields.minJobResults,
        };
    }
    toJSON() {
        return {
            minJobResults: this.minJobResults,
        };
    }
    static fromJSON(obj) {
        return new AggregatorSetMinJobsParams({
            minJobResults: obj.minJobResults,
        });
    }
    toEncodable() {
        return AggregatorSetMinJobsParams.toEncodable(this);
    }
}
//# sourceMappingURL=AggregatorSetMinJobsParams.js.map