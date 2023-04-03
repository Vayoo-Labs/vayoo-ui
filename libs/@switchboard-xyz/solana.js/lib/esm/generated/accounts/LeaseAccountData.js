import { PublicKey } from '@solana/web3.js';
import { BN } from '@switchboard-xyz/common'; // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from '@coral-xyz/borsh'; // eslint-disable-line @typescript-eslint/no-unused-vars
/** This should be any ccount that links a permission to an escrow */
export class LeaseAccountData {
    constructor(fields) {
        this.escrow = fields.escrow;
        this.queue = fields.queue;
        this.aggregator = fields.aggregator;
        this.tokenProgram = fields.tokenProgram;
        this.isActive = fields.isActive;
        this.crankRowCount = fields.crankRowCount;
        this.createdAt = fields.createdAt;
        this.updateCount = fields.updateCount;
        this.withdrawAuthority = fields.withdrawAuthority;
        this.bump = fields.bump;
        this.ebuf = fields.ebuf;
    }
    static async fetch(program, address) {
        const info = await program.connection.getAccountInfo(address);
        if (info === null) {
            return null;
        }
        if (!info.owner.equals(program.programId)) {
            throw new Error("account doesn't belong to this program");
        }
        return this.decode(info.data);
    }
    static async fetchMultiple(program, addresses) {
        const infos = await program.connection.getMultipleAccountsInfo(addresses);
        return infos.map(info => {
            if (info === null) {
                return null;
            }
            if (!info.owner.equals(program.programId)) {
                throw new Error("account doesn't belong to this program");
            }
            return this.decode(info.data);
        });
    }
    static decode(data) {
        if (!data.slice(0, 8).equals(LeaseAccountData.discriminator)) {
            throw new Error('invalid account discriminator');
        }
        const dec = LeaseAccountData.layout.decode(data.slice(8));
        return new LeaseAccountData({
            escrow: dec.escrow,
            queue: dec.queue,
            aggregator: dec.aggregator,
            tokenProgram: dec.tokenProgram,
            isActive: dec.isActive,
            crankRowCount: dec.crankRowCount,
            createdAt: dec.createdAt,
            updateCount: dec.updateCount,
            withdrawAuthority: dec.withdrawAuthority,
            bump: dec.bump,
            ebuf: dec.ebuf,
        });
    }
    toJSON() {
        return {
            escrow: this.escrow.toString(),
            queue: this.queue.toString(),
            aggregator: this.aggregator.toString(),
            tokenProgram: this.tokenProgram.toString(),
            isActive: this.isActive,
            crankRowCount: this.crankRowCount,
            createdAt: this.createdAt.toString(),
            updateCount: this.updateCount.toString(),
            withdrawAuthority: this.withdrawAuthority.toString(),
            bump: this.bump,
            ebuf: this.ebuf,
        };
    }
    static fromJSON(obj) {
        return new LeaseAccountData({
            escrow: new PublicKey(obj.escrow),
            queue: new PublicKey(obj.queue),
            aggregator: new PublicKey(obj.aggregator),
            tokenProgram: new PublicKey(obj.tokenProgram),
            isActive: obj.isActive,
            crankRowCount: obj.crankRowCount,
            createdAt: new BN(obj.createdAt),
            updateCount: new BN(obj.updateCount),
            withdrawAuthority: new PublicKey(obj.withdrawAuthority),
            bump: obj.bump,
            ebuf: obj.ebuf,
        });
    }
}
LeaseAccountData.discriminator = Buffer.from([
    55, 254, 208, 251, 164, 44, 150, 50,
]);
LeaseAccountData.layout = borsh.struct([
    borsh.publicKey('escrow'),
    borsh.publicKey('queue'),
    borsh.publicKey('aggregator'),
    borsh.publicKey('tokenProgram'),
    borsh.bool('isActive'),
    borsh.u32('crankRowCount'),
    borsh.i64('createdAt'),
    borsh.u128('updateCount'),
    borsh.publicKey('withdrawAuthority'),
    borsh.u8('bump'),
    borsh.array(borsh.u8(), 255, 'ebuf'),
]);
//# sourceMappingURL=LeaseAccountData.js.map