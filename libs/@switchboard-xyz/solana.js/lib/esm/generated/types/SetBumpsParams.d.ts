import * as types from '../types';
export interface SetBumpsParamsFields {
    stateBump: number;
}
export interface SetBumpsParamsJSON {
    stateBump: number;
}
export declare class SetBumpsParams {
    readonly stateBump: number;
    constructor(fields: SetBumpsParamsFields);
    static layout(property?: string): any;
    static fromDecoded(obj: any): types.SetBumpsParams;
    static toEncodable(fields: SetBumpsParamsFields): {
        stateBump: number;
    };
    toJSON(): SetBumpsParamsJSON;
    static fromJSON(obj: SetBumpsParamsJSON): SetBumpsParams;
    toEncodable(): {
        stateBump: number;
    };
}
//# sourceMappingURL=SetBumpsParams.d.ts.map