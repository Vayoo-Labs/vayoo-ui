import BN from "bn.js";
import Big from "big.js";
/**
 * Switchboard precisioned representation of numbers.
 */
export declare class SwitchboardDecimal {
    readonly mantissa: BN;
    readonly scale: number;
    constructor(mantissa: BN, scale: number);
    /**
     * Convert untyped object to a Switchboard decimal, if possible.
     * @param obj raw object to convert from
     * @return SwitchboardDecimal
     */
    static from(obj: any): SwitchboardDecimal;
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
    get big(): Big;
    /**
     * Convert SwitchboardDecimal to big.js Big type.
     * @return Big representation
     */
    toBig(): Big;
    toString(): string;
    toJSON(): {
        mantissa: string;
        scale: number;
        value: string;
    };
}
//# sourceMappingURL=SwitchboardDecimal.d.ts.map