/// <reference types="node" />
import * as types from '../generated';
import { SwitchboardProgram } from '../SwitchboardProgram';
import { TransactionObject, TransactionObjectOptions } from '../TransactionObject';
import { Account } from './account';
import { AccountInfo, Commitment, Keypair, PublicKey, TransactionSignature } from '@solana/web3.js';
import { OracleJob } from '@switchboard-xyz/common';
/**
 * Account type storing a list of SwitchboardTasks {@linkcode OracleJob.Task} dictating how to source data off-chain.
 *
 * Data: {@linkcode types.JobAccountData}
 */
export declare class JobAccount extends Account<types.JobAccountData> {
    static accountName: string;
    /**
     * Returns the job's name buffer in a stringified format.
     */
    static getName: (job: types.JobAccountData) => string;
    /**
     * Returns the job's metadata buffer in a stringified format.
     */
    static getMetadata: (job: types.JobAccountData) => string;
    /**
     * Get the size of an {@linkcode JobAccount} on-chain.
     */
    size: number;
    static getAccountSize(byteLength: number): number;
    /**
     * Return a job account initialized to the default values.
     *
     * @params byteLength - the length of the serialized job
     */
    static default(byteLength: number): types.LeaseAccountData;
    /**
     * Creates a mock account info for a given job. Useful for test integrations.
     */
    static createMock(programId: PublicKey, data: Partial<types.JobAccountData> & ({
        job: OracleJob;
    } | {
        tasks: Array<OracleJob.Task>;
    }), options?: {
        lamports?: number;
        rentEpoch?: number;
    }): AccountInfo<Buffer>;
    /** Load an existing JobAccount with its current on-chain state */
    static load(program: SwitchboardProgram, publicKey: PublicKey | string): Promise<[JobAccount, types.JobAccountData]>;
    /**
     * Retrieve and decode the {@linkcode types.JobAccountData} stored in this account.
     */
    loadData(): Promise<types.JobAccountData>;
    static createInstructions(program: SwitchboardProgram, payer: PublicKey, params: JobInitParams, options?: TransactionObjectOptions): [JobAccount, Array<TransactionObject>];
    static create(program: SwitchboardProgram, params: JobInitParams, options?: TransactionObjectOptions): Promise<[JobAccount, Array<TransactionSignature>]>;
    decode(data: Buffer): types.JobAccountData;
    static decode(program: SwitchboardProgram, accountInfo: AccountInfo<Buffer>): types.JobAccountData;
    static decodeJob(program: SwitchboardProgram, accountInfo: AccountInfo<Buffer>): OracleJob;
    toAccountsJSON(_job?: types.JobAccountData): Promise<JobAccountsJSON>;
    static fetchMultiple(program: SwitchboardProgram, publicKeys: Array<PublicKey>, commitment?: Commitment): Promise<Array<{
        account: JobAccount;
        data: types.JobAccountData;
        job: OracleJob;
    }>>;
}
export interface JobInitParams {
    data: Uint8Array;
    weight?: number;
    name?: string;
    authority?: Keypair;
    expiration?: number;
    variables?: Array<string>;
    keypair?: Keypair;
}
export type JobAccountsJSON = types.JobAccountDataJSON & {
    publicKey: PublicKey;
    tasks: Array<OracleJob.ITask>;
};
//# sourceMappingURL=jobAccount.d.ts.map