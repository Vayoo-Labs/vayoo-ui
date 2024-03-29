import * as types from '../types'; // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from '@coral-xyz/borsh';
export class VrfInitParams {
    constructor(fields) {
        this.callback = new types.Callback({ ...fields.callback });
        this.stateBump = fields.stateBump;
    }
    static layout(property) {
        return borsh.struct([types.Callback.layout('callback'), borsh.u8('stateBump')], property);
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    static fromDecoded(obj) {
        return new VrfInitParams({
            callback: types.Callback.fromDecoded(obj.callback),
            stateBump: obj.stateBump,
        });
    }
    static toEncodable(fields) {
        return {
            callback: types.Callback.toEncodable(fields.callback),
            stateBump: fields.stateBump,
        };
    }
    toJSON() {
        return {
            callback: this.callback.toJSON(),
            stateBump: this.stateBump,
        };
    }
    static fromJSON(obj) {
        return new VrfInitParams({
            callback: types.Callback.fromJSON(obj.callback),
            stateBump: obj.stateBump,
        });
    }
    toEncodable() {
        return VrfInitParams.toEncodable(this);
    }
}
//# sourceMappingURL=VrfInitParams.js.map