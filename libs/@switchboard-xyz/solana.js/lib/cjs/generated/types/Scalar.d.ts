import * as types from '../types';
export interface ScalarFields {
    /**
     * `bytes` is a little-endian byte encoding of an integer representing a scalar modulo the
     * group order.
     *
     * # Invariant
     *
     * The integer representing this scalar must be bounded above by \\(2\^{255}\\), or
     * equivalently the high bit of `bytes[31]` must be zero.
     *
     * This ensures that there is room for a carry bit when computing a NAF representation.
     */
    bytes: Array<number>;
}
export interface ScalarJSON {
    /**
     * `bytes` is a little-endian byte encoding of an integer representing a scalar modulo the
     * group order.
     *
     * # Invariant
     *
     * The integer representing this scalar must be bounded above by \\(2\^{255}\\), or
     * equivalently the high bit of `bytes[31]` must be zero.
     *
     * This ensures that there is room for a carry bit when computing a NAF representation.
     */
    bytes: Array<number>;
}
/**
 * The `Scalar` struct holds an integer \\(s < 2\^{255} \\) which
 * represents an element of \\(\mathbb Z / \ell\\).
 */
export declare class Scalar {
    /**
     * `bytes` is a little-endian byte encoding of an integer representing a scalar modulo the
     * group order.
     *
     * # Invariant
     *
     * The integer representing this scalar must be bounded above by \\(2\^{255}\\), or
     * equivalently the high bit of `bytes[31]` must be zero.
     *
     * This ensures that there is room for a carry bit when computing a NAF representation.
     */
    readonly bytes: Array<number>;
    constructor(fields: ScalarFields);
    static layout(property?: string): any;
    static fromDecoded(obj: any): types.Scalar;
    static toEncodable(fields: ScalarFields): {
        bytes: number[];
    };
    toJSON(): ScalarJSON;
    static fromJSON(obj: ScalarJSON): Scalar;
    toEncodable(): {
        bytes: number[];
    };
}
//# sourceMappingURL=Scalar.d.ts.map