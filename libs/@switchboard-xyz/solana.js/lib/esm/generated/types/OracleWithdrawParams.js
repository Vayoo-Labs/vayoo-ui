import { BN } from '@switchboard-xyz/common'; // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from '@coral-xyz/borsh';
export class OracleWithdrawParams {
    constructor(fields) {
        this.stateBump = fields.stateBump;
        this.permissionBump = fields.permissionBump;
        this.amount = fields.amount;
    }
    static layout(property) {
        return borsh.struct([borsh.u8('stateBump'), borsh.u8('permissionBump'), borsh.u64('amount')], property);
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    static fromDecoded(obj) {
        return new OracleWithdrawParams({
            stateBump: obj.stateBump,
            permissionBump: obj.permissionBump,
            amount: obj.amount,
        });
    }
    static toEncodable(fields) {
        return {
            stateBump: fields.stateBump,
            permissionBump: fields.permissionBump,
            amount: fields.amount,
        };
    }
    toJSON() {
        return {
            stateBump: this.stateBump,
            permissionBump: this.permissionBump,
            amount: this.amount.toString(),
        };
    }
    static fromJSON(obj) {
        return new OracleWithdrawParams({
            stateBump: obj.stateBump,
            permissionBump: obj.permissionBump,
            amount: new BN(obj.amount),
        });
    }
    toEncodable() {
        return OracleWithdrawParams.toEncodable(this);
    }
}
//# sourceMappingURL=OracleWithdrawParams.js.map