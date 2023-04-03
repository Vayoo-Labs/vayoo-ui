import * as errors from '../errors';
import * as types from '../generated';
import { PermitOracleHeartbeat, PermitOracleQueueUsage, PermitVrfRequests, } from '../generated/types/SwitchboardPermission';
import { SolanaClock } from '../SolanaClock';
import { TransactionObject } from '../TransactionObject';
import { Account } from './account';
import { AggregatorAccount } from './aggregatorAccount';
import { AggregatorHistoryBuffer } from './aggregatorHistoryBuffer';
import { BufferRelayerAccount } from './bufferRelayAccount';
import { CrankAccount } from './crankAccount';
import { JobAccount } from './jobAccount';
import { LeaseAccount } from './leaseAccount';
import { OracleAccount, } from './oracleAccount';
import { PermissionAccount } from './permissionAccount';
import { QueueDataBuffer } from './queueDataBuffer';
import { VrfAccount } from './vrfAccount';
import { VrfLiteAccount } from './vrfLiteAccount';
import * as anchor from '@coral-xyz/anchor';
import { Keypair, LAMPORTS_PER_SOL, PublicKey, SystemProgram, } from '@solana/web3.js';
import { Big, BN, SwitchboardDecimal, toUtf8 } from '@switchboard-xyz/common';
/**
 * Account type representing an oracle queue's configuration along with a buffer account holding a list of oracles that are actively heartbeating.
 *
 * A QueueAccount is responsible for allocating update requests to it's round robin queue of {@linkcode OracleAccount}'s.
 *
 * Data: {@linkcode types.OracleQueueAccountData}
 *
 * Buffer: {@linkcode QueueDataBuffer}
 */
