"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SbState = void 0;
const web3_js_1 = require("@solana/web3.js");
const borsh = __importStar(require("@coral-xyz/borsh")); // eslint-disable-line @typescript-eslint/no-unused-vars
class SbState {
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
            authority: new web3_js_1.PublicKey(obj.authority),
            tokenMint: new web3_js_1.PublicKey(obj.tokenMint),
            tokenVault: new web3_js_1.PublicKey(obj.tokenVault),
            daoMint: new web3_js_1.PublicKey(obj.daoMint),
            bump: obj.bump,
            ebuf: obj.ebuf,
        });
    }
}
exports.SbState = SbState;
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