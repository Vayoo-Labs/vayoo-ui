import { CreateQueueOracleParams, LoadedSwitchboardNetwork, NetworkInitParams, OracleAccount, QueueAccount, SwitchboardProgram } from '.';
import { AnchorProvider } from '@coral-xyz/anchor';
import { Connection, Keypair, PublicKey } from '@solana/web3.js';
export declare function findAnchorTomlWallet(workingDir?: string): string;
export type SwitchboardTestContextInit = Omit<Omit<NetworkInitParams, 'authority'>, 'oracles'> & {
    oracle: Omit<CreateQueueOracleParams, 'authority'>;
};
export declare const DEFAULT_LOCALNET_NETWORK: SwitchboardTestContextInit;
export declare class SwitchboardTestContext {
    readonly network: LoadedSwitchboardNetwork;
    readonly walletPath: string;
    constructor(network: LoadedSwitchboardNetwork, walletPath: string);
    get queue(): QueueAccount;
    get program(): SwitchboardProgram;
    get oracle(): OracleAccount;
    static load(connection: Connection, networkInitParams?: Partial<SwitchboardTestContextInit>, walletPath?: string, programId?: PublicKey): Promise<SwitchboardTestContext>;
    static loadFromProvider(provider: AnchorProvider, networkInitParams?: Partial<SwitchboardTestContextInit>, programId?: PublicKey): Promise<SwitchboardTestContext>;
    static initFromProvider(provider: AnchorProvider, networkInitParams?: Partial<SwitchboardTestContextInit>, programId?: PublicKey): Promise<SwitchboardTestContext>;
    static init(connection: Connection, networkInitParams?: Partial<SwitchboardTestContextInit>, walletPath?: string, programId?: PublicKey): Promise<SwitchboardTestContext>;
    static findAnchorTomlWallet(workingDir?: string): string;
    /** Load a keypair from a file path. If one doesn't exist, it will be created */
    static loadKeypair(keypairPath: string): Keypair;
}
export { SwitchboardTestContext as SwitchboardTestContextV2 };
//# sourceMappingURL=SwitchboardTestContext.d.ts.map