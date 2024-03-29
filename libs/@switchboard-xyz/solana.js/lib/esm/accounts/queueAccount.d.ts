/// <reference types="node" />
import * as types from '../generated';
import { SwitchboardProgram } from '../SwitchboardProgram';
import { TransactionObject } from '../TransactionObject';
import { Account, OnAccountChangeCallback } from './account';
import { AggregatorAccount, AggregatorInitParams } from './aggregatorAccount';
import { BufferRelayerAccount, BufferRelayerInit } from './bufferRelayAccount';
import { CrankAccount, CrankInitParams } from './crankAccount';
import { JobAccount, JobInitParams } from './jobAccount';
import { LeaseInitParams } from './leaseAccount';
import { OracleAccount, OracleInitParams, OracleStakeParams } from './oracleAccount';
import { PermissionSetParams } from './permissionAccount';
import { QueueDataBuffer } from './queueDataBuffer';
import { VrfAccount, VrfInitParams } from './vrfAccount';
import { VrfLiteAccount, VrfLiteInitParams } from './vrfLiteAccount';
import * as anchor from '@coral-xyz/anchor';
import * as spl from '@solana/spl-token-v2';
import { AccountInfo, Commitment, Keypair, PublicKey, TransactionSignature } from '@solana/web3.js';
/**
 * Account type representing an oracle queue's configuration along with a buffer account holding a list of oracles that are actively heartbeating.
 *
 * A QueueAccount is responsible for allocating update requests to it's round robin queue of {@linkcode OracleAccount}'s.
 *
 * Data: {@linkcode types.OracleQueueAccountData}
 *
 * Buffer: {@linkcode QueueDataBuffer}
 */
