import * as borsh from '@coral-xyz/borsh';
export class VrfPoolInitParams {
    constructor(fields) {
        this.maxRows = fields.maxRows;
        this.minInterval = fields.minInterval;
        this.stateBump = fields.stateBump;
    }
    static layout(property) {
        return borsh.struct([borsh.u32('maxRows'), borsh.u32('minInterval'), borsh.u8('stateBump')], property);
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    static fromDecoded(obj) {
        return new VrfPoolInitParams({
            maxRows: obj.maxRows,
            minInterval: obj.minInterval,
            stateBump: obj.stateBump,
        });
    }
    static toEncodable(fields) {
        return {
            maxRows: fields.maxRows,
            minInterval: fields.minInterval,
            stateBump: fields.stateBump,
        };
    }
    toJSON() {
        return {
            maxRows: this.maxRows,
            minInterval: this.minInterval,
            stateBump: this.stateBump,
        };
    }
    static fromJSON(obj) {
        return new VrfPoolInitParams({
            maxRows: obj.maxRows,
            minInterval: obj.minInterval,
            stateBump: obj.stateBump,
        });
    }
    toEncodable() {
        return VrfPoolInitParams.toEncodable(this);
    }
}
//# sourceMappingURL=VrfPoolInitParams.js.map