import * as types from '../types';
export interface VrfPoolAddParamsFields {
}
export interface VrfPoolAddParamsJSON {
}
export declare class VrfPoolAddParams {
    constructor(fields: VrfPoolAddParamsFields);
    static layout(property?: string): any;
    static fromDecoded(obj: any): types.VrfPoolAddParams;
    static toEncodable(fields: VrfPoolAddParamsFields): {};
    toJSON(): VrfPoolAddParamsJSON;
    static fromJSON(obj: VrfPoolAddParamsJSON): VrfPoolAddParams;
    toEncodable(): {};
}
//# sourceMappingURL=VrfPoolAddParams.d.ts.map