/// <reference types="node" />
import { SwitchboardProgram } from '../../SwitchboardProgram';
import { PublicKey } from '@solana/web3.js';
import { BN } from '@switchboard-xyz/common';
export interface LeaseAccountDataFields {
    /** Public key of the token account holding the lease contract funds until rewarded to oracles for successfully processing updates */
    escrow: PublicKey;
    /** Public key of the oracle queue that the lease contract is applicable for. */
    queue: PublicKey;
    /** Public key of the aggregator that the lease contract is applicable for */
    aggregator: PublicKey;
    /** Public key of the Solana token program ID. */
    tokenProgram: PublicKey;
    /** Whether the lease contract is still active. */
    isActive: boolean;
    /** Index of an aggregators position on a crank. */
    crankRowCount: number;
    /** Timestamp when the lease contract was created. */
    createdAt: BN;
    /** Counter keeping track of the number of updates for the given aggregator. */
    updateCount: BN;
    /** Public key of keypair that may withdraw funds from the lease at any time */
    withdrawAuthority: PublicKey;
    /** The PDA bump to derive the pubkey. */
    bump: number;
    ebuf: Array<number>;
}
export interface LeaseAccountDataJSON {
    /** Public key of the token account holding the lease contract funds until rewarded to oracles for successfully processing updates */
    escrow: string;
    /** Public key of the oracle queue that the lease contract is applicable for. */
    queue: string;
    /** Public key of the aggregator that the lease contract is applicable for */
    aggregator: string;
    /** Public key of the Solana token program ID. */
    tokenProgram: string;
    /** Whether the lease contract is still active. */
    isActive: boolean;
    /** Index of an aggregators position on a crank. */
    crankRowCount: number;
    /** Timestamp when the lease contract was created. */
    createdAt: string;
    /** Counter keeping track of the number of updates for the given aggregator. */
    updateCount: string;
    /** Public key of keypair that may withdraw funds from the lease at any time */
    withdrawAuthority: string;
    /** The PDA bump to derive the pubkey. */
    bump: number;
    ebuf: Array<number>;
}
/** This should be any ccount that links a permission to an escrow */
export declare class LeaseAccountData {
    /** Public key of the token account holding the lease contract funds until rewarded to oracles for successfully processing updates */
    readonly escrow: PublicKey;
    /** Public key of the oracle queue that the lease contract is applicable for. */
    readonly queue: PublicKey;
    /** Public key of the aggregator that the lease contract is applicable for */
    readonly aggregator: PublicKey;
    /** Public key of the Solana token program ID. */
    readonly tokenProgram: PublicKey;
    /** Whether the lease contract is still active. */
    readonly isActive: boolean;
    /** Index of an aggregators position on a crank. */
    readonly crankRowCount: number;
    /** Timestamp when the lease contract was created. */
    readonly createdAt: BN;
    /** Counter keeping track of the number of updates for the given aggregator. */
    readonly updateCount: BN;
    /** Public key of keypair that may withdraw funds from the lease at any time */
    readonly withdrawAuthority: PublicKey;
    /** The PDA bump to derive the pubkey. */
    readonly bump: number;
    readonly ebuf: Array<number>;
    static readonly discriminator: Buffer;
    static readonly layout: any;
    constructor(fields: LeaseAccountDataFields);
    static fetch(program: SwitchboardProgram, address: PublicKey): Promise<LeaseAccountData | null>;
    static fetchMultiple(program: SwitchboardProgram, addresses: PublicKey[]): Promise<Array<LeaseAccountData | null>>;
    static decode(data: Buffer): LeaseAccountData;
    toJSON(): LeaseAccountDataJSON;
    static fromJSON(obj: LeaseAccountDataJSON): LeaseAccountData;
}
//# sourceMappingURL=LeaseAccountData.d.ts.map