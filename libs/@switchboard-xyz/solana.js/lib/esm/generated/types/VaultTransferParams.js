import { BN } from '@switchboard-xyz/common'; // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from '@coral-xyz/borsh';
export class VaultTransferParams {
    constructor(fields) {
        this.stateBump = fields.stateBump;
        this.amount = fields.amount;
    }
    static layout(property) {
        return borsh.struct([borsh.u8('stateBump'), borsh.u64('amount')], property);
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    static fromDecoded(obj) {
        return new VaultTransferParams({
            stateBump: obj.stateBump,
            amount: obj.amount,
        });
    }
    static toEncodable(fields) {
        return {
            stateBump: fields.stateBump,
            amount: fields.amount,
        };
    }
    toJSON() {
        return {
            stateBump: this.stateBump,
            amount: this.amount.toString(),
        };
    }
    static fromJSON(obj) {
        return new VaultTransferParams({
            stateBump: obj.stateBump,
            amount: new BN(obj.amount),
        });
    }
    toEncodable() {
        return VaultTransferParams.toEncodable(this);
    }
}
//# sourceMappingURL=VaultTransferParams.js.map