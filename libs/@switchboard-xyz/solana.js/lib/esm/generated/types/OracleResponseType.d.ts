import * as types from '../types';
import * as borsh from '@coral-xyz/borsh';
export interface TypeSuccessJSON {
    kind: 'TypeSuccess';
}
export declare class TypeSuccess {
    static readonly discriminator = 0;
    static readonly kind = "TypeSuccess";
    readonly discriminator = 0;
    readonly kind = "TypeSuccess";
    toJSON(): TypeSuccessJSON;
    toEncodable(): {
        TypeSuccess: {};
    };
}
export interface TypeErrorJSON {
    kind: 'TypeError';
}
export declare class TypeError {
    static readonly discriminator = 1;
    static readonly kind = "TypeError";
    readonly discriminator = 1;
    readonly kind = "TypeError";
    toJSON(): TypeErrorJSON;
    toEncodable(): {
        TypeError: {};
    };
}
export interface TypeDisagreementJSON {
    kind: 'TypeDisagreement';
}
export declare class TypeDisagreement {
    static readonly discriminator = 2;
    static readonly kind = "TypeDisagreement";
    readonly discriminator = 2;
    readonly kind = "TypeDisagreement";
    toJSON(): TypeDisagreementJSON;
    toEncodable(): {
        TypeDisagreement: {};
    };
}
export interface TypeNoResponseJSON {
    kind: 'TypeNoResponse';
}
export declare class TypeNoResponse {
    static readonly discriminator = 3;
    static readonly kind = "TypeNoResponse";
    readonly discriminator = 3;
    readonly kind = "TypeNoResponse";
    toJSON(): TypeNoResponseJSON;
    toEncodable(): {
        TypeNoResponse: {};
    };
}
export declare function fromDecoded(obj: any): types.OracleResponseTypeKind;
export declare function fromJSON(obj: types.OracleResponseTypeJSON): types.OracleResponseTypeKind;
export declare function layout(property?: string): borsh.EnumLayout<unknown>;
//# sourceMappingURL=OracleResponseType.d.ts.map