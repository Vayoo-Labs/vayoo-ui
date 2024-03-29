import * as types from '../types';
export interface BufferRelayerInitParamsFields {
    name: Array<number>;
    minUpdateDelaySeconds: number;
    stateBump: number;
}
export interface BufferRelayerInitParamsJSON {
    name: Array<number>;
    minUpdateDelaySeconds: number;
    stateBump: number;
}
export declare class BufferRelayerInitParams {
    readonly name: Array<number>;
    readonly minUpdateDelaySeconds: number;
    readonly stateBump: number;
    constructor(fields: BufferRelayerInitParamsFields);
    static layout(property?: string): any;
    static fromDecoded(obj: any): types.BufferRelayerInitParams;
    static toEncodable(fields: BufferRelayerInitParamsFields): {
        name: number[];
        minUpdateDelaySeconds: number;
        stateBump: number;
    };
    toJSON(): BufferRelayerInitParamsJSON;
    static fromJSON(obj: BufferRelayerInitParamsJSON): BufferRelayerInitParams;
    toEncodable(): {
        name: number[];
        minUpdateDelaySeconds: number;
        stateBump: number;
    };
}
//# sourceMappingURL=BufferRelayerInitParams.d.ts.map