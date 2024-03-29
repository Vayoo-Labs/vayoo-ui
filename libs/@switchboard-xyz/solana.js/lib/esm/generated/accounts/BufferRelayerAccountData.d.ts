/// <reference types="node" />
import { SwitchboardProgram } from '../../SwitchboardProgram';
import { PublicKey } from '@solana/web3.js';
import * as types from '../types';
export interface BufferRelayerAccountDataFields {
    /** Name of the buffer account to store on-chain. */
    name: Array<number>;
    /** Public key of the OracleQueueAccountData that is currently assigned to fulfill buffer relayer update request. */
    queuePubkey: PublicKey;
    /** Token account to reward oracles for completing update request. */
    escrow: PublicKey;
    /** The account delegated as the authority for making account changes. */
    authority: PublicKey;
    /** Public key of the JobAccountData that defines how the buffer relayer is updated. */
    jobPubkey: PublicKey;
    /** Used to protect against malicious RPC nodes providing incorrect task definitions to oracles before fulfillment */
    jobHash: Array<number>;
    /** Minimum delay between update request. */
    minUpdateDelaySeconds: number;
    /** Whether buffer relayer config is locked for further changes. */
    isLocked: boolean;
    /** The current buffer relayer update round that is yet to be confirmed. */
    currentRound: types.BufferRelayerRoundFields;
    /** The latest confirmed buffer relayer update round. */
    latestConfirmedRound: types.BufferRelayerRoundFields;
    /** The buffer holding the latest confirmed result. */
    result: Uint8Array;
}
export interface BufferRelayerAccountDataJSON {
    /** Name of the buffer account to store on-chain. */
    name: Array<number>;
    /** Public key of the OracleQueueAccountData that is currently assigned to fulfill buffer relayer update request. */
    queuePubkey: string;
    /** Token account to reward oracles for completing update request. */
    escrow: string;
    /** The account delegated as the authority for making account changes. */
    authority: string;
    /** Public key of the JobAccountData that defines how the buffer relayer is updated. */
    jobPubkey: string;
    /** Used to protect against malicious RPC nodes providing incorrect task definitions to oracles before fulfillment */
    jobHash: Array<number>;
    /** Minimum delay between update request. */
    minUpdateDelaySeconds: number;
    /** Whether buffer relayer config is locked for further changes. */
    isLocked: boolean;
    /** The current buffer relayer update round that is yet to be confirmed. */
    currentRound: types.BufferRelayerRoundJSON;
    /** The latest confirmed buffer relayer update round. */
    latestConfirmedRound: types.BufferRelayerRoundJSON;
    /** The buffer holding the latest confirmed result. */
    result: Array<number>;
}
export declare class BufferRelayerAccountData {
    /** Name of the buffer account to store on-chain. */
    readonly name: Array<number>;
    /** Public key of the OracleQueueAccountData that is currently assigned to fulfill buffer relayer update request. */
    readonly queuePubkey: PublicKey;
    /** Token account to reward oracles for completing update request. */
    readonly escrow: PublicKey;
    /** The account delegated as the authority for making account changes. */
    readonly authority: PublicKey;
    /** Public key of the JobAccountData that defines how the buffer relayer is updated. */
    readonly jobPubkey: PublicKey;
    /** Used to protect against malicious RPC nodes providing incorrect task definitions to oracles before fulfillment */
    readonly jobHash: Array<number>;
    /** Minimum delay between update request. */
    readonly minUpdateDelaySeconds: number;
    /** Whether buffer relayer config is locked for further changes. */
    readonly isLocked: boolean;
    /** The current buffer relayer update round that is yet to be confirmed. */
    readonly currentRound: types.BufferRelayerRound;
    /** The latest confirmed buffer relayer update round. */
    readonly latestConfirmedRound: types.BufferRelayerRound;
    /** The buffer holding the latest confirmed result. */
    readonly result: Uint8Array;
    static readonly discriminator: Buffer;
    static readonly layout: any;
    constructor(fields: BufferRelayerAccountDataFields);
    static fetch(program: SwitchboardProgram, address: PublicKey): Promise<BufferRelayerAccountData | null>;
    static fetchMultiple(program: SwitchboardProgram, addresses: PublicKey[]): Promise<Array<BufferRelayerAccountData | null>>;
    static decode(data: Buffer): BufferRelayerAccountData;
    toJSON(): BufferRelayerAccountDataJSON;
    static fromJSON(obj: BufferRelayerAccountDataJSON): BufferRelayerAccountData;
}
//# sourceMappingURL=BufferRelayerAccountData.d.ts.map