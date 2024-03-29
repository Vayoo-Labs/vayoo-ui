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
exports.JobAccountData = void 0;
const web3_js_1 = require("@solana/web3.js");
const common_1 = require("@switchboard-xyz/common"); // eslint-disable-line @typescript-eslint/no-unused-vars
const borsh = __importStar(require("@coral-xyz/borsh")); // eslint-disable-line @typescript-eslint/no-unused-vars
class JobAccountData {
    constructor(fields) {
        this.name = fields.name;
        this.metadata = fields.metadata;
        this.authority = fields.authority;
        this.expiration = fields.expiration;
        this.hash = fields.hash;
        this.data = fields.data;
        this.referenceCount = fields.referenceCount;
        this.totalSpent = fields.totalSpent;
        this.createdAt = fields.createdAt;
        this.isInitializing = fields.isInitializing;
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
        if (!data.slice(0, 8).equals(JobAccountData.discriminator)) {
            throw new Error('invalid account discriminator');
        }
        const dec = JobAccountData.layout.decode(data.slice(8));
        return new JobAccountData({
            name: dec.name,
            metadata: dec.metadata,
            authority: dec.authority,
            expiration: dec.expiration,
            hash: dec.hash,
            data: new Uint8Array(dec.data.buffer, dec.data.byteOffset, dec.data.length),
            referenceCount: dec.referenceCount,
            totalSpent: dec.totalSpent,
            createdAt: dec.createdAt,
            isInitializing: dec.isInitializing,
        });
    }
    toJSON() {
        return {
            name: this.name,
            metadata: this.metadata,
            authority: this.authority.toString(),
            expiration: this.expiration.toString(),
            hash: this.hash,
            data: Array.from(this.data.values()),
            referenceCount: this.referenceCount,
            totalSpent: this.totalSpent.toString(),
            createdAt: this.createdAt.toString(),
            isInitializing: this.isInitializing,
        };
    }
    static fromJSON(obj) {
        return new JobAccountData({
            name: obj.name,
            metadata: obj.metadata,
            authority: new web3_js_1.PublicKey(obj.authority),
            expiration: new common_1.BN(obj.expiration),
            hash: obj.hash,
            data: Uint8Array.from(obj.data),
            referenceCount: obj.referenceCount,
            totalSpent: new common_1.BN(obj.totalSpent),
            createdAt: new common_1.BN(obj.createdAt),
            isInitializing: obj.isInitializing,
        });
    }
}
exports.JobAccountData = JobAccountData;
JobAccountData.discriminator = Buffer.from([
    124, 69, 101, 195, 229, 218, 144, 63,
]);
JobAccountData.layout = borsh.struct([
    borsh.array(borsh.u8(), 32, 'name'),
    borsh.array(borsh.u8(), 64, 'metadata'),
    borsh.publicKey('authority'),
    borsh.i64('expiration'),
    borsh.array(borsh.u8(), 32, 'hash'),
    borsh.vecU8('data'),
    borsh.u32('referenceCount'),
    borsh.u64('totalSpent'),
    borsh.i64('createdAt'),
    borsh.u8('isInitializing'),
]);
//# sourceMappingURL=JobAccountData.js.map