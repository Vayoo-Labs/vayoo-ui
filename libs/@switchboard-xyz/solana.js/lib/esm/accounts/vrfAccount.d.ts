/// <reference types="node" />
import * as types from '../generated';
import { SwitchboardProgram } from '../SwitchboardProgram';
import { TransactionObject, TransactionObjectOptions } from '../TransactionObject';
import { Account, OnAccountChangeCallback } from './account';
import { PermissionAccount } from './permissionAccount';
import { QueueAccount } from './queueAccount';
import * as anchor from '@coral-xyz/anchor';
import * as spl from '@solana/spl-token-v2';
import { Commitment, Keypair, ParsedTransactionWithMeta, PublicKey, TransactionSignature } from '@solana/web3.js';
/**
 * Account holding a Verifiable Random Function result with a callback instruction for consuming on-chain pseudo-randomness.
 *
 * Data: {@linkcode types.VrfAccountData}
 * Result: [u8;32]
 */
export declare class VrfAccount extends Account<types.VrfAccountData> {
    static accountName: string;
    /**
     * Returns the size of an on-chain {@linkcode VrfAccount}.
     */
    readonly size: number;
    /**
     * Return a vrf account state initialized to the default values.
     */
    static default(): types.VrfAccountData;
    /** Load an existing VrfAccount with its current on-chain state */
    static load(program: SwitchboardProgram, publicKey: PublicKey | string): Promise<[VrfAccount, types.VrfAccountData]>;
    /**
     * Invoke a callback each time a VrfAccount's data has changed on-chain.
     * @param callback - the callback invoked when the vrf state changes
     * @param commitment - optional, the desired transaction finality. defaults to 'confirmed'
     * @returns the websocket subscription id
     */
    onChange(callback: OnAccountChangeCallback<types.VrfAccountData>, commitment?: Commitment): number;
    /**
     * Retrieve and decode the {@linkcode types.VrfAccountData} stored in this account.
     */
    loadData(): Promise<types.VrfAccountData>;
    /**
     *  Creates a list of instructions that will produce a {@linkcode VrfAccount}.
     *
     *  _NOTE_: The transaction that includes these instructions should be signed by both
     *  payer and vrfKeypair.
     */
    static createInstructions(program: SwitchboardProgram, payer: PublicKey, params: VrfInitParams): Promise<[VrfAccount, TransactionObject]>;
    /**
     *  Produces a Switchboard {@linkcode VrfAccount}.
     *
     *  _NOTE_: program wallet is used to sign the transaction.
     */
    static create(program: SwitchboardProgram, params: VrfInitParams): Promise<[VrfAccount, string]>;
    requestRandomnessInstruction(payer: PublicKey, params: VrfRequestRandomnessParams, options?: TransactionObjectOptions): Promise<TransactionObject>;
    requestRandomness(params: VrfRequestRandomnessParams, options?: TransactionObjectOptions): Promise<TransactionSignature>;
    proveAndVerifyInstructions(params: VrfProveAndVerifyParams, options?: TransactionObjectOptions, numTxns?: number): Array<TransactionObject>;
    proveAndVerify(params: Partial<VrfProveAndVerifyParams> & {
        skipPreflight?: boolean;
    }, options?: TransactionObjectOptions, numTxns?: number): Promise<Array<TransactionSignature>>;
    setCallbackInstruction(payer: PublicKey, params: {
        authority: Keypair | PublicKey;
        callback: Callback;
    }): TransactionObject;
    setCallback(params: {
        authority: Keypair | PublicKey;
        callback: Callback;
    }): Promise<TransactionSignature>;
    /** Return parsed transactions for a VRF request */
    getCallbackTransactions(requestSlot?: anchor.BN, txnLimit?: number): Promise<Array<ParsedTransactionWithMeta>>;
    getAccounts(params: {
        queueAccount: QueueAccount;
        queueAuthority: PublicKey;
    }): {
        queueAccount: QueueAccount;
        permissionAccount: PermissionAccount;
        permissionBump: number;
    };
    fetchAccounts(_vrf?: types.VrfAccountData, _queueAccount?: QueueAccount, _queue?: types.OracleQueueAccountData): Promise<VrfAccounts>;
    toAccountsJSON(_vrf?: types.VrfAccountData, _queueAccount?: QueueAccount, _queue?: types.OracleQueueAccountData): Promise<VrfAccountsJSON>;
    requestAndAwaitResult(params: {
        vrf?: types.VrfAccountData;
    } & (VrfRequestRandomnessParams | {
        requestFunction: (...args: any[]) => Promise<TransactionSignature>;
    }), timeout?: number, options?: TransactionObjectOptions): Promise<[types.VrfAccountData, TransactionSignature]>;
    /**
     * Await for the next vrf result
     *
     * @param roundId - optional, the id associated with the VRF round to watch. If not provided the current round Id will be used.
     * @param timeout - the number of milliseconds to wait for the round to close
     *
     * @throws {string} when the timeout interval is exceeded or when the latestConfirmedRound.roundOpenSlot exceeds the target roundOpenSlot
     */
    nextResult(roundId?: anchor.BN, timeout?: number): Promise<VrfResult>;
    closeAccountInstruction(payer: PublicKey, params?: VrfCloseParams): Promise<TransactionObject>;
    closeAccount(params?: VrfCloseParams): Promise<TransactionSignature>;
    getPermissionAccount(queuePubkey: PublicKey, queueAuthority: PublicKey): [PermissionAccount, number];
}
export interface VrfCloseParams {
    destination?: PublicKey;
    authority?: Keypair;
    queueAccount?: QueueAccount;
    queueAuthority?: PublicKey;
}
export interface VrfResult {
    success: boolean;
    result: Uint8Array;
    status: types.VrfStatusKind;
}
/**
 * Interface for a VRF callback.
 */
