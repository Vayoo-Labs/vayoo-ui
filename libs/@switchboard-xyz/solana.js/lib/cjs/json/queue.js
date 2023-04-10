"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.QueueJson = void 0;
const utils_1 = require("../utils");
const utils_2 = require("./utils");
const web3_js_1 = require("@solana/web3.js");
class QueueJson {
    constructor(object) {
        this.name = (0, utils_2.parseString)(object, 'name', '');
        this.metadata = (0, utils_2.parseString)(object, 'metadata', '');
        this.reward = (0, utils_2.parseNumber)(object, 'reward', 0);
        this.minStake = (0, utils_2.parseNumber)(object, 'minStake', 0);
        this.feedProbationPeriod = (0, utils_2.parseNumber)(object, 'feedProbationPeriod', undefined);
        this.oracleTimeout = (0, utils_2.parseNumber)(object, 'oracleTimeout', undefined);
        this.slashingEnabled = (0, utils_2.parseBoolean)(object, 'slashingEnabled', undefined);
        this.varianceToleranceMultiplier = (0, utils_2.parseNumber)(object, 'varianceToleranceMultiplier', undefined);
        this.consecutiveFeedFailureLimit = (0, utils_2.parseNumber)(object, 'consecutiveFeedFailureLimit', undefined);
        this.consecutiveOracleFailureLimit = (0, utils_2.parseNumber)(object, 'consecutiveOracleFailureLimit', undefined);
        this.queueSize = (0, utils_2.parseNumber)(object, 'queueSize', 100);
        this.unpermissionedFeeds = (0, utils_2.parseBoolean)(object, 'unpermissionedFeeds', undefined);
        this.unpermissionedVrf = (0, utils_2.parseBoolean)(object, 'unpermissionedVrf', false);
        this.enableBufferRelayers = (0, utils_2.parseBoolean)(object, 'enableBufferRelayers', undefined);
        // accounts
        const keypairPath = (0, utils_2.parseString)(object, 'keypair');
        this.keypair = keypairPath ? (0, utils_1.loadKeypair)(keypairPath) : web3_js_1.Keypair.generate();
        const authorityPath = (0, utils_2.parseString)(object, 'authorityKeypair');
        this.authority = authorityPath ? (0, utils_1.loadKeypair)(authorityPath) : undefined;
        const dataBufferPath = (0, utils_2.parseString)(object, 'dataBufferKeypair');
        this.dataBufferKeypair = dataBufferPath
            ? (0, utils_1.loadKeypair)(dataBufferPath)
            : web3_js_1.Keypair.generate();
    }
    toJSON() {
        return {
            name: this.name,
            metadata: this.metadata,
            reward: this.reward,
            minStake: this.minStake,
            feedProbationPeriod: this.feedProbationPeriod,
            oracleTimeout: this.oracleTimeout,
            slashingEnabled: this.slashingEnabled,
            varianceToleranceMultiplier: this.varianceToleranceMultiplier,
            consecutiveFeedFailureLimit: this.consecutiveFeedFailureLimit,
            consecutiveOracleFailureLimit: this.consecutiveOracleFailureLimit,
            queueSize: this.queueSize,
            unpermissionedFeeds: this.unpermissionedFeeds,
            unpermissionedVrf: this.unpermissionedVrf,
            enableBufferRelayers: this.enableBufferRelayers,
            authority: this.authority ? (0, utils_2.keypairToString)(this.authority) : undefined,
            keypair: (0, utils_2.keypairToString)(this.keypair),
            dataBufferKeypair: (0, utils_2.keypairToString)(this.dataBufferKeypair),
        };
    }
}
exports.QueueJson = QueueJson;
//# sourceMappingURL=queue.js.map