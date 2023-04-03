import { BN } from '@switchboard-xyz/common'; // eslint-disable-line @typescript-eslint/no-unused-vars
import * as types from '../types'; // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from '@coral-xyz/borsh';
export class VrfLiteInitParams {
    constructor(fields) {
        this.callback =
            (fields.callback && new types.Callback({ ...fields.callback })) || null;
        this.stateBump = fields.stateBump;
        this.expiration = fields.expiration;
    }
    static layout(property) {
        return borsh.struct([
            borsh.option(types.Callback.layout(), 'callback'),
            borsh.u8('stateBump'),
            borsh.option(borsh.i64(), 'expiration'),
        ], property);
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    static fromDecoded(obj) {
        return new VrfLiteInitParams({
            callback: (obj.callback && types.Callback.fromDecoded(obj.callback)) || null,
            stateBump: obj.stateBump,
            expiration: obj.expiration,
        });
    }
    static toEncodable(fields) {
        return {
            callback: (fields.callback && types.Callback.toEncodable(fields.callback)) ||
                null,
            stateBump: fields.stateBump,
            expiration: fields.expiration,
        };
    }
    toJSON() {
        return {
            callback: (this.callback && this.callback.toJSON()) || null,
            stateBump: this.stateBump,
            expiration: (this.expiration && this.expiration.toString()) || null,
        };
    }
    static fromJSON(obj) {
        return new VrfLiteInitParams({
            callback: (obj.callback && types.Callback.fromJSON(obj.callback)) || null,
            stateBump: obj.stateBump,
            expiration: (obj.expiration && new BN(obj.expiration)) || null,
        });
    }
    toEncodable() {
        return VrfLiteInitParams.toEncodable(this);
    }
}
//# sourceMappingURL=VrfLiteInitParams.js.map