import * as borsh from '@coral-xyz/borsh';
import * as types from '../types';
export interface DJSON {
    kind: 'D';
}
export declare class D {
    static readonly discriminator = 0;
    static readonly kind = "D";
    readonly discriminator = 0;
    readonly kind = "D";
    toJSON(): DJSON;
    toEncodable(): {
        D: {};
    };
}
export interface CJSON {
    kind: 'C';
}
export declare class C {
    static readonly discriminator = 1;
    static readonly kind = "C";
    readonly discriminator = 1;
    readonly kind = "C";
    toJSON(): CJSON;
    toEncodable(): {
        C: {};
    };
}
export interface ABJSON {
    kind: 'AB';
}
export declare class AB {
    static readonly discriminator = 2;
    static readonly kind = "AB";
    readonly discriminator = 2;
    readonly kind = "AB";
    toJSON(): ABJSON;
    toEncodable(): {
        AB: {};
    };
}
export interface ACJSON {
    kind: 'AC';
}
export declare class AC {
    static readonly discriminator = 3;
    static readonly kind = "AC";
    readonly discriminator = 3;
    readonly kind = "AC";
    toJSON(): ACJSON;
    toEncodable(): {
        AC: {};
    };
}
export interface ADJSON {
    kind: 'AD';
}
export declare class AD {
    static readonly discriminator = 4;
    static readonly kind = "AD";
    readonly discriminator = 4;
    readonly kind = "AD";
    toJSON(): ADJSON;
    toEncodable(): {
        AD: {};
    };
}
export interface BCDJSON {
    kind: 'BCD';
}
export declare class BCD {
    static readonly discriminator = 5;
    static readonly kind = "BCD";
    readonly discriminator = 5;
    readonly kind = "BCD";
    toJSON(): BCDJSON;
    toEncodable(): {
        BCD: {};
    };
}
export declare function fromDecoded(obj: any): types.LanesKind;
export declare function fromJSON(obj: types.LanesJSON): types.LanesKind;
export declare function layout(property?: string): borsh.EnumLayout<unknown>;
//# sourceMappingURL=Lanes.d.ts.map