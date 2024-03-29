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
exports.VrfAccountData = void 0;
const web3_js_1 = require("@solana/web3.js");
const common_1 = require("@switchboard-xyz/common"); // eslint-disable-line @typescript-eslint/no-unused-vars
const borsh = __importStar(require("@coral-xyz/borsh")); // eslint-disable-line @typescript-eslint/no-unused-vars
const types = __importStar(require("../types")); // eslint-disable-line @typescript-eslint/no-unused-vars
class VrfAccountData {
    constructor(fields) {
        this.status = fields.status;
        this.counter = fields.counter;
        this.authority = fields.authority;
        this.oracleQueue = fields.oracleQueue;
        this.escrow = fields.escrow;
        this.callback = new types.CallbackZC({ ...fields.callback });
        this.batchSize = fields.batchSize;
        this.builders = fields.builders.map(item => new types.VrfBuilder({ ...item }));
        this.buildersLen = fields.buildersLen;
        this.testMode = fields.testMode;
        this.currentRound = new types.VrfRound({ ...fields.currentRound });
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
        if (!data.slice(0, 8).equals(VrfAccountData.discriminator)) {
            throw new Error('invalid account discriminator');
        }
        const dec = VrfAccountData.layout.decode(data.slice(8));
        return new VrfAccountData({
            status: types.VrfStatus.fromDecoded(dec.status),
            counter: dec.counter,
            authority: dec.authority,
            oracleQueue: dec.oracleQueue,
            escrow: dec.escrow,
            callback: types.CallbackZC.fromDecoded(dec.callback),
            batchSize: dec.batchSize,
            builders: dec.builders.map((item /* eslint-disable-line @typescript-eslint/no-explicit-any */) => types.VrfBuilder.fromDecoded(item)),
            buildersLen: dec.buildersLen,
            testMode: dec.testMode,
            currentRound: types.VrfRound.fromDecoded(dec.currentRound),
            ebuf: dec.ebuf,
        });
    }
    toJSON() {
        return {
            status: this.status.toJSON(),
            counter: this.counter.toString(),
            authority: this.authority.toString(),
            oracleQueue: this.oracleQueue.toString(),
            escrow: this.escrow.toString(),
            callback: this.callback.toJSON(),
            batchSize: this.batchSize,
            builders: this.builders.map(item => item.toJSON()),
            buildersLen: this.buildersLen,
            testMode: this.testMode,
            currentRound: this.currentRound.toJSON(),
            ebuf: this.ebuf,
        };
    }
    static fromJSON(obj) {
        return new VrfAccountData({
            status: types.VrfStatus.fromJSON(obj.status),
            counter: new common_1.BN(obj.counter),
            authority: new web3_js_1.PublicKey(obj.authority),
            oracleQueue: new web3_js_1.PublicKey(obj.oracleQueue),
            escrow: new web3_js_1.PublicKey(obj.escrow),
            callback: types.CallbackZC.fromJSON(obj.callback),
            batchSize: obj.batchSize,
            builders: obj.builders.map(item => types.VrfBuilder.fromJSON(item)),
            buildersLen: obj.buildersLen,
            testMode: obj.testMode,
            currentRound: types.VrfRound.fromJSON(obj.currentRound),
            ebuf: obj.ebuf,
        });
    }
}
exports.VrfAccountData = VrfAccountData;
VrfAccountData.discriminator = Buffer.from([
    101, 35, 62, 239, 103, 151, 6, 18,
]);
VrfAccountData.layout = borsh.struct([
    types.VrfStatus.layout('status'),
    borsh.u128('counter'),
    borsh.publicKey('authority'),
    borsh.publicKey('oracleQueue'),
    borsh.publicKey('escrow'),
    types.CallbackZC.layout('callback'),
    borsh.u32('batchSize'),
    borsh.array(types.VrfBuilder.layout(), 8, 'builders'),
    borsh.u32('buildersLen'),
    borsh.bool('testMode'),
    types.VrfRound.layout('currentRound'),
    borsh.array(borsh.u8(), 1024, 'ebuf'),
]);
//# sourceMappingURL=VrfAccountData.js.map