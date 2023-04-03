/// <reference types="node" />
import * as types from '../generated';
import { SwitchboardProgram } from '../SwitchboardProgram';
import { TransactionObject } from '../TransactionObject';
import { Account, OnAccountChangeCallback } from './account';
import { AggregatorAccount } from './aggregatorAccount';
import { Commitment, Keypair, PublicKey, TransactionSignature } from '@solana/web3.js';
export interface AggregatorHistoryInit {
    /** Aggregator account to add a history buffer for. */
    aggregatorAccount: AggregatorAccount;
    /** Maximum number of samples to store in a round robin history buffer. */
    maxSamples: number;
    /** Alternative keypair that is the authority for the aggregatorAccount and authorized to add a historyBuffer. */
    aggregatorAuthority?: Keypair;
    /** Existing keypair to create the history buffer for. Must be a fresh keypair not tied to an existing on-chain account. */
    keypair?: Keypair;
}
/**
 * Account type representing a round robin buffer of historical samples.
 *
 * Data: Array<{@linkcode types.AggregatorHistoryRow}>
 */
export declare class AggregatorHistoryBuffer extends Account<Array<types.AggregatorHistoryRow>> {
    static accountName: string;
    size: number;
    static getAccountSize(size: number): number;
    /** Return a history buffer account initialized to the default values. */
    static default(size?: number): Buffer;
    /**
     * Decode an aggregators history buffer and return an array of historical samples in ascending order by timestamp.
     * @params historyBuffer the historyBuffer AccountInfo stored on-chain
     * @return the array of {@linkcode types.AggregatorHistoryRow} samples
     */
    static decode(historyBuffer: Buffer, startTimestamp?: number, endTimestamp?: number): Array<types.AggregatorHistoryRow>;
    /**
     * Return an aggregator's assigned history buffer or undefined if it doesn't exist.
     */
    static fromAggregator(program: SwitchboardProgram, aggregator: types.AggregatorAccountData): AggregatorHistoryBuffer | undefined;
    /**
     * Decode an aggregators history buffer and return an array of historical samples
     * @params historyBuffer the historyBuffer AccountInfo stored on-chain
     * @return the array of {@linkcode types.AggregatorHistoryRow} samples
     */
    decode(historyBuffer: Buffer, startTimestamp?: number, endTimestamp?: number): Array<types.AggregatorHistoryRow>;
    /**
     * Fetch an aggregators history buffer and return an array of historical samples
     * @params aggregator the pre-loaded aggregator state
     * @return the array of {@linkcode types.AggregatorHistoryRow} samples
     */
    loadData(startTimestamp?: number, endTimestamp?: number): Promise<Array<types.AggregatorHistoryRow>>;
    /**
     * Invoke a callback each time an AggregatorAccount's data has changed on-chain.
     * @param callback - the callback invoked when the aggregator state changes
     * @param commitment - optional, the desired transaction finality. defaults to 'confirmed'
     * @returns the websocket subscription id
     */
    onChange(callback: OnAccountChangeCallback<Array<types.AggregatorHistoryRow>>, commitment?: Commitment): number;
    /**
     * Create a history buffer for an aggregator and store the last N samples in a round robin history buffer.
     * @param program The SwitchboardProgram.
     * @param payer The account that will pay for the new account.
     * @param params history buffer configuration parameters.
     * @return {@linkcode TransactionObject} that will create the AggregatorHistoryBuffer.
     *
     * Basic usage example:
     *
     * ```ts
     * import { AggregatorAccount,AggregatorHistoryBuffer } from '@switchboard-xyz/solana.js';
     * const aggregatorAccount = new AggregatorAccount(program, aggregatorKey);
     * const aggregator = await aggregatorAccount.loadData();
     * const [historyBuffer, addHistoryTxn] = await AggregatorHistoryBuffer.createInstructions(program, payer, {
     *    aggregatorAccount,
     *    maxSamples: 10000,
     * });
     * const aggregatorHistorySignature = await program.signAndSendAll(aggregatorHistoryTxn);
     * const history = await historyBuffer.loadData();
     * ```
     */
    static createInstructions(program: SwitchboardProgram, payer: PublicKey, params: AggregatorHistoryInit): Promise<[AggregatorHistoryBuffer, TransactionObject]>;
    /**
     * Create a history buffer for an aggregator and store the last N samples in a round robin history buffer.
     * @param program The SwitchboardProgram.
     * @param payer The account that will pay for the new account.
     * @param params history buffer configuration parameters.
     * @return {@linkcode TransactionObject} that will create the AggregatorHistoryBuffer.
     *
     * Basic usage example:
     *
     * ```ts
     * import { AggregatorAccount,AggregatorHistoryBuffer } from '@switchboard-xyz/solana.js';
     * const aggregatorAccount = new AggregatorAccount(program, aggregatorKey);
     * const aggregator = await aggregatorAccount.loadData();
     * const [historyBuffer, addHistorySignature] = await AggregatorHistoryBuffer.create(program, {
     *    aggregatorAccount,
     *    maxSamples: 10000,
     * });
     * const history = await historyBuffer.loadData();
     * ```
     */
    static create(program: SwitchboardProgram, params: AggregatorHistoryInit): Promise<[AggregatorHistoryBuffer, TransactionSignature]>;
    static collectMetrics(history: Array<types.AggregatorHistoryRow>, minUpdateDelaySeconds: number, period?: number): AggregatorHistoryMetrics;
}
export type AggregatorHistoryMetrics = {
    history: Array<types.AggregatorHistoryRow>;
    period: number;
    numSamples: number;
    minUpdateDelaySeconds: number;
    maxUpdateIntervalWithJitter: number;
    averageUpdateDelay: number;
    updateCoefficient: number;
    averageValue: number;
    standardDeviation: number;
    start: types.AggregatorHistoryRow;
    end: types.AggregatorHistoryRow;
    min: types.AggregatorHistoryRow;
    max: types.AggregatorHistoryRow;
};
//# sourceMappingURL=aggregatorHistoryBuffer.d.ts.map