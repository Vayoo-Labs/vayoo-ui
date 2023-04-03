import { BN } from '@switchboard-xyz/common'; // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from '@coral-xyz/borsh';
export class OracleQueueSetRewardsParams {
    constructor(fields) {
        this.rewards = fields.rewards;
    }
    static layout(property) {
        return borsh.struct([borsh.u64('rewards')], property);
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    static fromDecoded(obj) {
        return new OracleQueueSetRewardsParams({
            rewards: obj.rewards,
        });
    }
    static toEncodable(fields) {
        return {
            rewards: fields.rewards,
        };
    }
    toJSON() {
        return {
            rewards: this.rewards.toString(),
        };
    }
    static fromJSON(obj) {
        return new OracleQueueSetRewardsParams({
            rewards: new BN(obj.rewards),
        });
    }
    toEncodable() {
        return OracleQueueSetRewardsParams.toEncodable(this);
    }
}
//# sourceMappingURL=OracleQueueSetRewardsParams.js.map