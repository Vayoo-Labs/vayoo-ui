import { Big, BN } from '@switchboard-xyz/common';
import * as types from '../types';
export interface SwitchboardDecimalFields {
    /**
     * The part of a floating-point number that represents the significant digits of that number,
     * and that is multiplied by the base, 10, raised to the power of scale to give the actual value of the number.
     */
    mantissa: BN;
    /** The number of decimal places to move to the left to yield the actual value. */
    scale: number;
}
export interface SwitchboardDecimalJSON {
    /**
     * The part of a floating-point number that represents the significant digits of that number,
     * and that is multiplied by the base, 10, raised to the power of scale to give the actual value of the number.
     */
    mantissa: string;
    /** The number of decimal places to move to the left to yield the actual value. */
    scale: number;
}
export declare class SwitchboardDecimal {
    /**
     * The part of a floating-point number that represents the significant digits of that number,
     * and that is multiplied by the base, 10, raised to the power of scale to give the actual value of the number.
     */
    readonly mantissa: BN;
    /** The number of decimal places to move to the left to yield the actual value. */
    readonly scale: number;
    constructor(fields: SwitchboardDecimalFields);
    static layout(property?: string): any;
    get borsh(): types.BorshDecimal;
    static fromDecoded(obj: any): types.SwitchboardDecimal;
    static toEncodable(fields: SwitchboardDecimalFields): {
        mantissa: BN;
        scale: number;
    };
    toJSON(): SwitchboardDecimalJSON;
    static fromJSON(obj: SwitchboardDecimalJSON): SwitchboardDecimal;
    toEncodable(): {
        mantissa: BN;
        scale: number;
    };
    /**
     * Convert untyped object to a Switchboard decimal, if possible.
     * @param obj raw object to convert from
     * @return SwitchboardDecimal
     */
    static from(obj: {
        mantissa: string | number | BN;
        scale: number;
    }): SwitchboardDecimal;
    /**
     * Convert a Big.js decimal to a Switchboard decimal.
     * @param big a Big.js decimal
     * @return a SwitchboardDecimal
     */
    static fromBig(big: Big): SwitchboardDecimal;
    /**
     * SwitchboardDecimal equality comparator.
     * @param other object to compare to.
     * @return true iff equal
     */
    eq(other: SwitchboardDecimal): boolean;
    /**
     * Convert SwitchboardDecimal to big.js Big type.
     * @return Big representation
     */
    toBig(): Big;
    toString(): string;
}
//# sourceMappingURL=SwitchboardDecimal.d.ts.map