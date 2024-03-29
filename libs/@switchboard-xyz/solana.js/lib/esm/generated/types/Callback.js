import { PublicKey } from '@solana/web3.js'; // eslint-disable-line @typescript-eslint/no-unused-vars
import * as types from '../types'; // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from '@coral-xyz/borsh';
export class Callback {
    constructor(fields) {
        this.programId = fields.programId;
        this.accounts = fields.accounts.map(item => new types.AccountMetaBorsh({ ...item }));
        this.ixData = fields.ixData;
    }
    static layout(property) {
        return borsh.struct([
            borsh.publicKey('programId'),
            borsh.vec(types.AccountMetaBorsh.layout(), 'accounts'),
            borsh.vecU8('ixData'),
        ], property);
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    static fromDecoded(obj) {
        return new Callback({
            programId: obj.programId,
            accounts: obj.accounts.map((item /* eslint-disable-line @typescript-eslint/no-explicit-any */) => types.AccountMetaBorsh.fromDecoded(item)),
            ixData: new Uint8Array(obj.ixData.buffer, obj.ixData.byteOffset, obj.ixData.length),
        });
    }
    static toEncodable(fields) {
        return {
            programId: fields.programId,
            accounts: fields.accounts.map(item => types.AccountMetaBorsh.toEncodable(item)),
            ixData: Buffer.from(fields.ixData.buffer, fields.ixData.byteOffset, fields.ixData.length),
        };
    }
    toJSON() {
        return {
            programId: this.programId.toString(),
            accounts: this.accounts.map(item => item.toJSON()),
            ixData: Array.from(this.ixData.values()),
        };
    }
    static fromJSON(obj) {
        return new Callback({
            programId: new PublicKey(obj.programId),
            accounts: obj.accounts.map(item => types.AccountMetaBorsh.fromJSON(item)),
            ixData: Uint8Array.from(obj.ixData),
        });
    }
    toEncodable() {
        return Callback.toEncodable(this);
    }
}
//# sourceMappingURL=Callback.js.map