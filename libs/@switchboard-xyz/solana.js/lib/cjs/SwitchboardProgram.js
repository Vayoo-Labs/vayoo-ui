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
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.AnchorWallet = exports.isVersionedTransaction = exports.SwitchboardProgram = exports.getSwitchboardProgramId = exports.READ_ONLY_KEYPAIR = exports.SBV2_MAINNET_PID = exports.SBV2_DEVNET_PID = exports.DEFAULT_SEND_TRANSACTION_OPTIONS = void 0;
const accounts_1 = require("./accounts");
const const_1 = require("./const");
const errors = __importStar(require("./errors"));
const generated_1 = require("./generated");
const mint_1 = require("./mint");
const TransactionObject_1 = require("./TransactionObject");
const anchor = __importStar(require("@coral-xyz/anchor"));
const anchor_1 = require("@coral-xyz/anchor");
const web3_js_1 = require("@solana/web3.js");
const common_1 = require("@switchboard-xyz/common");
exports.DEFAULT_SEND_TRANSACTION_OPTIONS = {
    skipPreflight: false,
    maxRetries: 10,
    skipConfrimation: false,
};
/**
 * Switchboard Devnet Program ID
 */
exports.SBV2_DEVNET_PID = new web3_js_1.PublicKey('SW1TCH7qEPTdLsDHRgPuMQjbQxKdH2aBStViMFnt64f');
/**
 * Switchboard Mainnet Program ID
 */
exports.SBV2_MAINNET_PID = new web3_js_1.PublicKey('SW1TCH7qEPTdLsDHRgPuMQjbQxKdH2aBStViMFnt64f');
/**
 *  A generated keypair that is assigned as the _payerKeypair_ when in read-only mode.
 */
exports.READ_ONLY_KEYPAIR = web3_js_1.Keypair.generate();
/**
 * Returns the Switchboard Program ID for the specified Cluster.
 */
const getSwitchboardProgramId = (cluster) => {
    switch (cluster) {
        case 'localnet':
        case 'devnet':
        case 'mainnet-beta':
            return exports.SBV2_MAINNET_PID;
        case 'testnet':
        default:
            throw new Error(`Switchboard PID not found for cluster (${cluster})`);
    }
};
exports.getSwitchboardProgramId = getSwitchboardProgramId;
/**
 * Wrapper class for the Switchboard anchor Program.
 *
 * This class provides an interface to interact with the Switchboard program on the Solana network.
 * It allows you to load the program, create and initialize connection objects, and interact with
 * Switchboard accounts.
 *
 * Basic usage example:
 *
 * ```ts
 * import { Connection } from "@solana/web3.js";
 * import { SwitchboardProgram, TransactionObject } from '@switchboard-xyz/solana.js';
 *
 * const program = await SwitchboardProgram.load(
 *    "mainnet-beta",
 *    new Connection("https://api.mainnet-beta.solana.com"),
 *    payerKeypair
 * );
 *
 * const txn = new TransactionObject(program.walletPubkey, [], []);
 * const txnSignature = await program.signAndSend(txn);
 * ```
 */
