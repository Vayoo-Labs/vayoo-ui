/// <reference types="node" />
import * as types from '../generated';
import { SwitchboardProgram } from '../SwitchboardProgram';
import { TransactionObject, TransactionObjectOptions } from '../TransactionObject';
import { Account, OnAccountChangeCallback } from './account';
import { JobAccount } from './jobAccount';
import { OracleAccount } from './oracleAccount';
import { PermissionAccount } from './permissionAccount';
import { QueueAccount } from './queueAccount';
import * as spl from '@solana/spl-token-v2';
import { Commitment, Keypair, PublicKey, TransactionSignature } from '@solana/web3.js';
/**
 * Account type holding a buffer of data sourced from the buffers sole {@linkcode JobAccount}. A buffer relayer has no consensus mechanism and relies on trusting an {@linkcode OracleAccount} to respond honestly. A buffer relayer has a max capacity of 500 bytes.
 *
 * Data: {@linkcode types.BufferRelayerAccountData}
 */
export declare class BufferRelayerAccount extends Account<types.BufferRelayerAccountData> {
    static accountName: string;
    /**
     * Returns the size of an on-chain {@linkcode BufferRelayerAccount}.
     */
    get size(): number;
    decode(data: Buffer): types.BufferRelayerAccountData;
    /**
     * Invoke a callback each time a BufferRelayerAccount's data has changed on-chain.
     * @param callback - the callback invoked when the buffer relayer state changes
     * @param commitment - optional, the desired transaction finality. defaults to 'confirmed'
     * @returns the websocket subscription id
     */
    onChange(callback: OnAccountChangeCallback<types.BufferRelayerAccountData>, commitment?: Commitment): number;
    /** Load an existing BufferRelayer with its current on-chain state */
    static load(program: SwitchboardProgram, publicKey: PublicKey | string): Promise<[BufferRelayerAccount, types.BufferRelayerAccountData]>;
    /**
     * Load and parse {@linkcode BufferRelayerAccount} data based on the program IDL.
     */
    loadData(): Promise<types.BufferRelayerAccountData>;
    static createInstructions(program: SwitchboardProgram, payer: PublicKey, params: {
        name?: string;
        minUpdateDelaySeconds: number;
        queueAccount: QueueAccount;
        authority?: PublicKey;
        jobAccount: JobAccount;
        keypair?: Keypair;
    }): Promise<[BufferRelayerAccount, TransactionObject]>;
    static create(program: SwitchboardProgram, params: {
        name?: string;
        minUpdateDelaySeconds: number;
        queueAccount: QueueAccount;
        authority?: PublicKey;
        jobAccount: JobAccount;
        keypair?: Keypair;
    }): Promise<[BufferRelayerAccount, TransactionSignature]>;
    openRoundInstructions(payer: PublicKey, params?: BufferRelayerOpenRoundParams): Promise<TransactionObject>;
    openRound(params?: BufferRelayerOpenRoundParams): Promise<TransactionSignature>;
    openRoundAndAwaitResult(params: BufferRelayerOpenRoundParams, timeout?: number): Promise<[types.BufferRelayerAccountData, TransactionSignature]>;
    saveResultInstructions(payer: PublicKey, params: BufferRelayerSaveResultParams, options?: TransactionObjectOptions): Promise<TransactionObject>;
    saveResult(params: BufferRelayerSaveResultParams, options?: TransactionObjectOptions): Promise<TransactionSignature>;
    saveResultSyncInstructions(payer: PublicKey, params: BufferRelayerSaveResultSyncParams, options?: TransactionObjectOptions): TransactionObject;
    saveResultSync(params: BufferRelayerSaveResultSyncParams, options?: TransactionObjectOptions): Promise<TransactionSignature>;
    getAccounts(queueAccount: QueueAccount, queueAuthority: PublicKey): {
        queueAccount: QueueAccount;
        permissionAccount: PermissionAccount;
        permissionBump: number;
    };
    toAccountsJSON(_bufferRelayer?: types.BufferRelayerAccountData, _queueAccount?: QueueAccount, _queue?: types.OracleQueueAccountData): Promise<BufferRelayerAccountsJSON>;
    fetchAccounts(_bufferRelayer?: types.BufferRelayerAccountData, _queueAccount?: QueueAccount, _queue?: types.OracleQueueAccountData): Promise<BufferRelayerAccounts>;
    getPermissionAccount(queuePubkey: PublicKey, queueAuthority: PublicKey): [PermissionAccount, number];
    getEscrow(): PublicKey;
}
export interface BufferRelayerInit {
    name?: string;
    minUpdateDelaySeconds: number;
    queueAccount: QueueAccount;
    authority?: PublicKey;
    jobAccount: JobAccount;
    keypair?: Keypair;
}
export type BufferRelayerAccounts = {
    bufferRelayer: {
        publicKey: PublicKey;
        data: types.BufferRelayerAccountData;
    };
    queue: {
        publicKey: PublicKey;
        data: types.OracleQueueAccountData;
    };
    permission: {
        publicKey: PublicKey;
        bump: number;
        data: types.PermissionAccountData;
    };
    escrow: {
        publicKey: PublicKey;
        data: spl.Account;
        balance: number;
    };
};
export type BufferRelayerAccountsJSON = types.BufferRelayerAccountDataJSON & {
    publicKey: PublicKey;
    balance: number;
    queue: types.OracleQueueAccountDataJSON & {
        publicKey: PublicKey;
    };
    permission: types.PermissionAccountDataJSON & {
        bump: number;
        publicKey: PublicKey;
    };
};
export type BufferRelayerOpenRoundParams = {
    tokenWallet?: PublicKey;
    bufferRelayer?: types.BufferRelayerAccountData;
    queueAccount?: QueueAccount;
    queue?: types.OracleQueueAccountData;
};
export type BufferRelayerSaveResultParams = {
    result: Buffer;
    success: boolean;
};
export type BufferRelayerSaveResultSyncParams = BufferRelayerSaveResultParams & {
    escrow: PublicKey;
    queueAccount: QueueAccount;
    queueAuthority: PublicKey;
    queueDataBuffer: PublicKey;
    oracleAccount: OracleAccount;
    oracleAuthority: PublicKey;
    oracleTokenAccount: PublicKey;
    permissionAccount: PermissionAccount;
    permissionBump: number;
};
//# sourceMappingURL=bufferRelayAccount.d.ts.map