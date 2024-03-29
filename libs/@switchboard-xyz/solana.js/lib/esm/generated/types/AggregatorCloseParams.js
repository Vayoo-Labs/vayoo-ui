import * as borsh from '@coral-xyz/borsh';
export class AggregatorCloseParams {
    constructor(fields) {
        this.stateBump = fields.stateBump;
        this.permissionBump = fields.permissionBump;
        this.leaseBump = fields.leaseBump;
    }
    static layout(property) {
        return borsh.struct([
            borsh.u8('stateBump'),
            borsh.u8('permissionBump'),
            borsh.u8('leaseBump'),
        ], property);
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    static fromDecoded(obj) {
        return new AggregatorCloseParams({
            stateBump: obj.stateBump,
            permissionBump: obj.permissionBump,
            leaseBump: obj.leaseBump,
        });
    }
    static toEncodable(fields) {
        return {
            stateBump: fields.stateBump,
            permissionBump: fields.permissionBump,
            leaseBump: fields.leaseBump,
        };
    }
    toJSON() {
        return {
            stateBump: this.stateBump,
            permissionBump: this.permissionBump,
            leaseBump: this.leaseBump,
        };
    }
    static fromJSON(obj) {
        return new AggregatorCloseParams({
            stateBump: obj.stateBump,
            permissionBump: obj.permissionBump,
            leaseBump: obj.leaseBump,
        });
    }
    toEncodable() {
        return AggregatorCloseParams.toEncodable(this);
    }
}
//# sourceMappingURL=AggregatorCloseParams.js.map