class SwitchboardProgram {
    /**
     * Constructor for the SwitchboardProgram class.
     *
     * @param program - The anchor program instance.
     * @param cluster - The Solana cluster to load the Switchboard program for.
     * @param mint - The native mint for the Switchboard program.
     */
    constructor(program, cluster, mint) {
        this._program = program;
        this.cluster = cluster;
        // Derive the state account from the seed.
        const stateAccount = accounts_1.ProgramStateAccount.fromSeed(this);
        this.programState = {
            publicKey: stateAccount[0].publicKey,
            bump: stateAccount[1],
        };
        this.mint = mint;
    }
    /**
     * Load the anchor program for the Switchboard.
     *
     * This method fetches the IDL for the Switchboard program, and initializes an anchor program
     * instance using the fetched IDL, provided program ID, and provider.
     *
     * @param cluster - The Solana cluster to load the Switchboard program for.
     * @param connection - The Solana connection object used to connect to an RPC node.
     * @param payerKeypair - Optional payer keypair used to pay for on-chain transactions.
     * @param programId - Optional program ID to override the cluster's default programId.
     *
     * @returns The initialized anchor program instance for the Switchboard.
     */
    static async loadAnchorProgram(cluster, connection, payerKeypair = exports.READ_ONLY_KEYPAIR, programId) {
        const pid = programId ?? (0, exports.getSwitchboardProgramId)(cluster);
        const provider = new anchor.AnchorProvider(connection, 
        // If no keypair is provided, default to dummy keypair
        new AnchorWallet(payerKeypair ?? SwitchboardProgram._readOnlyKeypair), { commitment: 'confirmed' });
        const anchorIdl = await anchor.Program.fetchIdl(pid, provider);
        if (!anchorIdl) {
            throw new Error(`Failed to find IDL for ${pid.toBase58()}`);
        }
        const program = new anchor.Program(anchorIdl, pid, provider);
        return program;
    }
    /**
     * Retrieves the Switchboard Program ID for the currently connected cluster.
     * @return The PublicKey of the Switchboard Program ID.
     */
    get programId() {
        return this._program.programId;
    }
    /**
     * Retrieves the Switchboard Program IDL.
     * @return The IDL of the Switchboard Program.
     */
    get idl() {
        return this._program.idl;
    }
    /**
     * Retrieves the Switchboard Borsh Accounts Coder.
     * @return The BorshAccountsCoder for the Switchboard Program.
     */
    get coder() {
        return new anchor.BorshAccountsCoder(this._program.idl);
    }
    /**
     * Retrieves the anchor Provider used by this program to connect with the Solana cluster.
     * @return The AnchorProvider instance for the Switchboard Program.
     */
    get provider() {
        return this._program.provider;
    }
    /**
     * Retrieves the Connection used by this program to connect with the Solana cluster.
     * @return The Connection instance for the Switchboard Program.
     */
    get connection() {
        return this._program.provider.connection;
    }
    /**
     * Retrieves the Wallet used by this program.
     * @return The AnchorWallet instance for the Switchboard Program.
     */
    get wallet() {
        return this.provider.wallet;
    }
    /**
     * Retrieves the wallet's PublicKey.
     * @return The PublicKey of the wallet.
     */
    get walletPubkey() {
        return this.wallet.payer.publicKey;
    }
    /**
     * Checks if the program is read-only.
     * @return A boolean indicating if the SwitchboardProgram instance is read-only.
     */
    get isReadOnly() {
        return (this.provider.publicKey.toBase58() ===
            SwitchboardProgram._readOnlyKeypair.publicKey.toBase58());
    }
    /**
     * Verifies that a payer keypair has been supplied to the {@linkcode SwitchboardProgram}.
     * Throws an error if the program is read-only.
     */
    verifyPayer() {
        if (this.isReadOnly) {
            throw new errors.SwitchboardProgramReadOnlyError();
        }
    }
    /**
     * Verifies that a new keypair has been provided and the corresponding account does not already exist.
     *
     * **NOTE:** Creating new accounts without this check may prevent the ability to withdraw any existing funds.
     *
     * @param keypair - The Keypair to be verified.
     * @throws Will throw an error if the account for the keypair already exists.
     */
    async verifyNewKeypair(keypair) {
        const accountInfo = await this.connection.getAccountInfo(keypair.publicKey);
        if (accountInfo) {
            throw new errors.ExistingKeypair();
        }
    }
    /**
     * Retrieves the account namespace for the Switchboard Program.
     * @return The AccountNamespace instance for the Switchboard Program.
     */
    get account() {
        return this._program.account;
    }
    /**
     * Load the Switchboard Labs permissionless Queue for either devnet or mainnet. The permissionless queue has the following permissions:
     *  - unpermissionedFeedsEnabled: True
     *  - unpermissionedVrfEnabled: True
     *  - enableBufferRelayers: False
     *
     * **Note:** {@linkcode AggregatorAccount}s and {@linkcode VrfAccount}s do not require permissions to join this queue. {@linkcode BufferRelayerAccount}s are disabled.
     */
    async loadPermissionless() {
        const queueKey = this.cluster === 'mainnet-beta'
            ? const_1.SWITCHBOARD_LABS_MAINNET_PERMISSIONLESS_QUEUE
            : this.cluster === 'devnet'
                ? const_1.SWITCHBOARD_LABS_DEVNET_PERMISSIONLESS_QUEUE
                : null;
        if (!queueKey) {
            throw new Error(`Failed to load the permissionless queue for cluster ${this.cluster}`);
        }
        const [queueAccount, queue] = await accounts_1.QueueAccount.load(this, queueKey);
        const crankKey = this.cluster === 'mainnet-beta'
            ? const_1.SWITCHBOARD_LABS_MAINNET_PERMISSIONLESS_CRANK
            : this.cluster === 'devnet'
                ? const_1.SWITCHBOARD_LABS_DEVNET_PERMISSIONLESS_CRANK
                : null;
        if (!crankKey) {
            throw new Error(`Failed to load the permissionless queue for cluster ${this.cluster}`);
        }
        const [crankAccount, crank] = await accounts_1.CrankAccount.load(this, crankKey);
        return { queueAccount, queue, crankAccount, crank };
    }
    /**
     * Load the Switchboard Labs permissionled Queue for either devnet or mainnet. The permissioned queue has the following permissions:
     *  - unpermissionedFeedsEnabled: False
     *  - unpermissionedVrfEnabled: False
     *  - enableBufferRelayers: False
     *
     * **Note:** The queue authority must grant {@linkcode AggregatorAccount}s PERMIT_ORACLE_QUEUE_USAGE and {@linkcode VrfAccount}s PERMIT_VRF_REQUESTS permissions before joining the queue and requesting oracle updates. {@linkcode BufferRelayerAccount}s are disabled.
     */
    async loadPermissioned() {
        const queueKey = this.cluster === 'mainnet-beta'
            ? const_1.SWITCHBOARD_LABS_MAINNET_PERMISSIONED_QUEUE
            : this.cluster === 'devnet'
                ? const_1.SWITCHBOARD_LABS_DEVNET_PERMISSIONED_QUEUE
                : null;
        if (!queueKey) {
            throw new Error(`Failed to load the permissioned queue for cluster ${this.cluster}`);
        }
        const [queueAccount, queue] = await accounts_1.QueueAccount.load(this, this.cluster === 'mainnet-beta'
            ? const_1.SWITCHBOARD_LABS_MAINNET_PERMISSIONED_QUEUE
            : const_1.SWITCHBOARD_LABS_DEVNET_PERMISSIONED_QUEUE);
        const crankKey = this.cluster === 'mainnet-beta'
            ? const_1.SWITCHBOARD_LABS_MAINNET_PERMISSIONED_CRANK
            : this.cluster === 'devnet'
                ? const_1.SWITCHBOARD_LABS_DEVNET_PERMISSIONED_CRANK
                : null;
        if (!crankKey) {
            throw new Error(`Failed to load the permissionless queue for cluster ${this.cluster}`);
        }
        const [crankAccount, crank] = await accounts_1.CrankAccount.load(this, crankKey);
        return { queueAccount, queue, crankAccount, crank };
    }
    /**
     * Adds an event listener for the specified AnchorEvent, allowing consumers to monitor the chain for events
     * such as AggregatorOpenRound, VrfRequestRandomness, and AggregatorSaveResult.
     *
     * @param eventName - The name of the event to listen for.
     * @param callback - A callback function to handle the event data, slot, and signature.
     * @return A unique listener ID that can be used to remove the event listener.
     */
    addEventListener(eventName, callback) {
        return this._program.addEventListener(eventName, callback);
    }
    /**
     * Removes the event listener with the specified listener ID.
     *
     * @param listenerId - The unique ID of the event listener to be removed.
     */
    async removeEventListener(listenerId) {
        return await this._program.removeEventListener(listenerId);
    }
    async signAndSendAll(txns, opts = exports.DEFAULT_SEND_TRANSACTION_OPTIONS, txnOptions, delay = 0) {
        const txnSignatures = await TransactionObject_1.TransactionObject.signAndSendAll(this.provider, txns, opts, txnOptions, delay);
        return txnSignatures;
    }
    async signAndSend(txn, opts = exports.DEFAULT_SEND_TRANSACTION_OPTIONS, txnOptions) {
        const txnSignature = await txn.signAndSend(this.provider, opts, txnOptions);
        return txnSignature;
    }
    async getProgramJobAccounts() {
        const accountInfos = await this.connection
            .getProgramAccounts(this.programId, {
            filters: [
                {
                    memcmp: {
                        offset: 0,
                        bytes: anchor.utils.bytes.bs58.encode(generated_1.JobAccountData.discriminator),
                    },
                },
            ],
        })
            .then((values) => {
            return values.filter(Boolean);
        });
        const jobs = accountInfos
            .map((job) => {
            const jobAccount = new accounts_1.JobAccount(this, job.pubkey);
            const state = generated_1.JobAccountData.decode(job.account.data);
            let oracleJob;
            try {
                oracleJob = common_1.OracleJob.decodeDelimited(state.data);
            }
            catch {
                return undefined;
            }
            return {
                account: jobAccount,
                state: state,
                job: oracleJob,
            };
        })
            .filter(Boolean);
        return new Map(jobs.map(job => [job.state.data, job]));
    }
    async getProgramAccounts() {
        const accountInfos = await this.connection.getProgramAccounts(this.programId);
        // buffer - [42, 55, 46, 46, 45, 52, 78, 78]
        // bufferRelayer - [50, 35, 51, 115, 169, 219, 158, 52]
        // lease - [55, 254, 208, 251, 164, 44, 150, 50]
        // permissions - [77, 37, 177, 164, 38, 39, 34, 109]
        // slidingResult - [91, 4, 83, 187, 102, 216, 153, 254]
        // vrf - [101, 35, 62, 239, 103, 151, 6, 18]
        // crank - [111, 81, 146, 73, 172, 180, 134, 209]
        // job - [124, 69, 101, 195, 229, 218, 144, 63]
        // oracles - [128, 30, 16, 241, 170, 73, 55, 54]
        // sbState - [159, 42, 192, 191, 139, 62, 168, 28]
        // queue - [164, 207, 200, 51, 199, 113, 35, 109]
        // aggregator - [217, 230, 65, 101, 201, 162, 27, 125]
        const discriminatorMap = accountInfos.reduce((map, account) => {
            const discriminator = account.account.data
                .slice(0, anchor_1.ACCOUNT_DISCRIMINATOR_SIZE)
                .toString('utf-8');
            const accounts = map.get(discriminator) ?? [];
            accounts.push(account);
            map.set(discriminator, accounts);
            return map;
        }, new Map());
        function decodeAccounts(accounts, decode) {
            return accounts.reduce((map, account) => {
                try {
                    const decoded = decode(account.account.data);
                    map.set(account.pubkey.toBase58(), decoded);
                    // eslint-disable-next-line no-empty
                }
                catch { }
                return map;
            }, new Map());
        }
        const aggregators = decodeAccounts(discriminatorMap.get(generated_1.AggregatorAccountData.discriminator.toString('utf-8')) ?? [], generated_1.AggregatorAccountData.decode);
        // TODO: Use aggregator.historyBuffer, crank.dataBuffer, queue.dataBuffer to filter these down and decode
        const buffers = (discriminatorMap.get(accounts_1.BUFFER_DISCRIMINATOR.toString('utf-8')) ?? []).reduce((map, buffer) => {
            map.set(buffer.pubkey.toBase58(), buffer.account.data);
            return map;
        }, new Map());
        const bufferRelayers = decodeAccounts(discriminatorMap.get(generated_1.BufferRelayerAccountData.discriminator.toString('utf-8')) ?? [], generated_1.BufferRelayerAccountData.decode);
        const cranks = decodeAccounts(discriminatorMap.get(generated_1.CrankAccountData.discriminator.toString('utf-8')) ??
            [], generated_1.CrankAccountData.decode);
        const jobs = decodeAccounts(discriminatorMap.get(generated_1.JobAccountData.discriminator.toString('utf-8')) ??
            [], generated_1.JobAccountData.decode);
        const leases = decodeAccounts(discriminatorMap.get(generated_1.LeaseAccountData.discriminator.toString('utf-8')) ??
            [], generated_1.LeaseAccountData.decode);
        const oracles = decodeAccounts(discriminatorMap.get(generated_1.OracleAccountData.discriminator.toString('utf-8')) ??
            [], generated_1.OracleAccountData.decode);
        const permissions = decodeAccounts(discriminatorMap.get(generated_1.PermissionAccountData.discriminator.toString('utf-8')) ?? [], generated_1.PermissionAccountData.decode);
        const programState = decodeAccounts(discriminatorMap.get(generated_1.SbState.discriminator.toString('utf-8')) ?? [], generated_1.SbState.decode);
        const queues = decodeAccounts(discriminatorMap.get(generated_1.OracleQueueAccountData.discriminator.toString('utf-8')) ?? [], generated_1.OracleQueueAccountData.decode);
        const slidingResult = decodeAccounts(discriminatorMap.get(generated_1.SlidingResultAccountData.discriminator.toString('utf-8')) ?? [], generated_1.SlidingResultAccountData.decode);
        const vrfs = decodeAccounts(discriminatorMap.get(generated_1.VrfAccountData.discriminator.toString('utf-8')) ??
            [], generated_1.VrfAccountData.decode);
        return {
            aggregators,
            buffers,
            bufferRelayers,
            cranks,
            jobs,
            leases,
            oracles,
            permissions,
            programState,
            slidingResult,
            queues,
            vrfs,
        };
    }
    static getAccountType(accountInfo) {
        const discriminator = accountInfo.data
            .slice(0, anchor_1.ACCOUNT_DISCRIMINATOR_SIZE)
            .toString('utf-8');
        const accountType = accounts_1.DISCRIMINATOR_MAP.get(discriminator);
        if (accountType) {
            return accountType;
        }
        return null;
    }
}
exports.SwitchboardProgram = SwitchboardProgram;
_a = SwitchboardProgram;
// The read-only keypair for the Switchboard program.
SwitchboardProgram._readOnlyKeypair = exports.READ_ONLY_KEYPAIR;
/**
 * Create and initialize a {@linkcode SwitchboardProgram} connection object.
 *
 * @param cluster - the solana cluster to load the Switchboard program for.
 *
 * @param connection - the Solana connection object used to connect to an RPC node.
 *
 * @param payerKeypair - optional, payer keypair used to pay for on-chain transactions.
 *
 * @param programId - optional, override the cluster's default programId.
 *
 * @return the {@linkcode SwitchboardProgram} used to create and interact with Switchboard accounts.
 *
 * Basic usage example:
 *
 * ```ts
 * import { Connection } from "@solana/web3.js";
 * import { SwitchboardProgram, TransactionObject } from '@switchboard-xyz/solana.js';
 *
 * const program = await SwitchboardProgram.load(
 *    "mainnet-beta",
 *    new Connection("https://api.mainnet-beta.solana.com"),
 *    payerKeypair
 * );
 *
 * const txn = new TransactionObject(program.walletPubkey, [], []);
 * const txnSignature = await program.signAndSend(txn);
 * ```
 */
