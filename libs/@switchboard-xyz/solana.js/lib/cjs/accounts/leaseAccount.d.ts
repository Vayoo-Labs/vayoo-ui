/// <reference types="node" />
import * as types from '../generated';
import { SwitchboardProgram } from '../SwitchboardProgram';
import { TransactionObject } from '../TransactionObject';
import { Account } from './account';
import { AggregatorAccount } from './aggregatorAccount';
import { JobAccount } from './jobAccount';
import { QueueAccount } from './queueAccount';
import * as spl from '@solana/spl-token-v2';
import { AccountInfo, Keypair, PublicKey, TransactionSignature } from '@solana/web3.js';
import { BN, OracleJob } from '@switchboard-xyz/common';
/**
 * Account type representing an {@linkcode AggregatorAccount}'s pre-funded escrow used to reward {@linkcode OracleAccount}'s for responding to open round requests.
 *
 * Data: {@linkcode types.LeaseAccountData}
 */
export declare class LeaseAccount extends Account<types.LeaseAccountData> {
    static accountName: string;
    static size: number;
    /**
     * Get the size of an {@linkcode LeaseAccount} on-chain.
     */
    size: number;
    /**
     * Return a lease account state initialized to the default values.
     */
    static default(): types.LeaseAccountData;
    /**
     * Create a mock account info for a given lease config. Useful for test integrations.
     */
    static createMock(programId: PublicKey, data: Partial<types.LeaseAccountData>, options?: {
        lamports?: number;
        rentEpoch?: number;
    }): AccountInfo<Buffer>;
    /** Load an existing LeaseAccount with its current on-chain state */
    static load(program: SwitchboardProgram, queue: PublicKey | string, aggregator: PublicKey | string): Promise<[LeaseAccount, types.LeaseAccountData, number]>;
    /**
     * Loads a LeaseAccount from the expected PDA seed format.
     * @param program The Switchboard program for the current connection.
     * @param queue The queue pubkey to be incorporated into the account seed.
     * @param aggregator The aggregator pubkey to be incorporated into the account seed.
     * @return LeaseAccount and PDA bump.
     */
    static fromSeed(program: SwitchboardProgram, queue: PublicKey, aggregator: PublicKey): [LeaseAccount, number];
    /**
     * Retrieve and decode the {@linkcode types.LeaseAccountData} stored in this account.
     */
    loadData(): Promise<types.LeaseAccountData>;
    /**
     * Creates instructions to initialize a LeaseAccount and optionally funds it with wrapped tokens.
     *
     * @param program The SwitchboardProgram instance.
     * @param payer The PublicKey of the account that will pay for the transaction fees.
     * @param params Lease initialization parameters including:
     *   - aggregatorAccount (required): The AggregatorAccount to be used.
     *   - queueAccount (required): The QueueAccount to be used.
     *   - jobAuthorities (optional): Array of PublicKey for job authorities.
     *   - jobPubkeys (optional): Array of PublicKey for job pubkeys.
     *   - withdrawAuthority (optional): The PublicKey for the account that has permission to withdraw funds.
     *
     * @return A Promise that resolves to a tuple containing the LeaseAccount and the corresponding TransactionObject.
     *
     * Basic usage example:
     *
     * ```ts
     * import { LeaseAccount } from '@switchboard-xyz/solana.js';
     * const [leaseAccount, leaseInitTxn] = await LeaseAccount.createInstructions(program, payer, {
     *   queueAccount,
     *   aggregatorAccount,
     *   fundAmount: 1,
     *   funderAuthority: null,
     *   funderTokenWallet: null,
     *   disableWrap: false,
     *   withdrawAuthority: null,
     *   jobPubkeys: null,
     *   jobAuthorities: null,
     * });
     * const leaseInitSignature = await program.signAndSend(leaseInitTxn);
     * const lease = await leaseAccount.loadData();
     * ```
     */
    static createInstructions(program: SwitchboardProgram, payer: PublicKey, params: LeaseInitParams): Promise<[LeaseAccount, TransactionObject]>;
    /**
     * Creates a LeaseAccount and optionally funds it with wrapped tokens.
     *
     * @param program The SwitchboardProgram instance.
     * @param payer The PublicKey of the account that will pay for the transaction fees.
     * @param params Lease initialization parameters including:
     *   - aggregatorAccount (required): The AggregatorAccount to be used.
     *   - queueAccount (required): The QueueAccount to be used.
     *   - jobAuthorities (optional): Array of PublicKey for job authorities.
     *   - jobPubkeys (optional): Array of PublicKey for job pubkeys.
     *   - withdrawAuthority (optional): The PublicKey for the account that has permission to withdraw funds.
     *
     * @return A Promise that resolves to a tuple containing the LeaseAccount and the corresponding TransactionObject.
     *
     * Basic usage example:
     *
     * ```ts
     * import { LeaseAccount } from '@switchboard-xyz/solana.js';
     * const [leaseAccount, leaseInitSignature] = await LeaseAccount.create(program, {
     *   queueAccount,
     *   aggregatorAccount,
     *   fundAmount: 1,
     *   funderAuthority: null,
     *   funderTokenWallet: null,
     *   disableWrap: false,
     *   withdrawAuthority: null,
     *   jobPubkeys: null,
     *   jobAuthorities: null,
     * });
     * const lease = await leaseAccount.loadData();
     * ```
     */
    static create(program: SwitchboardProgram, params: LeaseInitParams): Promise<[LeaseAccount, TransactionSignature]>;
    /**
     * Fetches the balance of a Lease escrow in decimal format.
     *
     * @param escrow (optional) The PublicKey of the escrow account. If not provided, the associated escrow account for the current LeaseAccount will be used.
     *
     * @return A Promise that resolves to the escrow balance as a number in decimal format.
     *
     * @throws AccountNotFoundError If the Lease escrow account is not found.
     *
     * Basic usage example:
     *
     * ```ts
     * const leaseEscrowBalance = await leaseAccount.fetchBalance();
     * console.log("Lease escrow balance:", leaseEscrowBalance);
     * ```
     */
    fetchBalance(escrow?: PublicKey): Promise<number>;
    /**
     * Fetches the balance of a Lease escrow in the raw token amount using the bn.js format.
     *
     * @param escrow (optional) The PublicKey of the escrow account. If not provided, the associated escrow account for the current LeaseAccount will be used.
     *
     * @return A Promise that resolves to the escrow balance as a BN instance.
     *
     * @throws AccountNotFoundError If the Lease escrow account is not found.
     *
     * Basic usage example:
     *
     * ```ts
     * const leaseEscrowBalanceBN = await leaseAccount.fetchBalanceBN();
     * console.log("Lease escrow balance:", leaseEscrowBalanceBN.toString());
     * ```
     */
    fetchBalanceBN(escrow?: PublicKey): Promise<BN>;
    extendInstruction(payer: PublicKey, params: LeaseExtendParams): Promise<TransactionObject>;
    extend(params: LeaseExtendParams): Promise<TransactionSignature>;
    withdrawInstruction(payer: PublicKey, params: LeaseWithdrawParams): Promise<TransactionObject>;
    withdraw(params: LeaseWithdrawParams): Promise<TransactionSignature>;
    setAuthority(params: {
        newAuthority: PublicKey;
        withdrawAuthority: Keypair;
    }): Promise<TransactionSignature>;
    setAuthorityInstruction(payer: PublicKey, params: {
        newAuthority: PublicKey;
        withdrawAuthority?: Keypair;
    }): TransactionObject;
    static minimumLeaseAmount(oracleRequestBatchSize: number, queueReward: BN): BN;
    /**
     * Estimate the time remaining on a given lease
     * @param oracleRequestBatchSize - the number of oracles to request per openRound call, for a given aggregator.
     * @param minUpdateDelaySeconds - the number of seconds between openRound calls, for a given aggregator.
     * @param queueReward - the number of tokens deducted from an aggregator's lease for each successful openRound call. This is dependent on the queue an aggregator belongs to.
     * @param leaseBalance - the current balance in a lease in decimal format.
     * @returns a tuple containing the number of milliseconds left in a lease and the estimated end date
     */
    static estimatedLeaseTimeRemaining(oracleRequestBatchSize: number, minUpdateDelaySeconds: number, queueReward: BN, leaseBalance: number): [number, Date];
    /**
     * Estimate the time remaining on a given lease
     * @returns number milliseconds left in lease (estimate)
     */
    estimatedLeaseTimeRemaining(): Promise<number>;
    static getWallets(jobAuthorities: Array<PublicKey>, mint: PublicKey): Array<{
        publicKey: PublicKey;
        bump: number;
    }>;
    fetchAccounts(_lease?: types.LeaseAccountData): Promise<{
        lease: types.LeaseAccountData;
        queueAccount: QueueAccount;
        queue: types.OracleQueueAccountData;
        aggregatorAccount: AggregatorAccount;
        aggregator: types.AggregatorAccountData;
        escrow: spl.Account;
        balance: number;
    }>;
    fetchAllAccounts(_lease?: types.LeaseAccountData): Promise<{
        lease: types.LeaseAccountData;
        queueAccount: QueueAccount;
        queue: types.OracleQueueAccountData;
        aggregatorAccount: AggregatorAccount;
        aggregator: types.AggregatorAccountData;
        escrow: spl.Account;
        balance: number;
        jobs: Array<{
            account: JobAccount;
            state: types.JobAccountData;
            job: OracleJob;
        }>;
        wallets: Array<{
            publicKey: PublicKey;
            bump: number;
        }>;
    }>;
}
export interface LeaseInitParams extends Partial<LeaseExtendParams> {
    withdrawAuthority?: PublicKey;
    aggregatorAccount: AggregatorAccount;
    queueAccount: QueueAccount;
    jobAuthorities?: Array<PublicKey>;
    jobPubkeys?: Array<PublicKey>;
}
export interface LeaseExtendParams {
    /** The amount to fund the lease with. */
    fundAmount: number;
    /** Optional, the token account to fund the lease from. Defaults to payer's associated token account if not provided. */
    funderTokenWallet?: PublicKey;
    /** Optional, the funderTokenWallet authority if it differs from the provided payer. */
    funderAuthority?: Keypair;
    /** Optional, disable auto wrapping funds if funderTokenWallet is missing funds */
    disableWrap?: boolean;
}
export interface LeaseWithdrawBaseParams {
    amount: number | 'all';
    unwrap: boolean;
}
export interface LeaseWithdrawUnwrapParams extends LeaseWithdrawBaseParams {
    unwrap: true;
}
export interface LeaseWithdrawWalletParams extends LeaseWithdrawBaseParams {
    unwrap: false;
    withdrawWallet: PublicKey;
    withdrawAuthority?: Keypair;
}
export type LeaseWithdrawParams = LeaseWithdrawUnwrapParams | LeaseWithdrawWalletParams;
//# sourceMappingURL=leaseAccount.d.ts.map