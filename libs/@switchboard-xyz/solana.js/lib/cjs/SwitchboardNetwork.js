"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoadedSwitchboardNetwork = exports.SwitchboardNetwork = exports.isKeypairString = void 0;
const accounts_1 = require("./accounts");
const generated_1 = require("./generated");
const TransactionObject_1 = require("./TransactionObject");
const anchor = __importStar(require("@coral-xyz/anchor"));
const web3_js_1 = require("@solana/web3.js");
const common_1 = require("@switchboard-xyz/common");
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const isKeypairString = (value) => /^\[(\s)?[0-9]+((\s)?,(\s)?[0-9]+){31,}\]/.test(value);
exports.isKeypairString = isKeypairString;
/** Wrapper to quickly create a Switchboard network including:
 *  - an oracle queue
 *  - a set of cranks
 *  - a set of oracles
 *  - a set of aggregators with job configs
 *  - a set of vrf accounts
 *  - a set of buffer relayers
 *
 */
class SwitchboardNetwork {
    constructor(
    // readonly program: SwitchboardProgram,
    fields) {
        this.programState = fields.programState;
        this.queue = fields.queue;
        this.cranks = fields.cranks;
        this.crankMap = this.cranks.reduce((map, crank) => {
            map.set(crank.account.publicKey.toBase58(), crank);
            return map;
        }, new Map());
        this.oracles = fields.oracles;
        this.oracleMap = this.oracles.reduce((map, oracle) => {
            map.set(oracle.account.publicKey.toBase58(), oracle);
            return map;
        }, new Map());
        this.aggregators = fields.aggregators;
        this.aggregatorMap = this.aggregators.reduce((map, aggregator) => {
            map.set(aggregator.account.publicKey.toBase58(), aggregator);
            return map;
        }, new Map());
        this.vrfs = fields.vrfs;
        this.vrfMap = this.vrfs.reduce((map, vrf) => {
            map.set(vrf.account.publicKey.toBase58(), vrf);
            return map;
        }, new Map());
        this.bufferRelayers = fields.bufferRelayers;
        this.bufferRelayerMap = this.bufferRelayers.reduce((map, bufferRelayer) => {
            map.set(bufferRelayer.account.publicKey.toBase58(), bufferRelayer);
            return map;
        }, new Map());
    }
    get program() {
        return this.queue.account.program;
    }
    getCrank(crankPubkey) {
        return this.crankMap.get(typeof crankPubkey === 'string' ? crankPubkey : crankPubkey.toBase58());
    }
    getOracle(oraclePubkey) {
        return this.oracleMap.get(typeof oraclePubkey === 'string' ? oraclePubkey : oraclePubkey.toBase58());
    }
    getAggregator(aggregatorPubkey) {
        return this.aggregatorMap.get(typeof aggregatorPubkey === 'string'
            ? aggregatorPubkey
            : aggregatorPubkey.toBase58());
    }
    getVrf(vrfPubkey) {
        return this.vrfMap.get(typeof vrfPubkey === 'string' ? vrfPubkey : vrfPubkey.toBase58());
    }
    getBufferRelayer(bufferRelayerPubkey) {
        return this.bufferRelayerMap.get(typeof bufferRelayerPubkey === 'string'
            ? bufferRelayerPubkey
            : bufferRelayerPubkey.toBase58());
    }
    static find(program, networkName = 'default', switchboardDir = path_1.default.join(process.cwd(), '.switchboard')) {
        if (!fs_1.default.existsSync(switchboardDir) ||
            !fs_1.default.statSync(switchboardDir).isDirectory) {
            throw new Error(`Failed to find switchboard directory: ${switchboardDir}`);
        }
        const networkDir = path_1.default.join(switchboardDir, 'networks');
        if (!fs_1.default.existsSync(networkDir) || !fs_1.default.statSync(networkDir).isDirectory) {
            throw new Error(`Failed to find switchboard network directory: ${networkDir}`);
        }
        const networkFile = path_1.default.join(networkDir, `${networkName}.json`);
        if (!fs_1.default.existsSync(networkFile) || !fs_1.default.statSync(networkFile).isFile) {
            throw new Error(`Failed to find switchboard network ${networkName}: ${networkFile}`);
        }
        const obj = JSON.parse(fs_1.default.readFileSync(networkFile, 'utf-8'));
        return SwitchboardNetwork.from(program, obj);
    }
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
    static async createInstructions(program, payer, params) {
        const txns = [];
        // const userTokenAddress = this.mint.getAssociatedAddress(payer);
        // calculate the total amount of funds we'll need to wrap
        let neededWrappedFunds = 0;
        (params.oracles ?? []).forEach(o => {
            if (o.stakeAmount) {
                neededWrappedFunds = neededWrappedFunds + o.stakeAmount;
            }
        });
        (params.aggregators ?? []).forEach(a => {
            if (a.fundAmount) {
                neededWrappedFunds = neededWrappedFunds + a.fundAmount;
            }
        });
        const [userTokenAddress, wrapFundsTxn] = await program.mint.getOrCreateWrappedUserInstructions(payer, {
            fundUpTo: neededWrappedFunds,
        });
        const queueAuthorityPubkey = params.authority
            ? params.authority.publicKey
            : payer;
        // get or create the program state
        const [programState, stateBump, programInit] = await accounts_1.ProgramStateAccount.getOrCreateInstructions(program, payer);
        if (programInit) {
            txns.push(programInit);
        }
        // create a new queue
        const [queueAccount, queueInit] = await accounts_1.QueueAccount.createInstructions(program, payer, { ...params, authority: queueAuthorityPubkey });
        txns.push(queueInit);
        // create the cranks
        const cranks = await Promise.all((params.cranks ?? []).map(async (crankInitParams) => {
            const [crankAccount, crankInit] = await queueAccount.createCrankInstructions(payer, crankInitParams);
            return [
                crankInit,
                {
                    account: crankAccount,
                    dataBuffer: crankAccount.dataBuffer.publicKey,
                },
            ];
        }));
        txns.push(...cranks.map(crank => crank[0]));
        // create the oracles
        const oracles = await Promise.all((params.oracles ?? []).map(async (oracleInitParams) => {
            const [oracleAccount, oracleInit] = await queueAccount.createOracleInstructions(payer, {
                ...oracleInitParams,
                queueAuthority: params.authority,
                queueAuthorityPubkey: queueAuthorityPubkey,
                funderTokenWallet: userTokenAddress,
                disableWrap: true,
                enable: true,
            });
            const [oraclePermissionAccount, oraclePermissionBump] = accounts_1.PermissionAccount.fromSeed(program, queueAuthorityPubkey, queueAccount.publicKey, oracleAccount.publicKey);
            return [
                oracleInit,
                {
                    account: oracleAccount,
                    permission: {
                        account: oraclePermissionAccount,
                        bump: oraclePermissionBump,
                    },
                },
            ];
        }));
        txns.push(...oracles.map(oracle => oracle[0]).flat());
        // create the feeds
        const aggregators = await Promise.all((params.aggregators ?? []).map(async (feedInitParams) => {
            const crank = feedInitParams.crankPubkey
                ? new accounts_1.CrankAccount(program, feedInitParams.crankPubkey)
                : feedInitParams.crankIndex !== undefined &&
                    feedInitParams.crankIndex >= 0 &&
                    cranks.length > feedInitParams.crankIndex
                    ? cranks[feedInitParams.crankIndex][1].account
                    : undefined;
            const crankPubkey = crank?.publicKey ?? undefined;
            const crankDataBuffer = feedInitParams.crankDataBuffer ??
                crank?.dataBuffer?.publicKey ??
                (await crank?.loadData())?.dataBuffer;
            const [aggregatorAccount, aggregatorInit] = await queueAccount.createFeedInstructions(payer, {
                ...feedInitParams,
                queueAuthority: params.authority,
                queueAuthorityPubkey,
                funderTokenWallet: userTokenAddress,
                disableWrap: true,
                crankPubkey: crankPubkey,
                crankDataBuffer: crankDataBuffer,
            });
            const [aggregatorPermissionAccount, aggregatorPermissionBump] = accounts_1.PermissionAccount.fromSeed(program, queueAuthorityPubkey, queueAccount.publicKey, aggregatorAccount.publicKey);
            const [aggregatorLeaseAccount, aggregatorLeaseBump] = accounts_1.LeaseAccount.fromSeed(program, queueAccount.publicKey, aggregatorAccount.publicKey);
            return [
                aggregatorInit,
                {
                    account: aggregatorAccount,
                    permission: {
                        account: aggregatorPermissionAccount,
                        bump: aggregatorPermissionBump,
                    },
                    lease: {
                        account: aggregatorLeaseAccount,
                        bump: aggregatorLeaseBump,
                    },
                },
            ];
        }));
        txns.push(...aggregators.map(aggregator => aggregator[0]).flat());
        // create the vrfs
        const vrfs = await Promise.all((params.vrfs ?? []).map(async (vrfInitParams) => {
            const [vrfAccount, vrfInit] = await queueAccount.createVrfInstructions(payer, {
                ...vrfInitParams,
                queueAuthority: params.authority,
                queueAuthorityPubkey,
            });
            const [vrfPermissionAccount, vrfPermissionBump] = accounts_1.PermissionAccount.fromSeed(program, queueAuthorityPubkey, queueAccount.publicKey, vrfAccount.publicKey);
            return [
                vrfInit,
                {
                    account: vrfAccount,
                    permission: {
                        account: vrfPermissionAccount,
                        bump: vrfPermissionBump,
                    },
                },
            ];
        }));
        txns.push(...vrfs.map(vrf => vrf[0]));
        // create the buffer relayers
        const bufferRelayers = await Promise.all((params.bufferRelayers ?? []).map(async (bufferRelayerInitParams) => {
            const [bufferRelayerAccount, bufferRelayerInit] = await queueAccount.createBufferRelayerInstructions(payer, {
                ...bufferRelayerInitParams,
                queueAuthority: params.authority,
                queueAuthorityPubkey,
            });
            const [bufferRelayerPermissionAccount, bufferRelayerPermissionBump] = accounts_1.PermissionAccount.fromSeed(program, queueAuthorityPubkey, queueAccount.publicKey, bufferRelayerAccount.publicKey);
            return [
                bufferRelayerInit,
                {
                    account: bufferRelayerAccount,
                    permission: {
                        account: bufferRelayerPermissionAccount,
                        bump: bufferRelayerPermissionBump,
                    },
                },
            ];
        }));
        txns.push(...bufferRelayers.map(bufferRelayer => bufferRelayer[0]));
        const accounts = {
            programState: {
                account: programState,
                bump: stateBump,
            },
            queue: {
                account: queueAccount,
            },
            cranks: cranks.map(c => c[1]),
            oracles: oracles.map(o => o[1]),
            aggregators: aggregators.map(a => a[1]),
            vrfs: vrfs.map(v => v[1]),
            bufferRelayers: bufferRelayers.map(b => b[1]),
        };
        return [
            TransactionObject_1.TransactionObject.pack(wrapFundsTxn ? [wrapFundsTxn, ...txns] : txns),
            new SwitchboardNetwork(accounts),
        ];
    }
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
    static async create(program, params, opts) {
        const [networkInit, accounts] = await SwitchboardNetwork.createInstructions(program, program.walletPubkey, params);
        const txnSignatures = await program.signAndSendAll(networkInit, {
            skipPreflight: true,
            ...opts,
        });
        return [accounts, txnSignatures];
    }
    /**
     * Load the account states for a {@linkcode SwitchboardNetwork}.
     *
     * @returns LoadedSwitchboardNetwork
     */
    async load() {
        const program = this.queue.account.program;
        // load the accounts
        const publicKeys = [
            this.programState.account.publicKey,
            this.queue.account.publicKey,
            // cranks
            ...this.cranks.map(c => c.account.publicKey),
            // oracles
            ...this.oracles
                .map(o => [o.account.publicKey, o.permission.account.publicKey])
                .flat(),
            // aggregators
            ...this.aggregators
                .map(a => [
                a.account.publicKey,
                a.permission.account.publicKey,
                a.lease.account.publicKey,
            ])
                .flat(),
            // vrfs
            ...this.vrfs
                .map(v => [v.account.publicKey, v.permission.account.publicKey])
                .flat(),
            // buffer relayers
            ...this.bufferRelayers
                .map(b => [b.account.publicKey, b.permission.account.publicKey])
                .flat(),
        ];
        const accountInfos = await anchor.utils.rpc
            .getMultipleAccounts(program.connection, publicKeys)
            .then((values) => {
            return values.reduce((map, account) => {
                if (account && account.account.data) {
                    map.set(account.publicKey.toBase58(), account.account);
                }
                return map;
            }, new Map());
        });
        // build tree
        const programState = {
            ...this.programState,
            state: generated_1.SbState.decode(accountInfos.get(this.programState.account.publicKey.toBase58())
                ?.data ?? Buffer.from('')),
        };
        const queue = {
            ...this.queue,
            state: generated_1.OracleQueueAccountData.decode(accountInfos.get(this.queue.account.publicKey.toBase58())?.data ??
                Buffer.from('')),
        };
        const cranks = this.cranks.map(crank => {
            return {
                ...crank,
                state: generated_1.CrankAccountData.decode(accountInfos.get(crank.account.publicKey.toBase58())?.data ??
                    Buffer.from('')),
            };
        });
        const oracles = this.oracles.map(oracle => {
            return {
                ...oracle,
                state: generated_1.OracleAccountData.decode(accountInfos.get(oracle.account.publicKey.toBase58())?.data ??
                    Buffer.from('')),
                permission: {
                    ...oracle.permission,
                    state: generated_1.PermissionAccountData.decode(accountInfos.get(oracle.permission.account.publicKey.toBase58())
                        ?.data ?? Buffer.from('')),
                },
            };
        });
        const aggregators = this.aggregators.map(aggregator => {
            return {
                ...aggregator,
                state: generated_1.AggregatorAccountData.decode(accountInfos.get(aggregator.account.publicKey.toBase58())?.data ??
                    Buffer.from('')),
                permission: {
                    ...aggregator.permission,
                    state: generated_1.PermissionAccountData.decode(accountInfos.get(aggregator.permission.account.publicKey.toBase58())?.data ?? Buffer.from('')),
                },
                lease: {
                    ...aggregator.lease,
                    state: generated_1.LeaseAccountData.decode(accountInfos.get(aggregator.lease.account.publicKey.toBase58())
                        ?.data ?? Buffer.from('')),
                },
            };
        });
        const vrfs = this.vrfs.map(vrf => {
            return {
                ...vrf,
                state: generated_1.VrfAccountData.decode(accountInfos.get(vrf.account.publicKey.toBase58())?.data ??
                    Buffer.from('')),
                permission: {
                    ...vrf.permission,
                    state: generated_1.PermissionAccountData.decode(accountInfos.get(vrf.permission.account.publicKey.toBase58())
                        ?.data ?? Buffer.from('')),
                },
            };
        });
        const bufferRelayers = this.bufferRelayers.map(bufferRelayer => {
            return {
                ...bufferRelayer,
                state: generated_1.BufferRelayerAccountData.decode(accountInfos.get(bufferRelayer.account.publicKey.toBase58())
                    ?.data ?? Buffer.from('')),
                permission: {
                    ...bufferRelayer.permission,
                    state: generated_1.PermissionAccountData.decode(accountInfos.get(bufferRelayer.permission.account.publicKey.toBase58())?.data ?? Buffer.from('')),
                },
            };
        });
        const jobPublicKeys = [];
        aggregators.forEach(aggregator => {
            const jobs = aggregator.state.jobPubkeysData.slice(0, aggregator.state.jobPubkeysSize);
            jobPublicKeys.push(...jobs);
        });
        bufferRelayers.forEach(bufferRelayer => {
            jobPublicKeys.push(bufferRelayer.state.jobPubkey);
        });
        const jobs = (await anchor.utils.rpc
            .getMultipleAccounts(program.connection, jobPublicKeys)
            .then((values) => {
            return values.map(account => {
                if (account === null) {
                    return undefined;
                }
                const jobAccount = new accounts_1.JobAccount(program, account.publicKey);
                const state = generated_1.JobAccountData.decode(account.account.data);
                let job;
                try {
                    job = common_1.OracleJob.decodeDelimited(state.data);
                }
                catch {
                    job = common_1.OracleJob.fromObject({ tasks: [] });
                }
                const loadedJob = {
                    account: jobAccount,
                    state: state,
                    job,
                };
                return loadedJob;
            });
        })).filter(Boolean);
        return new LoadedSwitchboardNetwork({
            programState,
            queue,
            cranks,
            oracles,
            aggregators,
            vrfs,
            bufferRelayers,
            jobs,
        });
    }
    /**
     * Load a SwitchboardNetwork from an outputted JSON file
     *
     * @param program
     * @param obj
     * @returns
     */
    static from(program, obj) {
        const programState = {
            account: new accounts_1.ProgramStateAccount(program, program.programState.publicKey),
            bump: program.programState.bump,
        };
        if (!('queue' in obj) || typeof obj.queue !== 'object') {
            throw new Error(`SwitchboardNetwork requires a queue object`);
        }
        let queueAccount;
        if ('publicKey' in obj.queue) {
            queueAccount = new accounts_1.QueueAccount(program, obj.queue.publicKey);
        }
        else if ('keypair' in obj.queue &&
            typeof obj.queue.keypair === 'string' &&
            (0, exports.isKeypairString)(obj.queue.keypair)) {
            const queueKeypair = web3_js_1.Keypair.fromSecretKey(new Uint8Array(JSON.parse(obj.queue.keypair)));
            queueAccount = new accounts_1.QueueAccount(program, queueKeypair.publicKey);
        }
        else {
            throw new Error(`Failed to load queue`);
        }
        const queue = {
            account: queueAccount,
        };
        let queueAuthority;
        if ('authority' in obj.queue && typeof obj.queue.authority === 'string') {
            queueAuthority = new web3_js_1.PublicKey(obj.queue.authority);
        }
        else if ('queueAuthorityKeypair' in obj.queue &&
            typeof obj.queue.queueAuthorityKeypair === 'string' &&
            (0, exports.isKeypairString)(obj.queue.queueAuthorityKeypair)) {
            const queueAuthorityKeypair = web3_js_1.Keypair.fromSecretKey(new Uint8Array(JSON.parse(obj.queue.queueAuthorityKeypair)));
            queueAuthority = queueAuthorityKeypair.publicKey;
        }
        else {
            throw new Error(`Failed to load queue authority`);
        }
        const cranks = [];
        if ('cranks' in obj && Array.isArray(obj.cranks)) {
            for (const crank of obj.cranks ?? []) {
                if ('publicKey' in crank) {
                    const account = new accounts_1.CrankAccount(program, crank.publicKey);
                    cranks.push({
                        account,
                    });
                }
                else if ('keypair' in crank &&
                    typeof crank.keypair === 'string' &&
                    (0, exports.isKeypairString)(crank.keypair)) {
                    const keypair = web3_js_1.Keypair.fromSecretKey(new Uint8Array(JSON.parse(crank.keypair)));
                    const account = new accounts_1.CrankAccount(program, keypair.publicKey);
                    cranks.push({
                        account,
                    });
                }
            }
        }
        const oracles = [];
        if ('oracles' in obj && Array.isArray(obj.oracles)) {
            for (const oracle of obj.oracles ?? []) {
                let account = undefined;
                if ('publicKey' in oracle) {
                    account = new accounts_1.OracleAccount(program, oracle.publicKey);
                }
                else if ('stakingWalletKeypair' in oracle &&
                    typeof oracle.stakingWalletKeypair === 'string' &&
                    (0, exports.isKeypairString)(oracle.stakingWalletKeypair)) {
                    const keypair = web3_js_1.Keypair.fromSecretKey(new Uint8Array(JSON.parse(oracle.stakingWalletKeypair)));
                    [account] = accounts_1.OracleAccount.fromSeed(program, queueAccount.publicKey, keypair.publicKey);
                }
                if (account) {
                    const [permissionAccount, permissionBump] = accounts_1.PermissionAccount.fromSeed(program, queueAuthority, queueAccount.publicKey, account.publicKey);
                    oracles.push({
                        account,
                        permission: {
                            account: permissionAccount,
                            bump: permissionBump,
                        },
                    });
                }
            }
        }
        const aggregators = [];
        if ('aggregators' in obj && Array.isArray(obj.aggregators)) {
            for (const aggregator of obj.aggregators ?? []) {
                let account = undefined;
                if ('publicKey' in aggregator) {
                    account = new accounts_1.AggregatorAccount(program, aggregator.publicKey);
                }
                else if ('keypair' in aggregator &&
                    typeof aggregator.keypair === 'string' &&
                    (0, exports.isKeypairString)(aggregator.keypair)) {
                    const keypair = web3_js_1.Keypair.fromSecretKey(new Uint8Array(JSON.parse(aggregator.keypair)));
                    account = new accounts_1.AggregatorAccount(program, keypair.publicKey);
                }
                if (account) {
                    const [permissionAccount, permissionBump] = accounts_1.PermissionAccount.fromSeed(program, queueAuthority, queueAccount.publicKey, account.publicKey);
                    const [leaseAccount, leaseBump] = accounts_1.LeaseAccount.fromSeed(program, queueAccount.publicKey, account.publicKey);
                    aggregators.push({
                        account,
                        permission: {
                            account: permissionAccount,
                            bump: permissionBump,
                        },
                        lease: {
                            account: leaseAccount,
                            bump: leaseBump,
                        },
                    });
                }
            }
        }
        const vrfs = [];
        if ('vrfs' in obj && Array.isArray(obj.vrfs)) {
            for (const vrf of obj.vrfs ?? []) {
                let account = undefined;
                if ('publicKey' in vrf) {
                    account = new accounts_1.VrfAccount(program, vrf.publicKey);
                }
                else if ('keypair' in vrf &&
                    typeof vrf.keypair === 'string' &&
                    (0, exports.isKeypairString)(vrf.keypair)) {
                    const keypair = web3_js_1.Keypair.fromSecretKey(new Uint8Array(JSON.parse(vrf.keypair)));
                    account = new accounts_1.VrfAccount(program, keypair.publicKey);
                }
                if (account) {
                    const [permissionAccount, permissionBump] = accounts_1.PermissionAccount.fromSeed(program, queueAuthority, queueAccount.publicKey, account.publicKey);
                    vrfs.push({
                        account,
                        permission: {
                            account: permissionAccount,
                            bump: permissionBump,
                        },
                    });
                }
            }
        }
        const bufferRelayers = [];
        if ('bufferRelayers' in obj && Array.isArray(obj.bufferRelayers)) {
            for (const bufferRelayer of obj.bufferRelayers ?? []) {
                let account = undefined;
                if ('publicKey' in bufferRelayer) {
                    account = new accounts_1.BufferRelayerAccount(program, bufferRelayer.publicKey);
                }
                else if ('keypair' in bufferRelayer &&
                    typeof bufferRelayer.keypair === 'string' &&
                    (0, exports.isKeypairString)(bufferRelayer.keypair)) {
                    const keypair = web3_js_1.Keypair.fromSecretKey(new Uint8Array(JSON.parse(bufferRelayer.keypair)));
                    account = new accounts_1.BufferRelayerAccount(program, keypair.publicKey);
                }
                if (account) {
                    const [permissionAccount, permissionBump] = accounts_1.PermissionAccount.fromSeed(program, queueAuthority, queueAccount.publicKey, account.publicKey);
                    bufferRelayers.push({
                        account,
                        permission: {
                            account: permissionAccount,
                            bump: permissionBump,
                        },
                    });
                }
            }
        }
        return new SwitchboardNetwork({
            programState,
            queue,
            oracles,
            cranks,
            aggregators,
            vrfs,
            bufferRelayers,
        });
    }
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
    static async fromQueue(queueAccount) {
        const program = queueAccount.program;
        const accounts = await program.getProgramAccounts();
        const programStateAccounts = Array.from(accounts.programState);
        if (programStateAccounts.length < 1) {
            throw new Error(`Failed to find programState account`);
        }
        const [programStateAccount, programStateBump] = accounts_1.ProgramStateAccount.fromSeed(program);
        const programStateAccountDefinition = {
            account: programStateAccount,
            bump: programStateBump,
            state: programStateAccounts[0][1],
        };
        const queue = accounts.queues.get(queueAccount.publicKey.toBase58());
        if (!queue) {
            throw new Error(`Failed to find queue in program accounts`);
        }
        const queueDefinition = {
            account: queueAccount,
            state: queue,
        };
        const jobPublicKeys = [];
        // filter cranks
        const cranks = Array.from(accounts.cranks)
            .filter(([crankKey, crank]) => crank.queuePubkey.equals(queueAccount.publicKey))
            .map(([crankKey, crank]) => {
            return {
                account: new accounts_1.CrankAccount(program, crankKey),
                state: crank,
                dataBuffer: crank.dataBuffer,
            };
        });
        // filter oracles
        const oracles = Array.from(accounts.oracles)
            .filter(([oracleKey, oracle]) => oracle.queuePubkey.equals(queueAccount.publicKey))
            .map(([oracleKey, oracle]) => {
            const oracleAccount = new accounts_1.OracleAccount(program, oracleKey);
            const [permissionAccount, permissionBump] = accounts_1.PermissionAccount.fromSeed(program, queue.authority, queueAccount.publicKey, oracleAccount.publicKey);
            const permission = accounts.permissions.get(permissionAccount.publicKey.toBase58());
            if (!permission) {
                return undefined;
            }
            return {
                account: oracleAccount,
                state: oracle,
                permission: {
                    account: permissionAccount,
                    bump: permissionBump,
                    state: permission,
                },
            };
        })
            .filter(Boolean);
        const aggregators = Array.from(accounts.aggregators)
            .filter(([aggregatorKey, aggregator]) => aggregator.queuePubkey.equals(queueAccount.publicKey))
            .map(([aggregatorKey, aggregator]) => {
            const aggregatorAccount = new accounts_1.AggregatorAccount(program, aggregatorKey);
            const [permissionAccount, permissionBump] = accounts_1.PermissionAccount.fromSeed(program, queue.authority, queueAccount.publicKey, aggregatorAccount.publicKey);
            const permission = accounts.permissions.get(permissionAccount.publicKey.toBase58());
            if (!permission) {
                return undefined;
            }
            const [leaseAccount, leaseBump] = accounts_1.LeaseAccount.fromSeed(program, queueAccount.publicKey, aggregatorAccount.publicKey);
            const lease = accounts.leases.get(leaseAccount.publicKey.toBase58());
            if (!lease) {
                return undefined;
            }
            // push jobs to filter job definitions
            jobPublicKeys.push(...aggregator.jobPubkeysData.slice(0, aggregator.jobPubkeysSize));
            return {
                account: aggregatorAccount,
                state: aggregator,
                permission: {
                    account: permissionAccount,
                    bump: permissionBump,
                    state: permission,
                },
                lease: {
                    account: leaseAccount,
                    bump: leaseBump,
                    state: lease,
                },
            };
        })
            .filter(Boolean);
        // filter vrfs
        const vrfs = Array.from(accounts.vrfs)
            .filter(([vrfKey, vrf]) => vrf.oracleQueue.equals(queueAccount.publicKey))
            .map(([vrfKey, vrf]) => {
            const vrfAccount = new accounts_1.VrfAccount(program, vrfKey);
            const [permissionAccount, permissionBump] = accounts_1.PermissionAccount.fromSeed(program, queue.authority, queueAccount.publicKey, vrfAccount.publicKey);
            const permission = accounts.permissions.get(permissionAccount.publicKey.toBase58());
            if (!permission) {
                return undefined;
            }
            return {
                account: vrfAccount,
                state: vrf,
                permission: {
                    account: permissionAccount,
                    bump: permissionBump,
                    state: permission,
                },
            };
        })
            .filter(Boolean);
        // filter buffer relayers
        const bufferRelayers = Array.from(accounts.bufferRelayers)
            .filter(([bufferRelayerKey, bufferRelayer]) => bufferRelayer.queuePubkey.equals(queueAccount.publicKey))
            .map(([bufferRelayerKey, bufferRelayer]) => {
            const bufferRelayerAccount = new accounts_1.BufferRelayerAccount(program, bufferRelayerKey);
            const [permissionAccount, permissionBump] = accounts_1.PermissionAccount.fromSeed(program, queue.authority, queueAccount.publicKey, bufferRelayerAccount.publicKey);
            const permission = accounts.permissions.get(permissionAccount.publicKey.toBase58());
            if (!permission) {
                return undefined;
            }
            jobPublicKeys.push(bufferRelayer.jobPubkey);
            return {
                account: bufferRelayerAccount,
                state: bufferRelayer,
                permission: {
                    account: permissionAccount,
                    bump: permissionBump,
                    state: permission,
                },
            };
        })
            .filter(Boolean);
        const jobs = Array.from(accounts.jobs)
            .filter(([jobKey]) => jobPublicKeys.findIndex(j => j.equals(new web3_js_1.PublicKey(jobKey))) !== -1)
            .map(([jobKey, job]) => {
            const jobAccount = new accounts_1.JobAccount(program, jobKey);
            let oracleJob;
            try {
                oracleJob = common_1.OracleJob.decodeDelimited(job.data);
            }
            catch {
                oracleJob = common_1.OracleJob.fromObject({ tasks: [] });
            }
            return {
                account: jobAccount,
                state: job,
                job: oracleJob,
            };
        })
            .filter(Boolean);
        return new LoadedSwitchboardNetwork({
            programState: programStateAccountDefinition,
            queue: queueDefinition,
            cranks,
            oracles,
            aggregators,
            vrfs,
            bufferRelayers,
            jobs,
        });
    }
}
exports.SwitchboardNetwork = SwitchboardNetwork;
class LoadedSwitchboardNetwork {
    get program() {
        return this.queue.account.program;
    }
    constructor(fields) {
        this.programState = fields.programState;
        this.queue = fields.queue;
        this.cranks = fields.cranks;
        this.oracles = fields.oracles;
        this.aggregators = fields.aggregators;
        this.vrfs = fields.vrfs;
        this.bufferRelayers = fields.bufferRelayers;
        this.jobs = fields.jobs;
    }
    getJob(jobPubkey) {
        return this.jobs.find(job => job.account.publicKey.equals(jobPubkey));
    }
    getJobs(jobPubkeys) {
        return jobPubkeys
            .map(jobPubkey => this.getJob(jobPubkey))
            .filter(Boolean);
    }
    toJSON() {
        return {
            programState: {
                publicKey: this.programState.account.publicKey.toBase58(),
                authority: this.programState.state.authority.toBase58(),
                state: this.programState.state.toJSON(),
            },
            queue: {
                publicKey: this.queue.account.publicKey.toBase58(),
                authority: this.queue.state.authority.toBase58(),
                state: this.queue.state.toJSON(),
            },
            cranks: this.cranks.map(crank => {
                return {
                    publicKey: crank.account.publicKey.toBase58(),
                    state: crank.state.toJSON(),
                };
            }),
            oracles: this.oracles.map(oracle => {
                return {
                    publicKey: oracle.account.publicKey.toBase58(),
                    authority: oracle.state.oracleAuthority.toBase58(),
                    state: oracle.state.toJSON(),
                    permission: {
                        publicKey: oracle.permission.account.publicKey.toBase58(),
                        bump: oracle.permission.bump,
                        state: oracle.permission.state.toJSON(),
                    },
                };
            }),
            aggregators: this.aggregators.map(aggregator => {
                return {
                    publicKey: aggregator.account.publicKey.toBase58(),
                    authority: aggregator.state.authority.toBase58(),
                    state: {
                        ...aggregator.state.toJSON(),
                        reserved1: undefined,
                        previousConfirmedRoundResult: aggregator.state.previousConfirmedRoundResult.toBig(),
                        jobPubkeysData: aggregator.state.jobPubkeysData.slice(0, aggregator.state.jobPubkeysSize),
                        jobHashes: aggregator.state.jobHashes.slice(0, aggregator.state.jobPubkeysSize),
                        currentRound: undefined,
                        latestConfirmedRound: undefined,
                        ebuf: undefined,
                    },
                    permission: {
                        publicKey: aggregator.permission.account.publicKey.toBase58(),
                        bump: aggregator.permission.bump,
                        state: aggregator.permission.state.toJSON(),
                    },
                    lease: {
                        publicKey: aggregator.lease.account.publicKey.toBase58(),
                        bump: aggregator.lease.bump,
                        state: aggregator.lease.state.toJSON(),
                    },
                    jobs: this.getJobs(aggregator.state.jobPubkeysData.slice(0, aggregator.state.jobPubkeysSize)).map(job => {
                        return {
                            publicKey: job.account.publicKey.toBase58(),
                            authority: job.state.authority.toBase58(),
                            state: job.state,
                            data: job.job.toJSON(),
                        };
                    }),
                };
            }),
            vrfs: this.vrfs.map(vrf => {
                return {
                    publicKey: vrf.account.publicKey.toBase58(),
                    authority: vrf.state.authority.toBase58(),
                    state: {
                        ...vrf.state.toJSON(),
                        callback: {
                            ...vrf.state.callback.toJSON(),
                            accounts: vrf.state.callback.accounts
                                .slice(0, vrf.state.callback.accountsLen)
                                .map(a => a.toJSON()),
                            ixData: `[${new Uint8Array(vrf.state.callback.ixData.slice(0, vrf.state.callback.ixDataLen))}]`,
                        },
                        ebuf: undefined,
                        builders: undefined,
                    },
                    permission: {
                        publicKey: vrf.permission.account.publicKey.toBase58(),
                        bump: vrf.permission.bump,
                        state: vrf.permission.state.toJSON(),
                    },
                };
            }),
            bufferRelayers: this.bufferRelayers.map(bufferRelayer => {
                const job = this.getJob(bufferRelayer.state.jobPubkey);
                return {
                    publicKey: bufferRelayer.account.publicKey.toBase58(),
                    authority: bufferRelayer.state.authority.toBase58(),
                    state: {
                        ...bufferRelayer.state.toJSON(),
                        currentRound: undefined,
                        latestConfirmedRound: undefined,
                    },
                    permission: {
                        publicKey: bufferRelayer.permission.account.publicKey.toBase58(),
                        bump: bufferRelayer.permission.bump,
                        state: bufferRelayer.permission.state.toJSON(),
                    },
                    job: {
                        publicKey: job?.account.publicKey.toBase58(),
                        authority: job?.state.authority.toBase58(),
                        state: job?.state,
                        data: job?.job.toJSON(),
                    },
                };
            }),
        };
    }
}
exports.LoadedSwitchboardNetwork = LoadedSwitchboardNetwork;
//# sourceMappingURL=SwitchboardNetwork.js.map