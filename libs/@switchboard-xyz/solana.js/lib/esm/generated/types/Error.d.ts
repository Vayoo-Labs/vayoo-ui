import * as types from '../types';
import * as borsh from '@coral-xyz/borsh';
export interface InvalidPublicKeyJSON {
    kind: 'InvalidPublicKey';
}
export declare class InvalidPublicKey {
    static readonly discriminator = 0;
    static readonly kind = "InvalidPublicKey";
    readonly discriminator = 0;
    readonly kind = "InvalidPublicKey";
    toJSON(): InvalidPublicKeyJSON;
    toEncodable(): {
        InvalidPublicKey: {};
    };
}
export interface SerializationErrorJSON {
    kind: 'SerializationError';
}
export declare class SerializationError {
    static readonly discriminator = 1;
    static readonly kind = "SerializationError";
    readonly discriminator = 1;
    readonly kind = "SerializationError";
    toJSON(): SerializationErrorJSON;
    toEncodable(): {
        SerializationError: {};
    };
}
export interface DeserializationErrorJSON {
    kind: 'DeserializationError';
}
export declare class DeserializationError {
    static readonly discriminator = 2;
    static readonly kind = "DeserializationError";
    readonly discriminator = 2;
    readonly kind = "DeserializationError";
    toJSON(): DeserializationErrorJSON;
    toEncodable(): {
        DeserializationError: {};
    };
}
export interface InvalidDataErrorJSON {
    kind: 'InvalidDataError';
}
export declare class InvalidDataError {
    static readonly discriminator = 3;
    static readonly kind = "InvalidDataError";
    readonly discriminator = 3;
    readonly kind = "InvalidDataError";
    toJSON(): InvalidDataErrorJSON;
    toEncodable(): {
        InvalidDataError: {};
    };
}
export declare function fromDecoded(obj: any): types.ErrorKind;
export declare function fromJSON(obj: types.ErrorJSON): types.ErrorKind;
export declare function layout(property?: string): borsh.EnumLayout<unknown>;
//# sourceMappingURL=Error.d.ts.map