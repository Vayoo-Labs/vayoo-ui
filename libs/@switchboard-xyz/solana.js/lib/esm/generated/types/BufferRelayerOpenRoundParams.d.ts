import * as types from '../types';
export interface BufferRelayerOpenRoundParamsFields {
    stateBump: number;
    permissionBump: number;
}
export interface BufferRelayerOpenRoundParamsJSON {
    stateBump: number;
    permissionBump: number;
}
export declare class BufferRelayerOpenRoundParams {
    readonly stateBump: number;
    readonly permissionBump: number;
    constructor(fields: BufferRelayerOpenRoundParamsFields);
    static layout(property?: string): any;
    static fromDecoded(obj: any): types.BufferRelayerOpenRoundParams;
    static toEncodable(fields: BufferRelayerOpenRoundParamsFields): {
        stateBump: number;
        permissionBump: number;
    };
    toJSON(): BufferRelayerOpenRoundParamsJSON;
    static fromJSON(obj: BufferRelayerOpenRoundParamsJSON): BufferRelayerOpenRoundParams;
    toEncodable(): {
        stateBump: number;
        permissionBump: number;
    };
}
//# sourceMappingURL=BufferRelayerOpenRoundParams.d.ts.map