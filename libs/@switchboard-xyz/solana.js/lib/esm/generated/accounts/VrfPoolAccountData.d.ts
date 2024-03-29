/// <reference types="node" />
import { SwitchboardProgram } from '../../SwitchboardProgram';
import { PublicKey } from '@solana/web3.js';
export interface VrfPoolAccountDataFields {
    /** ACCOUNTS */
    authority: PublicKey;
    queue: PublicKey;
    escrow: PublicKey;
    minInterval: number;
    maxRows: number;
    size: number;
    idx: number;
    stateBump: number;
    ebuf: Array<number>;
}
export interface VrfPoolAccountDataJSON {
    /** ACCOUNTS */
    authority: string;
    queue: string;
    escrow: string;
    minInterval: number;
    maxRows: number;
    size: number;
    idx: number;
    stateBump: number;
    ebuf: Array<number>;
}
export declare class VrfPoolAccountData {
    /** ACCOUNTS */
    readonly authority: PublicKey;
    readonly queue: PublicKey;
    readonly escrow: PublicKey;
    readonly minInterval: number;
    readonly maxRows: number;
    readonly size: number;
    readonly idx: number;
    readonly stateBump: number;
    readonly ebuf: Array<number>;
    static readonly discriminator: Buffer;
    static readonly layout: any;
    constructor(fields: VrfPoolAccountDataFields);
    static fetch(program: SwitchboardProgram, address: PublicKey): Promise<VrfPoolAccountData | null>;
    static fetchMultiple(program: SwitchboardProgram, addresses: PublicKey[]): Promise<Array<VrfPoolAccountData | null>>;
    static decode(data: Buffer): VrfPoolAccountData;
    toJSON(): VrfPoolAccountDataJSON;
    static fromJSON(obj: VrfPoolAccountDataJSON): VrfPoolAccountData;
}
//# sourceMappingURL=VrfPoolAccountData.d.ts.map