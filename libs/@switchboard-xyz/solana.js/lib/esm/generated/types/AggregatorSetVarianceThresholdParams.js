import * as types from '../types'; // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from '@coral-xyz/borsh';
export class AggregatorSetVarianceThresholdParams {
    constructor(fields) {
        this.varianceThreshold = new types.BorshDecimal({
            ...fields.varianceThreshold,
        });
    }
    static layout(property) {
        return borsh.struct([types.BorshDecimal.layout('varianceThreshold')], property);
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    static fromDecoded(obj) {
        return new AggregatorSetVarianceThresholdParams({
            varianceThreshold: types.BorshDecimal.fromDecoded(obj.varianceThreshold),
        });
    }
    static toEncodable(fields) {
        return {
            varianceThreshold: types.BorshDecimal.toEncodable(fields.varianceThreshold),
        };
    }
    toJSON() {
        return {
            varianceThreshold: this.varianceThreshold.toJSON(),
        };
    }
    static fromJSON(obj) {
        return new AggregatorSetVarianceThresholdParams({
            varianceThreshold: types.BorshDecimal.fromJSON(obj.varianceThreshold),
        });
    }
    toEncodable() {
        return AggregatorSetVarianceThresholdParams.toEncodable(this);
    }
}
//# sourceMappingURL=AggregatorSetVarianceThresholdParams.js.map