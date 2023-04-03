/// <reference types="node" />
import * as proto from "./protos";
import Big from "big.js";
/**
 * Serialize a stringified OracleJob and replace any json comments
 * @param [job] Stringified OracleJob or object with an array of Switchboard tasks defined
 * @throws {String}
 * @returns {proto.OracleJob }
 */
export declare function serializeOracleJob(job: string | proto.IOracleJob | Record<string, any>): proto.OracleJob;
/**
 * Deserialize an OracleJob from on-chain data
 * @param [jobData] Serialized OracleJob data
 * @returns {OracleJob}
 */
export declare function deserializeOracleJob(jobData: Buffer | Uint8Array): proto.OracleJob;
export declare type TaskSimulatorNetwork = "devnet" | "mainnet-beta";
export declare type TaskRunnerResponse1 = TaskRunnerError | TaskRunnerResponse;
export declare type TaskRunnerMeta = {
    taskRunnerVersion: string;
};
export declare type TaskRunnerError = TaskRunnerMeta & {
    error: string;
};
export declare type TaskRunnerResponse = TaskRunnerMeta & {
    results: Array<Big>;
    result: Big;
};
export declare function simulateOracleJobs(jobs: Array<proto.OracleJob>, network?: TaskSimulatorNetwork): Promise<TaskRunnerResponse>;
//# sourceMappingURL=OracleJob.d.ts.map