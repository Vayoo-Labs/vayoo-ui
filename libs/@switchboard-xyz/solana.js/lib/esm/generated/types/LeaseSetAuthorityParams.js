import * as borsh from '@coral-xyz/borsh';
export class LeaseSetAuthorityParams {
    constructor(fields) { }
    static layout(property) {
        return borsh.struct([], property);
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    static fromDecoded(obj) {
        return new LeaseSetAuthorityParams({});
    }
    static toEncodable(fields) {
        return {};
    }
    toJSON() {
        return {};
    }
    static fromJSON(obj) {
        return new LeaseSetAuthorityParams({});
    }
    toEncodable() {
        return LeaseSetAuthorityParams.toEncodable(this);
    }
}
//# sourceMappingURL=LeaseSetAuthorityParams.js.map