SwitchboardProgram.load = async (cluster, connection, payerKeypair = exports.READ_ONLY_KEYPAIR, programId = (0, exports.getSwitchboardProgramId)(cluster)) => {
    const program = await SwitchboardProgram.loadAnchorProgram(cluster, connection, payerKeypair, programId);
    const mint = await mint_1.NativeMint.load(program.provider);
    return new SwitchboardProgram(program, cluster, mint);
};
/**
 * Create and initialize a {@linkcode SwitchboardProgram} connection object.
 *
 * @param provider - The anchor provider containing the RPC and wallet connection.
 *
 * @return The {@linkcode SwitchboardProgram} used to create and interact with Switchboard accounts.
 *
 * Basic usage example:
 *
 * ```ts
 * import * as anchor from "@coral-xyz/anchor";
 * import { Connection } from "@solana/web3.js";
 * import { AnchorWallet, SwitchboardProgram, TransactionObject } from '@switchboard-xyz/solana.js';
 *
 * const connection = new Connection("https://api.mainnet-beta.solana.com");
 * const provider = new anchor.AnchorProvider(
    connection,
    new AnchorWallet(payerKeypair ?? SwitchboardProgram._readOnlyKeypair),
    { commitment: 'confirmed' }
  );
 * const program = await SwitchboardProgram.fromProvider(provider);
 *
 * const txn = new TransactionObject(program.walletPubkey, [], []);
 * const txnSignature = await program.signAndSend(txn);
 * ```
 */
