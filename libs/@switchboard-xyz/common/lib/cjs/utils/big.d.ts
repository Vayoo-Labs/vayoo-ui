import Big from "big.js";
import BN from "bn.js";
import Decimal from "decimal.js";
export declare class BigUtils {
    static safeDiv(number_: Big, denominator: Big, decimals?: number): Big;
    static safeMul(...n: Big[]): Big;
    static safeNthRoot(big: Big, nthRoot: number, decimals?: number): Big;
    static safeSqrt(n: Big, decimals?: number): Big;
    static safePow(n: Big, exp: number, decimals?: number): Big;
    static fromBN(n: BN, decimals?: number): Big;
    static toDecimal(big: Big, decimals?: number): Decimal;
    static fromDecimal(decimal: Decimal, decimals?: number): Big;
}
//# sourceMappingURL=big.d.ts.map