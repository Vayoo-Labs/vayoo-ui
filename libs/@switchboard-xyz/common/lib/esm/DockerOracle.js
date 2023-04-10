import fs from "fs";
import path from "path";
import os from "os";
import crypto from "crypto";
import { sleep } from "./utils";
export class DockerOracle {
    constructor(nodeImage, config, switchboardDirectory = path.join(process.cwd(), ".switchboard"), silent = false) {
        var _a, _b;
        this.nodeImage = nodeImage;
        this.config = config;
        this.switchboardDirectory = switchboardDirectory;
        this.silent = silent;
        this.logs = [];
        this.isActive = true;
        this.timestamp = Date.now();
        DockerOracle.isDockerRunning();
        // set config
        this.chain = config.chain;
        this.network = config.network;
        this.arch = (_a = config.arch) !== null && _a !== void 0 ? _a : "linux/amd64";
        this.dockerRunFlags = (_b = config.dockerRunFlags) !== null && _b !== void 0 ? _b : [];
        // payer secret (required)
        this.secretPath = normalizeFsPath(config.secretPath);
        if (!this.secretPath) {
            throw new Error(`Payer secret path is required`);
        }
        if (!fs.existsSync(this.secretPath)) {
            throw new Error(`Payer secret path does not exist`);
        }
        // Set environment variables for docker image
        this.envVariables = DockerOracle.parseEnvVariables(config);
        // log config
        if (!fs.existsSync(this.switchboardDirectory)) {
            fs.mkdirSync(this.switchboardDirectory, { recursive: true });
        }
        this.logFile = path.join(this.switchboardDirectory, `docker.${this.nodeImage}.${Math.floor(this.timestamp / 1000)}.log`);
        // build image name from a hash of provided args
        const shaHash = crypto.createHash("sha256");
        shaHash.update(Buffer.from([
            this.chain,
            this.network,
            this.secretPath,
            this.arch,
            this.nodeImage,
        ].join(" ") + JSON.stringify(this.envVariables)));
        const hash = shaHash.digest().toString("hex");
        this.image = `sbv2-${this.chain}-${this.network}-${this.nodeImage.replace("dev-v2-", "")}-${hash.slice(0, 16)}`;
        // callback config
        this.onDataCallback = (data) => {
            this.addLog(data.toString());
            if (!this.silent) {
                console.log(`\u001B[34m${data.toString()}\u001B[0m`);
            }
        };
        this.onErrorCallback = (error) => {
            this.addLog(error.toString());
            if (!this.silent) {
                console.error(`\u001B[31m${error.toString()}\u001B[0m`);
            }
        };
        this.onCloseCallback = (code, signal) => {
            this.addLog(`Exit code ${code} received`);
            this.saveLogs();
            if (!this.isActive) {
                return;
            }
            // if reboot from no RPC or if image already exists
            if (code === 0 || code === 125) {
                this.startOracle();
            }
            else if (!this.silent) {
                console.error(`\u001B[31mDocker image exited with code ${code}\u001B[0m`);
                console.log(`\u001B[34m${"Restarting oracle ..."}\u001B[0m`);
                this.startOracle();
            }
            else if (code !== 0 && code !== 1) {
                console.error(`\u001B[31mDocker image exited with code ${code}\u001B[0m`);
            }
        };
    }
    addLog(log) {
        this.logs.push(log);
        // flush logs
        if (this.logs.length > 10) {
            this.saveLogs();
        }
    }
    static isDockerRunning() {
        // Check docker is running
        try {
            require("child_process").execSync(`docker ps`, {
                stdio: ["pipe", "pipe", "pipe"],
            });
        }
        catch (error) {
            throw new Error(`Is Docker running?`);
        }
    }
    /**
     * Start a Docker process with the oracle running. If an existing oracle is detected, it will re-attach to the container.
     */
    start() {
        // Kill all existing switchboard oracles
        try {
            if (os.type() === "Windows_NT") {
                require("child_process").execSync(`FOR /F "tokens=*" %i IN ('docker ps -q -f "ancestor=switchboardlabs/node"') DO (docker container stop %i)`, { stdio: ["pipe", "pipe", "pipe"], shell: "powershell.exe" });
            }
            else {
                require("child_process").execSync(`docker container stop $(docker ps | grep "switchboardlabs/node" | awk '{ print $1 }')`, { stdio: ["pipe", "pipe", "pipe"] });
            }
        }
        catch (error) {
            const errorString = `Failed to stop existing docker containers, ${error}`;
            if (!errorString.includes(`"docker container stop" requires at least 1 argument`)) {
                console.error(errorString);
            }
        }
        // we always try to create the oracle first
        // if already exist, attach to it
        this.createOracle();
    }
    /** Stop the docker oracle process */
    stop() {
        this.isActive = false;
        this.saveLogs();
        try {
            require("child_process").execSync(`docker container stop ${this.image}`, {
                stdio: ["pipe", "pipe", "pipe"],
            });
            return true;
        }
        catch (error) {
            console.error(`Failed to stop docker oracle, ${error}`);
            return false;
        }
    }
    /** Force kill the child_process */
    kill(exitCode = 1) {
        this.isActive = false;
        this.saveLogs();
        if (this.dockerOracleProcess) {
            const killed = this.dockerOracleProcess.kill(exitCode);
            if (!killed) {
                throw new Error(`Failed to kill the docker oracle process`);
            }
        }
    }
    amIAContainer() {
        let amIAContainer = false;
        // Yes, there are some edge cases to checking the presence of the /proc/self/cgroup file to determine if your code is running inside a container:
        // The /proc/self/cgroup file is only present on Linux systems that have the cgroups feature enabled, so this method will not work on other operating systems.
        // If your container is using the host's network namespace, then the /proc/self/cgroup will be the same as the host, and the check would return false, even if the code is running inside a container.
        // Some container runtime (e.g. lxc) does not use /proc/self/cgroup to isolate the container, so the check would return false.
        // If the container is running with --privileged flag it will have full access to the host, including the /proc filesystem, so the check would return false
        // Checking the presence of this file only verifies that the process is running in a cgroup, not that it is running in a container.
        try {
            if (fs.existsSync("/proc/self/cgroup")) {
                return true;
            }
        }
        catch (error) { }
        try {
            const stdout = require("child_process").execSync("ps -o pid,args", {
                encoding: "utf-8",
            });
            if (stdout.includes("dockerd") || stdout.includes("containerd")) {
                return true;
            }
        }
        catch (error) { }
        try {
            const stdout = require("child_process").execSync("lsof -p $$", {
                encoding: "utf-8",
            });
            if (stdout.includes("/var/run/docker.sock")) {
                return true;
            }
        }
        catch (error) { }
        // not a reliable way to check as it's not only depend on the container, it's depend on the environment variable set by the host or other config
        if (process.env.container && process.env.container === "docekr") {
            return true;
        }
        return amIAContainer;
    }
    /**
     * Start a Docker process with the oracle running and await for the oracle to signal readiness. If an existing oracle is detected, it will re-attach to the container.
     *
     * @param timeout - the number of seconds to await for the oracle to start successfully heartbeating
     *
     * @throws if timeout is exceeded and oracle heartbeat was never detected
     */
    async startAndAwait(timeout = 60) {
        this.start();
        await this.awaitReady(timeout);
    }
    getArgs() {
        const dockerRunFlags = new Set([
            `--network=host`,
            `--name ${this.image}`,
            `--platform=${this.arch}`,
            `--health-interval 10s`,
            `--health-start-period 10s`,
            ...this.dockerRunFlags,
        ]);
        for (const [key, value] of Object.entries(this.envVariables)) {
            dockerRunFlags.add(`-e ${key.toUpperCase()}=${value}`);
        }
        if (os.type() === "Linux") {
            dockerRunFlags.add(`--add-host=host.docker.internal:host-gateway`);
        }
        if (this.amIAContainer()) {
            // More Info: https://jpetazzo.github.io/2015/09/03/do-not-use-docker-in-docker-for-ci/
            dockerRunFlags.add(`-v /var/run/docker.sock:/var/run/docker.sock`);
        }
        if (this.chain === "aptos") {
            return [
                "run",
                ...Array.from(dockerRunFlags),
                `-e APTOS_FS_PAYER_SECRET_PATH=/home/node/sbv2-oracle/payer_secrets.json`,
                `--mount type=bind,source=${this.secretPath},target=/home/node/sbv2-oracle/payer_secrets.json`,
                `switchboardlabs/node:${this.nodeImage}`,
            ].filter(Boolean);
        }
        if (this.chain === "near") {
            return [
                "run",
                ...Array.from(dockerRunFlags),
                `-e NEAR_FS_PAYER_SECRET_PATH=/home/node/sbv2-oracle/payer_secrets.json`,
                `--mount type=bind,source=${this.secretPath},target=/home/node/sbv2-oracle/payer_secrets.json`,
                `switchboardlabs/node:${this.nodeImage}`,
            ].filter(Boolean);
        }
        if (this.chain === "solana") {
            return [
                "run",
                ...Array.from(dockerRunFlags),
                `-e SOLANA_FS_PAYER_SECRET_PATH=/home/node/sbv2-oracle/payer_secrets.json`,
                `--mount type=bind,source=${this.secretPath},target=/home/node/sbv2-oracle/payer_secrets.json`,
                `switchboardlabs/node:${this.nodeImage}`,
            ].filter(Boolean);
        }
        throw new Error(`DockerOracle chain must be 'aptos', 'near', or 'solana'`);
    }
    createOracle() {
        // this.ready = false;
        this.dockerOracleProcess = require("child_process").spawn("docker", this.getArgs(), {
            shell: true,
            env: process.env,
            stdio: this.silent ? undefined : ["inherit", "pipe", "pipe"],
        });
        this.dockerOracleProcess.stdout.on("data", this.onDataCallback);
        this.dockerOracleProcess.stderr.on("error", (error) => {
            if (!error
                .toString()
                .includes(`The container name "/sbv2-${this.nodeImage}" is already in use by container`)) {
                console.error(`\u001B[31m${error.toString()}\u001B[0m`);
                this.addLog(error.toString());
            }
        });
        this.dockerOracleProcess.on("close", this.onCloseCallback);
        this.dockerOracleProcess.on("exit", this.onCloseCallback);
        this.dockerOracleProcess.on("exit", () => {
            if (this.dockerOracleProcess !== undefined) {
                this.dockerOracleProcess.removeAllListeners();
                this.dockerOracleProcess = undefined;
            }
        });
    }
    startOracle() {
        if (this.dockerOracleProcess !== undefined) {
            this.dockerOracleProcess.removeAllListeners();
        }
        this.dockerOracleProcess = require("child_process").spawn("docker", ["start", "--attach", this.image], {
            shell: true,
            env: process.env,
            stdio: this.silent ? undefined : ["inherit", "pipe", "pipe"],
        });
        this.dockerOracleProcess.stdout.on("data", this.onDataCallback);
        this.dockerOracleProcess.stderr.on("error", this.onErrorCallback);
        this.dockerOracleProcess.on("close", this.onCloseCallback);
        this.dockerOracleProcess.on("exit", this.onCloseCallback);
    }
    /** Save an array of oracle logs */
    saveLogs() {
        const filteredLogs = this.logs
            .filter((l) => Boolean)
            .map((l) => l.replace(/\r?\n\s*\r?\n/g, "\r\n"));
        if (filteredLogs.length > 0) {
            if (fs.existsSync(this.logFile)) {
                fs.appendFileSync(this.logFile, "\r\n" + filteredLogs.join("\r\n"));
                this.logs = [];
            }
            else {
                fs.writeFileSync(this.logFile, filteredLogs.join("\r\n"));
                this.logs = [];
            }
        }
    }
    static checkDockerHealthStatus(containerName) {
        try {
            const inspectResponseBuffer = require("child_process").execSync(`docker inspect --format='{{json .State.Health.Status}}' ${containerName}`, { stdio: ["pipe", "pipe", "pipe"] });
            const response = Buffer.from(inspectResponseBuffer)
                .toString("utf-8")
                .replace(/\"/g, "") // remove double quotes
                .trim(); // trim new line
            return response === "healthy" ? true : false;
        }
        catch (error) { }
        return false;
    }
    checkDockerHealthStatus() {
        return DockerOracle.checkDockerHealthStatus(this.image);
    }
    /**
     * @param timeout - the number of seconds to await for the oracle to start successfully heartbeating
     *
     * @throws if timeout is exceeded and oracle heartbeat was never detected
     */
    async awaitReady(timeout = 60) {
        let numRetries = timeout * 2;
        while (numRetries) {
            try {
                const status = this.checkDockerHealthStatus();
                if (status === true) {
                    return;
                }
            }
            catch { }
            --numRetries;
            await sleep(500);
        }
        throw new Error(`Failed to start Switchboard oracle in ${timeout} seconds`);
    }
    static parseEnvVariables(config) {
        var _a, _b, _c, _d, _e, _f;
        // Set environment variables for docker image
        const envVariables = (_a = config.envVariables) !== null && _a !== void 0 ? _a : {};
        // defaults
        envVariables["DISABLE_NONCE_QUEUE"] = "1";
        envVariables["DEBUG"] = "1";
        envVariables["VERBOSE"] = "1";
        // set chain
        envVariables["CHAIN"] = (_b = config.chain) !== null && _b !== void 0 ? _b : "solana";
        // rpc url (required)
        envVariables["RPC_URL"] = (_c = envVariables["RPC_URL"]) !== null && _c !== void 0 ? _c : config.rpcUrl;
        if (envVariables["RPC_URL"].includes("localhost")) {
            envVariables["RPC_URL"] = envVariables["RPC_URL"].replace("localhost", "host.docker.internal");
        }
        if (envVariables["RPC_URL"].includes("0.0.0.0")) {
            envVariables["RPC_URL"] = envVariables["RPC_URL"].replace("0.0.0.0", "host.docker.internal");
        }
        if (!envVariables["RPC_URL"]) {
            throw new Error(`$RPC_URL is required`);
        }
        // oracle key (required)
        envVariables["ORACLE_KEY"] = (_d = envVariables["ORACLE_KEY"]) !== null && _d !== void 0 ? _d : config.oracleKey;
        if (!envVariables["ORACLE_KEY"]) {
            throw new Error(`$ORACLE_KEY is required`);
        }
        // task runner config
        envVariables["TASK_RUNNER_SOLANA_RPC"] =
            (_f = (_e = envVariables["TASK_RUNNER_SOLANA_RPC"]) !== null && _e !== void 0 ? _e : config.taskRunnerSolanaRpc) !== null && _f !== void 0 ? _f : "https://api.mainnet-beta.solana.com";
        // solana config
        if (envVariables["CHAIN"] === "solana") {
            envVariables["CLUSTER"] = config.network;
        }
        // aptos config
        if (envVariables["CHAIN"] === "aptos") {
            envVariables["NETWORK"] = config.network;
            if (!envVariables["APTOS_PID"]) {
                throw new Error(`Need to provide '$APTOS_PID' if chain is set to 'aptos'`);
            }
        }
        // near config
        if (envVariables["CHAIN"] === "near") {
            envVariables["NEAR_NETWORK_ID"] = config.network;
            if (!envVariables["NEAR_NAMED_ACCOUNT"]) {
                throw new Error(`Need to provide '$NEAR_NAMED_ACCOUNT' if chain is set to 'near'`);
            }
        }
        return envVariables;
    }
}
function normalizeFsPath(fsPath) {
    return fsPath.startsWith("/") ||
        fsPath.startsWith("C:") ||
        fsPath.startsWith("D:")
        ? fsPath
        : fsPath.startsWith("~")
            ? path.join(os.homedir(), fsPath.slice(1))
            : path.join(process.cwd(), fsPath);
}
//# sourceMappingURL=DockerOracle.js.map