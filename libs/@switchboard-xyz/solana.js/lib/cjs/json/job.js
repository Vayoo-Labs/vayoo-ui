"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JobJson = void 0;
const utils_1 = require("../utils");
const utils_2 = require("./utils");
const web3_js_1 = require("@solana/web3.js");
const common_1 = require("@switchboard-xyz/common");
class JobJson {
    constructor(object) {
        this.name = (0, utils_2.parseString)(object, 'name', '');
        this.weight = (0, utils_2.parseNumber)(object, 'weight', 1);
        this.expiration = (0, utils_2.parseNumber)(object, 'expiration', 0);
        if (!('tasks' in object) || !Array.isArray(object.tasks)) {
            throw new Error(`Job definitions require a 'tasks' array`);
        }
        this.job = common_1.OracleJob.fromObject(object);
        this.data = common_1.OracleJob.encodeDelimited(this.job).finish();
        const keypairPath = (0, utils_2.parseString)(object, 'keypair');
        this.keypair = keypairPath ? (0, utils_1.loadKeypair)(keypairPath) : web3_js_1.Keypair.generate();
        const authorityPath = (0, utils_2.parseString)(object, 'authority');
        this.authority = authorityPath ? (0, utils_1.loadKeypair)(authorityPath) : undefined;
    }
    static loadMultiple(object) {
        const jobJsons = [];
        if ('jobs' in object && Array.isArray(object.jobs)) {
            for (const job of object.jobs) {
                jobJsons.push(new JobJson(job));
            }
        }
        return jobJsons;
    }
    toJSON() {
        return {
            name: this.name,
            weight: this.weight,
            expiration: this.expiration,
            keypair: (0, utils_2.keypairToString)(this.keypair),
            authority: this.authority ? (0, utils_2.keypairToString)(this.authority) : undefined,
            tasks: this.job.toJSON(),
        };
    }
}
exports.JobJson = JobJson;
//# sourceMappingURL=job.js.map