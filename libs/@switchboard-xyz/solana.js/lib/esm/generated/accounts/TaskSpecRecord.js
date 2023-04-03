import * as borsh from '@coral-xyz/borsh'; // eslint-disable-line @typescript-eslint/no-unused-vars
import * as types from '../types'; // eslint-disable-line @typescript-eslint/no-unused-vars
export class TaskSpecRecord {
    constructor(fields) {
        this.hash = new types.Hash({ ...fields.hash });
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
        if (!data.slice(0, 8).equals(TaskSpecRecord.discriminator)) {
            throw new Error('invalid account discriminator');
        }
        const dec = TaskSpecRecord.layout.decode(data.slice(8));
        return new TaskSpecRecord({
            hash: types.Hash.fromDecoded(dec.hash),
        });
    }
    toJSON() {
        return {
            hash: this.hash.toJSON(),
        };
    }
    static fromJSON(obj) {
        return new TaskSpecRecord({
            hash: types.Hash.fromJSON(obj.hash),
        });
    }
}
TaskSpecRecord.discriminator = Buffer.from([
    202, 10, 194, 236, 111, 47, 234, 48,
]);
TaskSpecRecord.layout = borsh.struct([types.Hash.layout('hash')]);
//# sourceMappingURL=TaskSpecRecord.js.map