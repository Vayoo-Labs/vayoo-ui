/// <reference types="node" />
import * as types from '../generated';
import { SwitchboardProgram } from '../SwitchboardProgram';
import { Account, OnAccountChangeCallback } from './account';
import { AccountInfo, Commitment } from '@solana/web3.js';
/**
 * Account holding a priority queue of aggregators and their next available update time.
 *
 * Data: Array<{@linkcode types.CrankRow}>
 */
export declare class CrankDataBuffer extends Account<Array<types.CrankRow>> {
    static accountName: string;
    size: number;
    /**
     * Invoke a callback each time a crank's buffer has changed on-chain. The buffer stores a list of {@linkcode AggregatorAccount} public keys along with their next available update time.
     * @param callback - the callback invoked when the crank's buffer changes
     * @param commitment - optional, the desired transaction finality. defaults to 'confirmed'
     * @returns the websocket subscription id
     */
    onChange(callback: OnAccountChangeCallback<Array<types.CrankRow>>, commitment?: Commitment): number;
    /**
     * Retrieve and decode the {@linkcode types.CrankAccountData} stored in this account.
     */
    loadData(): Promise<Array<types.CrankRow>>;
    static decode(bufferAccountInfo: AccountInfo<Buffer>): Array<types.CrankRow>;
    static getAccountSize(size: number): number;
    static default(size?: number): Buffer;
    static sort(crankRows: Array<types.CrankRow>): Array<types.CrankRow>;
    /**
     * Return a crank's dataBuffer
     *
     * @throws {string} if dataBuffer is equal to default publicKey
     */
    static fromCrank(program: SwitchboardProgram, crank: types.CrankAccountData): CrankDataBuffer;
}
//# sourceMappingURL=crankDataBuffer.d.ts.map