import * as borsh from '@coral-xyz/borsh';
export class CrankInitParams {
    constructor(fields) {
        this.name = fields.name;
        this.metadata = fields.metadata;
        this.crankSize = fields.crankSize;
    }
    static layout(property) {
        return borsh.struct([borsh.vecU8('name'), borsh.vecU8('metadata'), borsh.u32('crankSize')], property);
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    static fromDecoded(obj) {
        return new CrankInitParams({
            name: new Uint8Array(obj.name.buffer, obj.name.byteOffset, obj.name.length),
            metadata: new Uint8Array(obj.metadata.buffer, obj.metadata.byteOffset, obj.metadata.length),
            crankSize: obj.crankSize,
        });
    }
    static toEncodable(fields) {
        return {
            name: Buffer.from(fields.name.buffer, fields.name.byteOffset, fields.name.length),
            metadata: Buffer.from(fields.metadata.buffer, fields.metadata.byteOffset, fields.metadata.length),
            crankSize: fields.crankSize,
        };
    }
    toJSON() {
        return {
            name: Array.from(this.name.values()),
            metadata: Array.from(this.metadata.values()),
            crankSize: this.crankSize,
        };
    }
    static fromJSON(obj) {
        return new CrankInitParams({
            name: Uint8Array.from(obj.name),
            metadata: Uint8Array.from(obj.metadata),
            crankSize: obj.crankSize,
        });
    }
    toEncodable() {
        return CrankInitParams.toEncodable(this);
    }
}
//# sourceMappingURL=CrankInitParams.js.map