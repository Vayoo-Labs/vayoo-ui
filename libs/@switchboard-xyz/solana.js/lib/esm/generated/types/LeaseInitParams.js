import { PublicKey } from '@solana/web3.js'; // eslint-disable-line @typescript-eslint/no-unused-vars
import { BN } from '@switchboard-xyz/common'; // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from '@coral-xyz/borsh';
export class LeaseInitParams {
    constructor(fields) {
        this.loadAmount = fields.loadAmount;
        this.withdrawAuthority = fields.withdrawAuthority;
        this.leaseBump = fields.leaseBump;
        this.stateBump = fields.stateBump;
        this.walletBumps = fields.walletBumps;
    }
    static layout(property) {
        return borsh.struct([
            borsh.u64('loadAmount'),
            borsh.publicKey('withdrawAuthority'),
            borsh.u8('leaseBump'),
            borsh.u8('stateBump'),
            borsh.vecU8('walletBumps'),
        ], property);
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    static fromDecoded(obj) {
        return new LeaseInitParams({
            loadAmount: obj.loadAmount,
            withdrawAuthority: obj.withdrawAuthority,
            leaseBump: obj.leaseBump,
            stateBump: obj.stateBump,
            walletBumps: new Uint8Array(obj.walletBumps.buffer, obj.walletBumps.byteOffset, obj.walletBumps.length),
        });
    }
    static toEncodable(fields) {
        return {
            loadAmount: fields.loadAmount,
            withdrawAuthority: fields.withdrawAuthority,
            leaseBump: fields.leaseBump,
            stateBump: fields.stateBump,
            walletBumps: Buffer.from(fields.walletBumps.buffer, fields.walletBumps.byteOffset, fields.walletBumps.length),
        };
    }
    toJSON() {
        return {
            loadAmount: this.loadAmount.toString(),
            withdrawAuthority: this.withdrawAuthority.toString(),
            leaseBump: this.leaseBump,
            stateBump: this.stateBump,
            walletBumps: Array.from(this.walletBumps.values()),
        };
    }
    static fromJSON(obj) {
        return new LeaseInitParams({
            loadAmount: new BN(obj.loadAmount),
            withdrawAuthority: new PublicKey(obj.withdrawAuthority),
            leaseBump: obj.leaseBump,
            stateBump: obj.stateBump,
            walletBumps: Uint8Array.from(obj.walletBumps),
        });
    }
    toEncodable() {
        return LeaseInitParams.toEncodable(this);
    }
}
//# sourceMappingURL=LeaseInitParams.js.map