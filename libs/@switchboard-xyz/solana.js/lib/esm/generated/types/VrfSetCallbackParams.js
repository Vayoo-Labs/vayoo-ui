import * as types from '../types'; // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from '@coral-xyz/borsh';
export class VrfSetCallbackParams {
    constructor(fields) {
        this.callback = new types.Callback({ ...fields.callback });
    }
    static layout(property) {
        return borsh.struct([types.Callback.layout('callback')], property);
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    static fromDecoded(obj) {
        return new VrfSetCallbackParams({
            callback: types.Callback.fromDecoded(obj.callback),
        });
    }
    static toEncodable(fields) {
        return {
            callback: types.Callback.toEncodable(fields.callback),
        };
    }
    toJSON() {
        return {
            callback: this.callback.toJSON(),
        };
    }
    static fromJSON(obj) {
        return new VrfSetCallbackParams({
            callback: types.Callback.fromJSON(obj.callback),
        });
    }
    toEncodable() {
        return VrfSetCallbackParams.toEncodable(this);
    }
}
//# sourceMappingURL=VrfSetCallbackParams.js.map