import * as borsh from '@coral-xyz/borsh';
export class PermissionInitParams {
    constructor(fields) { }
    static layout(property) {
        return borsh.struct([], property);
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    static fromDecoded(obj) {
        return new PermissionInitParams({});
    }
    static toEncodable(fields) {
        return {};
    }
    toJSON() {
        return {};
    }
    static fromJSON(obj) {
        return new PermissionInitParams({});
    }
    toEncodable() {
        return PermissionInitParams.toEncodable(this);
    }
}
//# sourceMappingURL=PermissionInitParams.js.map