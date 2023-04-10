/// <reference types="node" />
export interface IDockerConfig {
    arch?: "linux/arm64" | "linux/amd64";
    dockerRunFlags?: Array<string>;
    envVariables?: Record<string, string>;
}
export declare type IOracleConfig = IDockerConfig & {
    chain: "aptos" | "near" | "solana";
    network: "localnet" | "devnet" | "testnet" | "mainnet" | "mainnet-beta";
    rpcUrl: string;
    oracleKey: string;
    secretPath: string;
    taskRunnerSolanaRpc?: string;
};
export declare class DockerOracle {
    readonly nodeImage: string;
    readonly config: IOracleConfig;
    readonly switchboardDirectory: string;
    readonly silent: boolean;
    readonly image: string;
    readonly arch: "linux/arm64" | "linux/amd64";
    readonly dockerRunFlags: Array<string>;
    readonly chain: "aptos" | "near" | "solana";
    readonly network: "localnet" | "devnet" | "testnet" | "mainnet" | "mainnet-beta";
    readonly envVariables: Record<string, string>;
    readonly secretPath: string;
    logs: string[];
    readonly logFile: string;
    dockerOracleProcess?: any;
    isActive: boolean;
    readonly timestamp: number;
    onDataCallback: (data: any) => void;
    onErrorCallback: (error: Error) => void;
    onCloseCallback: (code: number, signal: NodeJS.Signals) => void;
    private addLog;
    constructor(nodeImage: string, config: IOracleConfig, switchboardDirectory?: string, silent?: boolean);
    static isDockerRunning(): void;
    /**
     * Start a Docker process with the oracle running. If an existing oracle is detected, it will re-attach to the container.
     */
    start(): void;
    /** Stop the docker oracle process */
    stop(): boolean;
    /** Force kill the child_process */
    kill(exitCode?: number): void;
    amIAContainer(): boolean;
    /**
     * Start a Docker process with the oracle running and await for the oracle to signal readiness. If an existing oracle is detected, it will re-attach to the container.
     *
     * @param timeout - the number of seconds to await for the oracle to start successfully heartbeating
     *
     * @throws if timeout is exceeded and oracle heartbeat was never detected
     */
    startAndAwait(timeout?: number): Promise<void>;
    private getArgs;
    private createOracle;
    private startOracle;
    /** Save an array of oracle logs */
    saveLogs(): void;
    static checkDockerHealthStatus(containerName: string): boolean;
    checkDockerHealthStatus(): boolean;
    /**
     * @param timeout - the number of seconds to await for the oracle to start successfully heartbeating
     *
     * @throws if timeout is exceeded and oracle heartbeat was never detected
     */
    awaitReady(timeout?: number): Promise<void>;
    private static parseEnvVariables;
}
//# sourceMappingURL=DockerOracle.d.ts.map