import { PublicKey } from '@solana/web3.js';
import { BN } from '@switchboard-xyz/common'; // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from '@coral-xyz/borsh'; // eslint-disable-line @typescript-eslint/no-unused-vars
export class PermissionAccountData {
    constructor(fields) {
        this.authority = fields.authority;
        this.permissions = fields.permissions;
        this.granter = fields.granter;
        this.grantee = fields.grantee;
        this.expiration = fields.expiration;
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
        if (!data.slice(0, 8).equals(PermissionAccountData.discriminator)) {
            throw new Error('invalid account discriminator');
        }
        const dec = PermissionAccountData.layout.decode(data.slice(8));
        return new PermissionAccountData({
            authority: dec.authority,
            permissions: dec.permissions,
            granter: dec.granter,
            grantee: dec.grantee,
            expiration: dec.expiration,
            bump: dec.bump,
            ebuf: dec.ebuf,
        });
    }
    toJSON() {
        return {
            authority: this.authority.toString(),
            permissions: this.permissions,
            granter: this.granter.toString(),
            grantee: this.grantee.toString(),
            expiration: this.expiration.toString(),
            bump: this.bump,
            ebuf: this.ebuf,
        };
    }
    static fromJSON(obj) {
        return new PermissionAccountData({
            authority: new PublicKey(obj.authority),
            permissions: obj.permissions,
            granter: new PublicKey(obj.granter),
            grantee: new PublicKey(obj.grantee),
            expiration: new BN(obj.expiration),
            bump: obj.bump,
            ebuf: obj.ebuf,
        });
    }
}
PermissionAccountData.discriminator = Buffer.from([
    77, 37, 177, 164, 38, 39, 34, 109,
]);
PermissionAccountData.layout = borsh.struct([
    borsh.publicKey('authority'),
    borsh.u32('permissions'),
    borsh.publicKey('granter'),
    borsh.publicKey('grantee'),
    borsh.i64('expiration'),
    borsh.u8('bump'),
    borsh.array(borsh.u8(), 255, 'ebuf'),
]);
//# sourceMappingURL=PermissionAccountData.js.map