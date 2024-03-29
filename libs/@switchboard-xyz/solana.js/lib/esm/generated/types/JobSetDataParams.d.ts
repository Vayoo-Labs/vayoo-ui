/// <reference types="node" />
import * as types from '../types';
export interface JobSetDataParamsFields {
    data: Uint8Array;
    chunkIdx: number;
}
export interface JobSetDataParamsJSON {
    data: Array<number>;
    chunkIdx: number;
}
export declare class JobSetDataParams {
    readonly data: Uint8Array;
    readonly chunkIdx: number;
    constructor(fields: JobSetDataParamsFields);
    static layout(property?: string): any;
    static fromDecoded(obj: any): types.JobSetDataParams;
    static toEncodable(fields: JobSetDataParamsFields): {
        data: Buffer;
        chunkIdx: number;
    };
    toJSON(): JobSetDataParamsJSON;
    static fromJSON(obj: JobSetDataParamsJSON): JobSetDataParams;
    toEncodable(): {
        data: Buffer;
        chunkIdx: number;
    };
}
//# sourceMappingURL=JobSetDataParams.d.ts.map