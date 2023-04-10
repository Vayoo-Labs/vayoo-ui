import * as errors from '../errors';
import * as types from '../generated';
import { TransactionObject } from '../TransactionObject';
import { Account, BUFFER_DISCRIMINATOR, } from './account';
import * as anchor from '@coral-xyz/anchor';
import { Keypair, PublicKey, SystemProgram, } from '@solana/web3.js';
import { Big, BN } from '@switchboard-xyz/common';
/**
 * Account type representing a round robin buffer of historical samples.
 *
 * Data: Array<{@linkcode types.AggregatorHistoryRow}>
 */
export class AggregatorHistoryBuffer extends Account {
    constructor() {
        super(...arguments);
        this.size = 28;
    }
    static getAccountSize(size) {
        return 12 + size * 28;
    }
    /** Return a history buffer account initialized to the default values. */
    static default(size = 1000) {
        const buffer = Buffer.alloc(AggregatorHistoryBuffer.getAccountSize(size), 0);
        BUFFER_DISCRIMINATOR.copy(buffer, 0);
        return buffer;
    }
    /**
     * Decode an aggregators history buffer and return an array of historical samples in ascending order by timestamp.
     * @params historyBuffer the historyBuffer AccountInfo stored on-chain
     * @return the array of {@linkcode types.AggregatorHistoryRow} samples
     */
    static decode(historyBuffer, startTimestamp, endTimestamp) {
        const ROW_SIZE = 28;
        if (historyBuffer.length < 12) {
            return [];
        }
        const insertIdx = historyBuffer.readUInt32LE(8) * ROW_SIZE;
        const front = [];
        const tail = [];
        const buffer = historyBuffer.slice(12);
        for (let i = 0; i < buffer.length; i += ROW_SIZE) {
            if (i + ROW_SIZE > buffer.length) {
                break;
            }
            const row = types.AggregatorHistoryRow.fromDecoded(types.AggregatorHistoryRow.layout().decode(buffer, i));
            if (row.timestamp.eq(new anchor.BN(0))) {
                break;
            }
            if (startTimestamp && startTimestamp > row.timestamp.toNumber()) {
                continue;
            }
            if (endTimestamp && endTimestamp < row.timestamp.toNumber()) {
                continue;
            }
            if (i <= insertIdx) {
                tail.push(row);
            }
            else {
                front.push(row);
            }
        }
        return front.concat(tail);
    }
    /**
     * Return an aggregator's assigned history buffer or undefined if it doesn't exist.
     */
    static fromAggregator(program, aggregator) {
        if (aggregator.historyBuffer.equals(PublicKey.default)) {
            return undefined;
        }
        return new AggregatorHistoryBuffer(program, aggregator.historyBuffer);
    }
    /**
     * Decode an aggregators history buffer and return an array of historical samples
     * @params historyBuffer the historyBuffer AccountInfo stored on-chain
     * @return the array of {@linkcode types.AggregatorHistoryRow} samples
     */
    decode(historyBuffer, startTimestamp, endTimestamp) {
        return AggregatorHistoryBuffer.decode(historyBuffer, startTimestamp, endTimestamp);
    }
    /**
     * Fetch an aggregators history buffer and return an array of historical samples
     * @params aggregator the pre-loaded aggregator state
     * @return the array of {@linkcode types.AggregatorHistoryRow} samples
     */
    async loadData(startTimestamp, endTimestamp) {
        if (PublicKey.default.equals(this.publicKey)) {
            return [];
        }
        const bufferAccountInfo = await this.program.connection.getAccountInfo(this.publicKey);
        if (bufferAccountInfo === null) {
            throw new errors.AccountNotFoundError('Aggregator History', this.publicKey);
        }
        return AggregatorHistoryBuffer.decode(bufferAccountInfo.data, startTimestamp, endTimestamp);
    }
    /**
     * Invoke a callback each time an AggregatorAccount's data has changed on-chain.
     * @param callback - the callback invoked when the aggregator state changes
     * @param commitment - optional, the desired transaction finality. defaults to 'confirmed'
     * @returns the websocket subscription id
     */
    onChange(callback, commitment = 'confirmed') {
        return this.program.connection.onAccountChange(this.publicKey, accountInfo => {
            callback(this.decode(accountInfo.data));
        }, commitment);
    }
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
    static async createInstructions(program, payer, params) {
        const buffer = params.keypair ?? Keypair.generate();
        program.verifyNewKeypair(buffer);
        const ixns = [];
        const signers = params.aggregatorAuthority
            ? [params.aggregatorAuthority, buffer]
            : [buffer];
        const size = AggregatorHistoryBuffer.getAccountSize(params.maxSamples);
        ixns.push(SystemProgram.createAccount({
            fromPubkey: payer,
            newAccountPubkey: buffer.publicKey,
            space: size,
            lamports: await program.connection.getMinimumBalanceForRentExemption(size),
            programId: program.programId,
        }), types.aggregatorSetHistoryBuffer(program, { params: {} }, {
            aggregator: params.aggregatorAccount.publicKey,
            authority: params.aggregatorAuthority
                ? params.aggregatorAuthority.publicKey
                : payer,
            buffer: buffer.publicKey,
        }));
        return [
            new AggregatorHistoryBuffer(program, buffer.publicKey),
            new TransactionObject(payer, ixns, signers),
        ];
    }
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
    static async create(program, params) {
        const [account, transaction] = await AggregatorHistoryBuffer.createInstructions(program, program.walletPubkey, params);
        const txnSignature = await program.signAndSend(transaction);
        return [account, txnSignature];
    }
    static collectMetrics(history, minUpdateDelaySeconds, period) {
        const endTimestamp = history
            .map(row => row.timestamp)
            .reduce((max, ts) => (ts.gt(max) ? ts : max), new BN(0));
        const startTimestamp = period
            ? history.reduce((val, row) => {
                const expectedStartTimestamp = endTimestamp.sub(new BN(period));
                return row.timestamp.gte(expectedStartTimestamp) &&
                    val
                        .sub(expectedStartTimestamp)
                        .abs()
                        .gt(row.timestamp.sub(expectedStartTimestamp).abs())
                    ? row.timestamp
                    : val;
            }, new BN(0))
            : history
                .map(row => row.timestamp)
                .reduce((min, ts) => (ts.lt(min) ? ts : min), history[0].timestamp);
        const parsedHistory = history.filter(row => row.timestamp.gte(startTimestamp) && row.timestamp.lte(endTimestamp));
        const start = parsedHistory.slice(0)[0];
        const end = parsedHistory.slice(-1)[0];
        const timestamps = parsedHistory.map(r => r.timestamp);
        const bigValues = parsedHistory.map(r => r.value.toBig());
        const values = bigValues.map(val => Number.parseFloat(val.toString()));
        const minValue = Math.min(...values);
        const min = parsedHistory.find(r => Number(r.value) === minValue);
        const maxValue = Math.max(...values);
        const max = parsedHistory.find(r => Number(r.value) === maxValue);
        const actualPeriod = endTimestamp.sub(startTimestamp).toNumber();
        const numSamples = parsedHistory.length;
        const maxUpdateIntervalWithJitter = minUpdateDelaySeconds + (15 % minUpdateDelaySeconds);
        const averageUpdateDelay = Math.round((actualPeriod / numSamples) * 10000) / 10000;
        const updateCoefficient = Math.round((averageUpdateDelay / minUpdateDelaySeconds) * 10000) / 10000;
        const averageValue = bigValues
            .reduce((sum, val) => sum.add(val))
            .div(numSamples);
        const standardDeviation = bigValues
            .reduce((sum, val) => sum.add(val.sub(averageValue).pow(2)), new Big(0))
            .div(numSamples)
            .sqrt();
        return {
            history: parsedHistory,
            period: actualPeriod,
            numSamples,
            minUpdateDelaySeconds: minUpdateDelaySeconds,
            maxUpdateIntervalWithJitter,
            averageUpdateDelay,
            updateCoefficient,
            averageValue: averageValue.toNumber(),
            standardDeviation: standardDeviation.toNumber(),
            start,
            end,
            min: min,
            max: max,
        };
    }
}
AggregatorHistoryBuffer.accountName = 'AggregatorHistoryBuffer';
//# sourceMappingURL=aggregatorHistoryBuffer.js.map