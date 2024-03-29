import { BN } from '@switchboard-xyz/common';
import * as types from '../types';
export interface AggregatorHistoryRowFields {
    /** The timestamp of the sample. */
    timestamp: BN;
    /** The value of the sample. */
    value: types.SwitchboardDecimalFields;
}
export interface AggregatorHistoryRowJSON {
    /** The timestamp of the sample. */
    timestamp: string;
    /** The value of the sample. */
    value: types.SwitchboardDecimalJSON;
}
export declare class AggregatorHistoryRow {
    /** The timestamp of the sample. */
    readonly timestamp: BN;
    /** The value of the sample. */
    readonly value: types.SwitchboardDecimal;
    constructor(fields: AggregatorHistoryRowFields);
    static layout(property?: string): any;
    static fromDecoded(obj: any): types.AggregatorHistoryRow;
    static toEncodable(fields: AggregatorHistoryRowFields): {
        timestamp: BN;
        value: {
            mantissa: BN;
            scale: number;
        };
    };
    toJSON(): AggregatorHistoryRowJSON;
    static fromJSON(obj: AggregatorHistoryRowJSON): AggregatorHistoryRow;
    toEncodable(): {
        timestamp: BN;
        value: {
            mantissa: BN;
            scale: number;
        };
    };
}
//# sourceMappingURL=AggregatorHistoryRow.d.ts.map