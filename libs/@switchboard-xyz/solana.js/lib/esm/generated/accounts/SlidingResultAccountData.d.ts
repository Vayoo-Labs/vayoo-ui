/// <reference types="node" />
import { SwitchboardProgram } from '../../SwitchboardProgram';
import { PublicKey } from '@solana/web3.js';
import * as types from '../types';
export interface SlidingResultAccountDataFields {
    data: Array<types.SlidingWindowElementFields>;
    bump: number;
    ebuf: Array<number>;
}
export interface SlidingResultAccountDataJSON {
    data: Array<types.SlidingWindowElementJSON>;
    bump: number;
    ebuf: Array<number>;
}
export declare class SlidingResultAccountData {
    readonly data: Array<types.SlidingWindowElement>;
    readonly bump: number;
    readonly ebuf: Array<number>;
    static readonly discriminator: Buffer;
    static readonly layout: any;
    constructor(fields: SlidingResultAccountDataFields);
    static fetch(program: SwitchboardProgram, address: PublicKey): Promise<SlidingResultAccountData | null>;
    static fetchMultiple(program: SwitchboardProgram, addresses: PublicKey[]): Promise<Array<SlidingResultAccountData | null>>;
    static decode(data: Buffer): SlidingResultAccountData;
    toJSON(): SlidingResultAccountDataJSON;
    static fromJSON(obj: SlidingResultAccountDataJSON): SlidingResultAccountData;
}
//# sourceMappingURL=SlidingResultAccountData.d.ts.map