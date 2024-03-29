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
exports.VrfPoolAccountData = void 0;
const web3_js_1 = require("@solana/web3.js");
const borsh = __importStar(require("@coral-xyz/borsh")); // eslint-disable-line @typescript-eslint/no-unused-vars
class VrfPoolAccountData {
    constructor(fields) {
        this.authority = fields.authority;
        this.queue = fields.queue;
        this.escrow = fields.escrow;
        this.minInterval = fields.minInterval;
        this.maxRows = fields.maxRows;
        this.size = fields.size;
        this.idx = fields.idx;
        this.stateBump = fields.stateBump;
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
        if (!data.slice(0, 8).equals(VrfPoolAccountData.discriminator)) {
            throw new Error('invalid account discriminator');
        }
        const dec = VrfPoolAccountData.layout.decode(data.slice(8));
        return new VrfPoolAccountData({
            authority: dec.authority,
            queue: dec.queue,
            escrow: dec.escrow,
            minInterval: dec.minInterval,
            maxRows: dec.maxRows,
            size: dec.size,
            idx: dec.idx,
            stateBump: dec.stateBump,
            ebuf: dec.ebuf,
        });
    }
    toJSON() {
        return {
            authority: this.authority.toString(),
            queue: this.queue.toString(),
            escrow: this.escrow.toString(),
            minInterval: this.minInterval,
            maxRows: this.maxRows,
            size: this.size,
            idx: this.idx,
            stateBump: this.stateBump,
            ebuf: this.ebuf,
        };
    }
    static fromJSON(obj) {
        return new VrfPoolAccountData({
            authority: new web3_js_1.PublicKey(obj.authority),
            queue: new web3_js_1.PublicKey(obj.queue),
            escrow: new web3_js_1.PublicKey(obj.escrow),
            minInterval: obj.minInterval,
            maxRows: obj.maxRows,
            size: obj.size,
            idx: obj.idx,
            stateBump: obj.stateBump,
            ebuf: obj.ebuf,
        });
    }
}
exports.VrfPoolAccountData = VrfPoolAccountData;
VrfPoolAccountData.discriminator = Buffer.from([
    86, 67, 58, 9, 46, 21, 101, 248,
]);
VrfPoolAccountData.layout = borsh.struct([
    borsh.publicKey('authority'),
    borsh.publicKey('queue'),
    borsh.publicKey('escrow'),
    borsh.u32('minInterval'),
    borsh.u32('maxRows'),
    borsh.u32('size'),
    borsh.u32('idx'),
    borsh.u8('stateBump'),
    borsh.array(borsh.u8(), 135, 'ebuf'),
]);
//# sourceMappingURL=VrfPoolAccountData.js.map