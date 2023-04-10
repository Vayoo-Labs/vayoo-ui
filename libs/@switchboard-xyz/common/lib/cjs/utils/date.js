"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BNtoDateTimeString = exports.toDateTimeString = exports.BNtoDateString = exports.toDateString = void 0;
const padTime = (number_) => {
    return number_.toString().padStart(2, "0");
};
/** Convert a Date object to YYYY-MM-DD */
function toDateString(d) {
    if (d)
        return `${d.getFullYear()}-${padTime(d.getMonth() + 1)}-${padTime(d.getDate())} L`;
    return "";
}
exports.toDateString = toDateString;
/** Convert an BN timestamp to YYYY-MM-DD */
function BNtoDateString(ts) {
    if (!ts.toNumber())
        return "N/A";
    return toDateString(new Date(ts.toNumber() * 1000));
}
exports.BNtoDateString = BNtoDateString;
/** Convert a Date object to YYYY-MM-DD HH:mm:ss */
function toDateTimeString(d) {
    if (d)
        return `${d.getFullYear()}-${padTime(d.getMonth() + 1)}-${padTime(d.getDate())} ${padTime(d.getHours())}:${padTime(d.getMinutes())}:${padTime(d.getSeconds())} L`;
    return "";
}
exports.toDateTimeString = toDateTimeString;
/** Convert an BN timestamp to YYYY-MM-DD HH:mm:ss */
function BNtoDateTimeString(ts) {
    if (!ts.toNumber())
        return "N/A";
    return toDateTimeString(new Date(ts.toNumber() * 1000));
}
exports.BNtoDateTimeString = BNtoDateTimeString;
//# sourceMappingURL=date.js.map