/** Sleep for a given number of milliseconds
 * @param ms number of milliseconds to sleep for
 * @return a promise that resolves when the sleep interval has elapsed
 */
export declare const sleep: (ms: number) => Promise<any>;
export declare class TimeoutError extends Error {
    readonly ms: number;
    constructor(ms: number, msg?: string);
}
/** Returns a promise that resolves successfully if returned before the given timeout has elapsed.
 * @param ms the number of milliseconds before the promise expires
 * @param promise the promise(s) to wait for
 * @param timeoutError the error to throw if the promise expires
 * @return the promise result
 */
export declare function promiseWithTimeout<T>(ms: number, promise: Promise<T> | Array<Promise<T>>, timeoutError?: string): Promise<T>;
//# sourceMappingURL=async.d.ts.map