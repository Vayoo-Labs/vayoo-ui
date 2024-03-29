import * as borsh from '@coral-xyz/borsh';
export class CrankPushParams {
    constructor(fields) {
        this.stateBump = fields.stateBump;
        this.permissionBump = fields.permissionBump;
        this.notifiRef = fields.notifiRef;
    }
    static layout(property) {
        return borsh.struct([
            borsh.u8('stateBump'),
            borsh.u8('permissionBump'),
            borsh.option(borsh.array(borsh.u8(), 64), 'notifiRef'),
        ], property);
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    static fromDecoded(obj) {
        return new CrankPushParams({
            stateBump: obj.stateBump,
            permissionBump: obj.permissionBump,
            notifiRef: obj.notifiRef,
        });
    }
    static toEncodable(fields) {
        return {
            stateBump: fields.stateBump,
            permissionBump: fields.permissionBump,
            notifiRef: fields.notifiRef,
        };
    }
    toJSON() {
        return {
            stateBump: this.stateBump,
            permissionBump: this.permissionBump,
            notifiRef: this.notifiRef,
        };
    }
    static fromJSON(obj) {
        return new CrankPushParams({
            stateBump: obj.stateBump,
            permissionBump: obj.permissionBump,
            notifiRef: obj.notifiRef,
        });
    }
    toEncodable() {
        return CrankPushParams.toEncodable(this);
    }
}
//# sourceMappingURL=CrankPushParams.js.map