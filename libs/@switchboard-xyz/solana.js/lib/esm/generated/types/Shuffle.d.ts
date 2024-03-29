import * as types from '../types';
import * as borsh from '@coral-xyz/borsh';
export interface AAAAJSON {
    kind: 'AAAA';
}
export declare class AAAA {
    static readonly discriminator = 0;
    static readonly kind = "AAAA";
    readonly discriminator = 0;
    readonly kind = "AAAA";
    toJSON(): AAAAJSON;
    toEncodable(): {
        AAAA: {};
    };
}
export interface BBBBJSON {
    kind: 'BBBB';
}
export declare class BBBB {
    static readonly discriminator = 1;
    static readonly kind = "BBBB";
    readonly discriminator = 1;
    readonly kind = "BBBB";
    toJSON(): BBBBJSON;
    toEncodable(): {
        BBBB: {};
    };
}
export interface BADCJSON {
    kind: 'BADC';
}
export declare class BADC {
    static readonly discriminator = 2;
    static readonly kind = "BADC";
    readonly discriminator = 2;
    readonly kind = "BADC";
    toJSON(): BADCJSON;
    toEncodable(): {
        BADC: {};
    };
}
export interface BACDJSON {
    kind: 'BACD';
}
export declare class BACD {
    static readonly discriminator = 3;
    static readonly kind = "BACD";
    readonly discriminator = 3;
    readonly kind = "BACD";
    toJSON(): BACDJSON;
    toEncodable(): {
        BACD: {};
    };
}
export interface ADDAJSON {
    kind: 'ADDA';
}
export declare class ADDA {
    static readonly discriminator = 4;
    static readonly kind = "ADDA";
    readonly discriminator = 4;
    readonly kind = "ADDA";
    toJSON(): ADDAJSON;
    toEncodable(): {
        ADDA: {};
    };
}
export interface CBCBJSON {
    kind: 'CBCB';
}
export declare class CBCB {
    static readonly discriminator = 5;
    static readonly kind = "CBCB";
    readonly discriminator = 5;
    readonly kind = "CBCB";
    toJSON(): CBCBJSON;
    toEncodable(): {
        CBCB: {};
    };
}
export interface ABDCJSON {
    kind: 'ABDC';
}
export declare class ABDC {
    static readonly discriminator = 6;
    static readonly kind = "ABDC";
    readonly discriminator = 6;
    readonly kind = "ABDC";
    toJSON(): ABDCJSON;
    toEncodable(): {
        ABDC: {};
    };
}
export interface ABABJSON {
    kind: 'ABAB';
}
export declare class ABAB {
    static readonly discriminator = 7;
    static readonly kind = "ABAB";
    readonly discriminator = 7;
    readonly kind = "ABAB";
    toJSON(): ABABJSON;
    toEncodable(): {
        ABAB: {};
    };
}
export interface DBBDJSON {
    kind: 'DBBD';
}
export declare class DBBD {
    static readonly discriminator = 8;
    static readonly kind = "DBBD";
    readonly discriminator = 8;
    readonly kind = "DBBD";
    toJSON(): DBBDJSON;
    toEncodable(): {
        DBBD: {};
    };
}
export interface CACAJSON {
    kind: 'CACA';
}
export declare class CACA {
    static readonly discriminator = 9;
    static readonly kind = "CACA";
    readonly discriminator = 9;
    readonly kind = "CACA";
    toJSON(): CACAJSON;
    toEncodable(): {
        CACA: {};
    };
}
export declare function fromDecoded(obj: any): types.ShuffleKind;
export declare function fromJSON(obj: types.ShuffleJSON): types.ShuffleKind;
export declare function layout(property?: string): borsh.EnumLayout<unknown>;
//# sourceMappingURL=Shuffle.d.ts.map