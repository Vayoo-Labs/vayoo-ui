import { PublicKey } from '@solana/web3.js'; // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from '@coral-xyz/borsh';
export class AccountMetaZC {
    constructor(fields) {
        this.pubkey = fields.pubkey;
        this.isSigner = fields.isSigner;
        this.isWritable = fields.isWritable;
    }
    static layout(property) {
        return borsh.struct([
            borsh.publicKey('pubkey'),
            borsh.bool('isSigner'),
            borsh.bool('isWritable'),
        ], property);
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    static fromDecoded(obj) {
        return new AccountMetaZC({
            pubkey: obj.pubkey,
            isSigner: obj.isSigner,
            isWritable: obj.isWritable,
        });
    }
    static toEncodable(fields) {
        return {
            pubkey: fields.pubkey,
            isSigner: fields.isSigner,
            isWritable: fields.isWritable,
        };
    }
    toJSON() {
        return {
            pubkey: this.pubkey.toString(),
            isSigner: this.isSigner,
            isWritable: this.isWritable,
        };
    }
    static fromJSON(obj) {
        return new AccountMetaZC({
            pubkey: new PublicKey(obj.pubkey),
            isSigner: obj.isSigner,
            isWritable: obj.isWritable,
        });
    }
    toEncodable() {
        return AccountMetaZC.toEncodable(this);
    }
}
//# sourceMappingURL=AccountMetaZC.js.map