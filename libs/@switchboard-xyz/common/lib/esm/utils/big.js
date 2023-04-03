import Big from "big.js";
import Decimal from "decimal.js";
import { SwitchboardDecimal } from "../SwitchboardDecimal";
export class BigUtils {
    static safeDiv(number_, denominator, decimals = 20) {
        const oldDp = Big.DP;
        Big.DP = decimals;
        const result = number_.div(denominator);
        Big.DP = oldDp;
        return result;
    }
    static safeMul(...n) {
        if (n.length === 0) {
            throw new Error(`need to provide elements to multiply ${n}`);
        }
        let result = new Big(1);
        for (const x of n) {
            result = result.mul(x);
        }
        return result;
    }
    static safeNthRoot(big, nthRoot, decimals = 20) {
        if (nthRoot <= 0) {
            throw new Error(`cannot take the nth root of a negative number`);
        }
        const oldDp = Big.DP;
        Big.DP = decimals;
        const decimal = BigUtils.toDecimal(big);
        const frac = new Decimal(1).div(nthRoot);
        const root = big.s === -1
            ? decimal.abs().pow(frac).mul(new Decimal(big.s))
            : decimal.pow(frac);
        const result = BigUtils.fromDecimal(root);
        Big.DP = oldDp;
        return result;
    }
    static safeSqrt(n, decimals = 20) {
        const oldDp = Big.DP;
        Big.DP = decimals;
        const result = n.sqrt();
        Big.DP = oldDp;
        return result;
    }
    static safePow(n, exp, decimals = 20) {
        const oldDp = Big.DP;
        Big.DP = decimals;
        const oldPrecision = Decimal.precision;
        Decimal.set({ precision: decimals });
        const base = BigUtils.toDecimal(n);
        const value = base.pow(exp);
        const result = BigUtils.fromDecimal(value);
        Decimal.set({ precision: oldPrecision });
        Big.DP = oldDp;
        return result;
    }
    static fromBN(n, decimals = 0) {
        const big = new SwitchboardDecimal(n, decimals).toBig();
        return big;
    }
    static toDecimal(big, decimals = 20) {
        const decimal = new Decimal(big.toFixed(decimals, 0));
        return decimal;
    }
    static fromDecimal(decimal, decimals = 20) {
        if (decimal.isNaN()) {
            throw new TypeError(`cannot convert NaN decimal.js to Big.js`);
        }
        if (!decimal.isFinite()) {
            throw new TypeError(`cannot convert INF decimal.js to Big.js`);
        }
        const big = new Big(decimal.toFixed(decimals, 0));
        return big;
    }
}
//# sourceMappingURL=big.js.map