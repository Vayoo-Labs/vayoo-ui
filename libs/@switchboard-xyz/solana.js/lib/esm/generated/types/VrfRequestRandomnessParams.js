import * as borsh from '@coral-xyz/borsh';
export class VrfRequestRandomnessParams {
    constructor(fields) {
        this.permissionBump = fields.permissionBump;
        this.stateBump = fields.stateBump;
    }
    static layout(property) {
        return borsh.struct([borsh.u8('permissionBump'), borsh.u8('stateBump')], property);
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    static fromDecoded(obj) {
        return new VrfRequestRandomnessParams({
            permissionBump: obj.permissionBump,
            stateBump: obj.stateBump,
        });
    }
    static toEncodable(fields) {
        return {
            permissionBump: fields.permissionBump,
            stateBump: fields.stateBump,
        };
    }
    toJSON() {
        return {
            permissionBump: this.permissionBump,
            stateBump: this.stateBump,
        };
    }
    static fromJSON(obj) {
        return new VrfRequestRandomnessParams({
            permissionBump: obj.permissionBump,
            stateBump: obj.stateBump,
        });
    }
    toEncodable() {
        return VrfRequestRandomnessParams.toEncodable(this);
    }
}
//# sourceMappingURL=VrfRequestRandomnessParams.js.map