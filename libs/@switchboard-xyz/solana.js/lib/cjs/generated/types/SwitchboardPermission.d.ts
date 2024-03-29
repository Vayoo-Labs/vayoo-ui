import * as borsh from '@coral-xyz/borsh';
import * as types from '../types';
export interface PermitNoneJSON {
    kind: 'PermitNone';
}
export declare class PermitNone {
    static readonly discriminator = 0;
    static readonly kind = "NONE";
    readonly discriminator = 0;
    readonly kind = "PermitNone";
    toJSON(): PermitNoneJSON;
    toEncodable(): {
        PermitOracleHeartbeat: {};
    };
}
export interface PermitOracleHeartbeatJSON {
    kind: 'PermitOracleHeartbeat';
}
export declare class PermitOracleHeartbeat {
    static readonly discriminator = 1;
    static readonly kind = "PermitOracleHeartbeat";
    readonly discriminator = 1;
    readonly kind = "PermitOracleHeartbeat";
    toJSON(): PermitOracleHeartbeatJSON;
    toEncodable(): {
        PermitOracleHeartbeat: {};
    };
}
export interface PermitOracleQueueUsageJSON {
    kind: 'PermitOracleQueueUsage';
}
export declare class PermitOracleQueueUsage {
    static readonly discriminator = 2;
    static readonly kind = "PermitOracleQueueUsage";
    readonly discriminator = 2;
    readonly kind = "PermitOracleQueueUsage";
    toJSON(): PermitOracleQueueUsageJSON;
    toEncodable(): {
        PermitOracleQueueUsage: {};
    };
}
export interface PermitVrfRequestsJSON {
    kind: 'PermitVrfRequests';
}
export declare class PermitVrfRequests {
    static readonly discriminator = 4;
    static readonly kind = "PermitVrfRequests";
    readonly discriminator = 4;
    readonly kind = "PermitVrfRequests";
    toJSON(): PermitVrfRequestsJSON;
    toEncodable(): {
        PermitVrfRequests: {};
    };
}
export declare function fromDecoded(obj: any): types.SwitchboardPermissionKind;
export declare function fromJSON(obj: types.SwitchboardPermissionJSON): types.SwitchboardPermissionKind;
export declare function layout(property?: string): borsh.EnumLayout<unknown>;
//# sourceMappingURL=SwitchboardPermission.d.ts.map