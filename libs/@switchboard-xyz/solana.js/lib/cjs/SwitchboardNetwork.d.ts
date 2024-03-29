import { CreateQueueBufferRelayerParams, CreateQueueCrankParams, CreateQueueFeedParams, CreateQueueOracleParams, CreateQueueVrfParams, QueueAccount, QueueInitParams } from './accounts';
import { JobAccountData } from './generated';
import { SendTransactionOptions, SwitchboardProgram } from './SwitchboardProgram';
import { TransactionObject } from './TransactionObject';
import { AggregatorDefinition, BufferRelayerDefinition, CrankDefinition, LoadedAggregatorDefinition, LoadedBufferRelayerDefinition, LoadedCrankDefinition, LoadedJobDefinition, LoadedOracleDefinition, LoadedProgramStateDefinition, LoadedQueueDefinition, LoadedVrfDefinition, OracleDefinition, ProgramStateDefinition, QueueDefinition, VrfDefinition } from './types';
import * as anchor from '@coral-xyz/anchor';
import { Keypair, PublicKey, TransactionSignature } from '@solana/web3.js';
export declare const isKeypairString: (value: string) => boolean;
/** Parameters to create a new queue with a set of associated accounts */
export type NetworkInitParams = Omit<QueueInitParams, 'authority'> & {
    authority?: Keypair;
} & {
    /** The {@linkcode CrankAccount}s to add to the queue */
    cranks?: Array<CreateQueueCrankParams>;
    /** The {@linkcode OracleAccount}s to add to the queue */
    oracles?: Array<CreateQueueOracleParams>;
    /** The {@linkcode AggregatorAccount}s to add to the queue */
    aggregators?: Array<CreateQueueFeedParams & {
        /** The index of the crank to add the feed to */
        crankIndex?: number;
    }>;
    /** The {@linkcode VrfAccount}s to add to the queue */
    vrfs?: Array<CreateQueueVrfParams>;
    /** The {@linkcode BufferRelayerAccount}s to add to the queue */
    bufferRelayers?: Array<CreateQueueBufferRelayerParams>;
};
/** The queue and associated accounts for the newly created Switchboard network. */
export interface ISwitchboardNetwork {
    /** The {@linkcode ProgramStateAccount} and PDA bump. */
    programState: ProgramStateDefinition;
    /** The {@linkcode QueueAccount} for the newly created Switchboard network. */
    queue: QueueDefinition;
    /** The {@linkcode CrankAccount}s for the newly created Switchboard network. */
    cranks: Array<CrankDefinition>;
    oracles: Array<OracleDefinition>;
    aggregators: Array<AggregatorDefinition>;
    vrfs: Array<VrfDefinition>;
    bufferRelayers: Array<BufferRelayerDefinition>;
}
/** Wrapper to quickly create a Switchboard network including:
 *  - an oracle queue
 *  - a set of cranks
 *  - a set of oracles
 *  - a set of aggregators with job configs
 *  - a set of vrf accounts
 *  - a set of buffer relayers
 *
 */
