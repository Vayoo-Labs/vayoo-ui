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
exports.Callback = void 0;
const web3_js_1 = require("@solana/web3.js"); // eslint-disable-line @typescript-eslint/no-unused-vars
const types = __importStar(require("../types")); // eslint-disable-line @typescript-eslint/no-unused-vars
const borsh = __importStar(require("@coral-xyz/borsh"));
class Callback {
    constructor(fields) {
        this.programId = fields.programId;
        this.accounts = fields.accounts.map(item => new types.AccountMetaBorsh({ ...item }));
        this.ixData = fields.ixData;
    }
    static layout(property) {
        return borsh.struct([
            borsh.publicKey('programId'),
            borsh.vec(types.AccountMetaBorsh.layout(), 'accounts'),
            borsh.vecU8('ixData'),
        ], property);
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    static fromDecoded(obj) {
        return new Callback({
            programId: obj.programId,
            accounts: obj.accounts.map((item /* eslint-disable-line @typescript-eslint/no-explicit-any */) => types.AccountMetaBorsh.fromDecoded(item)),
            ixData: new Uint8Array(obj.ixData.buffer, obj.ixData.byteOffset, obj.ixData.length),
        });
    }
    static toEncodable(fields) {
        return {
            programId: fields.programId,
            accounts: fields.accounts.map(item => types.AccountMetaBorsh.toEncodable(item)),
            ixData: Buffer.from(fields.ixData.buffer, fields.ixData.byteOffset, fields.ixData.length),
        };
    }
    toJSON() {
        return {
            programId: this.programId.toString(),
            accounts: this.accounts.map(item => item.toJSON()),
            ixData: Array.from(this.ixData.values()),
        };
    }
    static fromJSON(obj) {
        return new Callback({
            programId: new web3_js_1.PublicKey(obj.programId),
            accounts: obj.accounts.map(item => types.AccountMetaBorsh.fromJSON(item)),
            ixData: Uint8Array.from(obj.ixData),
        });
    }
    toEncodable() {
        return Callback.toEncodable(this);
    }
}
exports.Callback = Callback;
//# sourceMappingURL=Callback.js.map