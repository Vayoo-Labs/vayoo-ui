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
exports.BufferRelayerAccountData = void 0;
const web3_js_1 = require("@solana/web3.js");
const borsh = __importStar(require("@coral-xyz/borsh")); // eslint-disable-line @typescript-eslint/no-unused-vars
const types = __importStar(require("../types")); // eslint-disable-line @typescript-eslint/no-unused-vars
class BufferRelayerAccountData {
    constructor(fields) {
        this.name = fields.name;
        this.queuePubkey = fields.queuePubkey;
        this.escrow = fields.escrow;
        this.authority = fields.authority;
        this.jobPubkey = fields.jobPubkey;
        this.jobHash = fields.jobHash;
        this.minUpdateDelaySeconds = fields.minUpdateDelaySeconds;
        this.isLocked = fields.isLocked;
        this.currentRound = new types.BufferRelayerRound({
            ...fields.currentRound,
        });
        this.latestConfirmedRound = new types.BufferRelayerRound({
            ...fields.latestConfirmedRound,
        });
        this.result = fields.result;
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
        if (!data.slice(0, 8).equals(BufferRelayerAccountData.discriminator)) {
            throw new Error('invalid account discriminator');
        }
        const dec = BufferRelayerAccountData.layout.decode(data.slice(8));
        return new BufferRelayerAccountData({
            name: dec.name,
            queuePubkey: dec.queuePubkey,
            escrow: dec.escrow,
            authority: dec.authority,
            jobPubkey: dec.jobPubkey,
            jobHash: dec.jobHash,
            minUpdateDelaySeconds: dec.minUpdateDelaySeconds,
            isLocked: dec.isLocked,
            currentRound: types.BufferRelayerRound.fromDecoded(dec.currentRound),
            latestConfirmedRound: types.BufferRelayerRound.fromDecoded(dec.latestConfirmedRound),
            result: new Uint8Array(dec.result.buffer, dec.result.byteOffset, dec.result.length),
        });
    }
    toJSON() {
        return {
            name: this.name,
            queuePubkey: this.queuePubkey.toString(),
            escrow: this.escrow.toString(),
            authority: this.authority.toString(),
            jobPubkey: this.jobPubkey.toString(),
            jobHash: this.jobHash,
            minUpdateDelaySeconds: this.minUpdateDelaySeconds,
            isLocked: this.isLocked,
            currentRound: this.currentRound.toJSON(),
            latestConfirmedRound: this.latestConfirmedRound.toJSON(),
            result: Array.from(this.result.values()),
        };
    }
    static fromJSON(obj) {
        return new BufferRelayerAccountData({
            name: obj.name,
            queuePubkey: new web3_js_1.PublicKey(obj.queuePubkey),
            escrow: new web3_js_1.PublicKey(obj.escrow),
            authority: new web3_js_1.PublicKey(obj.authority),
            jobPubkey: new web3_js_1.PublicKey(obj.jobPubkey),
            jobHash: obj.jobHash,
            minUpdateDelaySeconds: obj.minUpdateDelaySeconds,
            isLocked: obj.isLocked,
            currentRound: types.BufferRelayerRound.fromJSON(obj.currentRound),
            latestConfirmedRound: types.BufferRelayerRound.fromJSON(obj.latestConfirmedRound),
            result: Uint8Array.from(obj.result),
        });
    }
}
exports.BufferRelayerAccountData = BufferRelayerAccountData;
BufferRelayerAccountData.discriminator = Buffer.from([
    50, 35, 51, 115, 169, 219, 158, 52,
]);
BufferRelayerAccountData.layout = borsh.struct([
    borsh.array(borsh.u8(), 32, 'name'),
    borsh.publicKey('queuePubkey'),
    borsh.publicKey('escrow'),
    borsh.publicKey('authority'),
    borsh.publicKey('jobPubkey'),
    borsh.array(borsh.u8(), 32, 'jobHash'),
    borsh.u32('minUpdateDelaySeconds'),
    borsh.bool('isLocked'),
    types.BufferRelayerRound.layout('currentRound'),
    types.BufferRelayerRound.layout('latestConfirmedRound'),
    borsh.vecU8('result'),
]);
//# sourceMappingURL=BufferRelayerAccountData.js.map