/// <reference types="node" />
import { CrankAccount, QueueAccount, SwitchboardAccountType } from './accounts';
import { AggregatorAccountData, BufferRelayerAccountData, CrankAccountData, JobAccountData, LeaseAccountData, OracleAccountData, OracleQueueAccountData, PermissionAccountData, SbState, SlidingResultAccountData, VrfAccountData } from './generated';
import { NativeMint } from './mint';
import { SwitchboardEvents } from './SwitchboardEvents';
import { TransactionObject, TransactionOptions } from './TransactionObject';
import { LoadedJobDefinition } from './types';
import * as anchor from '@coral-xyz/anchor';
import { AccountInfo, Cluster, ConfirmOptions, Connection, Keypair, PublicKey, SendOptions, Transaction, TransactionSignature, VersionedTransaction } from '@solana/web3.js';
export type SendTransactionOptions = (ConfirmOptions | SendOptions) & {
    skipConfrimation?: boolean;
};
export declare const DEFAULT_SEND_TRANSACTION_OPTIONS: SendTransactionOptions;
/**
 * Switchboard Devnet Program ID
 */
export declare const SBV2_DEVNET_PID: anchor.web3.PublicKey;
/**
 * Switchboard Mainnet Program ID
 */
export declare const SBV2_MAINNET_PID: anchor.web3.PublicKey;
/**
 *  A generated keypair that is assigned as the _payerKeypair_ when in read-only mode.
 */
export declare const READ_ONLY_KEYPAIR: anchor.web3.Keypair;
/**
 * Returns the Switchboard Program ID for the specified Cluster.
 */
