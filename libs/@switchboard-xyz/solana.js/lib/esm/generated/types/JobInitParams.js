import { BN } from '@switchboard-xyz/common'; // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from '@coral-xyz/borsh';
export class JobInitParams {
    constructor(fields) {
        this.name = fields.name;
        this.expiration = fields.expiration;
        this.stateBump = fields.stateBump;
        this.data = fields.data;
        this.size = fields.size;
    }
    static layout(property) {
        return borsh.struct([
            borsh.array(borsh.u8(), 32, 'name'),
            borsh.i64('expiration'),
            borsh.u8('stateBump'),
            borsh.vecU8('data'),
            borsh.option(borsh.u32(), 'size'),
        ], property);
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    static fromDecoded(obj) {
        return new JobInitParams({
            name: obj.name,
            expiration: obj.expiration,
            stateBump: obj.stateBump,
            data: new Uint8Array(obj.data.buffer, obj.data.byteOffset, obj.data.length),
            size: obj.size,
        });
    }
    static toEncodable(fields) {
        return {
            name: fields.name,
            expiration: fields.expiration,
            stateBump: fields.stateBump,
            data: Buffer.from(fields.data.buffer, fields.data.byteOffset, fields.data.length),
            size: fields.size,
        };
    }
    toJSON() {
        return {
            name: this.name,
            expiration: this.expiration.toString(),
            stateBump: this.stateBump,
            data: Array.from(this.data.values()),
            size: this.size,
        };
    }
    static fromJSON(obj) {
        return new JobInitParams({
            name: obj.name,
            expiration: new BN(obj.expiration),
            stateBump: obj.stateBump,
            data: Uint8Array.from(obj.data),
            size: obj.size,
        });
    }
    toEncodable() {
        return JobInitParams.toEncodable(this);
    }
}
//# sourceMappingURL=JobInitParams.js.map