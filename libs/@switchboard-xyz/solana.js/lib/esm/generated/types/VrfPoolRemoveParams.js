import * as borsh from '@coral-xyz/borsh';
export class VrfPoolRemoveParams {
    constructor(fields) { }
    static layout(property) {
        return borsh.struct([], property);
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    static fromDecoded(obj) {
        return new VrfPoolRemoveParams({});
    }
    static toEncodable(fields) {
        return {};
    }
    toJSON() {
        return {};
    }
    static fromJSON(obj) {
        return new VrfPoolRemoveParams({});
    }
    toEncodable() {
        return VrfPoolRemoveParams.toEncodable(this);
    }
}
//# sourceMappingURL=VrfPoolRemoveParams.js.map