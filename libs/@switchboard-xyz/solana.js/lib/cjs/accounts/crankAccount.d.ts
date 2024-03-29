import * as types from '../generated';
import { SwitchboardProgram } from '../SwitchboardProgram';
import { TransactionObject, TransactionObjectOptions } from '../TransactionObject';
import { Account, OnAccountChangeCallback } from './account';
import { AggregatorAccount, AggregatorPdaAccounts } from './aggregatorAccount';
import { CrankDataBuffer } from './crankDataBuffer';
import { QueueAccount } from './queueAccount';
import { Commitment, Keypair, PublicKey, TransactionSignature } from '@solana/web3.js';
/**
 * Account holding a priority queue of aggregators and their next available update time. This is a scheduling mechanism to ensure {@linkcode AggregatorAccount}'s are updated as close as possible to their specified update interval.
 *
 * Data: {@linkcode types.CrankAccountData}
 *
 * Buffer: {@linkcode CrankDataBuffer}
 */
export declare class CrankAccount extends Account<types.CrankAccountData> {
    static accountName: string;
    /** The public key of the crank's data buffer storing a priority queue of {@linkcode AggregatorAccount}'s and their next available update timestamp */
    dataBuffer?: CrankDataBuffer;
    /**
     * Get the size of an {@linkcode CrankAccount} on-chain.
     */
    size: number;
    /**
     * Return a crank account initialized to the default values.
     */
    static default(): types.CrankAccountData;
    /**
     * Invoke a callback each time a CrankAccount's data has changed on-chain.
     * @param callback - the callback invoked when the cranks state changes
     * @param commitment - optional, the desired transaction finality. defaults to 'confirmed'
     * @returns the websocket subscription id
     */
    onChange(callback: OnAccountChangeCallback<types.CrankAccountData>, commitment?: Commitment): number;
    /** Load an existing CrankAccount with its current on-chain state */
    static load(program: SwitchboardProgram, publicKey: PublicKey | string): Promise<[CrankAccount, types.CrankAccountData]>;
    /**
     * Retrieve and decode the {@linkcode types.CrankAccountData} stored in this account.
     */
    loadData(): Promise<types.CrankAccountData>;
    static createInstructions(program: SwitchboardProgram, payer: PublicKey, params: CrankInitParams): Promise<[CrankAccount, TransactionObject]>;
    static create(program: SwitchboardProgram, params: CrankInitParams): Promise<[CrankAccount, TransactionSignature]>;
    /**
     * Pushes a new aggregator onto the crank.
     * @param params The crank push parameters.
     * @return TransactionSignature
     */
    pushInstruction(payer: PublicKey, params: CrankPushParams): Promise<TransactionObject>;
    pushInstructionSync(payer: PublicKey, params: CrankPushSyncParams): TransactionObject;
    /**
     * Pushes a new aggregator onto the crank.
     * @param params The crank push parameters.
     * @return TransactionSignature
     */
    push(params: CrankPushParams): Promise<TransactionSignature>;
    popInstruction(payer: PublicKey, params: CrankPopParams): Promise<TransactionObject>;
    pop(params: CrankPopParams): Promise<TransactionSignature>;
    private getPopTxn;
    popSync(payer: PublicKey, params: {
        payoutTokenWallet: PublicKey;
        queuePubkey: PublicKey;
        queueAuthority: PublicKey;
        queueDataBuffer: PublicKey;
        crankDataBuffer: PublicKey;
        readyAggregators: Array<[AggregatorAccount, AggregatorPdaAccounts]>;
        nonce?: number;
        failOpenOnMismatch?: boolean;
        popIdx?: number;
    }, options?: TransactionObjectOptions): TransactionObject;
    packAndPopInstructions(payer: PublicKey, params: {
        payoutTokenWallet: PublicKey;
        queuePubkey: PublicKey;
        queueAuthority: PublicKey;
        queueDataBuffer: PublicKey;
        crankDataBuffer: PublicKey;
        readyAggregators: Array<[AggregatorAccount, AggregatorPdaAccounts]>;
        nonce?: number;
        failOpenOnMismatch?: boolean;
        priorityFeeMultiplier?: number;
    }, options?: TransactionObjectOptions): Array<TransactionObject>;
    packAndPop(params: {
        payoutTokenWallet: PublicKey;
        queuePubkey: PublicKey;
        queueAuthority: PublicKey;
        queueDataBuffer: PublicKey;
        crankDataBuffer: PublicKey;
        readyAggregators: Array<[AggregatorAccount, AggregatorPdaAccounts]>;
        nonce?: number;
        failOpenOnMismatch?: boolean;
    }, options?: TransactionObjectOptions): Promise<Array<TransactionSignature>>;
    private getPopTxnV2;
    popSyncV2(payer: PublicKey, params: {
        payoutTokenWallet: PublicKey;
        queuePubkey: PublicKey;
        queueAuthority: PublicKey;
        queueDataBuffer: PublicKey;
        crankDataBuffer: PublicKey;
        readyAggregators: Array<[
            number,
            AggregatorAccount,
            AggregatorPdaAccounts
        ]>;
        nonce?: number;
        failOpenOnMismatch?: boolean;
        popIdx?: number;
    }, options?: TransactionObjectOptions): TransactionObject;
    packAndPopInstructionsV2(payer: PublicKey, params: {
        payoutTokenWallet: PublicKey;
        queuePubkey: PublicKey;
        queueAuthority: PublicKey;
        queueDataBuffer: PublicKey;
        crankDataBuffer: PublicKey;
        readyAggregators: Array<[
            number,
            AggregatorAccount,
            AggregatorPdaAccounts
        ]>;
        nonce?: number;
        failOpenOnMismatch?: boolean;
    }, options?: TransactionObjectOptions): Array<TransactionObject>;
    /**
     * Get an array of the next aggregator pubkeys to be popped from the crank, limited by n
     * @param num The limit of pubkeys to return.
     * @return List of {@linkcode types.CrankRow}, ordered by timestamp.
     */
    peakNextWithTime(num?: number): Promise<types.CrankRow[]>;
    /**
     * Get an array of the next readily updateable aggregator pubkeys to be popped
     * from the crank, limited by n
     * @param num The limit of pubkeys to return.
     * @return Pubkey list of Aggregator pubkeys.
     */
    peakNextReady(num?: number, unixTimestamp?: number): Promise<PublicKey[]>;
    /**
     * Get an array of the next aggregator pubkeys to be popped from the crank, limited by n
     * @param num The limit of pubkeys to return.
     * @return Pubkey list of Aggregators next up to be popped.
     */
    peakNext(num?: number): Promise<PublicKey[]>;
    /**
     * Load a cranks {@linkcode CrankDataBuffer}.
     * @return the list of aggregtors and their next available update time.
     */
    loadCrank(sorted?: boolean): Promise<Array<types.CrankRow>>;
    getCrankAccounts(crankRows: Array<types.CrankRow>, queueAccount: QueueAccount, queueAuthority: PublicKey): Map<string, AggregatorPdaAccounts>;
    /** Whether an aggregator pubkey is active on a Crank */
    isOnCrank(pubkey: PublicKey, crankRows?: Array<types.CrankRow>): Promise<boolean>;
    fetchAccounts(_crank?: types.CrankAccountData, _queueAccount?: QueueAccount, _queue?: types.OracleQueueAccountData): Promise<CrankAccounts>;
    toAccountsJSON(_crank?: types.CrankAccountData, _crankRows?: Array<types.CrankRow>): Promise<CrankAccountsJSON>;
}
/**
 * Parameters for initializing a CrankAccount
 */
