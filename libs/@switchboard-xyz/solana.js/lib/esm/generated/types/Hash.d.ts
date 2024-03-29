import * as types from '../types';
export interface HashFields {
    /** The bytes used to derive the hash. */
    data: Array<number>;
}
export interface HashJSON {
    /** The bytes used to derive the hash. */
    data: Array<number>;
}
export declare class Hash {
    /** The bytes used to derive the hash. */
    readonly data: Array<number>;
    constructor(fields: HashFields);
    static layout(property?: string): any;
    static fromDecoded(obj: any): types.Hash;
    static toEncodable(fields: HashFields): {
        data: number[];
    };
    toJSON(): HashJSON;
    static fromJSON(obj: HashJSON): Hash;
    toEncodable(): {
        data: number[];
    };
}
//# sourceMappingURL=Hash.d.ts.map