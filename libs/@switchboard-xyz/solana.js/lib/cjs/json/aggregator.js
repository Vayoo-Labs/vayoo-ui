"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AggregatorJson = void 0;
const utils_1 = require("../utils");
const job_1 = require("./job");
const utils_2 = require("./utils");
const web3_js_1 = require("@solana/web3.js");
class AggregatorJson {
    constructor(object) {
        this.name = (0, utils_2.parseString)(object, 'name', '');
        this.metadata = (0, utils_2.parseString)(object, 'metadata', '');
        this.batchSize = (0, utils_2.parseNumber)(object, 'batchSize', 1);
        this.minRequiredOracleResults = (0, utils_2.parseNumber)(object, 'minRequiredOracleResults', 1);
        this.minRequiredJobResults = (0, utils_2.parseNumber)(object, 'minRequiredJobResults', 1);
        this.minUpdateDelaySeconds = (0, utils_2.parseNumber)(object, 'minUpdateDelaySeconds', 30);
        this.startAfter = (0, utils_2.parseNumber)(object, 'startAfter', 0);
        this.expiration = (0, utils_2.parseNumber)(object, 'expiration', 0);
        this.varianceThreshold = (0, utils_2.parseNumber)(object, 'varianceThreshold', 0);
        this.forceReportPeriod = (0, utils_2.parseNumber)(object, 'forceReportPeriod', 0);
        this.historyLimit =
            'historyLimit' in object
                ? Number.parseInt(object.historyLimit)
                : undefined;
        this.disableCrank = (0, utils_2.parseBoolean)(object, 'disableCrank', false);
        this.crankIndex =
            'crankIndex' in object ? Number(object.crankIndex) : undefined;
        this.slidingWindow = (0, utils_2.parseBoolean)(object, 'slidingWindow', undefined);
        this.basePriorityFee =
            'basePriorityFee' in object
                ? Number.parseInt(object.basePriorityFee)
                : undefined;
        this.priorityFeeBump =
            'priorityFeeBump' in object
                ? Number.parseInt(object.priorityFeeBump)
                : undefined;
        this.priorityFeeBumpPeriod =
            'priorityFeeBumpPeriod' in object
                ? Number.parseInt(object.priorityFeeBumpPeriod)
                : undefined;
        this.maxPriorityFeeMultiplier =
            'maxPriorityFeeMultiplier' in object
                ? Number.parseInt(object.maxPriorityFeeMultiplier)
                : undefined;
        // lease
        this.fundAmount = (0, utils_2.parseNumber)(object, 'fundAmount', 0);
        // permissions
        this.enable = (0, utils_2.parseBoolean)(object, 'enable', false);
        // accounts
        const keypairPath = (0, utils_2.parseString)(object, 'keypair');
        this.keypair = keypairPath ? (0, utils_1.loadKeypair)(keypairPath) : web3_js_1.Keypair.generate();
        const authorityPath = (0, utils_2.parseString)(object, 'authority');
        this.authority = authorityPath ? (0, utils_1.loadKeypair)(authorityPath) : undefined;
        // resources
        this.jobs = job_1.JobJson.loadMultiple(object);
    }
    static loadMultiple(object) {
        const aggregatorJsons = [];
        if ('aggregators' in object && Array.isArray(object.aggregators)) {
            for (const aggregator of object.aggregators) {
                aggregatorJsons.push(new AggregatorJson(aggregator));
            }
        }
        return aggregatorJsons;
    }
    toJSON() {
        return {
            name: this.name,
            metadata: this.metadata,
            batchSize: this.batchSize,
            minRequiredOracleResults: this.minRequiredOracleResults,
            minRequiredJobResults: this.minRequiredJobResults,
            minUpdateDelaySeconds: this.minUpdateDelaySeconds,
            startAfter: this.startAfter,
            expiration: this.expiration,
            varianceThreshold: this.varianceThreshold,
            forceReportPeriod: this.forceReportPeriod,
            historyLimit: this.historyLimit,
            disableCrank: this.disableCrank,
            slidingWindow: this.slidingWindow,
            basePriorityFee: this.basePriorityFee,
            priorityFeeBump: this.priorityFeeBump,
            priorityFeeBumpPeriod: this.priorityFeeBumpPeriod,
            maxPriorityFeeMultiplier: this.maxPriorityFeeMultiplier,
            fundAmount: this.fundAmount,
            keypair: (0, utils_2.keypairToString)(this.keypair),
            authority: this.authority ? (0, utils_2.keypairToString)(this.authority) : undefined,
            jobs: this.jobs.map(job => job.toJSON()),
        };
    }
}
exports.AggregatorJson = AggregatorJson;
//# sourceMappingURL=aggregator.js.map