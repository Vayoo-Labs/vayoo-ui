import * as borsh from '@coral-xyz/borsh';
export class BufferRelayerInitParams {
    constructor(fields) {
        this.name = fields.name;
        this.minUpdateDelaySeconds = fields.minUpdateDelaySeconds;
        this.stateBump = fields.stateBump;
    }
    static layout(property) {
        return borsh.struct([
            borsh.array(borsh.u8(), 32, 'name'),
            borsh.u32('minUpdateDelaySeconds'),
            borsh.u8('stateBump'),
        ], property);
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    static fromDecoded(obj) {
        return new BufferRelayerInitParams({
            name: obj.name,
            minUpdateDelaySeconds: obj.minUpdateDelaySeconds,
            stateBump: obj.stateBump,
        });
    }
    static toEncodable(fields) {
        return {
            name: fields.name,
            minUpdateDelaySeconds: fields.minUpdateDelaySeconds,
            stateBump: fields.stateBump,
        };
    }
    toJSON() {
        return {
            name: this.name,
            minUpdateDelaySeconds: this.minUpdateDelaySeconds,
            stateBump: this.stateBump,
        };
    }
    static fromJSON(obj) {
        return new BufferRelayerInitParams({
            name: obj.name,
            minUpdateDelaySeconds: obj.minUpdateDelaySeconds,
            stateBump: obj.stateBump,
        });
    }
    toEncodable() {
        return BufferRelayerInitParams.toEncodable(this);
    }
}
//# sourceMappingURL=BufferRelayerInitParams.js.map