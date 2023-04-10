import { PublicKey } from '@solana/web3.js';
import * as borsh from '@coral-xyz/borsh'; // eslint-disable-line @typescript-eslint/no-unused-vars
export class CrankAccountData {
    constructor(fields) {
        this.name = fields.name;
        this.metadata = fields.metadata;
        this.queuePubkey = fields.queuePubkey;
        this.pqSize = fields.pqSize;
        this.maxRows = fields.maxRows;
        this.jitterModifier = fields.jitterModifier;
        this.ebuf = fields.ebuf;
        this.dataBuffer = fields.dataBuffer;
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
        if (!data.slice(0, 8).equals(CrankAccountData.discriminator)) {
            throw new Error('invalid account discriminator');
        }
        const dec = CrankAccountData.layout.decode(data.slice(8));
        return new CrankAccountData({
            name: dec.name,
            metadata: dec.metadata,
            queuePubkey: dec.queuePubkey,
            pqSize: dec.pqSize,
            maxRows: dec.maxRows,
            jitterModifier: dec.jitterModifier,
            ebuf: dec.ebuf,
            dataBuffer: dec.dataBuffer,
        });
    }
    toJSON() {
        return {
            name: this.name,
            metadata: this.metadata,
            queuePubkey: this.queuePubkey.toString(),
            pqSize: this.pqSize,
            maxRows: this.maxRows,
            jitterModifier: this.jitterModifier,
            ebuf: this.ebuf,
            dataBuffer: this.dataBuffer.toString(),
        };
    }
    static fromJSON(obj) {
        return new CrankAccountData({
            name: obj.name,
            metadata: obj.metadata,
            queuePubkey: new PublicKey(obj.queuePubkey),
            pqSize: obj.pqSize,
            maxRows: obj.maxRows,
            jitterModifier: obj.jitterModifier,
            ebuf: obj.ebuf,
            dataBuffer: new PublicKey(obj.dataBuffer),
        });
    }
}
CrankAccountData.discriminator = Buffer.from([
    111, 81, 146, 73, 172, 180, 134, 209,
]);
CrankAccountData.layout = borsh.struct([
    borsh.array(borsh.u8(), 32, 'name'),
    borsh.array(borsh.u8(), 64, 'metadata'),
    borsh.publicKey('queuePubkey'),
    borsh.u32('pqSize'),
    borsh.u32('maxRows'),
    borsh.u8('jitterModifier'),
    borsh.array(borsh.u8(), 255, 'ebuf'),
    borsh.publicKey('dataBuffer'),
]);
//# sourceMappingURL=CrankAccountData.js.map