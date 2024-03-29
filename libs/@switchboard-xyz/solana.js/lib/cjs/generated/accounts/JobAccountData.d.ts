/// <reference types="node" />
import { SwitchboardProgram } from '../../SwitchboardProgram';
import { PublicKey } from '@solana/web3.js';
import { BN } from '@switchboard-xyz/common';
export interface JobAccountDataFields {
    /** Name of the job to store on-chain. */
    name: Array<number>;
    /** Metadata of the job to store on-chain. */
    metadata: Array<number>;
    /** The account delegated as the authority for making account changes. */
    authority: PublicKey;
    /** Unix timestamp when the job is considered invalid */
    expiration: BN;
    /** Hash of the serialized data to prevent tampering. */
    hash: Array<number>;
    /** Serialized protobuf containing the collection of task to retrieve data off-chain. */
    data: Uint8Array;
    /** The number of data feeds referencing the job account.. */
    referenceCount: number;
    /** The token amount funded into a feed that contains this job account. */
    totalSpent: BN;
    /** Unix timestamp when the job was created on-chain. */
    createdAt: BN;
    isInitializing: number;
}
export interface JobAccountDataJSON {
    /** Name of the job to store on-chain. */
    name: Array<number>;
    /** Metadata of the job to store on-chain. */
    metadata: Array<number>;
    /** The account delegated as the authority for making account changes. */
    authority: string;
    /** Unix timestamp when the job is considered invalid */
    expiration: string;
    /** Hash of the serialized data to prevent tampering. */
    hash: Array<number>;
    /** Serialized protobuf containing the collection of task to retrieve data off-chain. */
    data: Array<number>;
    /** The number of data feeds referencing the job account.. */
    referenceCount: number;
    /** The token amount funded into a feed that contains this job account. */
    totalSpent: string;
    /** Unix timestamp when the job was created on-chain. */
    createdAt: string;
    isInitializing: number;
}
export declare class JobAccountData {
    /** Name of the job to store on-chain. */
    readonly name: Array<number>;
    /** Metadata of the job to store on-chain. */
    readonly metadata: Array<number>;
    /** The account delegated as the authority for making account changes. */
    readonly authority: PublicKey;
    /** Unix timestamp when the job is considered invalid */
    readonly expiration: BN;
    /** Hash of the serialized data to prevent tampering. */
    readonly hash: Array<number>;
    /** Serialized protobuf containing the collection of task to retrieve data off-chain. */
    readonly data: Uint8Array;
    /** The number of data feeds referencing the job account.. */
    readonly referenceCount: number;
    /** The token amount funded into a feed that contains this job account. */
    readonly totalSpent: BN;
    /** Unix timestamp when the job was created on-chain. */
    readonly createdAt: BN;
    readonly isInitializing: number;
    static readonly discriminator: Buffer;
    static readonly layout: any;
    constructor(fields: JobAccountDataFields);
    static fetch(program: SwitchboardProgram, address: PublicKey): Promise<JobAccountData | null>;
    static fetchMultiple(program: SwitchboardProgram, addresses: PublicKey[]): Promise<Array<JobAccountData | null>>;
    static decode(data: Buffer): JobAccountData;
    toJSON(): JobAccountDataJSON;
    static fromJSON(obj: JobAccountDataJSON): JobAccountData;
}
//# sourceMappingURL=JobAccountData.d.ts.map