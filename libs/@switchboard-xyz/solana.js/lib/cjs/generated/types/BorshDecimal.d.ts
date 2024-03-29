import { BN } from '@switchboard-xyz/common';
import * as types from '../types';
export interface BorshDecimalFields {
    mantissa: BN;
    scale: number;
}
export interface BorshDecimalJSON {
    mantissa: string;
    scale: number;
}
export declare class BorshDecimal {
    readonly mantissa: BN;
    readonly scale: number;
    constructor(fields: BorshDecimalFields);
    static layout(property?: string): any;
    static fromDecoded(obj: any): types.BorshDecimal;
    static toEncodable(fields: BorshDecimalFields): {
        mantissa: BN;
        scale: number;
    };
    toJSON(): BorshDecimalJSON;
    static fromJSON(obj: BorshDecimalJSON): BorshDecimal;
    toEncodable(): {
        mantissa: BN;
        scale: number;
    };
}
//# sourceMappingURL=BorshDecimal.d.ts.map