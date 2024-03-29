/// <reference types="node" />
import * as types from '../generated';
import { SwitchboardProgram } from '../SwitchboardProgram';
import { TransactionObject, TransactionObjectOptions } from '../TransactionObject';
import { Account, OnAccountChangeCallback } from './account';
import { PermissionAccount } from './permissionAccount';
import { QueueAccount } from './queueAccount';
import * as anchor from '@coral-xyz/anchor';
import { AccountInfo, Commitment, Keypair, PublicKey, TransactionSignature } from '@solana/web3.js';
import { BN } from '@switchboard-xyz/common';
/**
 * Account type holding an oracle's configuration including the authority and the reward/slashing wallet along with a set of metrics tracking its reliability.
 *
 * An oracle is a server that sits between the internet and a blockchain and facilitates the flow of information and is rewarded for responding with the honest majority.
 *
 * Data: {@linkcode types.OracleAccountData}
 */
export declare class OracleAccount extends Account<types.OracleAccountData> {
    static accountName: string;
    static size: number;
    /**
     * Get the size of an {@linkcode OracleAccount} on-chain.
     */
    size: number;
    /**
     * Return an oracle account state initialized to the default values.
     */
    static default(): types.OracleAccountData;
    /**
     * Create a mock account info for a given oracle config. Useful for test integrations.
     */
    static createMock(programId: PublicKey, data: Partial<types.OracleAccountData>, options?: {
        lamports?: number;
        rentEpoch?: number;
    }): AccountInfo<Buffer>;
    /** Load an existing OracleAccount with its current on-chain state */
    static load(program: SwitchboardProgram, publicKey: PublicKey | string): Promise<[OracleAccount, types.OracleAccountData]>;
    decode(data: Buffer): types.OracleAccountData;
    /**
     * Invoke a callback each time an OracleAccount's data has changed on-chain.
     * @param callback - the callback invoked when the oracle state changes
     * @param commitment - optional, the desired transaction finality. defaults to 'confirmed'
     * @returns the websocket subscription id
     */
    onChange(callback: OnAccountChangeCallback<types.OracleAccountData>, commitment?: Commitment): number;
    fetchBalance(stakingWallet?: PublicKey): Promise<number>;
    fetchBalanceBN(stakingWallet?: PublicKey): Promise<BN>;
    /**
     * Retrieve and decode the {@linkcode types.OracleAccountData} stored in this account.
     */
    loadData(): Promise<types.OracleAccountData>;
    /**
     * Loads an OracleAccount from the expected PDA seed format.
     * @param program The Switchboard program for the current connection.
     * @param queue The queue pubkey to be incorporated into the account seed.
     * @param wallet The oracles token wallet to be incorporated into the account seed.
     * @return OracleAccount and PDA bump.
     */
    static fromSeed(program: SwitchboardProgram, queue: PublicKey, wallet: PublicKey): [OracleAccount, number];
    getPermissions(_oracle?: types.OracleAccountData, _queueAccount?: QueueAccount, _queue?: types.OracleQueueAccountData): Promise<[PermissionAccount, number, types.PermissionAccountData]>;
    static createInstructions(program: SwitchboardProgram, payer: PublicKey, params: {
        queueAccount: QueueAccount;
    } & OracleInitParams & Partial<OracleStakeParams>): Promise<[OracleAccount, Array<TransactionObject>]>;
    static create(program: SwitchboardProgram, params: {
        queueAccount: QueueAccount;
    } & OracleInitParams & Partial<OracleStakeParams>): Promise<[OracleAccount, Array<TransactionSignature>]>;
    stakeInstruction(stakeAmount: number, oracleStakingWallet: PublicKey, funderTokenWallet: PublicKey, funderAuthority: PublicKey): anchor.web3.TransactionInstruction;
    stakeInstructions(payer: PublicKey, params: OracleStakeParams & {
        tokenAccount?: PublicKey;
    }): Promise<TransactionObject>;
    stake(params: OracleStakeParams & {
        tokenAccount?: PublicKey;
    }): Promise<TransactionSignature>;
    heartbeatInstruction(payer: PublicKey, params: {
        tokenWallet: PublicKey;
        gcOracle: PublicKey;
        oracleQueue: PublicKey;
        dataBuffer: PublicKey;
        permission: [PermissionAccount, number];
        authority?: PublicKey;
    }): anchor.web3.TransactionInstruction;
    heartbeat(params?: {
        queueAccount: QueueAccount;
        tokenWallet?: PublicKey;
        queueAuthority?: PublicKey;
        queue?: types.OracleQueueAccountData;
        permission?: [PermissionAccount, number];
        authority?: Keypair;
    }, opts?: TransactionObjectOptions): Promise<TransactionSignature>;
    withdrawInstruction(payer: PublicKey, params: OracleWithdrawParams, opts?: TransactionObjectOptions): Promise<TransactionObject>;
    withdraw(params: OracleWithdrawParams, opts?: TransactionObjectOptions): Promise<TransactionSignature>;
    getPermissionAccount(queuePubkey: PublicKey, queueAuthority: PublicKey): [PermissionAccount, number];
    toAccountsJSON(_oracle?: types.OracleAccountData & {
        balance: number;
    }, _permissionAccount?: PermissionAccount, _permission?: types.PermissionAccountData): Promise<OracleAccountsJSON>;
    static fetchMultiple(program: SwitchboardProgram, publicKeys: Array<PublicKey>, commitment?: Commitment): Promise<Array<{
        account: OracleAccount;
        data: types.OracleAccountData;
    }>>;
}
export interface OracleInitParams {
    /** Name of the oracle for easier identification. */
    name?: string;
    /** Metadata of the oracle for easier identification. */
    metadata?: string;
    /** Alternative keypair that will be the authority for the oracle. If not set the payer will be used. */
    authority?: Keypair;
    /**
     * Optional,
     */
    stakingWalletKeypair?: Keypair;
}
export interface OracleStakeParams {
    /** The amount of funds to deposit into the oracle's staking wallet. The oracle must have the {@linkcode QueueAccount} minStake before being permitted to heartbeat and join the queue. */
    stakeAmount: number;
    /** The tokenAccount for the account funding the staking wallet. Will default to the payer's associatedTokenAccount if not provided. */
    funderTokenWallet?: PublicKey;
    /** The funderTokenWallet authority for approving the transfer of funds from the funderTokenWallet into the oracle staking wallet. Will default to the payer if not provided. */
    funderAuthority?: Keypair;
    /** Do not wrap funds if funderTokenWallet is missing funds */
    disableWrap?: boolean;
}
export type OracleAccountsJSON = types.OracleAccountDataJSON & {
    publicKey: PublicKey;
    balance: number;
    permission: types.PermissionAccountDataJSON & {
        publicKey: PublicKey;
    };
};
export interface OracleWithdrawBaseParams {
    /** The amount of tokens to withdraw from the oracle staking wallet. Ex: 1.25 would withdraw 1250000000 wSOL tokens from the staking wallet */
    amount: number;
    /** Unwrap funds directly to oracle authority */
    unwrap: boolean;
    /** Alternative keypair that is the oracle authority and required to withdraw from the staking wallet. */
    authority?: Keypair;
}
export interface OracleWithdrawUnwrapParams extends OracleWithdrawBaseParams {
    unwrap: true;
}
export interface OracleWithdrawWalletParams extends OracleWithdrawBaseParams {
    unwrap: false;
    /** SPL token account where the tokens will be sent. Defaults to the payers associated token account. */
    withdrawAccount?: PublicKey;
}
export type OracleWithdrawParams = OracleWithdrawUnwrapParams | OracleWithdrawWalletParams;
//# sourceMappingURL=oracleAccount.d.ts.map