export declare class QueueAccount extends Account<types.OracleQueueAccountData> {
    static accountName: string;
    /** The {@linkcode QueueDataBuffer} storing a list of oracle's that are actively heartbeating */
    dataBuffer?: QueueDataBuffer;
    static size: number;
    /**
     * Get the size of an {@linkcode QueueAccount} on-chain.
     */
    readonly size: number;
    /**
     * Returns the queue's name buffer in a stringified format.
     */
    static getName: (queue: types.OracleQueueAccountData) => string;
    /**
     * Returns the queue's metadata buffer in a stringified format.
     */
    static getMetadata: (queue: types.OracleQueueAccountData) => string;
    /** Load an existing QueueAccount with its current on-chain state */
    static load(program: SwitchboardProgram, publicKey: PublicKey | string): Promise<[QueueAccount, types.OracleQueueAccountData]>;
    /**
     * Return a oracle queue account state initialized to the default values.
     */
    static default(): types.OracleQueueAccountData;
    /**
     * Create a mock account info for a given oracle queue config. Useful for test integrations.
     */
    static createMock(programId: PublicKey, data: Partial<types.OracleQueueAccountData>, options?: {
        lamports?: number;
        rentEpoch?: number;
    }): AccountInfo<Buffer>;
    /**
     * Invoke a callback each time a QueueAccount's data has changed on-chain.
     * @param callback - the callback invoked when the queues state changes
     * @param commitment - optional, the desired transaction finality. defaults to 'confirmed'
     * @returns the websocket subscription id
     */
    onChange(callback: OnAccountChangeCallback<types.OracleQueueAccountData>, commitment?: Commitment): number;
    /**
     * Retrieve and decode the {@linkcode types.OracleQueueAccountData} stored in this account.
     */
    loadData(): Promise<types.OracleQueueAccountData>;
    /**
     * Get the spl Mint associated with this {@linkcode QueueAccount}.
     */
    get mint(): spl.Mint;
    /**
     * Creates a transaction object with oracleQueueInit instructions.
     *
     * @param program The SwitchboardProgram.
     *
     * @param payer - the publicKey of the account that will pay for the new accounts. Will also be used as the account authority if no other authority is provided.
     *
     * @param params oracle queue configuration parameters.
     *
     * @return Transaction signature and the newly created QueueAccount.
     *
     * Basic usage example:
     *
     * ```ts
     * import { QueueAccount } from '@switchboard-xyz/solana.js';
     * const [queueAccount, queueInitTxn] = await QueueAccount.createInstructions(program, payer, {
          name: 'My Queue',
          metadata: 'Top Secret',
          queueSize: 100,
          reward: 0.00001337,
          minStake: 10,
          oracleTimeout: 60,
          slashingEnabled: false,
          unpermissionedFeeds: true,
          unpermissionedVrf: true,
          enableBufferRelayers: false,
     * });
     * const queueInitSignature = await program.signAndSend(queueInitTxn);
     * const queue = await queueAccount.loadData();
     * ```
     */
    static createInstructions(program: SwitchboardProgram, payer: PublicKey, params: QueueInitParams): Promise<[QueueAccount, TransactionObject]>;
    /**
     * Creates an oracle queue on-chain and return the transaction signature and created account resource.
     *
     * @param program The SwitchboardProgram.
     *
     * @param params oracle queue configuration parameters.
     *
     * @return Transaction signature and the newly created QueueAccount.
     *
     * Basic usage example:
     *
     * ```ts
     * import { QueueAccount } from '@switchboard-xyz/solana.js';
     * const [queueAccount, txnSignature] = await QueueAccount.create(program, {
          name: 'My Queue',
          metadata: 'Top Secret',
          queueSize: 100,
          reward: 0.00001337,
          minStake: 10,
          oracleTimeout: 60,
          slashingEnabled: false,
          unpermissionedFeeds: true,
          unpermissionedVrf: true,
          enableBufferRelayers: false,
     * });
     * const queue = await queueAccount.loadData();
     * ```
     */
    static create(program: SwitchboardProgram, params: QueueInitParams): Promise<[QueueAccount, string]>;
    /**
     * Creates a transaction object with oracleInit instructions for the given QueueAccount.
     *
     * @param payer - the publicKey of the account that will pay for the new accounts. Will also be used as the account authority if no other authority is provided.
     *
     * @param params - the oracle configuration parameters.
     *
     * @return Transaction signature and the newly created OracleAccount.
     *
     * Basic usage example:
     *
     * ```ts
     * import { QueueAccount } from '@switchboard-xyz/solana.js';
     * const queueAccount = new QueueAccount(program, queuePubkey);
     * const [oracleAccount, oracleInitTxn] = await queueAccount.createOracleInstructions(payer, {
     *  name: "My Oracle",
     *  metadata: "Oracle #1"
     * });
     * const oracleInitSignature = await program.signAndSend(oracleInitTxn);
     * const oracle = await oracleAccount.loadData();
     * ```
     */
    createOracleInstructions(
    /** The publicKey of the account that will pay for the new accounts. Will also be used as the account authority if no other authority is provided. */
    payer: PublicKey, params: CreateQueueOracleParams): Promise<[OracleAccount, Array<TransactionObject>]>;
    /**
     * Creates a new {@linkcode OracleAccount}.
     *
     * @param params - the oracle configuration parameters.
     *
     * @return Transaction signature and the newly created OracleAccount.
     *
     * Basic usage example:
     *
     * ```ts
     * import { QueueAccount } from '@switchboard-xyz/solana.js';
     * const queueAccount = new QueueAccount(program, queuePubkey);
     * const [oracleAccount, oracleInitSignature] = await queueAccount.createOracle({
     *  name: "My Oracle",
     *  metadata: "Oracle #1"
     * });
     * const oracle = await oracleAccount.loadData();
     * ```
     */
    createOracle(params: CreateQueueOracleParams): Promise<[OracleAccount, Array<TransactionSignature>]>;
    /**
     * Create a new {@linkcode TransactionObject} constaining the instructions and signers needed to create a new {@linkcode AggregatorAccount} for the queue along with its {@linkcode PermissionAccount} and {@linkcode LeaseAccount}.
     *
     * @param payer - the publicKey of the account that will pay for the new accounts. Will also be used as the account authority if no other authority is provided.
     *
     * @param params - the aggregatorInit, jobInit, permissionInit, permissionSet, leaseInit, and crankPush configuration parameters.
     *
     * Optionally, specify a crankPubkey in order to push it onto an existing {@linkcode CrankAccount}.
     *
     * Optionally, enable the permissions by setting a queueAuthority keypair along with the enable boolean set to true.
     *
     * ```ts
     * import { QueueAccount } from '@switchboard-xyz/solana.js';
     * const queueAccount = new QueueAccount(program, queuePubkey);
     * const [aggregatorAccount, aggregatorInitTxnObject] =
        await queueAccount.createFeedInstructions({
          enable: true, // not needed if queue has unpermissionedFeedsEnabled
          queueAuthority: queueAuthority, // not needed if queue has unpermissionedFeedsEnabled
          batchSize: 1,
          minRequiredOracleResults: 1,
          minRequiredJobResults: 1,
          minUpdateDelaySeconds: 60,
          fundAmount: 2.5, // deposit 2.5 wSOL into the leaseAccount escrow
          jobs: [
            { pubkey: jobAccount.publicKey },
            {
              weight: 2,
              data: OracleJob.encodeDelimited(
                OracleJob.fromObject({
                  tasks: [
                    {
                      valueTask: {
                        value: 1,
                      },
                    },
                  ],
                })
              ).finish(),
            },
          ],
        });
        const aggregatorInitSignatures = await this.program.signAndSendAll(txns);
     * ```
     */
    createFeedInstructions(payer: PublicKey, params: CreateQueueFeedParams): Promise<[AggregatorAccount, Array<TransactionObject>]>;
    /**
     * Create a new {@linkcode AggregatorAccount} for the queue, along with its {@linkcode PermissionAccount} and {@linkcode LeaseAccount}.
     *
     * Optionally, specify a crankPubkey in order to push it onto an existing {@linkcode CrankAccount}.
     *
     * Optionally, enable the permissions by setting a queueAuthority keypair along with the enable boolean set to true.
     *
     * ```ts
     * import { QueueAccount } from '@switchboard-xyz/solana.js';
     * const queueAccount = new QueueAccount(program, queuePubkey);
     * const [aggregatorAccount, aggregatorInitSignatures] =
        await queueAccount.createFeed({
          enable: true, // not needed if queue has unpermissionedFeedsEnabled
          queueAuthority: queueAuthority, // not needed if queue has unpermissionedFeedsEnabled
          batchSize: 1,
          minRequiredOracleResults: 1,
          minRequiredJobResults: 1,
          minUpdateDelaySeconds: 60,
          fundAmount: 2.5, // deposit 2.5 wSOL into the leaseAccount escrow
          jobs: [
            { pubkey: jobAccount.publicKey },
            {
              weight: 2,
              data: OracleJob.encodeDelimited(
                OracleJob.fromObject({
                  tasks: [
                    {
                      valueTask: {
                        value: 1,
                      },
                    },
                  ],
                })
              ).finish(),
            },
          ],
        });
     * ```
     */
    createFeed(params: CreateQueueFeedParams): Promise<[AggregatorAccount, Array<TransactionSignature>]>;
    /**
     * Creates a transaction object with crankInit instructions for the given QueueAccount.
     *
     * @param payer - the publicKey of the account that will pay for the new accounts. Will also be used as the account authority if no other authority is provided.
     *
     * @param params - the crank configuration parameters.
     *
     * @return Transaction signature and the newly created CrankAccount.
     *
     * Basic usage example:
     *
     * ```ts
     * import { QueueAccount } from '@switchboard-xyz/solana.js';
     * const queueAccount = new QueueAccount(program, queuePubkey);
     * const [crankAccount, crankInitTxn] = await queueAccount.createCrankInstructions(payer, {
     *  name: "My Crank",
     *  metadata: "Crank #1",
     *  maxRows: 1000,
     * });
     * const crankInitSignature = await program.signAndSend(crankInitTxn);
     * const crank = await crankAccount.loadData();
     * ```
     */
    createCrankInstructions(payer: PublicKey, params: CreateQueueCrankParams): Promise<[CrankAccount, TransactionObject]>;
    /**
     * Creates a new {@linkcode CrankAccount}.
     *
     * @param params - the crank configuration parameters.
     *
     * @return Transaction signature and the newly created CrankAccount.
     *
     * Basic usage example:
     *
     * ```ts
     * import { QueueAccount } from '@switchboard-xyz/solana.js';
     * const queueAccount = new QueueAccount(program, queuePubkey);
     * const [crankAccount, crankInitSignature] = await queueAccount.createCrank({
     *  name: "My Crank",
     *  metadata: "Crank #1",
     *  maxRows: 1000,
     * });
     * const crank = await crankAccount.loadData();
     * ```
     */
    createCrank(params: CreateQueueCrankParams): Promise<[CrankAccount, TransactionSignature]>;
    /**
     * Creates a transaction object with vrfInit instructions for the given QueueAccount.
     *
     * @param payer - the publicKey of the account that will pay for the new accounts. Will also be used as the account authority if no other authority is provided.
     *
     * @param params - the vrf configuration parameters.
     *
     * @return Transaction signature and the newly created VrfAccount.
     *
     * Basic usage example:
     *
     * ```ts
     * import { QueueAccount } from '@switchboard-xyz/solana.js';
     * const queueAccount = new QueueAccount(program, queuePubkey);
     * const vrfKeypair = Keypair.generate();
     * const [vrfAccount, vrfInitTxn] = await queueAccount.createVrfInstructions(payer, {
     *  vrfKeypair: vrfKeypair,
     *  callback: {
     *    programId: "",
     *    accounts: [],
     *    ixData: Buffer.from("")
     *  },
     * });
     * const vrfInitSignature = await program.signAndSend(vrfInitTxn);
     * const vrf = await vrfAccount.loadData();
     * ```
     */
    createVrfInstructions(payer: PublicKey, params: CreateQueueVrfParams): Promise<[VrfAccount, TransactionObject]>;
    /**
     * Creates a new {@linkcode VrfAccount} for a given QueueAccount.
     *
     * @param params - the vrf configuration parameters.
     *
     * @return Transaction signature and the newly created VrfAccount.
     *
     * Basic usage example:
     *
     * ```ts
     * import { QueueAccount } from '@switchboard-xyz/solana.js';
     * const queueAccount = new QueueAccount(program, queuePubkey);
     * const vrfKeypair = Keypair.generate();
     * const [vrfAccount, vrfInitSignature] = await queueAccount.createVrf({
     *  vrfKeypair: vrfKeypair,
     *  callback: {
     *    programId: "",
     *    accounts: [],
     *    ixData: Buffer.from("")
     *  },
     * });
     * const vrf = await vrfAccount.loadData();
     * ```
     */
    createVrf(params: CreateQueueVrfParams): Promise<[VrfAccount, TransactionSignature]>;
    /**
     * Creates a transaction object with bufferRelayerInit instructions for the given QueueAccount.
     *
     * @param payer - the publicKey of the account that will pay for the new accounts. Will also be used as the account authority if no other authority is provided.
     *
     * @param params - the buffer relayer configuration parameters.
     *
     * @return Transaction signature and the newly created BufferRelayerAccount.
     *
     * Basic usage example:
     *
     * ```ts
     * import { QueueAccount } from '@switchboard-xyz/solana.js';
     * const queueAccount = new QueueAccount(program, queuePubkey);
     * const [bufferRelayerAccount, bufferRelayerInitTxn] = await queueAccount.createBufferRelayerInstructions(payer, {
     *  name: "My Buffer",
     *  minUpdateDelaySeconds: 30,
     *  job: existingJobPubkey,
     * });
     * const bufferRelayerInitSignature = await program.signAndSend(bufferRelayerInitTxn);
     * const bufferRelayer = await bufferRelayerAccount.loadData();
     * ```
     */
    createBufferRelayerInstructions(payer: PublicKey, params: CreateQueueBufferRelayerParams): Promise<[BufferRelayerAccount, TransactionObject]>;
    /**
     * Creates a new {@linkcode BufferRelayerAccount} for a given QueueAccount.
     *
     * @param params - the buffer relayer configuration parameters.
     *
     * @return Transaction signature and the newly created BufferRelayerAccount.
     *
     * Basic usage example:
     *
     * ```ts
     * import { QueueAccount } from '@switchboard-xyz/solana.js';
     * const queueAccount = new QueueAccount(program, queuePubkey);
     * const [bufferRelayerAccount, bufferRelayerInitSignature] = await queueAccount.createBufferRelayer({
     *  name: "My Buffer",
     *  minUpdateDelaySeconds: 30,
     *  job: existingJobPubkey,
     * });
     * const bufferRelayer = await bufferRelayerAccount.loadData();
     * ```
     */
    createBufferRelayer(params: CreateQueueBufferRelayerParams): Promise<[BufferRelayerAccount, TransactionSignature]>;
    createVrfLiteInstructions(payer: PublicKey, params: CreateVrfLiteParams): Promise<[VrfLiteAccount, TransactionObject]>;
    createVrfLite(params: CreateVrfLiteParams): Promise<[VrfLiteAccount, TransactionSignature]>;
    /** Load the list of oracles that are currently stored in the buffer */
    loadOracles(): Promise<Array<PublicKey>>;
    /** Loads the oracle states for the oracles currently on the queue's dataBuffer */
    loadOracleAccounts(_oracles?: Array<PublicKey>): Promise<Array<{
        account: OracleAccount;
        data: types.OracleAccountData;
    }>>;
    loadActiveOracleAccounts(_queue?: types.OracleQueueAccountData): Promise<Array<{
        account: OracleAccount;
        data: types.OracleAccountData;
    }>>;
    /** Returns a flag dictating whether enough oracles are actively heartbeating on an oracle queue and ready for on-chain update requests */
    isReady(_queue?: types.OracleQueueAccountData, oraclesNeeded?: number): Promise<boolean>;
    setConfig(params: QueueSetConfigParams & {
        authority?: Keypair;
    }): Promise<TransactionSignature>;
    setConfigInstruction(payer: PublicKey, params: QueueSetConfigParams & {
        authority?: Keypair;
    }): TransactionObject;
    toAccountsJSON(_queue?: types.OracleQueueAccountData, _oracles?: Array<PublicKey>): Promise<QueueAccountsJSON>;
    fetchAccounts(_queue?: types.OracleQueueAccountData, _oracles?: Array<PublicKey>): Promise<QueueAccounts>;
}
/**
 *  Parameters for initializing an {@linkcode QueueAccount}
 */
