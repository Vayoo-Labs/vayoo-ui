import { PublicKey } from '@solana/web3.js';
import { BN } from '@switchboard-xyz/common'; // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from '@coral-xyz/borsh'; // eslint-disable-line @typescript-eslint/no-unused-vars
export class JobAccountData {
    constructor(fields) {
        this.name = fields.name;
        this.metadata = fields.metadata;
        this.authority = fields.authority;
        this.expiration = fields.expiration;
        this.hash = fields.hash;
        this.data = fields.data;
        this.referenceCount = fields.referenceCount;
        this.totalSpent = fields.totalSpent;
        this.createdAt = fields.createdAt;
        this.isInitializing = fields.isInitializing;
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
        if (!data.slice(0, 8).equals(JobAccountData.discriminator)) {
            throw new Error('invalid account discriminator');
        }
        const dec = JobAccountData.layout.decode(data.slice(8));
        return new JobAccountData({
            name: dec.name,
            metadata: dec.metadata,
            authority: dec.authority,
            expiration: dec.expiration,
            hash: dec.hash,
            data: new Uint8Array(dec.data.buffer, dec.data.byteOffset, dec.data.length),
            referenceCount: dec.referenceCount,
            totalSpent: dec.totalSpent,
            createdAt: dec.createdAt,
            isInitializing: dec.isInitializing,
        });
    }
    toJSON() {
        return {
            name: this.name,
            metadata: this.metadata,
            authority: this.authority.toString(),
            expiration: this.expiration.toString(),
            hash: this.hash,
            data: Array.from(this.data.values()),
            referenceCount: this.referenceCount,
            totalSpent: this.totalSpent.toString(),
            createdAt: this.createdAt.toString(),
            isInitializing: this.isInitializing,
        };
    }
    static fromJSON(obj) {
        return new JobAccountData({
            name: obj.name,
            metadata: obj.metadata,
            authority: new PublicKey(obj.authority),
            expiration: new BN(obj.expiration),
            hash: obj.hash,
            data: Uint8Array.from(obj.data),
            referenceCount: obj.referenceCount,
            totalSpent: new BN(obj.totalSpent),
            createdAt: new BN(obj.createdAt),
            isInitializing: obj.isInitializing,
        });
    }
}
JobAccountData.discriminator = Buffer.from([
    124, 69, 101, 195, 229, 218, 144, 63,
]);
JobAccountData.layout = borsh.struct([
    borsh.array(borsh.u8(), 32, 'name'),
    borsh.array(borsh.u8(), 64, 'metadata'),
    borsh.publicKey('authority'),
    borsh.i64('expiration'),
    borsh.array(borsh.u8(), 32, 'hash'),
    borsh.vecU8('data'),
    borsh.u32('referenceCount'),
    borsh.u64('totalSpent'),
    borsh.i64('createdAt'),
    borsh.u8('isInitializing'),
]);
//# sourceMappingURL=JobAccountData.js.map