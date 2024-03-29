"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SwitchboardDecimal = void 0;
const borsh = __importStar(require("@coral-xyz/borsh"));
const common_1 = require("@switchboard-xyz/common"); // eslint-disable-line @typescript-eslint/no-unused-vars
const types = __importStar(require("../types")); // eslint-disable-line @typescript-eslint/no-unused-vars
class SwitchboardDecimal {
    constructor(fields) {
        this.mantissa = fields.mantissa;
        this.scale = fields.scale;
    }
    static layout(property) {
        return borsh.struct([borsh.i128('mantissa'), borsh.u32('scale')], property);
    }
    get borsh() {
        return new types.BorshDecimal({
            mantissa: this.mantissa,
            scale: this.scale,
        });
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    static fromDecoded(obj) {
        return new SwitchboardDecimal({
            mantissa: obj.mantissa,
            scale: obj.scale,
        });
    }
    static toEncodable(fields) {
        return {
            mantissa: fields.mantissa,
            scale: fields.scale,
        };
    }
    toJSON() {
        return {
            mantissa: this.mantissa.toString(),
            scale: this.scale,
        };
    }
    static fromJSON(obj) {
        return new SwitchboardDecimal({
            mantissa: new common_1.BN(obj.mantissa),
            scale: obj.scale,
        });
    }
    toEncodable() {
        return SwitchboardDecimal.toEncodable(this);
    }
    /**
     * Convert untyped object to a Switchboard decimal, if possible.
     * @param obj raw object to convert from
     * @return SwitchboardDecimal
     */
    static from(obj) {
        return new SwitchboardDecimal({
            mantissa: new common_1.BN(obj.mantissa),
            scale: obj.scale,
        });
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
        let mantissa = new common_1.BN(big.c.join(''), 10);
        // Set the scale. Big.exponenet sets scale from the opposite side
        // SwitchboardDecimal does.
        let scale = big.c.slice(1).length - big.e;
        if (scale < 0) {
            mantissa = mantissa.mul(new common_1.BN(10, 10).pow(new common_1.BN(Math.abs(scale), 10)));
            scale = 0;
        }
        if (scale < 0) {
            throw new Error('SwitchboardDecimal: Unexpected negative scale.');
        }
        if (scale >= 28) {
            throw new Error('SwitchboardDecimalExcessiveScaleError');
        }
        // Set sign for the coefficient (mantissa)
        mantissa = mantissa.mul(new common_1.BN(big.s, 10));
        const result = new SwitchboardDecimal({ mantissa, scale });
        if (big.sub(result.toBig()).abs().gt(new common_1.Big(0.00005))) {
            throw new Error('SwitchboardDecimal: Converted decimal does not match original:\n' +
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
    /**
     * Convert SwitchboardDecimal to big.js Big type.
     * @return Big representation
     */
    toBig() {
        let mantissa = new common_1.BN(this.mantissa, 10);
        let s = 1;
        const c = [];
        const ZERO = new common_1.BN(0, 10);
        const TEN = new common_1.BN(10, 10);
        if (mantissa.lt(ZERO)) {
            s = -1;
            mantissa = mantissa.abs();
        }
        while (mantissa.gt(ZERO)) {
            c.unshift(mantissa.mod(TEN).toNumber());
            mantissa = mantissa.div(TEN);
        }
        const e = c.length - this.scale - 1;
        const result = new common_1.Big(0);
        if (c.length === 0) {
            return result;
        }
        result.s = s;
        result.c = c;
        result.e = e;
        return result;
    }
    toString() {
        return this.toBig().toString();
    }
}
exports.SwitchboardDecimal = SwitchboardDecimal;
//# sourceMappingURL=SwitchboardDecimal.js.map