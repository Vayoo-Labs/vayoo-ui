import * as borsh from '@coral-xyz/borsh';
export class AggregatorLockParams {
    constructor(fields) { }
    static layout(property) {
        return borsh.struct([], property);
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    static fromDecoded(obj) {
        return new AggregatorLockParams({});
    }
    static toEncodable(fields) {
        return {};
    }
    toJSON() {
        return {};
    }
    static fromJSON(obj) {
        return new AggregatorLockParams({});
    }
    toEncodable() {
        return AggregatorLockParams.toEncodable(this);
    }
}
//# sourceMappingURL=AggregatorLockParams.js.map