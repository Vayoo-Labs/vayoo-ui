"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NetworkJSON = void 0;
const aggregator_1 = require("./aggregator");
const crank_1 = require("./crank");
const oracle_1 = require("./oracle");
const queue_1 = require("./queue");
const vrf_1 = require("./vrf");
class NetworkJSON {
    constructor(object) {
        if (!('queue' in object) && typeof object.queue === 'object') {
            throw new Error(`NetworkJson is missing queue object`);
        }
        this.queue = new queue_1.QueueJson(object.queue);
        // resources
        this.cranks = crank_1.CrankJson.loadMultiple(object);
        this.oracles = oracle_1.OracleJson.loadMultiple(object);
        this.aggregators = aggregator_1.AggregatorJson.loadMultiple(object);
        this.vrfs = vrf_1.VrfJson.loadMultiple(object);
    }
    toJSON() {
        return {
            queue: this.queue.toJSON(),
            cranks: this.cranks.map(crank => crank.toJSON()),
            oracles: this.oracles.map(oracle => oracle.toJSON()),
            aggregators: this.aggregators.map(aggregator => aggregator.toJSON()),
            vrfs: this.vrfs.map(vrf => vrf.toJSON()),
        };
    }
}
exports.NetworkJSON = NetworkJSON;
//# sourceMappingURL=network.js.map