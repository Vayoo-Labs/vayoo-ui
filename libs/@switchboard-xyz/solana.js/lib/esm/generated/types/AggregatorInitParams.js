import { BN } from '@switchboard-xyz/common'; // eslint-disable-line @typescript-eslint/no-unused-vars
import * as types from '../types'; // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from '@coral-xyz/borsh';
export class AggregatorInitParams {
    constructor(fields) {
        this.name = fields.name;
        this.metadata = fields.metadata;
        this.batchSize = fields.batchSize;
        this.minOracleResults = fields.minOracleResults;
        this.minJobResults = fields.minJobResults;
        this.minUpdateDelaySeconds = fields.minUpdateDelaySeconds;
        this.startAfter = fields.startAfter;
        this.varianceThreshold = new types.BorshDecimal({
            ...fields.varianceThreshold,
        });
        this.forceReportPeriod = fields.forceReportPeriod;
        this.expiration = fields.expiration;
        this.stateBump = fields.stateBump;
        this.disableCrank = fields.disableCrank;
    }
    static layout(property) {
        return borsh.struct([
            borsh.array(borsh.u8(), 32, 'name'),
            borsh.array(borsh.u8(), 128, 'metadata'),
            borsh.u32('batchSize'),
            borsh.u32('minOracleResults'),
            borsh.u32('minJobResults'),
            borsh.u32('minUpdateDelaySeconds'),
            borsh.i64('startAfter'),
            types.BorshDecimal.layout('varianceThreshold'),
            borsh.i64('forceReportPeriod'),
            borsh.i64('expiration'),
            borsh.u8('stateBump'),
            borsh.bool('disableCrank'),
        ], property);
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    static fromDecoded(obj) {
        return new AggregatorInitParams({
            name: obj.name,
            metadata: obj.metadata,
            batchSize: obj.batchSize,
            minOracleResults: obj.minOracleResults,
            minJobResults: obj.minJobResults,
            minUpdateDelaySeconds: obj.minUpdateDelaySeconds,
            startAfter: obj.startAfter,
            varianceThreshold: types.BorshDecimal.fromDecoded(obj.varianceThreshold),
            forceReportPeriod: obj.forceReportPeriod,
            expiration: obj.expiration,
            stateBump: obj.stateBump,
            disableCrank: obj.disableCrank,
        });
    }
    static toEncodable(fields) {
        return {
            name: fields.name,
            metadata: fields.metadata,
            batchSize: fields.batchSize,
            minOracleResults: fields.minOracleResults,
            minJobResults: fields.minJobResults,
            minUpdateDelaySeconds: fields.minUpdateDelaySeconds,
            startAfter: fields.startAfter,
            varianceThreshold: types.BorshDecimal.toEncodable(fields.varianceThreshold),
            forceReportPeriod: fields.forceReportPeriod,
            expiration: fields.expiration,
            stateBump: fields.stateBump,
            disableCrank: fields.disableCrank,
        };
    }
    toJSON() {
        return {
            name: this.name,
            metadata: this.metadata,
            batchSize: this.batchSize,
            minOracleResults: this.minOracleResults,
            minJobResults: this.minJobResults,
            minUpdateDelaySeconds: this.minUpdateDelaySeconds,
            startAfter: this.startAfter.toString(),
            varianceThreshold: this.varianceThreshold.toJSON(),
            forceReportPeriod: this.forceReportPeriod.toString(),
            expiration: this.expiration.toString(),
            stateBump: this.stateBump,
            disableCrank: this.disableCrank,
        };
    }
    static fromJSON(obj) {
        return new AggregatorInitParams({
            name: obj.name,
            metadata: obj.metadata,
            batchSize: obj.batchSize,
            minOracleResults: obj.minOracleResults,
            minJobResults: obj.minJobResults,
            minUpdateDelaySeconds: obj.minUpdateDelaySeconds,
            startAfter: new BN(obj.startAfter),
            varianceThreshold: types.BorshDecimal.fromJSON(obj.varianceThreshold),
            forceReportPeriod: new BN(obj.forceReportPeriod),
            expiration: new BN(obj.expiration),
            stateBump: obj.stateBump,
            disableCrank: obj.disableCrank,
        });
    }
    toEncodable() {
        return AggregatorInitParams.toEncodable(this);
    }
}
//# sourceMappingURL=AggregatorInitParams.js.map