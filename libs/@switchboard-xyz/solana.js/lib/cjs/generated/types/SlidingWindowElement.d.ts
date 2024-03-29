import { PublicKey } from '@solana/web3.js';
import { BN } from '@switchboard-xyz/common';
import * as types from '../types';
export interface SlidingWindowElementFields {
    oracleKey: PublicKey;
    value: types.SwitchboardDecimalFields;
    slot: BN;
    timestamp: BN;
}
export interface SlidingWindowElementJSON {
    oracleKey: string;
    value: types.SwitchboardDecimalJSON;
    slot: string;
    timestamp: string;
}
export declare class SlidingWindowElement {
    readonly oracleKey: PublicKey;
    readonly value: types.SwitchboardDecimal;
    readonly slot: BN;
    readonly timestamp: BN;
    constructor(fields: SlidingWindowElementFields);
    static layout(property?: string): any;
    static fromDecoded(obj: any): types.SlidingWindowElement;
    static toEncodable(fields: SlidingWindowElementFields): {
        oracleKey: PublicKey;
        value: {
            mantissa: BN;
            scale: number;
        };
        slot: BN;
        timestamp: BN;
    };
    toJSON(): SlidingWindowElementJSON;
    static fromJSON(obj: SlidingWindowElementJSON): SlidingWindowElement;
    toEncodable(): {
        oracleKey: PublicKey;
        value: {
            mantissa: BN;
            scale: number;
        };
        slot: BN;
        timestamp: BN;
    };
}
//# sourceMappingURL=SlidingWindowElement.d.ts.map