export class QueueAccount extends Account {
    constructor() {
        super(...arguments);
        /**
         * Get the size of an {@linkcode QueueAccount} on-chain.
         */
        this.size = this.program.account.oracleQueueAccountData.size;
    }
    /** Load an existing QueueAccount with its current on-chain state */
    static async load(program, publicKey) {
        const account = new QueueAccount(program, typeof publicKey === 'string' ? new PublicKey(publicKey) : publicKey);
        const state = await account.loadData();
        return [account, state];
    }
    /**
     * Return a oracle queue account state initialized to the default values.
     */
    static default() {
        const buffer = Buffer.alloc(1269, 0);
        types.OracleQueueAccountData.discriminator.copy(buffer, 0);
        return types.OracleQueueAccountData.decode(buffer);
    }
    /**
     * Create a mock account info for a given oracle queue config. Useful for test integrations.
     */
    static createMock(programId, data, options) {
        const fields = {
            ...QueueAccount.default(),
            ...data,
            // any cleanup actions here
        };
        const state = new types.OracleQueueAccountData(fields);
        const buffer = Buffer.alloc(QueueAccount.size, 0);
        types.OracleQueueAccountData.discriminator.copy(buffer, 0);
        types.OracleQueueAccountData.layout.encode(state, buffer, 8);
        return {
            executable: false,
            owner: programId,
            lamports: options?.lamports ?? 1 * LAMPORTS_PER_SOL,
            data: buffer,
            rentEpoch: options?.rentEpoch ?? 0,
        };
    }
    /**
     * Invoke a callback each time a QueueAccount's data has changed on-chain.
     * @param callback - the callback invoked when the queues state changes
     * @param commitment - optional, the desired transaction finality. defaults to 'confirmed'
     * @returns the websocket subscription id
     */
    onChange(callback, commitment = 'confirmed') {
        return this.program.connection.onAccountChange(this.publicKey, accountInfo => callback(types.OracleQueueAccountData.decode(accountInfo.data)), commitment);
    }
    /**
     * Retrieve and decode the {@linkcode types.OracleQueueAccountData} stored in this account.
     */
    async loadData() {
        const data = await types.OracleQueueAccountData.fetch(this.program, this.publicKey);
        if (data === null)
            throw new errors.AccountNotFoundError('Queue', this.publicKey);
        this.dataBuffer = new QueueDataBuffer(this.program, data.dataBuffer);
        return data;
    }
    /**
     * Get the spl Mint associated with this {@linkcode QueueAccount}.
     */
    get mint() {
        return this.program.mint.mint;
    }
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
    static async createInstructions(program, payer, params) {
        const keypair = params.keypair ?? Keypair.generate();
        program.verifyNewKeypair(keypair);
        const dataBuffer = params.dataBufferKeypair ?? Keypair.generate();
        program.verifyNewKeypair(dataBuffer);
        const queueAccount = new QueueAccount(program, keypair.publicKey);
        queueAccount.dataBuffer = new QueueDataBuffer(program, dataBuffer.publicKey);
        const queueSize = params.queueSize ?? 500;
        const queueDataSize = QueueDataBuffer.getAccountSize(queueSize);
        const reward = program.mint.toTokenAmountBN(params.reward);
        const minStake = program.mint.toTokenAmountBN(params.minStake);
        const txn = new TransactionObject(payer, [
            SystemProgram.createAccount({
                fromPubkey: payer,
                newAccountPubkey: dataBuffer.publicKey,
                space: queueDataSize,
                lamports: await program.connection.getMinimumBalanceForRentExemption(queueDataSize),
                programId: program.programId,
            }),
            types.oracleQueueInit(program, {
                params: {
                    name: Array.from(new Uint8Array(Buffer.from(params.name ?? '').slice(0, 32))),
                    metadata: [
                        ...new Uint8Array(Buffer.from(params.metadata ?? '').slice(0, 64)),
                    ],
                    reward: reward,
                    minStake: minStake,
                    feedProbationPeriod: params.feedProbationPeriod ?? 0,
                    oracleTimeout: params.oracleTimeout ?? 180,
                    slashingEnabled: params.slashingEnabled ?? false,
                    varianceToleranceMultiplier: SwitchboardDecimal.fromBig(new Big(params.varianceToleranceMultiplier ?? 2)),
                    consecutiveFeedFailureLimit: new anchor.BN(params.consecutiveFeedFailureLimit ?? 1000),
                    consecutiveOracleFailureLimit: new anchor.BN(params.consecutiveOracleFailureLimit ?? 1000),
                    queueSize: queueSize,
                    unpermissionedFeeds: params.unpermissionedFeeds ?? false,
                    unpermissionedVrf: params.unpermissionedVrf ?? false,
                    enableBufferRelayers: params.enableBufferRelayers ?? false,
                },
            }, {
                oracleQueue: queueAccount.publicKey,
                authority: params.authority ?? payer,
                buffer: dataBuffer.publicKey,
                systemProgram: SystemProgram.programId,
                payer,
                mint: program.mint.address,
            }),
        ], [dataBuffer, keypair]);
        return [queueAccount, txn];
    }
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
    static async create(program, params) {
        const [account, txnObject] = await this.createInstructions(program, program.walletPubkey, params);
        const txnSignature = await program.signAndSend(txnObject);
        return [account, txnSignature];
    }
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
    async createOracleInstructions(
    /** The publicKey of the account that will pay for the new accounts. Will also be used as the account authority if no other authority is provided. */
    payer, params) {
        const queueAuthorityPubkey = params.queueAuthority
            ? params.queueAuthority.publicKey
            : params.queueAuthorityPubkey ?? (await this.loadData()).authority;
        const [oracleAccount, createOracleTxnObject] = await OracleAccount.createInstructions(this.program, payer, {
            ...params,
            queueAccount: this,
        });
        const [permissionAccount, createPermissionTxnObject] = PermissionAccount.createInstruction(this.program, payer, {
            granter: this.publicKey,
            grantee: oracleAccount.publicKey,
            authority: queueAuthorityPubkey,
        });
        if (params.enable &&
            (params.queueAuthority || queueAuthorityPubkey.equals(payer))) {
            const permissionSetTxn = permissionAccount.setInstruction(payer, {
                permission: new PermitOracleHeartbeat(),
                enable: true,
                queueAuthority: params.queueAuthority,
            });
            createPermissionTxnObject.combine(permissionSetTxn);
        }
        return [
            oracleAccount,
            TransactionObject.pack([
                ...createOracleTxnObject,
                createPermissionTxnObject,
            ]),
        ];
    }
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
    async createOracle(params) {
        const signers = [];
        const queue = await this.loadData();
        if (params.queueAuthority &&
            params.queueAuthority.publicKey.equals(queue.authority)) {
            signers.push(params.queueAuthority);
        }
        const [oracleAccount, txn] = await this.createOracleInstructions(this.program.walletPubkey, params);
        const signatures = await this.program.signAndSendAll(txn);
        return [oracleAccount, signatures];
    }
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
    async createFeedInstructions(payer, params) {
        const queueAuthorityPubkey = params.queueAuthority
            ? params.queueAuthority.publicKey
            : params.queueAuthorityPubkey ?? (await this.loadData()).authority;
        const pre = [];
        const txns = [];
        const post = [];
        // getOrCreate token account for
        const userTokenAddress = this.program.mint.getAssociatedAddress(payer);
        const userTokenAccountInfo = await this.program.connection.getAccountInfo(userTokenAddress);
        if (userTokenAccountInfo === null && params.disableWrap !== true) {
            const [createTokenAccount] = this.program.mint.createAssocatedUserInstruction(payer);
            pre.push(createTokenAccount);
        }
        // create / load jobs
        const jobs = [];
        if (params.jobs && Array.isArray(params.jobs)) {
            for await (const job of params.jobs) {
                if ('data' in job) {
                    const [jobAccount, jobInit] = JobAccount.createInstructions(this.program, payer, {
                        data: job.data,
                        name: job.name ?? '',
                        authority: job.authority,
                        expiration: job.expiration,
                        variables: job.variables,
                        keypair: job.keypair,
                    });
                    pre.push(...jobInit);
                    jobs.push({ job: jobAccount, weight: job.weight ?? 1 });
                }
                else if ('pubkey' in job) {
                    const jobAccount = new JobAccount(this.program, job.pubkey);
                    // should we verify its a valid job account?
                    jobs.push({ job: jobAccount, weight: job.weight ?? 1 });
                }
                else {
                    throw new Error(`Failed to create job account ${job}`);
                }
            }
        }
        const [aggregatorAccount, aggregatorInit] = await AggregatorAccount.createInstruction(this.program, payer, {
            ...params,
            queueAccount: this,
            queueAuthority: queueAuthorityPubkey,
            keypair: params.keypair,
            authority: params.authority ? params.authority.publicKey : undefined,
        });
        txns.push(aggregatorInit);
        const [leaseAccount, leaseInit] = await LeaseAccount.createInstructions(this.program, payer, {
            fundAmount: params.fundAmount,
            funderTokenWallet: params.funderTokenWallet ?? userTokenAddress,
            funderAuthority: params.funderAuthority ?? undefined,
            aggregatorAccount: aggregatorAccount,
            queueAccount: this,
            jobAuthorities: [],
            jobPubkeys: [],
            disableWrap: params.disableWrap,
        });
        txns.push(leaseInit);
        // create permission account
        const [permissionAccount, permissionInit] = PermissionAccount.createInstruction(this.program, payer, {
            granter: this.publicKey,
            authority: queueAuthorityPubkey,
            grantee: aggregatorAccount.publicKey,
        });
        // set permissions
        if (params.enable &&
            (params.queueAuthority || queueAuthorityPubkey.equals(payer))) {
            const permissionSetTxn = permissionAccount.setInstruction(payer, {
                permission: new PermitOracleQueueUsage(),
                enable: true,
                queueAuthority: params.queueAuthority,
            });
            permissionInit.combine(permissionSetTxn);
        }
        txns.push(permissionInit);
        // set resolution mode
        if (params.slidingWindow !== undefined && params.slidingWindow === true) {
            const setResolutionMode = aggregatorAccount.setSlidingWindowInstruction(payer, {
                authority: params.authority,
                mode: new types.AggregatorResolutionMode.ModeSlidingResolution(),
            });
            post.push(setResolutionMode);
        }
        // set priority fees
        if (params.basePriorityFee !== undefined ||
            params.priorityFeeBump !== undefined ||
            params.priorityFeeBumpPeriod !== undefined ||
            params.maxPriorityFeeMultiplier !== undefined) {
            const setAggregatorConfig = await aggregatorAccount.setConfigInstruction(payer, {
                force: true,
                authority: params.authority,
                basePriorityFee: params.basePriorityFee,
                priorityFeeBump: params.priorityFeeBump,
                priorityFeeBumpPeriod: params.priorityFeeBumpPeriod,
                maxPriorityFeeMultiplier: params.maxPriorityFeeMultiplier,
            });
            post.push(setAggregatorConfig);
        }
        for await (const { job, weight } of jobs) {
            const addJobTxn = aggregatorAccount.addJobInstruction(payer, {
                job: job,
                weight: weight,
                authority: params.authority,
            });
            post.push(addJobTxn);
        }
        if (params.crankPubkey) {
            const [permissionAccount, permissionBump] = PermissionAccount.fromSeed(this.program, queueAuthorityPubkey, this.publicKey, aggregatorAccount.publicKey);
            const leaseEscrow = this.program.mint.getAssociatedAddress(leaseAccount.publicKey);
            post.push(new TransactionObject(payer, [
                types.crankPush(this.program, {
                    params: {
                        stateBump: this.program.programState.bump,
                        permissionBump: permissionBump,
                        notifiRef: null,
                    },
                }, {
                    crank: params.crankPubkey,
                    aggregator: aggregatorAccount.publicKey,
                    oracleQueue: this.publicKey,
                    queueAuthority: queueAuthorityPubkey,
                    permission: permissionAccount.publicKey,
                    lease: leaseAccount.publicKey,
                    escrow: leaseEscrow,
                    programState: this.program.programState.publicKey,
                    dataBuffer: params.crankDataBuffer ??
                        (await new CrankAccount(this.program, params.crankPubkey).loadData()).dataBuffer,
                }),
            ], []));
        }
        if (params.historyLimit && params.historyLimit > 0) {
            const historyBufferInit = (await AggregatorHistoryBuffer.createInstructions(this.program, payer, {
                aggregatorAccount,
                maxSamples: params.historyLimit,
            }))[1];
            post.push(historyBufferInit);
        }
        const packed = TransactionObject.pack([
            ...(pre.length ? TransactionObject.pack(pre) : []),
            ...(txns.length ? TransactionObject.pack(txns) : []),
            ...(post.length ? TransactionObject.pack(post) : []),
        ]);
        return [aggregatorAccount, packed];
    }
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
    async createFeed(params) {
        const signers = [];
        const queue = await this.loadData();
        if (params.queueAuthority &&
            params.queueAuthority.publicKey.equals(queue.authority)) {
            signers.push(params.queueAuthority);
        }
        const [aggregatorAccount, txns] = await this.createFeedInstructions(this.program.walletPubkey, params);
        const signatures = await this.program.signAndSendAll(txns, {
            skipPreflight: true,
        });
        return [aggregatorAccount, signatures];
    }
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
    async createCrankInstructions(payer, params) {
        return await CrankAccount.createInstructions(this.program, payer, {
            ...params,
            queueAccount: this,
        });
    }
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
    async createCrank(params) {
        const [crankAccount, txn] = await this.createCrankInstructions(this.program.walletPubkey, params);
        const txnSignature = await this.program.signAndSend(txn);
        return [crankAccount, txnSignature];
    }
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
    async createVrfInstructions(payer, params) {
        const queueAuthorityPubkey = params.queueAuthority
            ? params.queueAuthority.publicKey
            : params.queueAuthorityPubkey ?? (await this.loadData()).authority;
        const [vrfAccount, vrfInit] = await VrfAccount.createInstructions(this.program, payer, {
            vrfKeypair: params.vrfKeypair,
            queueAccount: this,
            callback: params.callback,
            authority: params.authority,
        });
        // eslint-disable-next-line prefer-const
        let [permissionAccount, permissionInit] = PermissionAccount.createInstruction(this.program, payer, {
            granter: this.publicKey,
            grantee: vrfAccount.publicKey,
            authority: queueAuthorityPubkey,
        });
        if (params.enable &&
            (params.queueAuthority || queueAuthorityPubkey.equals(payer))) {
            const permissionSet = permissionAccount.setInstruction(payer, {
                permission: new PermitVrfRequests(),
                enable: true,
                queueAuthority: params.queueAuthority,
            });
            permissionInit = permissionInit.combine(permissionSet);
        }
        return [vrfAccount, vrfInit.combine(permissionInit)];
    }
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
    async createVrf(params) {
        const [vrfAccount, txn] = await this.createVrfInstructions(this.program.walletPubkey, params);
        const txnSignature = await this.program.signAndSend(txn);
        return [vrfAccount, txnSignature];
    }
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
    async createBufferRelayerInstructions(payer, params) {
        const queueAuthorityPubkey = params.queueAuthority
            ? params.queueAuthority.publicKey
            : params.queueAuthorityPubkey ?? (await this.loadData()).authority;
        const txns = [];
        let job;
        if ('data' in params.job) {
            const [jobAccount, jobInit] = JobAccount.createInstructions(this.program, payer, {
                data: params.job.data,
                name: params.job.name ?? '',
                authority: params.job.authority,
                expiration: params.job.expiration,
                variables: params.job.variables,
                keypair: params.job.keypair,
            });
            txns.push(...jobInit);
            job = jobAccount;
        }
        else if (params.job instanceof PublicKey) {
            const jobAccount = new JobAccount(this.program, params.job);
            // should we verify its a valid job account?
            job = jobAccount;
        }
        else if (params.job instanceof JobAccount) {
            job = params.job;
        }
        else {
            throw new Error(`Failed to create BufferRelayer job account. 'data' or 'pubkey' was not defined in jobDefinition`);
        }
        const [bufferAccount, bufferInit] = await BufferRelayerAccount.createInstructions(this.program, payer, {
            name: params.name,
            minUpdateDelaySeconds: params.minUpdateDelaySeconds,
            queueAccount: this,
            authority: params.authority,
            jobAccount: job,
            keypair: params.keypair,
        });
        txns.push(bufferInit);
        // eslint-disable-next-line prefer-const
        let [permissionAccount, permissionInit] = PermissionAccount.createInstruction(this.program, payer, {
            granter: this.publicKey,
            grantee: bufferAccount.publicKey,
            authority: queueAuthorityPubkey,
        });
        if (params.enable &&
            (params.queueAuthority || queueAuthorityPubkey.equals(payer))) {
            const permissionSet = permissionAccount.setInstruction(payer, {
                permission: new PermitOracleQueueUsage(),
                enable: true,
                queueAuthority: params.queueAuthority,
            });
            permissionInit = permissionInit.combine(permissionSet);
        }
        txns.push(permissionInit);
        const packed = TransactionObject.pack(txns);
        if (packed.length > 1) {
            throw new Error(`Failed to pack buffer relayer instructions into a single transaction`);
        }
        return [bufferAccount, packed[0]];
    }
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
    async createBufferRelayer(params) {
        const [bufferRelayerAccount, txn] = await this.createBufferRelayerInstructions(this.program.walletPubkey, params);
        const txnSignature = await this.program.signAndSend(txn);
        return [bufferRelayerAccount, txnSignature];
    }
    async createVrfLiteInstructions(payer, params) {
        const queueAuthorityPubkey = params.queueAuthority
            ? params.queueAuthority.publicKey
            : params.queueAuthorityPubkey ?? (await this.loadData()).authority;
        const txns = [];
        const [vrfLite, vrfLiteInit] = await VrfLiteAccount.createInstruction(this.program, payer, {
            ...params,
            queueAccount: this,
        });
        txns.push(vrfLiteInit);
        const [permissionAccount] = PermissionAccount.fromSeed(this.program, queueAuthorityPubkey, this.publicKey, vrfLite.publicKey);
        if (params.enable &&
            (params.queueAuthority || queueAuthorityPubkey.equals(payer))) {
            const permissionSet = permissionAccount.setInstruction(payer, {
                permission: new PermitVrfRequests(),
                enable: true,
                queueAuthority: params.queueAuthority,
            });
            vrfLiteInit.combine(permissionSet);
        }
        return [vrfLite, vrfLiteInit];
    }
    async createVrfLite(params) {
        const [vrfLiteAccount, txn] = await this.createVrfLiteInstructions(this.program.walletPubkey, params);
        const txnSignature = await this.program.signAndSend(txn, {
            skipPreflight: true,
        });
        return [vrfLiteAccount, txnSignature];
    }
    /** Load the list of oracles that are currently stored in the buffer */
    async loadOracles() {
        let queue;
        if (this.dataBuffer) {
            queue = this.dataBuffer;
        }
        else {
            const queueData = await this.loadData();
            queue = new QueueDataBuffer(this.program, queueData.dataBuffer);
        }
        return queue.loadData();
    }
    /** Loads the oracle states for the oracles currently on the queue's dataBuffer */
    async loadOracleAccounts(_oracles) {
        const oraclePubkeys = _oracles ?? (await this.loadOracles());
        return await OracleAccount.fetchMultiple(this.program, oraclePubkeys);
    }
    async loadActiveOracleAccounts(_queue) {
        const queue = _queue ?? (await this.loadData());
        const oracles = await this.loadOracleAccounts();
        const unixTimestamp = (await SolanaClock.fetch(this.program.connection))
            .unixTimestamp;
        const timeout = unixTimestamp.sub(new BN(queue.oracleTimeout));
        const activeOracles = oracles.filter(o => o.data && o.data.lastHeartbeat.gte(timeout));
        return activeOracles;
    }
    /** Returns a flag dictating whether enough oracles are actively heartbeating on an oracle queue and ready for on-chain update requests */
    async isReady(_queue, oraclesNeeded = 1) {
        const activeOracles = await this.loadActiveOracleAccounts(_queue);
        return activeOracles.length >= oraclesNeeded;
    }
    async setConfig(params) {
        const setConfigTxn = this.setConfigInstruction(this.program.walletPubkey, params);
        const txnSignature = await this.program.signAndSend(setConfigTxn);
        return txnSignature;
    }
    setConfigInstruction(payer, params) {
        const multiplier = params.varianceToleranceMultiplier &&
            Number.isFinite(params.varianceToleranceMultiplier)
            ? SwitchboardDecimal.fromBig(new Big(params.varianceToleranceMultiplier))
            : null;
        const reward = params.reward
            ? this.program.mint.toTokenAmountBN(params.reward)
            : null;
        const minStake = params.minStake
            ? this.program.mint.toTokenAmountBN(params.minStake)
            : null;
        return new TransactionObject(payer, [
            types.oracleQueueSetConfig(this.program, {
                params: {
                    name: params.name
                        ? [
                            ...new Uint8Array(Buffer.from(params.name ?? '').slice(0, 32)),
                        ]
                        : null,
                    metadata: params.metadata
                        ? [
                            ...new Uint8Array(Buffer.from(params.metadata ?? '').slice(0, 64)),
                        ]
                        : null,
                    unpermissionedFeedsEnabled: params.unpermissionedFeedsEnabled ?? null,
                    unpermissionedVrfEnabled: params.unpermissionedVrfEnabled ?? null,
                    enableBufferRelayers: params.enableBufferRelayers ?? null,
                    slashingEnabled: params.slashingEnabled ?? null,
                    reward: reward,
                    minStake: minStake,
                    oracleTimeout: params.oracleTimeout ?? null,
                    consecutiveFeedFailureLimit: params.consecutiveFeedFailureLimit
                        ? new anchor.BN(params.consecutiveFeedFailureLimit)
                        : null,
                    consecutiveOracleFailureLimit: params.consecutiveOracleFailureLimit
                        ? new anchor.BN(params.consecutiveOracleFailureLimit)
                        : null,
                    varianceToleranceMultiplier: multiplier,
                },
            }, {
                authority: params.authority ? params.authority.publicKey : payer,
                queue: this.publicKey,
            }),
        ], params.authority ? [params.authority] : []);
    }
    async toAccountsJSON(_queue, _oracles) {
        const queue = _queue ?? (await this.loadData());
        const oracles = _oracles ?? (await this.loadOracles());
        const oracleAccounts = await this.loadOracleAccounts(oracles);
        return {
            publicKey: this.publicKey,
            ...queue.toJSON(),
            dataBuffer: {
                publicKey: queue.dataBuffer,
                data: oracles,
            },
            oracles: oracleAccounts.map(o => {
                return {
                    publicKey: o.account.publicKey,
                    data: o.data.toJSON(),
                };
            }),
        };
    }
    async fetchAccounts(_queue, _oracles) {
        const queue = _queue ?? (await this.loadData());
        const oracles = _oracles ?? (await this.loadOracles());
        const oracleAccounts = await this.loadOracleAccounts(oracles);
        return {
            queue: {
                publicKey: this.publicKey,
                data: queue,
            },
            dataBuffer: {
                publicKey: queue.dataBuffer,
                data: oracles,
            },
            oracles: oracleAccounts.map(o => {
                return {
                    publicKey: o.account.publicKey,
                    data: o.data,
                };
            }),
        };
    }
}
QueueAccount.accountName = 'OracleQueueAccountData';
QueueAccount.size = 1269;
/**
 * Returns the queue's name buffer in a stringified format.
 */
QueueAccount.getName = (queue) => toUtf8(queue.name);
/**
 * Returns the queue's metadata buffer in a stringified format.
 */
QueueAccount.getMetadata = (queue) => toUtf8(queue.metadata);
//# sourceMappingURL=queueAccount.js.map