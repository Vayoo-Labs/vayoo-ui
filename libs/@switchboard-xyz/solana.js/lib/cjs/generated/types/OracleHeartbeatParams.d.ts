import * as types from '../types';
export interface OracleHeartbeatParamsFields {
    permissionBump: number;
}
export interface OracleHeartbeatParamsJSON {
    permissionBump: number;
}
export declare class OracleHeartbeatParams {
    readonly permissionBump: number;
    constructor(fields: OracleHeartbeatParamsFields);
    static layout(property?: string): any;
    static fromDecoded(obj: any): types.OracleHeartbeatParams;
    static toEncodable(fields: OracleHeartbeatParamsFields): {
        permissionBump: number;
    };
    toJSON(): OracleHeartbeatParamsJSON;
    static fromJSON(obj: OracleHeartbeatParamsJSON): OracleHeartbeatParams;
    toEncodable(): {
        permissionBump: number;
    };
}
//# sourceMappingURL=OracleHeartbeatParams.d.ts.map