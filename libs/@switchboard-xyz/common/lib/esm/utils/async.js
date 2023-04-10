/** Sleep for a given number of milliseconds
 * @param ms number of milliseconds to sleep for
 * @return a promise that resolves when the sleep interval has elapsed
 */
export const sleep = (ms) => new Promise((s) => setTimeout(s, ms));
export class TimeoutError extends Error {
    constructor(ms, msg) {
        super(`TimeoutError${msg
            ? ": " + msg
            : `timed out after ${Math.round(ms / 1000).toFixed(3)} seconds`}`);
        this.ms = ms;
        Object.setPrototypeOf(this, TimeoutError.prototype);
    }
}
/** Returns a promise that resolves successfully if returned before the given timeout has elapsed.
 * @param ms the number of milliseconds before the promise expires
 * @param promise the promise(s) to wait for
 * @param timeoutError the error to throw if the promise expires
 * @return the promise result
 */
export async function promiseWithTimeout(ms, promise, timeoutError) {
    const promises = Array.isArray(promise) ? promise : [promise];
    // create a promise that rejects in N milliseconds
    const timeout = new Promise((_, reject) => {
        setTimeout(() => {
            // for (const p of promises) {
            //   if ("unref" in p && typeof p.unref === "function") {
            //     p.unref();
            //   }
            // }
            reject(new TimeoutError(ms, timeoutError));
        }, ms).unref(); // dont hold up closing NodeJS process if this is the only timer scheduled
    });
    return Promise.race([...promises, timeout]);
}
//# sourceMappingURL=async.js.map