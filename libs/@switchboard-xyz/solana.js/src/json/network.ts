import { AggregatorJson } from './aggregator';
import { CrankJson } from './crank';
import { OracleJson } from './oracle';
import { QueueJson } from './queue';
import { VrfJson } from './vrf';

export class NetworkJSON {
  queue: QueueJson;

  // resources
  cranks: Array<CrankJson>;
  oracles: Array<OracleJson>;
  aggregators: Array<AggregatorJson>;
  vrfs: Array<VrfJson>;

  constructor(object: Record<string, any>) {
    if (!('queue' in object) && typeof object.queue === 'object') {
      throw new Error(`NetworkJson is missing queue object`);
    }

    this.queue = new QueueJson(object.queue);

    // resources
    this.cranks = CrankJson.loadMultiple(object);
    this.oracles = OracleJson.loadMultiple(object);
    this.aggregators = AggregatorJson.loadMultiple(object);
    this.vrfs = VrfJson.loadMultiple(object);
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
