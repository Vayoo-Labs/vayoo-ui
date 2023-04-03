import * as borsh from '@coral-xyz/borsh'; // eslint-disable-line @typescript-eslint/no-unused-vars
export class RealmSpawnRecordAccountData {
    constructor(fields) {
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
        if (!data.slice(0, 8).equals(RealmSpawnRecordAccountData.discriminator)) {
            throw new Error('invalid account discriminator');
        }
        const dec = RealmSpawnRecordAccountData.layout.decode(data.slice(8));
        return new RealmSpawnRecordAccountData({
            ebuf: dec.ebuf,
        });
    }
    toJSON() {
        return {
            ebuf: this.ebuf,
        };
    }
    static fromJSON(obj) {
        return new RealmSpawnRecordAccountData({
            ebuf: obj.ebuf,
        });
    }
}
RealmSpawnRecordAccountData.discriminator = Buffer.from([
    229, 116, 99, 2, 145, 96, 5, 95,
]);
RealmSpawnRecordAccountData.layout = borsh.struct([borsh.array(borsh.u8(), 256, 'ebuf')]);
//# sourceMappingURL=RealmSpawnRecordAccountData.js.map