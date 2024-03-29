import * as borsh from '@coral-xyz/borsh';
export class OracleHeartbeatParams {
    constructor(fields) {
        this.permissionBump = fields.permissionBump;
    }
    static layout(property) {
        return borsh.struct([borsh.u8('permissionBump')], property);
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    static fromDecoded(obj) {
        return new OracleHeartbeatParams({
            permissionBump: obj.permissionBump,
        });
    }
    static toEncodable(fields) {
        return {
            permissionBump: fields.permissionBump,
        };
    }
    toJSON() {
        return {
            permissionBump: this.permissionBump,
        };
    }
    static fromJSON(obj) {
        return new OracleHeartbeatParams({
            permissionBump: obj.permissionBump,
        });
    }
    toEncodable() {
        return OracleHeartbeatParams.toEncodable(this);
    }
}
//# sourceMappingURL=OracleHeartbeatParams.js.map