import * as types from '../types'; // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from '@coral-xyz/borsh';
export class VrfLiteRequestRandomnessParams {
    constructor(fields) {
        this.callback =
            (fields.callback && new types.Callback({ ...fields.callback })) || null;
    }
    static layout(property) {
        return borsh.struct([borsh.option(types.Callback.layout(), 'callback')], property);
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    static fromDecoded(obj) {
        return new VrfLiteRequestRandomnessParams({
            callback: (obj.callback && types.Callback.fromDecoded(obj.callback)) || null,
        });
    }
    static toEncodable(fields) {
        return {
            callback: (fields.callback && types.Callback.toEncodable(fields.callback)) ||
                null,
        };
    }
    toJSON() {
        return {
            callback: (this.callback && this.callback.toJSON()) || null,
        };
    }
    static fromJSON(obj) {
        return new VrfLiteRequestRandomnessParams({
            callback: (obj.callback && types.Callback.fromJSON(obj.callback)) || null,
        });
    }
    toEncodable() {
        return VrfLiteRequestRandomnessParams.toEncodable(this);
    }
}
//# sourceMappingURL=VrfLiteRequestRandomnessParams.js.map