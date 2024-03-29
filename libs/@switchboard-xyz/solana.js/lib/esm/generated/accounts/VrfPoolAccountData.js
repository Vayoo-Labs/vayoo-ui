import { PublicKey } from '@solana/web3.js';
import * as borsh from '@coral-xyz/borsh'; // eslint-disable-line @typescript-eslint/no-unused-vars
export class VrfPoolAccountData {
    constructor(fields) {
        this.authority = fields.authority;
        this.queue = fields.queue;
        this.escrow = fields.escrow;
        this.minInterval = fields.minInterval;
        this.maxRows = fields.maxRows;
        this.size = fields.size;
        this.idx = fields.idx;
        this.stateBump = fields.stateBump;
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
        if (!data.slice(0, 8).equals(VrfPoolAccountData.discriminator)) {
            throw new Error('invalid account discriminator');
        }
        const dec = VrfPoolAccountData.layout.decode(data.slice(8));
        return new VrfPoolAccountData({
            authority: dec.authority,
            queue: dec.queue,
            escrow: dec.escrow,
            minInterval: dec.minInterval,
            maxRows: dec.maxRows,
            size: dec.size,
            idx: dec.idx,
            stateBump: dec.stateBump,
            ebuf: dec.ebuf,
        });
    }
    toJSON() {
        return {
            authority: this.authority.toString(),
            queue: this.queue.toString(),
            escrow: this.escrow.toString(),
            minInterval: this.minInterval,
            maxRows: this.maxRows,
            size: this.size,
            idx: this.idx,
            stateBump: this.stateBump,
            ebuf: this.ebuf,
        };
    }
    static fromJSON(obj) {
        return new VrfPoolAccountData({
            authority: new PublicKey(obj.authority),
            queue: new PublicKey(obj.queue),
            escrow: new PublicKey(obj.escrow),
            minInterval: obj.minInterval,
            maxRows: obj.maxRows,
            size: obj.size,
            idx: obj.idx,
            stateBump: obj.stateBump,
            ebuf: obj.ebuf,
        });
    }
}
VrfPoolAccountData.discriminator = Buffer.from([
    86, 67, 58, 9, 46, 21, 101, 248,
]);
VrfPoolAccountData.layout = borsh.struct([
    borsh.publicKey('authority'),
    borsh.publicKey('queue'),
    borsh.publicKey('escrow'),
    borsh.u32('minInterval'),
    borsh.u32('maxRows'),
    borsh.u32('size'),
    borsh.u32('idx'),
    borsh.u8('stateBump'),
    borsh.array(borsh.u8(), 135, 'ebuf'),
]);
//# sourceMappingURL=VrfPoolAccountData.js.map