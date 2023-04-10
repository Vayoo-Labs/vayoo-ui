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
exports.simulateOracleJobs = exports.deserializeOracleJob = exports.serializeOracleJob = void 0;
const proto = __importStar(require("./protos"));
const big_js_1 = __importDefault(require("big.js"));
/**
 * Serialize a stringified OracleJob and replace any json comments
 * @param [job] Stringified OracleJob or object with an array of Switchboard tasks defined
 * @throws {String}
 * @returns {proto.OracleJob }
 */
function serializeOracleJob(job) {
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
exports.serializeOracleJob = serializeOracleJob;
/**
 * Deserialize an OracleJob from on-chain data
 * @param [jobData] Serialized OracleJob data
 * @returns {OracleJob}
 */
function deserializeOracleJob(jobData) {
    return proto.OracleJob.decodeDelimited(jobData);
}
exports.deserializeOracleJob = deserializeOracleJob;
async function simulateOracleJobs(jobs, network = "devnet") {
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
        results: payload.results.map((r) => new big_js_1.default(r)),
        result: new big_js_1.default(payload.result),
        taskRunnerVersion: payload.task_runner_version,
    };
}
exports.simulateOracleJobs = simulateOracleJobs;
//# sourceMappingURL=OracleJob.js.map