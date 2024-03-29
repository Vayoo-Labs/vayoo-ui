/// <reference types="node" />
import * as types from '../generated';
import { SwitchboardProgram } from '../SwitchboardProgram';
import { Account, OnAccountChangeCallback } from './account';
import { AccountInfo, Commitment, PublicKey } from '@solana/web3.js';
/**
 * Account holding a list of oracles actively heartbeating on the queue
 *
 * Data: Array<{@linkcode PublicKey}>
 */
export declare class QueueDataBuffer extends Account<Array<PublicKey>> {
    static accountName: string;
    size: number;
    static getAccountSize(size: number): number;
    /**
     * Return an oracle queue buffer initialized to the default values.
     *
     * @param size - the number of oracles the buffer should support
     */
    static default(size?: number): Buffer;
    /**
     * Create a mock account info for a given vrf config. Useful for test integrations.
     */
    static createMock(programId: PublicKey, data: {
        size?: number;
        oracles?: Array<PublicKey>;
    }, options?: {
        lamports?: number;
        rentEpoch?: number;
    }): AccountInfo<Buffer>;
    /**
     * Invoke a callback each time a QueueAccount's oracle queue buffer has changed on-chain. The buffer stores a list of oracle's and their last heartbeat timestamp.
     * @param callback - the callback invoked when the queues buffer changes
     * @param commitment - optional, the desired transaction finality. defaults to 'confirmed'
     * @returns the websocket subscription id
     */
    onChange(callback: OnAccountChangeCallback<Array<PublicKey>>, commitment?: Commitment): number;
    /**
     * Retrieve and decode the {@linkcode types.CrankAccountData} stored in this account.
     */
    loadData(): Promise<Array<PublicKey>>;
    static decode(bufferAccountInfo: AccountInfo<Buffer>): Array<PublicKey>;
    /**
     * Return a queues dataBuffer
     *
     * @throws {string} if dataBuffer is equal to default publicKey
     */
    static fromQueue(program: SwitchboardProgram, queue: types.OracleQueueAccountData): QueueDataBuffer;
}
//# sourceMappingURL=queueDataBuffer.d.ts.map