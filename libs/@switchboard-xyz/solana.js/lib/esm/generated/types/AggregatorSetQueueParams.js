import * as borsh from '@coral-xyz/borsh';
export class AggregatorSetQueueParams {
    constructor(fields) { }
    static layout(property) {
        return borsh.struct([], property);
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    static fromDecoded(obj) {
        return new AggregatorSetQueueParams({});
    }
    static toEncodable(fields) {
        return {};
    }
    toJSON() {
        return {};
    }
    static fromJSON(obj) {
        return new AggregatorSetQueueParams({});
    }
    toEncodable() {
        return AggregatorSetQueueParams.toEncodable(this);
    }
}
//# sourceMappingURL=AggregatorSetQueueParams.js.map