import * as borsh from '@coral-xyz/borsh';
export class VrfLiteCloseParams {
    constructor(fields) { }
    static layout(property) {
        return borsh.struct([], property);
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    static fromDecoded(obj) {
        return new VrfLiteCloseParams({});
    }
    static toEncodable(fields) {
        return {};
    }
    toJSON() {
        return {};
    }
    static fromJSON(obj) {
        return new VrfLiteCloseParams({});
    }
    toEncodable() {
        return VrfLiteCloseParams.toEncodable(this);
    }
}
//# sourceMappingURL=VrfLiteCloseParams.js.map