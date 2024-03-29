import * as borsh from '@coral-xyz/borsh';
export class AggregatorSetMinOraclesParams {
    constructor(fields) {
        this.minOracleResults = fields.minOracleResults;
    }
    static layout(property) {
        return borsh.struct([borsh.u32('minOracleResults')], property);
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    static fromDecoded(obj) {
        return new AggregatorSetMinOraclesParams({
            minOracleResults: obj.minOracleResults,
        });
    }
    static toEncodable(fields) {
        return {
            minOracleResults: fields.minOracleResults,
        };
    }
    toJSON() {
        return {
            minOracleResults: this.minOracleResults,
        };
    }
    static fromJSON(obj) {
        return new AggregatorSetMinOraclesParams({
            minOracleResults: obj.minOracleResults,
        });
    }
    toEncodable() {
        return AggregatorSetMinOraclesParams.toEncodable(this);
    }
}
//# sourceMappingURL=AggregatorSetMinOraclesParams.js.map