import * as borsh from '@coral-xyz/borsh';
export class AggregatorOpenRoundParams {
    constructor(fields) {
        this.stateBump = fields.stateBump;
        this.leaseBump = fields.leaseBump;
        this.permissionBump = fields.permissionBump;
        this.jitter = fields.jitter;
    }
    static layout(property) {
        return borsh.struct([
            borsh.u8('stateBump'),
            borsh.u8('leaseBump'),
            borsh.u8('permissionBump'),
            borsh.u8('jitter'),
        ], property);
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    static fromDecoded(obj) {
        return new AggregatorOpenRoundParams({
            stateBump: obj.stateBump,
            leaseBump: obj.leaseBump,
            permissionBump: obj.permissionBump,
            jitter: obj.jitter,
        });
    }
    static toEncodable(fields) {
        return {
            stateBump: fields.stateBump,
            leaseBump: fields.leaseBump,
            permissionBump: fields.permissionBump,
            jitter: fields.jitter,
        };
    }
    toJSON() {
        return {
            stateBump: this.stateBump,
            leaseBump: this.leaseBump,
            permissionBump: this.permissionBump,
            jitter: this.jitter,
        };
    }
    static fromJSON(obj) {
        return new AggregatorOpenRoundParams({
            stateBump: obj.stateBump,
            leaseBump: obj.leaseBump,
            permissionBump: obj.permissionBump,
            jitter: obj.jitter,
        });
    }
    toEncodable() {
        return AggregatorOpenRoundParams.toEncodable(this);
    }
}
//# sourceMappingURL=AggregatorOpenRoundParams.js.map