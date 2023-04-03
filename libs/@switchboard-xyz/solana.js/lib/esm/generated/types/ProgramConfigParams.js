import { PublicKey } from '@solana/web3.js'; // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from '@coral-xyz/borsh';
export class ProgramConfigParams {
    constructor(fields) {
        this.token = fields.token;
        this.bump = fields.bump;
        this.daoMint = fields.daoMint;
    }
    static layout(property) {
        return borsh.struct([borsh.publicKey('token'), borsh.u8('bump'), borsh.publicKey('daoMint')], property);
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    static fromDecoded(obj) {
        return new ProgramConfigParams({
            token: obj.token,
            bump: obj.bump,
            daoMint: obj.daoMint,
        });
    }
    static toEncodable(fields) {
        return {
            token: fields.token,
            bump: fields.bump,
            daoMint: fields.daoMint,
        };
    }
    toJSON() {
        return {
            token: this.token.toString(),
            bump: this.bump,
            daoMint: this.daoMint.toString(),
        };
    }
    static fromJSON(obj) {
        return new ProgramConfigParams({
            token: new PublicKey(obj.token),
            bump: obj.bump,
            daoMint: new PublicKey(obj.daoMint),
        });
    }
    toEncodable() {
        return ProgramConfigParams.toEncodable(this);
    }
}
//# sourceMappingURL=ProgramConfigParams.js.map