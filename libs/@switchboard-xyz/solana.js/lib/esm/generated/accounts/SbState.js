import { PublicKey } from '@solana/web3.js';
import * as borsh from '@coral-xyz/borsh'; // eslint-disable-line @typescript-eslint/no-unused-vars
export class SbState {
    constructor(fields) {
        this.authority = fields.authority;
        this.tokenMint = fields.tokenMint;
        this.tokenVault = fields.tokenVault;
        this.daoMint = fields.daoMint;
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
        if (!data.slice(0, 8).equals(SbState.discriminator)) {
            throw new Error('invalid account discriminator');
        }
        const dec = SbState.layout.decode(data.slice(8));
        return new SbState({
            authority: dec.authority,
            tokenMint: dec.tokenMint,
            tokenVault: dec.tokenVault,
            daoMint: dec.daoMint,
            bump: dec.bump,
            ebuf: dec.ebuf,
        });
    }
    toJSON() {
        return {
            authority: this.authority.toString(),
            tokenMint: this.tokenMint.toString(),
            tokenVault: this.tokenVault.toString(),
            daoMint: this.daoMint.toString(),
            bump: this.bump,
            ebuf: this.ebuf,
        };
    }
    static fromJSON(obj) {
        return new SbState({
            authority: new PublicKey(obj.authority),
            tokenMint: new PublicKey(obj.tokenMint),
            tokenVault: new PublicKey(obj.tokenVault),
            daoMint: new PublicKey(obj.daoMint),
            bump: obj.bump,
            ebuf: obj.ebuf,
        });
    }
}
SbState.discriminator = Buffer.from([
    159, 42, 192, 191, 139, 62, 168, 28,
]);
SbState.layout = borsh.struct([
    borsh.publicKey('authority'),
    borsh.publicKey('tokenMint'),
    borsh.publicKey('tokenVault'),
    borsh.publicKey('daoMint'),
    borsh.u8('bump'),
    borsh.array(borsh.u8(), 991, 'ebuf'),
]);
//# sourceMappingURL=SbState.js.map