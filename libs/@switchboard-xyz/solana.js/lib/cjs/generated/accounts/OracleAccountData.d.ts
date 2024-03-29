/// <reference types="node" />
import { SwitchboardProgram } from '../../SwitchboardProgram';
import { PublicKey } from '@solana/web3.js';
import { BN } from '@switchboard-xyz/common';
import * as types from '../types';
export interface OracleAccountDataFields {
    /** Name of the oracle to store on-chain. */
    name: Array<number>;
    /** Metadata of the oracle to store on-chain. */
    metadata: Array<number>;
    /** The account delegated as the authority for making account changes or withdrawing funds from a staking wallet. */
    oracleAuthority: PublicKey;
    /** Unix timestamp when the oracle last heartbeated */
    lastHeartbeat: BN;
    /** Flag dictating if an oracle is active and has heartbeated before the queue's oracle timeout parameter. */
    numInUse: number;
    /** Stake account and reward/slashing wallet. */
    tokenAccount: PublicKey;
    /** Public key of the oracle queue who has granted it permission to use its resources. */
    queuePubkey: PublicKey;
    /** Oracle track record. */
    metrics: types.OracleMetricsFields;
    /** The PDA bump to derive the pubkey. */
    bump: number;
    /** Reserved for future info. */
    ebuf: Array<number>;
}
export interface OracleAccountDataJSON {
    /** Name of the oracle to store on-chain. */
    name: Array<number>;
    /** Metadata of the oracle to store on-chain. */
    metadata: Array<number>;
    /** The account delegated as the authority for making account changes or withdrawing funds from a staking wallet. */
    oracleAuthority: string;
    /** Unix timestamp when the oracle last heartbeated */
    lastHeartbeat: string;
    /** Flag dictating if an oracle is active and has heartbeated before the queue's oracle timeout parameter. */
    numInUse: number;
    /** Stake account and reward/slashing wallet. */
    tokenAccount: string;
    /** Public key of the oracle queue who has granted it permission to use its resources. */
    queuePubkey: string;
    /** Oracle track record. */
    metrics: types.OracleMetricsJSON;
    /** The PDA bump to derive the pubkey. */
    bump: number;
    /** Reserved for future info. */
    ebuf: Array<number>;
}
export declare class OracleAccountData {
    /** Name of the oracle to store on-chain. */
    readonly name: Array<number>;
    /** Metadata of the oracle to store on-chain. */
    readonly metadata: Array<number>;
    /** The account delegated as the authority for making account changes or withdrawing funds from a staking wallet. */
    readonly oracleAuthority: PublicKey;
    /** Unix timestamp when the oracle last heartbeated */
    readonly lastHeartbeat: BN;
    /** Flag dictating if an oracle is active and has heartbeated before the queue's oracle timeout parameter. */
    readonly numInUse: number;
    /** Stake account and reward/slashing wallet. */
    readonly tokenAccount: PublicKey;
    /** Public key of the oracle queue who has granted it permission to use its resources. */
    readonly queuePubkey: PublicKey;
    /** Oracle track record. */
    readonly metrics: types.OracleMetrics;
    /** The PDA bump to derive the pubkey. */
    readonly bump: number;
    /** Reserved for future info. */
    readonly ebuf: Array<number>;
    static readonly discriminator: Buffer;
    static readonly layout: any;
    constructor(fields: OracleAccountDataFields);
    static fetch(program: SwitchboardProgram, address: PublicKey): Promise<OracleAccountData | null>;
    static fetchMultiple(program: SwitchboardProgram, addresses: PublicKey[]): Promise<Array<OracleAccountData | null>>;
    static decode(data: Buffer): OracleAccountData;
    toJSON(): OracleAccountDataJSON;
    static fromJSON(obj: OracleAccountDataJSON): OracleAccountData;
}
//# sourceMappingURL=OracleAccountData.d.ts.map