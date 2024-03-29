/// <reference types="node" />
import { SwitchboardProgram } from '../../SwitchboardProgram';
import { PublicKey } from '@solana/web3.js';
export interface SbStateFields {
    /** The account authority permitted to make account changes. */
    authority: PublicKey;
    /** The token mint used for oracle rewards, aggregator leases, and other reward incentives. */
    tokenMint: PublicKey;
    /** Token vault used by the program to receive kickbacks. */
    tokenVault: PublicKey;
    /** The token mint used by the DAO. */
    daoMint: PublicKey;
    /** The PDA bump to derive the pubkey. */
    bump: number;
    /** Reserved for future info. */
    ebuf: Array<number>;
}
export interface SbStateJSON {
    /** The account authority permitted to make account changes. */
    authority: string;
    /** The token mint used for oracle rewards, aggregator leases, and other reward incentives. */
    tokenMint: string;
    /** Token vault used by the program to receive kickbacks. */
    tokenVault: string;
    /** The token mint used by the DAO. */
    daoMint: string;
    /** The PDA bump to derive the pubkey. */
    bump: number;
    /** Reserved for future info. */
    ebuf: Array<number>;
}
export declare class SbState {
    /** The account authority permitted to make account changes. */
    readonly authority: PublicKey;
    /** The token mint used for oracle rewards, aggregator leases, and other reward incentives. */
    readonly tokenMint: PublicKey;
    /** Token vault used by the program to receive kickbacks. */
    readonly tokenVault: PublicKey;
    /** The token mint used by the DAO. */
    readonly daoMint: PublicKey;
    /** The PDA bump to derive the pubkey. */
    readonly bump: number;
    /** Reserved for future info. */
    readonly ebuf: Array<number>;
    static readonly discriminator: Buffer;
    static readonly layout: any;
    constructor(fields: SbStateFields);
    static fetch(program: SwitchboardProgram, address: PublicKey): Promise<SbState | null>;
    static fetchMultiple(program: SwitchboardProgram, addresses: PublicKey[]): Promise<Array<SbState | null>>;
    static decode(data: Buffer): SbState;
    toJSON(): SbStateJSON;
    static fromJSON(obj: SbStateJSON): SbState;
}
//# sourceMappingURL=SbState.d.ts.map