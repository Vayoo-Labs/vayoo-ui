import * as types from '../types';
export interface PermissionSetParamsFields {
    permission: types.SwitchboardPermissionKind;
    enable: boolean;
}
export interface PermissionSetParamsJSON {
    permission: types.SwitchboardPermissionJSON;
    enable: boolean;
}
export declare class PermissionSetParams {
    readonly permission: types.SwitchboardPermissionKind;
    readonly enable: boolean;
    constructor(fields: PermissionSetParamsFields);
    static layout(property?: string): any;
    static fromDecoded(obj: any): types.PermissionSetParams;
    static toEncodable(fields: PermissionSetParamsFields): {
        permission: {
            PermitOracleHeartbeat: {};
        } | {
            PermitOracleQueueUsage: {};
        } | {
            PermitVrfRequests: {};
        };
        enable: boolean;
    };
    toJSON(): PermissionSetParamsJSON;
    static fromJSON(obj: PermissionSetParamsJSON): PermissionSetParams;
    toEncodable(): {
        permission: {
            PermitOracleHeartbeat: {};
        } | {
            PermitOracleQueueUsage: {};
        } | {
            PermitVrfRequests: {};
        };
        enable: boolean;
    };
}
//# sourceMappingURL=PermissionSetParams.d.ts.map