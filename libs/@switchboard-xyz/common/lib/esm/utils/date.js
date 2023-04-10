const padTime = (number_) => {
    return number_.toString().padStart(2, "0");
};
/** Convert a Date object to YYYY-MM-DD */
export function toDateString(d) {
    if (d)
        return `${d.getFullYear()}-${padTime(d.getMonth() + 1)}-${padTime(d.getDate())} L`;
    return "";
}
/** Convert an BN timestamp to YYYY-MM-DD */
export function BNtoDateString(ts) {
    if (!ts.toNumber())
        return "N/A";
    return toDateString(new Date(ts.toNumber() * 1000));
}
/** Convert a Date object to YYYY-MM-DD HH:mm:ss */
export function toDateTimeString(d) {
    if (d)
        return `${d.getFullYear()}-${padTime(d.getMonth() + 1)}-${padTime(d.getDate())} ${padTime(d.getHours())}:${padTime(d.getMinutes())}:${padTime(d.getSeconds())} L`;
    return "";
}
/** Convert an BN timestamp to YYYY-MM-DD HH:mm:ss */
export function BNtoDateTimeString(ts) {
    if (!ts.toNumber())
        return "N/A";
    return toDateTimeString(new Date(ts.toNumber() * 1000));
}
//# sourceMappingURL=date.js.map