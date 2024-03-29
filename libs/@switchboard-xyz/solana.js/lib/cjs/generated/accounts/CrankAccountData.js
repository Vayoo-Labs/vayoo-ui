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
exports.CrankAccountData = void 0;
const web3_js_1 = require("@solana/web3.js");
const borsh = __importStar(require("@coral-xyz/borsh")); // eslint-disable-line @typescript-eslint/no-unused-vars
class CrankAccountData {
    constructor(fields) {
        this.name = fields.name;
        this.metadata = fields.metadata;
        this.queuePubkey = fields.queuePubkey;
        this.pqSize = fields.pqSize;
        this.maxRows = fields.maxRows;
        this.jitterModifier = fields.jitterModifier;
        this.ebuf = fields.ebuf;
        this.dataBuffer = fields.dataBuffer;
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
        if (!data.slice(0, 8).equals(CrankAccountData.discriminator)) {
            throw new Error('invalid account discriminator');
        }
        const dec = CrankAccountData.layout.decode(data.slice(8));
        return new CrankAccountData({
            name: dec.name,
            metadata: dec.metadata,
            queuePubkey: dec.queuePubkey,
            pqSize: dec.pqSize,
            maxRows: dec.maxRows,
            jitterModifier: dec.jitterModifier,
            ebuf: dec.ebuf,
            dataBuffer: dec.dataBuffer,
        });
    }
    toJSON() {
        return {
            name: this.name,
            metadata: this.metadata,
            queuePubkey: this.queuePubkey.toString(),
            pqSize: this.pqSize,
            maxRows: this.maxRows,
            jitterModifier: this.jitterModifier,
            ebuf: this.ebuf,
            dataBuffer: this.dataBuffer.toString(),
        };
    }
    static fromJSON(obj) {
        return new CrankAccountData({
            name: obj.name,
            metadata: obj.metadata,
            queuePubkey: new web3_js_1.PublicKey(obj.queuePubkey),
            pqSize: obj.pqSize,
            maxRows: obj.maxRows,
            jitterModifier: obj.jitterModifier,
            ebuf: obj.ebuf,
            dataBuffer: new web3_js_1.PublicKey(obj.dataBuffer),
        });
    }
}
exports.CrankAccountData = CrankAccountData;
CrankAccountData.discriminator = Buffer.from([
    111, 81, 146, 73, 172, 180, 134, 209,
]);
CrankAccountData.layout = borsh.struct([
    borsh.array(borsh.u8(), 32, 'name'),
    borsh.array(borsh.u8(), 64, 'metadata'),
    borsh.publicKey('queuePubkey'),
    borsh.u32('pqSize'),
    borsh.u32('maxRows'),
    borsh.u8('jitterModifier'),
    borsh.array(borsh.u8(), 255, 'ebuf'),
    borsh.publicKey('dataBuffer'),
]);
//# sourceMappingURL=CrankAccountData.js.map