export interface Callback {
    programId: PublicKey;
    accounts: Array<anchor.web3.AccountMeta>;
    ixData: Buffer;
}
/**
 * Parameters for a VrfInit request.
 */
export interface VrfInitParams {
    /**
     *  Keypair to use for the vrf account
     */
    vrfKeypair: anchor.web3.Keypair;
    queueAccount: QueueAccount;
    /**
     * Callback function that is invoked when a new randomness value is produced.
     */
    callback: Callback;
    /**
     *  Optional authority for the resulting {@linkcode VrfAccount}. If not provided,
     *  the payer will default to the VRF authority.
     */
    authority?: PublicKey;
}
/**
 * Parameters for a VrfSetCallback request.
 */
export interface VrfSetCallbackParams {
    authority?: Keypair;
    callback: Callback;
    vrf: types.VrfAccountData;
}
export interface VrfProveAndVerifyParams {
    vrf: types.VrfAccountData;
    counter?: anchor.BN;
    idx?: number;
    proof: string;
    oraclePubkey: PublicKey;
    oracleTokenWallet: PublicKey;
    oracleAuthority: PublicKey;
}
export interface VrfRequestRandomnessParams {
    authority?: Keypair;
    payerTokenWallet: PublicKey;
    payerAuthority?: Keypair;
    queue?: types.OracleQueueAccountData;
    queueAccount?: QueueAccount;
    vrf?: types.VrfAccountData;
}
export type VrfAccountsJSON = Omit<types.VrfAccountDataJSON, 'escrow'> & {
    publicKey: PublicKey;
    queue: types.OracleQueueAccountDataJSON & {
        publicKey: PublicKey;
    };
    permission: types.PermissionAccountDataJSON & {
        publicKey: PublicKey;
    };
    escrow: {
        publicKey: PublicKey;
        balance: number;
    };
};
export type VrfAccounts = {
    vrf: {
        publicKey: PublicKey;
        data: types.VrfAccountData;
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
//# sourceMappingURL=vrfAccount.d.ts.map