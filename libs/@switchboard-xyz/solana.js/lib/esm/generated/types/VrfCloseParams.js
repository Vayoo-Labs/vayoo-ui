import * as borsh from '@coral-xyz/borsh';
export class VrfCloseParams {
    constructor(fields) {
        this.stateBump = fields.stateBump;
        this.permissionBump = fields.permissionBump;
    }
    static layout(property) {
        return borsh.struct([borsh.u8('stateBump'), borsh.u8('permissionBump')], property);
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    static fromDecoded(obj) {
        return new VrfCloseParams({
            stateBump: obj.stateBump,
            permissionBump: obj.permissionBump,
        });
    }
    static toEncodable(fields) {
        return {
            stateBump: fields.stateBump,
            permissionBump: fields.permissionBump,
        };
    }
    toJSON() {
        return {
            stateBump: this.stateBump,
            permissionBump: this.permissionBump,
        };
    }
    static fromJSON(obj) {
        return new VrfCloseParams({
            stateBump: obj.stateBump,
            permissionBump: obj.permissionBump,
        });
    }
    toEncodable() {
        return VrfCloseParams.toEncodable(this);
    }
}
//# sourceMappingURL=VrfCloseParams.js.map