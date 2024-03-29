import { BN } from '@switchboard-xyz/common'; // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from '@coral-xyz/borsh';
export class LeaseWithdrawParams {
    constructor(fields) {
        this.stateBump = fields.stateBump;
        this.leaseBump = fields.leaseBump;
        this.amount = fields.amount;
    }
    static layout(property) {
        return borsh.struct([borsh.u8('stateBump'), borsh.u8('leaseBump'), borsh.u64('amount')], property);
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    static fromDecoded(obj) {
        return new LeaseWithdrawParams({
            stateBump: obj.stateBump,
            leaseBump: obj.leaseBump,
            amount: obj.amount,
        });
    }
    static toEncodable(fields) {
        return {
            stateBump: fields.stateBump,
            leaseBump: fields.leaseBump,
            amount: fields.amount,
        };
    }
    toJSON() {
        return {
            stateBump: this.stateBump,
            leaseBump: this.leaseBump,
            amount: this.amount.toString(),
        };
    }
    static fromJSON(obj) {
        return new LeaseWithdrawParams({
            stateBump: obj.stateBump,
            leaseBump: obj.leaseBump,
            amount: new BN(obj.amount),
        });
    }
    toEncodable() {
        return LeaseWithdrawParams.toEncodable(this);
    }
}
//# sourceMappingURL=LeaseWithdrawParams.js.map