export declare class SwitchboardNetwork implements ISwitchboardNetwork {
    programState: ProgramStateDefinition;
    queue: QueueDefinition;
    cranks: Array<CrankDefinition>;
    oracles: Array<OracleDefinition>;
    aggregators: Array<AggregatorDefinition>;
    vrfs: Array<VrfDefinition>;
    bufferRelayers: Array<BufferRelayerDefinition>;
    crankMap: Map<string, CrankDefinition>;
    oracleMap: Map<string, OracleDefinition>;
    aggregatorMap: Map<string, AggregatorDefinition>;
    vrfMap: Map<string, VrfDefinition>;
    bufferRelayerMap: Map<string, BufferRelayerDefinition>;
    constructor(fields: ISwitchboardNetwork);
    get program(): SwitchboardProgram;
    getCrank(crankPubkey: PublicKey | string): CrankDefinition | undefined;
    getOracle(oraclePubkey: PublicKey | string): OracleDefinition | undefined;
    getAggregator(aggregatorPubkey: PublicKey | string): AggregatorDefinition | undefined;
    getVrf(vrfPubkey: PublicKey | string): VrfDefinition | undefined;
    getBufferRelayer(bufferRelayerPubkey: PublicKey | string): BufferRelayerDefinition | undefined;
    static find(program: SwitchboardProgram, networkName?: string, switchboardDir?: string): SwitchboardNetwork;
    /**
   *
   * Creates a transaction object to initialize a SwitchboardNetwork.
   *
   * Basic usage example:
   *
   * ```ts
   *     const [accounts, signatures] = await SwitchboardNetwork.createInstructions(
        program,
        progam.walletPubkey,
        {
          name: 'Queue-1',
          reward: 0,
          minStake: 1,
          unpermissionedFeeds: false,
          unpermissionedVrf: false,
          authority: origQueueAuthority,
          oracles: [
            {
              name: 'Oracle-1',
              enable: true,
              stakeAmount: 1,
            },
          ],
          cranks: [{ name: 'Crank-1', maxRows: 100 }],
          aggregators: [{
            name: "Aggregator-1",
            crankIndex: 0,
            enable: true,
            fundAmount: 2.5,
            "minUpdateDelaySeconds": 15,
            "batchSize": 3,
            "minRequiredOracleResults": 2,
            "jobs": [
              {
                "weight": 1,
                "name": "Job #1",
                "tasks": [
                  {
                    "valueTask": {
                      "value": "1"
                    }
                  }
                ]
              }
            ]
          }]
        }
      );
   * ```
   */
    static createInstructions(program: SwitchboardProgram, payer: PublicKey, params: NetworkInitParams): Promise<[Array<TransactionObject>, SwitchboardNetwork]>;
    /**
   *
   * Create a new SwitchboardNetwork.
   *
   * Basic usage example:
   *
   * ```ts
   *     const [accounts, signatures] = await SwitchboardNetwork.create(
        program,
        {
          name: 'Queue-1',
          reward: 0,
          minStake: 1,
          unpermissionedFeeds: false,
          unpermissionedVrf: false,
          authority: origQueueAuthority,
          oracles: [
            {
              name: 'Oracle-1',
              enable: true,
              stakeAmount: 1,
            },
          ],
          cranks: [{ name: 'Crank-1', maxRows: 100 }],
          aggregators: [{
            name: "Aggregator-1",
            crankIndex: 0,
            enable: true,
            fundAmount: 2.5,
            "minUpdateDelaySeconds": 15,
            "batchSize": 3,
            "minRequiredOracleResults": 2,
            "jobs": [
              {
                "weight": 1,
                "name": "Job #1",
                "tasks": [
                  {
                    "valueTask": {
                      "value": "1"
                    }
                  }
                ]
              }
            ]
          }]
        }
      );
   * ```
   */
    static create(program: SwitchboardProgram, params: NetworkInitParams, opts?: SendTransactionOptions): Promise<[SwitchboardNetwork, Array<TransactionSignature>]>;
    /**
     * Load the account states for a {@linkcode SwitchboardNetwork}.
     *
     * @returns LoadedSwitchboardNetwork
     */
    load(): Promise<LoadedSwitchboardNetwork>;
    /**
     * Load a SwitchboardNetwork from an outputted JSON file
     *
     * @param program
     * @param obj
     * @returns
     */
    static from(program: SwitchboardProgram, obj: Record<string, any>): SwitchboardNetwork;
    /**
     * Load the associated accounts and states for a given {@linkcode QueueAccount}.
     *
     * Basic usage example:
     *
     * ```ts
     * const network = await SwitchboardNetwork.fromQueue(queueAccount);
     * fs.writeFileSync("MyQueue.json", JSON.stringify(network.toJSON(), undefined, 2));
     * ```
     */
    static fromQueue(queueAccount: QueueAccount): Promise<LoadedSwitchboardNetwork>;
}
/** LOADED ACCOUNTS */
/** The queue and associated accounts for the newly created Switchboard network. */
export interface ILoadedSwitchboardNetwork extends ISwitchboardNetwork {
    /** The {@linkcode ProgramStateAccount} and PDA bump. */
    programState: LoadedProgramStateDefinition;
    /** The {@linkcode QueueAccount} for the newly created Switchboard network. */
    queue: LoadedQueueDefinition;
    /** The {@linkcode CrankAccount}s for the newly created Switchboard network. */
    cranks: Array<LoadedCrankDefinition>;
    oracles: Array<LoadedOracleDefinition>;
    aggregators: Array<LoadedAggregatorDefinition>;
    vrfs: Array<LoadedVrfDefinition>;
    bufferRelayers: Array<LoadedBufferRelayerDefinition>;
    jobs: Array<LoadedJobDefinition>;
}
export declare class LoadedSwitchboardNetwork implements ILoadedSwitchboardNetwork {
    programState: LoadedProgramStateDefinition;
    queue: LoadedQueueDefinition;
    /** The {@linkcode CrankAccount}s for the newly created Switchboard network. */
    cranks: Array<LoadedCrankDefinition>;
    oracles: Array<LoadedOracleDefinition>;
    aggregators: Array<LoadedAggregatorDefinition>;
    vrfs: Array<LoadedVrfDefinition>;
    bufferRelayers: Array<LoadedBufferRelayerDefinition>;
    jobs: Array<LoadedJobDefinition>;
    get program(): SwitchboardProgram;
    constructor(fields: ILoadedSwitchboardNetwork);
    getJob(jobPubkey: PublicKey): LoadedJobDefinition | undefined;
    getJobs(jobPubkeys: Array<PublicKey>): Array<LoadedJobDefinition>;
    toJSON(): {
        programState: {
            publicKey: string;
            authority: string;
            state: import("./generated").SbStateJSON;
        };
        queue: {
            publicKey: string;
            authority: string;
            state: import("./generated").OracleQueueAccountDataJSON;
        };
        cranks: {
            publicKey: string;
            state: import("./generated").CrankAccountDataJSON;
        }[];
        oracles: {
            publicKey: string;
            authority: string;
            state: import("./generated").OracleAccountDataJSON;
            permission: {
                publicKey: string;
                bump: number;
                state: import("./generated").PermissionAccountDataJSON;
            };
        }[];
        aggregators: {
            publicKey: string;
            authority: string;
            state: {
                reserved1: undefined;
                previousConfirmedRoundResult: import("@switchboard-xyz/common").Big;
                jobPubkeysData: anchor.web3.PublicKey[];
                jobHashes: import("./generated").Hash[];
                currentRound: undefined;
                latestConfirmedRound: undefined;
                ebuf: undefined;
                name: number[];
                metadata: number[];
                queuePubkey: string;
                oracleRequestBatchSize: number;
                minOracleResults: number;
                minJobResults: number;
                minUpdateDelaySeconds: number;
                startAfter: string;
                varianceThreshold: import("./generated").SwitchboardDecimalJSON;
                forceReportPeriod: string;
                expiration: string;
                consecutiveFailureCount: string;
                nextAllowedUpdateTime: string;
                isLocked: boolean;
                crankPubkey: string;
                jobPubkeysSize: number;
                jobsChecksum: number[];
                authority: string;
                historyBuffer: string;
                previousConfirmedRoundSlot: string;
                disableCrank: boolean;
                jobWeights: number[];
                creationTimestamp: string;
                resolutionMode: import("./generated").AggregatorResolutionModeJSON;
                basePriorityFee: number;
                priorityFeeBump: number;
                priorityFeeBumpPeriod: number;
                maxPriorityFeeMultiplier: number;
            };
            permission: {
                publicKey: string;
                bump: number;
                state: import("./generated").PermissionAccountDataJSON;
            };
            lease: {
                publicKey: string;
                bump: number;
                state: import("./generated").LeaseAccountDataJSON;
            };
            jobs: {
                publicKey: string;
                authority: string;
                state: JobAccountData;
                data: {
                    [k: string]: any;
                };
            }[];
        }[];
        vrfs: {
            publicKey: string;
            authority: string;
            state: {
                callback: {
                    accounts: import("./generated").AccountMetaZCJSON[];
                    ixData: string;
                    programId: string;
                    accountsLen: number;
                    ixDataLen: number;
                };
                ebuf: undefined;
                builders: undefined;
                status: import("./generated").VrfStatusJSON;
                counter: string;
                authority: string;
                oracleQueue: string;
                escrow: string;
                batchSize: number;
                buildersLen: number; /** The queue and associated accounts for the newly created Switchboard network. */
                testMode: boolean;
                currentRound: import("./generated").VrfRoundJSON;
            };
            permission: {
                publicKey: string;
                bump: number;
                state: import("./generated").PermissionAccountDataJSON;
            };
        }[];
        bufferRelayers: {
            publicKey: string;
            authority: string;
            state: {
                currentRound: undefined;
                latestConfirmedRound: undefined;
                name: number[];
                queuePubkey: string;
                escrow: string;
                authority: string;
                jobPubkey: string;
                jobHash: number[];
                minUpdateDelaySeconds: number;
                isLocked: boolean;
                result: number[];
            };
            permission: {
                publicKey: string;
                bump: number;
                state: import("./generated").PermissionAccountDataJSON;
            };
            job: {
                publicKey: string | undefined;
                authority: string | undefined;
                state: JobAccountData | undefined;
                data: {
                    [k: string]: any;
                } | undefined;
            };
        }[];
    };
}
//# sourceMappingURL=SwitchboardNetwork.d.ts.map