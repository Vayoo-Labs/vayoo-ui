import * as borsh from '@coral-xyz/borsh';
export class AggregatorSetHistoryBufferParams {
    constructor(fields) { }
    static layout(property) {
        return borsh.struct([], property);
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    static fromDecoded(obj) {
        return new AggregatorSetHistoryBufferParams({});
    }
    static toEncodable(fields) {
        return {};
    }
    toJSON() {
        return {};
    }
    static fromJSON(obj) {
        return new AggregatorSetHistoryBufferParams({});
    }
    toEncodable() {
        return AggregatorSetHistoryBufferParams.toEncodable(this);
    }
}
//# sourceMappingURL=AggregatorSetHistoryBufferParams.js.map