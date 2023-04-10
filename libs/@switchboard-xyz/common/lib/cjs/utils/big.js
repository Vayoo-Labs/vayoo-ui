"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BigUtils = void 0;
const big_js_1 = __importDefault(require("big.js"));
const decimal_js_1 = __importDefault(require("decimal.js"));
const SwitchboardDecimal_1 = require("../SwitchboardDecimal");
class BigUtils {
    static safeDiv(number_, denominator, decimals = 20) {
        const oldDp = big_js_1.default.DP;
        big_js_1.default.DP = decimals;
        const result = number_.div(denominator);
        big_js_1.default.DP = oldDp;
        return result;
    }
    static safeMul(...n) {
        if (n.length === 0) {
            throw new Error(`need to provide elements to multiply ${n}`);
        }
        let result = new big_js_1.default(1);
        for (const x of n) {
            result = result.mul(x);
        }
        return result;
    }
    static safeNthRoot(big, nthRoot, decimals = 20) {
        if (nthRoot <= 0) {
            throw new Error(`cannot take the nth root of a negative number`);
        }
        const oldDp = big_js_1.default.DP;
        big_js_1.default.DP = decimals;
        const decimal = BigUtils.toDecimal(big);
        const frac = new decimal_js_1.default(1).div(nthRoot);
        const root = big.s === -1
            ? decimal.abs().pow(frac).mul(new decimal_js_1.default(big.s))
            : decimal.pow(frac);
        const result = BigUtils.fromDecimal(root);
        big_js_1.default.DP = oldDp;
        return result;
    }
    static safeSqrt(n, decimals = 20) {
        const oldDp = big_js_1.default.DP;
        big_js_1.default.DP = decimals;
        const result = n.sqrt();
        big_js_1.default.DP = oldDp;
        return result;
    }
    static safePow(n, exp, decimals = 20) {
        const oldDp = big_js_1.default.DP;
        big_js_1.default.DP = decimals;
        const oldPrecision = decimal_js_1.default.precision;
        decimal_js_1.default.set({ precision: decimals });
        const base = BigUtils.toDecimal(n);
        const value = base.pow(exp);
        const result = BigUtils.fromDecimal(value);
        decimal_js_1.default.set({ precision: oldPrecision });
        big_js_1.default.DP = oldDp;
        return result;
    }
    static fromBN(n, decimals = 0) {
        const big = new SwitchboardDecimal_1.SwitchboardDecimal(n, decimals).toBig();
        return big;
    }
    static toDecimal(big, decimals = 20) {
        const decimal = new decimal_js_1.default(big.toFixed(decimals, 0));
        return decimal;
    }
    static fromDecimal(decimal, decimals = 20) {
        if (decimal.isNaN()) {
            throw new TypeError(`cannot convert NaN decimal.js to Big.js`);
        }
        if (!decimal.isFinite()) {
            throw new TypeError(`cannot convert INF decimal.js to Big.js`);
        }
        const big = new big_js_1.default(decimal.toFixed(decimals, 0));
        return big;
    }
}
exports.BigUtils = BigUtils;
//# sourceMappingURL=big.js.map