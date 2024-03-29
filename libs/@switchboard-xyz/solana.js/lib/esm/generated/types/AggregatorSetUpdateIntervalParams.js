import * as borsh from '@coral-xyz/borsh';
export class AggregatorSetUpdateIntervalParams {
    constructor(fields) {
        this.newInterval = fields.newInterval;
    }
    static layout(property) {
        return borsh.struct([borsh.u32('newInterval')], property);
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    static fromDecoded(obj) {
        return new AggregatorSetUpdateIntervalParams({
            newInterval: obj.newInterval,
        });
    }
    static toEncodable(fields) {
        return {
            newInterval: fields.newInterval,
        };
    }
    toJSON() {
        return {
            newInterval: this.newInterval,
        };
    }
    static fromJSON(obj) {
        return new AggregatorSetUpdateIntervalParams({
            newInterval: obj.newInterval,
        });
    }
    toEncodable() {
        return AggregatorSetUpdateIntervalParams.toEncodable(this);
    }
}
//# sourceMappingURL=AggregatorSetUpdateIntervalParams.js.map