import * as types from '../types'; // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from '@coral-xyz/borsh';
export class PermissionSetParams {
    constructor(fields) {
        this.permission = fields.permission;
        this.enable = fields.enable;
    }
    static layout(property) {
        return borsh.struct([types.SwitchboardPermission.layout('permission'), borsh.bool('enable')], property);
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    static fromDecoded(obj) {
        return new PermissionSetParams({
            permission: types.SwitchboardPermission.fromDecoded(obj.permission),
            enable: obj.enable,
        });
    }
    static toEncodable(fields) {
        return {
            permission: fields.permission.toEncodable(),
            enable: fields.enable,
        };
    }
    toJSON() {
        return {
            permission: this.permission.toJSON(),
            enable: this.enable,
        };
    }
    static fromJSON(obj) {
        return new PermissionSetParams({
            permission: types.SwitchboardPermission.fromJSON(obj.permission),
            enable: obj.enable,
        });
    }
    toEncodable() {
        return PermissionSetParams.toEncodable(this);
    }
}
//# sourceMappingURL=PermissionSetParams.js.map