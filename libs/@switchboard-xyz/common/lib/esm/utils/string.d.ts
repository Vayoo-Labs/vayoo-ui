/// <reference types="node" />
/**
 * Converts to utf-8 encoding and removes null characters.
 */
export declare const buf2String: (buf: Uint8Array | number[] | string | Buffer) => string;
export declare const toUtf8: (buf: Uint8Array | number[] | string | Buffer) => string;
/** Determine whether a given string contains only base58 characters */
export declare const isBase58: (value: string) => boolean;
/** Determine whether a given string contains a secretKey Uint8Array */
export declare const isKeypairString: (value: string) => boolean;
//# sourceMappingURL=string.d.ts.map