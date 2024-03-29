import * as types from '../types';
import * as borsh from '@coral-xyz/borsh';
export interface StatusNoneJSON {
    kind: 'StatusNone';
}
export declare class StatusNone {
    static readonly discriminator = 0;
    static readonly kind = "StatusNone";
    readonly discriminator = 0;
    readonly kind = "StatusNone";
    toJSON(): StatusNoneJSON;
    toEncodable(): {
        StatusNone: {};
    };
}
export interface StatusRequestingJSON {
    kind: 'StatusRequesting';
}
export declare class StatusRequesting {
    static readonly discriminator = 1;
    static readonly kind = "StatusRequesting";
    readonly discriminator = 1;
    readonly kind = "StatusRequesting";
    toJSON(): StatusRequestingJSON;
    toEncodable(): {
        StatusRequesting: {};
    };
}
export interface StatusVerifyingJSON {
    kind: 'StatusVerifying';
}
export declare class StatusVerifying {
    static readonly discriminator = 2;
    static readonly kind = "StatusVerifying";
    readonly discriminator = 2;
    readonly kind = "StatusVerifying";
    toJSON(): StatusVerifyingJSON;
    toEncodable(): {
        StatusVerifying: {};
    };
}
export interface StatusVerifiedJSON {
    kind: 'StatusVerified';
}
export declare class StatusVerified {
    static readonly discriminator = 3;
    static readonly kind = "StatusVerified";
    readonly discriminator = 3;
    readonly kind = "StatusVerified";
    toJSON(): StatusVerifiedJSON;
    toEncodable(): {
        StatusVerified: {};
    };
}
export interface StatusCallbackSuccessJSON {
    kind: 'StatusCallbackSuccess';
}
export declare class StatusCallbackSuccess {
    static readonly discriminator = 4;
    static readonly kind = "StatusCallbackSuccess";
    readonly discriminator = 4;
    readonly kind = "StatusCallbackSuccess";
    toJSON(): StatusCallbackSuccessJSON;
    toEncodable(): {
        StatusCallbackSuccess: {};
    };
}
export interface StatusVerifyFailureJSON {
    kind: 'StatusVerifyFailure';
}
export declare class StatusVerifyFailure {
    static readonly discriminator = 5;
    static readonly kind = "StatusVerifyFailure";
    readonly discriminator = 5;
    readonly kind = "StatusVerifyFailure";
    toJSON(): StatusVerifyFailureJSON;
    toEncodable(): {
        StatusVerifyFailure: {};
    };
}
export declare function fromDecoded(obj: any): types.VrfStatusKind;
export declare function fromJSON(obj: types.VrfStatusJSON): types.VrfStatusKind;
export declare function layout(property?: string): borsh.EnumLayout<unknown>;
//# sourceMappingURL=VrfStatus.d.ts.map