export declare const getSwitchboardProgramId: (cluster: Cluster | 'localnet') => PublicKey;
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
export declare class SwitchboardProgram {
    private static readonly _readOnlyKeypair;
    private readonly _program;
    /** The Solana cluster to load the Switchboard program for. */
    readonly cluster: Cluster | 'localnet';
    readonly programState: {
        publicKey: PublicKey;
        bump: number;
    };
    readonly mint: NativeMint;
    /**
     * Constructor for the SwitchboardProgram class.
     *
     * @param program - The anchor program instance.
     * @param cluster - The Solana cluster to load the Switchboard program for.
     * @param mint - The native mint for the Switchboard program.
     */
    constructor(program: anchor.Program, cluster: Cluster | 'localnet', mint: NativeMint);
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
    static loadAnchorProgram(cluster: Cluster | 'localnet', connection: Connection, payerKeypair?: Keypair, programId?: PublicKey): Promise<anchor.Program>;
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
    static load: (cluster: Cluster | 'localnet', connection: Connection, payerKeypair?: Keypair, programId?: PublicKey) => Promise<SwitchboardProgram>;
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
    static fromProvider: (provider: anchor.AnchorProvider, programId?: PublicKey) => Promise<SwitchboardProgram>;
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
    static fromConnection: (connection: Connection, payer?: anchor.web3.Keypair, programId?: PublicKey) => Promise<SwitchboardProgram>;
    /**
     * Retrieves the Switchboard Program ID for the currently connected cluster.
     * @return The PublicKey of the Switchboard Program ID.
     */
    get programId(): PublicKey;
    /**
     * Retrieves the Switchboard Program IDL.
     * @return The IDL of the Switchboard Program.
     */
    get idl(): anchor.Idl;
    /**
     * Retrieves the Switchboard Borsh Accounts Coder.
     * @return The BorshAccountsCoder for the Switchboard Program.
     */
    get coder(): anchor.BorshAccountsCoder;
    /**
     * Retrieves the anchor Provider used by this program to connect with the Solana cluster.
     * @return The AnchorProvider instance for the Switchboard Program.
     */
    get provider(): anchor.AnchorProvider;
    /**
     * Retrieves the Connection used by this program to connect with the Solana cluster.
     * @return The Connection instance for the Switchboard Program.
     */
    get connection(): Connection;
    /**
     * Retrieves the Wallet used by this program.
     * @return The AnchorWallet instance for the Switchboard Program.
     */
    get wallet(): AnchorWallet;
    /**
     * Retrieves the wallet's PublicKey.
     * @return The PublicKey of the wallet.
     */
    get walletPubkey(): PublicKey;
    /**
     * Checks if the program is read-only.
     * @return A boolean indicating if the SwitchboardProgram instance is read-only.
     */
    get isReadOnly(): boolean;
    /**
     * Verifies that a payer keypair has been supplied to the {@linkcode SwitchboardProgram}.
     * Throws an error if the program is read-only.
     */
    verifyPayer(): void;
    /**
     * Verifies that a new keypair has been provided and the corresponding account does not already exist.
     *
     * **NOTE:** Creating new accounts without this check may prevent the ability to withdraw any existing funds.
     *
     * @param keypair - The Keypair to be verified.
     * @throws Will throw an error if the account for the keypair already exists.
     */
    verifyNewKeypair(keypair: Keypair): Promise<void>;
    /**
     * Retrieves the account namespace for the Switchboard Program.
     * @return The AccountNamespace instance for the Switchboard Program.
     */
    get account(): anchor.AccountNamespace;
    /**
     * Load the Switchboard Labs permissionless Queue for either devnet or mainnet. The permissionless queue has the following permissions:
     *  - unpermissionedFeedsEnabled: True
     *  - unpermissionedVrfEnabled: True
     *  - enableBufferRelayers: False
     *
     * **Note:** {@linkcode AggregatorAccount}s and {@linkcode VrfAccount}s do not require permissions to join this queue. {@linkcode BufferRelayerAccount}s are disabled.
     */
    loadPermissionless(): Promise<{
        queueAccount: QueueAccount;
        queue: OracleQueueAccountData;
        crankAccount: CrankAccount;
        crank: CrankAccountData;
    }>;
    /**
     * Load the Switchboard Labs permissionled Queue for either devnet or mainnet. The permissioned queue has the following permissions:
     *  - unpermissionedFeedsEnabled: False
     *  - unpermissionedVrfEnabled: False
     *  - enableBufferRelayers: False
     *
     * **Note:** The queue authority must grant {@linkcode AggregatorAccount}s PERMIT_ORACLE_QUEUE_USAGE and {@linkcode VrfAccount}s PERMIT_VRF_REQUESTS permissions before joining the queue and requesting oracle updates. {@linkcode BufferRelayerAccount}s are disabled.
     */
    loadPermissioned(): Promise<{
        queueAccount: QueueAccount;
        queue: OracleQueueAccountData;
        crankAccount: CrankAccount;
        crank: CrankAccountData;
    }>;
    /**
     * Adds an event listener for the specified AnchorEvent, allowing consumers to monitor the chain for events
     * such as AggregatorOpenRound, VrfRequestRandomness, and AggregatorSaveResult.
     *
     * @param eventName - The name of the event to listen for.
     * @param callback - A callback function to handle the event data, slot, and signature.
     * @return A unique listener ID that can be used to remove the event listener.
     */
    addEventListener<EventName extends keyof SwitchboardEvents>(eventName: EventName, callback: (data: SwitchboardEvents[EventName], slot: number, signature: string) => void | Promise<void>): number;
    /**
     * Removes the event listener with the specified listener ID.
     *
     * @param listenerId - The unique ID of the event listener to be removed.
     */
    removeEventListener(listenerId: number): Promise<void>;
    signAndSendAll(txns: Array<TransactionObject>, opts?: SendTransactionOptions, txnOptions?: TransactionOptions, delay?: number): Promise<Array<TransactionSignature>>;
    signAndSend(txn: TransactionObject, opts?: SendTransactionOptions, txnOptions?: TransactionOptions): Promise<TransactionSignature>;
    getProgramJobAccounts(): Promise<Map<Uint8Array, LoadedJobDefinition>>;
    getProgramAccounts(): Promise<{
        aggregators: Map<string, AggregatorAccountData>;
        buffers: Map<string, Buffer>;
        bufferRelayers: Map<string, BufferRelayerAccountData>;
        cranks: Map<string, CrankAccountData>;
        jobs: Map<string, JobAccountData>;
        leases: Map<string, LeaseAccountData>;
        oracles: Map<string, OracleAccountData>;
        permissions: Map<string, PermissionAccountData>;
        programState: Map<string, SbState>;
        queues: Map<string, OracleQueueAccountData>;
        slidingResult: Map<string, SlidingResultAccountData>;
        vrfs: Map<string, VrfAccountData>;
    }>;
    static getAccountType(accountInfo: AccountInfo<Buffer>): SwitchboardAccountType | null;
}
/**
 * Check if a transaction object is a VersionedTransaction or not
 *
 * @param tx
 * @returns bool
 */
export declare const isVersionedTransaction: (tx: any) => tx is anchor.web3.VersionedTransaction;
export declare class AnchorWallet implements anchor.Wallet {
    readonly payer: Keypair;
    constructor(payer: Keypair);
    get publicKey(): PublicKey;
    signTransaction<T extends Transaction | VersionedTransaction>(tx: T): Promise<T>;
    signAllTransactions<T extends Transaction | VersionedTransaction>(txs: T[]): Promise<T[]>;
}
//# sourceMappingURL=SwitchboardProgram.d.ts.map