import * as borsh from '@coral-xyz/borsh';
export class AggregatorSetAuthorityParams {
    constructor(fields) { }
    static layout(property) {
        return borsh.struct([], property);
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    static fromDecoded(obj) {
        return new AggregatorSetAuthorityParams({});
    }
    static toEncodable(fields) {
        return {};
    }
    toJSON() {
        return {};
    }
    static fromJSON(obj) {
        return new AggregatorSetAuthorityParams({});
    }
    toEncodable() {
        return AggregatorSetAuthorityParams.toEncodable(this);
    }
}
//# sourceMappingURL=AggregatorSetAuthorityParams.js.map