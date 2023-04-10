import { PublicKey } from '@solana/web3.js';
import { BN } from '@switchboard-xyz/common'; // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from '@coral-xyz/borsh'; // eslint-disable-line @typescript-eslint/no-unused-vars
import * as types from '../types'; // eslint-disable-line @typescript-eslint/no-unused-vars
export class VrfLiteAccountData {
    constructor(fields) {
        this.stateBump = fields.stateBump;
        this.permissionBump = fields.permissionBump;
        this.vrfPool = fields.vrfPool;
        this.status = fields.status;
        this.result = fields.result;
        this.counter = fields.counter;
        this.alpha = fields.alpha;
        this.alphaLen = fields.alphaLen;
        this.requestSlot = fields.requestSlot;
        this.requestTimestamp = fields.requestTimestamp;
        this.authority = fields.authority;
        this.queue = fields.queue;
        this.escrow = fields.escrow;
        this.callback = new types.CallbackZC({ ...fields.callback });
        this.builder = new types.VrfBuilder({ ...fields.builder });
        this.expiration = fields.expiration;
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
        if (!data.slice(0, 8).equals(VrfLiteAccountData.discriminator)) {
            throw new Error('invalid account discriminator');
        }
        const dec = VrfLiteAccountData.layout.decode(data.slice(8));
        return new VrfLiteAccountData({
            stateBump: dec.stateBump,
            permissionBump: dec.permissionBump,
            vrfPool: dec.vrfPool,
            status: types.VrfStatus.fromDecoded(dec.status),
            result: dec.result,
            counter: dec.counter,
            alpha: dec.alpha,
            alphaLen: dec.alphaLen,
            requestSlot: dec.requestSlot,
            requestTimestamp: dec.requestTimestamp,
            authority: dec.authority,
            queue: dec.queue,
            escrow: dec.escrow,
            callback: types.CallbackZC.fromDecoded(dec.callback),
            builder: types.VrfBuilder.fromDecoded(dec.builder),
            expiration: dec.expiration,
            ebuf: dec.ebuf,
        });
    }
    toJSON() {
        return {
            stateBump: this.stateBump,
            permissionBump: this.permissionBump,
            vrfPool: this.vrfPool.toString(),
            status: this.status.toJSON(),
            result: this.result,
            counter: this.counter.toString(),
            alpha: this.alpha,
            alphaLen: this.alphaLen,
            requestSlot: this.requestSlot.toString(),
            requestTimestamp: this.requestTimestamp.toString(),
            authority: this.authority.toString(),
            queue: this.queue.toString(),
            escrow: this.escrow.toString(),
            callback: this.callback.toJSON(),
            builder: this.builder.toJSON(),
            expiration: this.expiration.toString(),
            ebuf: this.ebuf,
        };
    }
    static fromJSON(obj) {
        return new VrfLiteAccountData({
            stateBump: obj.stateBump,
            permissionBump: obj.permissionBump,
            vrfPool: new PublicKey(obj.vrfPool),
            status: types.VrfStatus.fromJSON(obj.status),
            result: obj.result,
            counter: new BN(obj.counter),
            alpha: obj.alpha,
            alphaLen: obj.alphaLen,
            requestSlot: new BN(obj.requestSlot),
            requestTimestamp: new BN(obj.requestTimestamp),
            authority: new PublicKey(obj.authority),
            queue: new PublicKey(obj.queue),
            escrow: new PublicKey(obj.escrow),
            callback: types.CallbackZC.fromJSON(obj.callback),
            builder: types.VrfBuilder.fromJSON(obj.builder),
            expiration: new BN(obj.expiration),
            ebuf: obj.ebuf,
        });
    }
}
VrfLiteAccountData.discriminator = Buffer.from([
    98, 127, 126, 124, 166, 81, 97, 100,
]);
VrfLiteAccountData.layout = borsh.struct([
    borsh.u8('stateBump'),
    borsh.u8('permissionBump'),
    borsh.publicKey('vrfPool'),
    types.VrfStatus.layout('status'),
    borsh.array(borsh.u8(), 32, 'result'),
    borsh.u128('counter'),
    borsh.array(borsh.u8(), 256, 'alpha'),
    borsh.u32('alphaLen'),
    borsh.u64('requestSlot'),
    borsh.i64('requestTimestamp'),
    borsh.publicKey('authority'),
    borsh.publicKey('queue'),
    borsh.publicKey('escrow'),
    types.CallbackZC.layout('callback'),
    types.VrfBuilder.layout('builder'),
    borsh.i64('expiration'),
    borsh.array(borsh.u8(), 1024, 'ebuf'),
]);
//# sourceMappingURL=VrfLiteAccountData.js.map