import * as borsh from '@coral-xyz/borsh';
export class AggregatorSetResolutionModeParams {
    constructor(fields) {
        this.mode = fields.mode;
    }
    static layout(property) {
        return borsh.struct([borsh.u8('mode')], property);
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    static fromDecoded(obj) {
        return new AggregatorSetResolutionModeParams({
            mode: obj.mode,
        });
    }
    static toEncodable(fields) {
        return {
            mode: fields.mode,
        };
    }
    toJSON() {
        return {
            mode: this.mode,
        };
    }
    static fromJSON(obj) {
        return new AggregatorSetResolutionModeParams({
            mode: obj.mode,
        });
    }
    toEncodable() {
        return AggregatorSetResolutionModeParams.toEncodable(this);
    }
}
//# sourceMappingURL=AggregatorSetResolutionModeParams.js.map