export interface CrankInitParams {
    /**
     *  OracleQueueAccount for which this crank is associated
     */
    queueAccount: QueueAccount;
    /**
     *  String specifying crank name
     */
    name?: string;
    /**
     *  String specifying crank metadata
     */
    metadata?: String;
    /**
     * Optional max number of rows
     */
    maxRows?: number;
    /**
     * Optional
     */
    keypair?: Keypair;
    /**
     * Optional
     */
    dataBufferKeypair?: Keypair;
}
/**
 * Parameters for pushing an element into a CrankAccount.
 */
export interface CrankPushParams {
    /**
     * Specifies the aggregator to push onto the crank.
     */
    aggregatorAccount: AggregatorAccount;
    crank?: types.CrankAccountData;
    queue?: types.OracleQueueAccountData;
    queueAuthority?: PublicKey;
}
/**
 * Parameters for pushing an element into a CrankAccount.
 */
export interface CrankPushSyncParams {
    /**
     * Specifies the aggregator to push onto the crank.
     */
    aggregatorAccount: AggregatorAccount;
    crank: types.CrankAccountData;
    queue: types.OracleQueueAccountData;
}
/**
 * Parameters for popping an element from a CrankAccount.
 */
export interface CrankPopParams {
    /**
     * Specifies the wallet to reward for turning the crank.
     *
     * Defaults to the payer.
     */
    payoutWallet?: PublicKey;
    /**
     * Array of pubkeys to attempt to pop. If discluded, this will be loaded
     * from the crank upon calling.
     */
    readyPubkeys?: PublicKey[];
    /**
     * Nonce to allow consecutive crank pops with the same blockhash.
     */
    nonce?: number;
    failOpenOnMismatch?: boolean;
    popIdx?: number;
    /**
     * Unix timestamp to use to determine readyPubkeys (if not provided)
     */
    unixTimestamp?: number;
}
export type CrankAccountsJSON = Omit<types.CrankAccountDataJSON, 'dataBuffer'> & {
    publicKey: PublicKey;
    dataBuffer: {
        publicKey: PublicKey;
        data: Array<types.CrankRow>;
    };
};
export type CrankAccounts = {
    crank: {
        publicKey: PublicKey;
        data: types.CrankAccountData;
    };
    queue: {
        publicKey: PublicKey;
        data: types.OracleQueueAccountData;
    };
    dataBuffer: {
        publicKey: PublicKey;
        data: Array<types.CrankRow>;
    };
    aggregators: Array<{
        publicKey: PublicKey;
        data: types.AggregatorAccountData;
    }>;
};
//# sourceMappingURL=crankAccount.d.ts.map