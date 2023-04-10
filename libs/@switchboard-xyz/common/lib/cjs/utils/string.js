"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isKeypairString = exports.isBase58 = exports.toUtf8 = exports.buf2String = void 0;
/**
 * Converts to utf-8 encoding and removes null characters.
 */
const buf2String = (buf) => Buffer.from(buf)
    .toString("utf8")
    .replace(/\u0000/g, "")
    .replace(/\0/g, "");
exports.buf2String = buf2String;
exports.toUtf8 = exports.buf2String;
/** Determine whether a given string contains only base58 characters */
const isBase58 = (value) => /^[A-HJ-NP-Za-km-z1-9]*$/.test(value);
exports.isBase58 = isBase58;
/** Determine whether a given string contains a secretKey Uint8Array */
const isKeypairString = (value) => /^\[(\s)?[0-9]+((\s)?,(\s)?[0-9]+){31,}\]/.test(value);
exports.isKeypairString = isKeypairString;
//# sourceMappingURL=string.js.map