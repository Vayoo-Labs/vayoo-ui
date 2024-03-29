import * as borsh from '@coral-xyz/borsh';
export class BufferRelayerSaveResultParams {
    constructor(fields) {
        this.stateBump = fields.stateBump;
        this.permissionBump = fields.permissionBump;
        this.result = fields.result;
        this.success = fields.success;
    }
    static layout(property) {
        return borsh.struct([
            borsh.u8('stateBump'),
            borsh.u8('permissionBump'),
            borsh.vecU8('result'),
            borsh.bool('success'),
        ], property);
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    static fromDecoded(obj) {
        return new BufferRelayerSaveResultParams({
            stateBump: obj.stateBump,
            permissionBump: obj.permissionBump,
            result: new Uint8Array(obj.result.buffer, obj.result.byteOffset, obj.result.length),
            success: obj.success,
        });
    }
    static toEncodable(fields) {
        return {
            stateBump: fields.stateBump,
            permissionBump: fields.permissionBump,
            result: Buffer.from(fields.result.buffer, fields.result.byteOffset, fields.result.length),
            success: fields.success,
        };
    }
    toJSON() {
        return {
            stateBump: this.stateBump,
            permissionBump: this.permissionBump,
            result: Array.from(this.result.values()),
            success: this.success,
        };
    }
    static fromJSON(obj) {
        return new BufferRelayerSaveResultParams({
            stateBump: obj.stateBump,
            permissionBump: obj.permissionBump,
            result: Uint8Array.from(obj.result),
            success: obj.success,
        });
    }
    toEncodable() {
        return BufferRelayerSaveResultParams.toEncodable(this);
    }
}
//# sourceMappingURL=BufferRelayerSaveResultParams.js.map