SwitchboardProgram.fromProvider = async (provider, programId) => {
    const payer = provider.wallet.payer;
    const program = await SwitchboardProgram.fromConnection(provider.connection, payer, programId);
    return program;
};
/**
 * Create and initialize a {@linkcode SwitchboardProgram} connection object.
 *
 * @param connection - The Solana connection object used to connect to an RPC node.
 * @param payer - Optional, payer keypair used to pay for on-chain transactions (defaults to READ_ONLY_KEYPAIR).
 * @param programId - Optional, override the cluster's default programId.
 *
 * @return The {@linkcode SwitchboardProgram} instance used to create and interact with Switchboard accounts.
 *
 * Basic usage example:
 *
 * ```ts
 * import * as anchor from "@coral-xyz/anchor";
 * import { Connection } from "@solana/web3.js";
 * import { AnchorWallet, SwitchboardProgram, TransactionObject } from '@switchboard-xyz/solana.js';
 *
 * const connection = new Connection("https://api.mainnet-beta.solana.com");
 * const program = await SwitchboardProgram.fromConnection(connection);
 * ```
 */
SwitchboardProgram.fromConnection = async (connection, payer = exports.READ_ONLY_KEYPAIR, programId) => {
    const genesisHash = await connection.getGenesisHash();
    const cluster = genesisHash === const_1.MAINNET_GENESIS_HASH
        ? 'mainnet-beta'
        : genesisHash === const_1.DEVNET_GENESIS_HASH
            ? 'devnet'
            : 'localnet';
    const pid = programId ?? exports.SBV2_MAINNET_PID;
    const programAccountInfo = await connection.getAccountInfo(pid);
    if (programAccountInfo === null) {
        throw new Error(`Failed to load Switchboard at ${pid}, try manually providing a programId`);
    }
    const program = await SwitchboardProgram.load(cluster, connection, payer, pid);
    return program;
};
/**
 * Check if a transaction object is a VersionedTransaction or not
 *
 * @param tx
 * @returns bool
 */
const isVersionedTransaction = (tx) => {
    return 'version' in tx;
};
exports.isVersionedTransaction = isVersionedTransaction;
class AnchorWallet {
    constructor(payer) {
        this.payer = payer;
    }
    get publicKey() {
        return this.payer.publicKey;
    }
    async signTransaction(tx) {
        if ((0, exports.isVersionedTransaction)(tx)) {
            tx.sign([this.payer]);
        }
        else {
            tx.partialSign(this.payer);
        }
        return tx;
    }
    async signAllTransactions(txs) {
        return txs.map(t => {
            if ((0, exports.isVersionedTransaction)(t)) {
                t.sign([this.payer]);
            }
            else {
                t.partialSign(this.payer);
            }
            return t;
        });
    }
}
exports.AnchorWallet = AnchorWallet;
//# sourceMappingURL=SwitchboardProgram.js.map