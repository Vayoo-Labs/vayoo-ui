"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.jsonReplacers = void 0;
const big_js_1 = __importDefault(require("big.js"));
const bn_js_1 = __importDefault(require("bn.js"));
const SwitchboardDecimal_1 = require("../SwitchboardDecimal");
const string_1 = require("./string");
function big2NumberOrString(big) {
    const oldStrict = big_js_1.default.strict;
    big_js_1.default.strict = true;
    try {
        const num = big.toNumber();
        big_js_1.default.strict = oldStrict;
        return num;
    }
    catch { }
    big_js_1.default.strict = oldStrict;
    return big.toString();
}
function jsonReplacers(key, value) {
    if (typeof value === "string" ||
        typeof value === "number" ||
        typeof value === "boolean") {
        return value;
    }
    // bigint
    if (typeof value === "bigint") {
        return value.toString();
    }
    // BN
    if (bn_js_1.default.isBN(value)) {
        return value.toNumber();
    }
    // name and metadata replacers
    if (key === "name" || key === "metadata") {
        if (Array.isArray(value) || Buffer.isBuffer(value)) {
            return (0, string_1.buf2String)(value);
        }
    }
    // Switchboard Decimal
    if (value instanceof SwitchboardDecimal_1.SwitchboardDecimal ||
        (value &&
            typeof value === "object" &&
            "mantissa" in value &&
            "scale" in value)) {
        const swbDecimal = new SwitchboardDecimal_1.SwitchboardDecimal(value.mantissa, value.scale);
        return big2NumberOrString(swbDecimal.toBig());
    }
    // big.js
    if (value instanceof big_js_1.default) {
        return big2NumberOrString(value);
    }
    // pubkey
    if ("toBase58" in value && typeof value.toBase58 === "function") {
        return value.toBase58();
    }
    // toString
    if ("toString" in value && typeof value.toString === "function") {
        return value.toString();
    }
    // Fall through for nested objects
    return value;
}
exports.jsonReplacers = jsonReplacers;
//# sourceMappingURL=json.js.map