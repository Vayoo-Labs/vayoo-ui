import * as types from '../types';
export interface PermissionInitParamsFields {
}
export interface PermissionInitParamsJSON {
}
export declare class PermissionInitParams {
    constructor(fields: PermissionInitParamsFields);
    static layout(property?: string): any;
    static fromDecoded(obj: any): types.PermissionInitParams;
    static toEncodable(fields: PermissionInitParamsFields): {};
    toJSON(): PermissionInitParamsJSON;
    static fromJSON(obj: PermissionInitParamsJSON): PermissionInitParams;
    toEncodable(): {};
}
//# sourceMappingURL=PermissionInitParams.d.ts.map