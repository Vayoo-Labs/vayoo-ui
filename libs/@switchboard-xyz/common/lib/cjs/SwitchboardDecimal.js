"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SwitchboardDecimal = void 0;
const bn_js_1 = __importDefault(require("bn.js"));
const big_js_1 = __importDefault(require("big.js"));
/**
 * Switchboard precisioned representation of numbers.
 */
class SwitchboardDecimal {
    constructor(mantissa, scale) {
        this.mantissa = mantissa;
        this.scale = scale;
    }
    /**
     * Convert untyped object to a Switchboard decimal, if possible.
     * @param obj raw object to convert from
     * @return SwitchboardDecimal
     */
    static from(obj) {
        return new SwitchboardDecimal(new bn_js_1.default(obj.mantissa), obj.scale);
    }
    /**
     * Convert a Big.js decimal to a Switchboard decimal.
     * @param big a Big.js decimal
     * @return a SwitchboardDecimal
     */
    static fromBig(big) {
        // Round to fit in Switchboard Decimal
        // TODO: smarter logic.
        big = big.round(20);
        let mantissa = new bn_js_1.default(big.c.join(""), 10);
        // Set the scale. Big.exponenet sets scale from the opposite side
        // SwitchboardDecimal does.
        let scale = big.c.slice(1).length - big.e;
        if (scale < 0) {
            mantissa = mantissa.mul(new bn_js_1.default(10, 10).pow(new bn_js_1.default(Math.abs(scale), 10)));
            scale = 0;
        }
        if (scale < 0) {
            throw new Error(`SwitchboardDecimal: Unexpected negative scale.`);
        }
        if (scale >= 28) {
            throw new Error("SwitchboardDecimalExcessiveScaleError");
        }
        // Set sign for the coefficient (mantissa)
        mantissa = mantissa.mul(new bn_js_1.default(big.s, 10));
        const result = new SwitchboardDecimal(mantissa, scale);
        if (big.sub(result.toBig()).abs().gt(new big_js_1.default(0.00005))) {
            throw new Error(`SwitchboardDecimal: Converted decimal does not match original:\n` +
                `out: ${result.toBig().toNumber()} vs in: ${big.toNumber()}\n` +
                `-- result mantissa and scale: ${result.mantissa.toString()} ${result.scale.toString()}\n` +
                `${result} ${result.toBig()}`);
        }
        return result;
    }
    /**
     * SwitchboardDecimal equality comparator.
     * @param other object to compare to.
     * @return true iff equal
     */
    eq(other) {
        return this.mantissa.eq(other.mantissa) && this.scale === other.scale;
    }
    get big() {
        return this.toBig();
    }
    /**
     * Convert SwitchboardDecimal to big.js Big type.
     * @return Big representation
     */
    toBig() {
        let mantissa = new bn_js_1.default(this.mantissa, 10);
        let s = 1;
        const c = [];
        const ZERO = new bn_js_1.default(0, 10);
        const TEN = new bn_js_1.default(10, 10);
        if (mantissa.lt(ZERO)) {
            s = -1;
            mantissa = mantissa.abs();
        }
        while (mantissa.gt(ZERO)) {
            c.unshift(mantissa.mod(TEN).toNumber());
            mantissa = mantissa.div(TEN);
        }
        const e = c.length - this.scale - 1;
        const result = new big_js_1.default(0);
        if (c.length === 0) {
            return result;
        }
        result.s = s;
        result.c = c;
        result.e = e;
        return result;
    }
    toString() {
        return this.big.toString();
    }
    toJSON() {
        return {
            mantissa: this.mantissa.toString(10),
            scale: this.scale,
            value: this.toString(),
        };
    }
}
exports.SwitchboardDecimal = SwitchboardDecimal;
//# sourceMappingURL=SwitchboardDecimal.js.map