export interface QueueInitParams {
    /**
     *  A name to assign to this {@linkcode QueueAccount}
     */
    name?: string;
    /**
     *  Metadata for the queue for easier identification.
     */
    metadata?: string;
    /**
     *  Rewards to provide oracles and round openers on this queue.
     */
    reward: number;
    /**
     *  The minimum amount of stake oracles must present to remain on the queue.
     */
    minStake: number;
    /**
     *  After a feed lease is funded or re-funded, it must consecutively succeed
     *  N amount of times or its authorization to use the queue is auto-revoked.
     */
    feedProbationPeriod?: number;
    /**
     *  Time period (in seconds) we should remove an oracle after if no response.
     */
    oracleTimeout?: number;
    /**
     *  Whether slashing is enabled on this queue.
     */
    slashingEnabled?: boolean;
    /**
     *  The tolerated variance amount oracle results can have from the accepted round result
     *  before being slashed.
     *  slashBound = varianceToleranceMultiplier * stdDeviation
     *  Default: 2
     */
    varianceToleranceMultiplier?: number;
    /**
     *  Consecutive failure limit for a feed before feed permission is revoked.
     */
    consecutiveFeedFailureLimit?: number;
    /**
     *  Consecutive failure limit for an oracle before oracle permission is revoked.
     */
    consecutiveOracleFailureLimit?: number;
    /**
     *  Optionally set the size of the queue.
     */
    queueSize?: number;
    /**
     *  Enabling this setting means data feeds do not need explicit permission to join the queue.
     */
    unpermissionedFeeds?: boolean;
    /**
     *  Enabling this setting means data feeds do not need explicit permission
     *  to request VRF proofs and verifications from this queue.
     */
    unpermissionedVrf?: boolean;
    /**
     *  Enabling this setting will allow buffer relayer accounts to call openRound.
     */
    enableBufferRelayers?: boolean;
    /**
     *  The account to delegate authority to for creating permissions targeted at the queue.
     *
     *  Defaults to the payer.
     */
    authority?: PublicKey;
    keypair?: Keypair;
    dataBufferKeypair?: Keypair;
}
export interface QueueSetConfigParams {
    /** Alternative keypair that is the queue authority and is permitted to make account changes. Defaults to the payer if not provided. */
    authority?: anchor.web3.Keypair;
    /**
     *  A name to assign to this {@linkcode QueueAccount}
     */
    name?: string;
    /**
     *  Metadata for the queue for easier identification.
     */
    metadata?: string;
    /**
     *  Enabling this setting means data feeds do not need explicit permission to join the queue.
     */
    unpermissionedFeedsEnabled?: boolean;
    /**
     *  Enabling this setting means data feeds do not need explicit permission
     *  to request VRF proofs and verifications from this queue.
     */
    unpermissionedVrfEnabled?: boolean;
    /**
     *  Enabling this setting will allow buffer relayer accounts to call openRound.
     */
    enableBufferRelayers?: boolean;
    /**
     *  Whether slashing is enabled on this queue.
     */
    slashingEnabled?: boolean;
    /**
     *  The tolerated variance amount oracle results can have from the accepted round result
     *  before being slashed.
     *  slashBound = varianceToleranceMultiplier * stdDeviation
     */
    varianceToleranceMultiplier?: number;
    /**
     *  Time period (in seconds) we should remove an oracle after if no response.
     */
    oracleTimeout?: number;
    /**
     *  Rewards to provide oracles and round openers on this queue.
     */
    reward?: number;
    /**
     *  The minimum amount of stake oracles must present to remain on the queue.
     */
    minStake?: number;
    /**
     *  Consecutive failure limit for a feed before feed permission is revoked.
     */
    consecutiveFeedFailureLimit?: number;
    /**
     *  Consecutive failure limit for an oracle before oracle permission is revoked.
     */
    consecutiveOracleFailureLimit?: number;
}
export type QueueAccountsJSON = Omit<types.OracleQueueAccountDataJSON, 'dataBuffer'> & {
    publicKey: PublicKey;
    dataBuffer: {
        publicKey: PublicKey;
        data: Array<PublicKey>;
    };
    oracles: Array<{
        publicKey: PublicKey;
        data: types.OracleAccountDataJSON;
    }>;
};
export type QueueAccounts = {
    queue: {
        publicKey: PublicKey;
        data: types.OracleQueueAccountData;
    };
    dataBuffer: {
        publicKey: PublicKey;
        data: Array<PublicKey>;
    };
    oracles: Array<{
        publicKey: PublicKey;
        data: types.OracleAccountData;
    }>;
};
export type CreateQueueOracleParams = OracleInitParams & Partial<OracleStakeParams> & Partial<PermissionSetParams> & {
    queueAuthorityPubkey?: PublicKey;
};
export type CreateQueueCrankParams = Omit<CrankInitParams, 'queueAccount'>;
export type CreateQueueFeedParams = Omit<Omit<Omit<AggregatorInitParams, 'queueAccount'>, 'queueAuthority'>, 'authority'> & {
    authority?: Keypair;
    crankPubkey?: PublicKey;
    crankDataBuffer?: PublicKey;
    historyLimit?: number;
} & {
    slidingWindow?: boolean;
    basePriorityFee?: number;
    priorityFeeBump?: number;
    priorityFeeBumpPeriod?: number;
    maxPriorityFeeMultiplier?: number;
} & Partial<LeaseInitParams> & Partial<PermissionSetParams> & {
    jobs?: Array<{
        pubkey: PublicKey;
        weight?: number;
    } | JobInitParams>;
} & {
    queueAuthorityPubkey?: PublicKey;
};
export type CreateQueueVrfParams = Omit<VrfInitParams, 'queueAccount'> & Partial<PermissionSetParams> & {
    queueAuthorityPubkey?: PublicKey;
};
export type CreateQueueBufferRelayerParams = Omit<Omit<BufferRelayerInit, 'jobAccount'>, 'queueAccount'> & Partial<PermissionSetParams> & {
    job: JobAccount | PublicKey | Omit<JobInitParams, 'weight'>;
} & {
    queueAuthorityPubkey?: PublicKey;
};
export type CreateVrfLiteParams = VrfLiteInitParams & Partial<PermissionSetParams> & {
    queueAuthorityPubkey?: PublicKey;
};
//# sourceMappingURL=queueAccount.d.ts.map