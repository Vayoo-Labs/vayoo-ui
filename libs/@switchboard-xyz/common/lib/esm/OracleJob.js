import * as proto from "./protos";
import Big from "big.js";
/**
 * Serialize a stringified OracleJob and replace any json comments
 * @param [job] Stringified OracleJob or object with an array of Switchboard tasks defined
 * @throws {String}
 * @returns {proto.OracleJob }
 */
export function serializeOracleJob(job) {
    if (!job) {
        throw new Error("");
    }
    let jobObj;
    if (typeof job === "string") {
        const parsedFileString = job
            // replace all json comments https://regex101.com/r/B8WkuX/1
            .replace(/\/\*[\s\S]*?\*\/|([^\\:]|^)\/\/.*$/g, "");
        jobObj = proto.OracleJob.fromObject(JSON.parse(parsedFileString));
    }
    else {
        if (!("tasks" in job) || !Array.isArray(job.tasks)) {
            throw new Error(`OracleJob is missing the 'tasks' property`);
        }
        if (job.tasks.length === 0) {
            throw new Error(`OracleJob has no tasks defined`);
        }
        jobObj = job;
    }
    try {
        const err = proto.OracleJob.verify(jobObj);
        if (err !== null) {
            throw new Error(err);
        }
        return proto.OracleJob.create(jobObj);
    }
    catch (error) {
        throw new Error(`failed to serialize oracle job: ${error}`);
    }
}
/**
 * Deserialize an OracleJob from on-chain data
 * @param [jobData] Serialized OracleJob data
 * @returns {OracleJob}
 */
export function deserializeOracleJob(jobData) {
    return proto.OracleJob.decodeDelimited(jobData);
}
export async function simulateOracleJobs(jobs, network = "devnet") {
    const response = await fetch("https://task.switchboard.xyz/simulate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            jobs: jobs.map((j) => j.toJSON()),
            cluster: network,
        }),
    });
    if (!response.ok) {
        throw new Error(`Failed to simulate job definition, Status=${response.status}`);
    }
    const payload = await response.json();
    return {
        results: payload.results.map((r) => new Big(r)),
        result: new Big(payload.result),
        taskRunnerVersion: payload.task_runner_version,
    };
}
//# sourceMappingURL=OracleJob.js.map