import * as borsh from '@coral-xyz/borsh';
export class VrfPoolAddParams {
    constructor(fields) { }
    static layout(property) {
        return borsh.struct([], property);
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    static fromDecoded(obj) {
        return new VrfPoolAddParams({});
    }
    static toEncodable(fields) {
        return {};
    }
    toJSON() {
        return {};
    }
    static fromJSON(obj) {
        return new VrfPoolAddParams({});
    }
    toEncodable() {
        return VrfPoolAddParams.toEncodable(this);
    }
}
//# sourceMappingURL=VrfPoolAddParams.js.map