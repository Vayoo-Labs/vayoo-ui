import * as types from '../types';
export interface VrfPoolInitParamsFields {
    maxRows: number;
    minInterval: number;
    stateBump: number;
}
export interface VrfPoolInitParamsJSON {
    maxRows: number;
    minInterval: number;
    stateBump: number;
}
export declare class VrfPoolInitParams {
    readonly maxRows: number;
    readonly minInterval: number;
    readonly stateBump: number;
    constructor(fields: VrfPoolInitParamsFields);
    static layout(property?: string): any;
    static fromDecoded(obj: any): types.VrfPoolInitParams;
    static toEncodable(fields: VrfPoolInitParamsFields): {
        maxRows: number;
        minInterval: number;
        stateBump: number;
    };
    toJSON(): VrfPoolInitParamsJSON;
    static fromJSON(obj: VrfPoolInitParamsJSON): VrfPoolInitParams;
    toEncodable(): {
        maxRows: number;
        minInterval: number;
        stateBump: number;
    };
}
//# sourceMappingURL=VrfPoolInitParams.d.ts.map