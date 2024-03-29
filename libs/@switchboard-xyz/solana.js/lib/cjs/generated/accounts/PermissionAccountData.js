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
exports.PermissionAccountData = void 0;
const web3_js_1 = require("@solana/web3.js");
const common_1 = require("@switchboard-xyz/common"); // eslint-disable-line @typescript-eslint/no-unused-vars
const borsh = __importStar(require("@coral-xyz/borsh")); // eslint-disable-line @typescript-eslint/no-unused-vars
class PermissionAccountData {
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
            authority: new web3_js_1.PublicKey(obj.authority),
            permissions: obj.permissions,
            granter: new web3_js_1.PublicKey(obj.granter),
            grantee: new web3_js_1.PublicKey(obj.grantee),
            expiration: new common_1.BN(obj.expiration),
            bump: obj.bump,
            ebuf: obj.ebuf,
        });
    }
}
exports.PermissionAccountData = PermissionAccountData;
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