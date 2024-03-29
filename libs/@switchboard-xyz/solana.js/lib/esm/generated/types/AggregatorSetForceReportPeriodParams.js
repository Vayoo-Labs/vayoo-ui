import * as borsh from '@coral-xyz/borsh';
export class AggregatorSetForceReportPeriodParams {
    constructor(fields) {
        this.forceReportPeriod = fields.forceReportPeriod;
    }
    static layout(property) {
        return borsh.struct([borsh.u32('forceReportPeriod')], property);
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    static fromDecoded(obj) {
        return new AggregatorSetForceReportPeriodParams({
            forceReportPeriod: obj.forceReportPeriod,
        });
    }
    static toEncodable(fields) {
        return {
            forceReportPeriod: fields.forceReportPeriod,
        };
    }
    toJSON() {
        return {
            forceReportPeriod: this.forceReportPeriod,
        };
    }
    static fromJSON(obj) {
        return new AggregatorSetForceReportPeriodParams({
            forceReportPeriod: obj.forceReportPeriod,
        });
    }
    toEncodable() {
        return AggregatorSetForceReportPeriodParams.toEncodable(this);
    }
}
//# sourceMappingURL=AggregatorSetForceReportPeriodParams.js.map