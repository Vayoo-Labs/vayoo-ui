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
exports.CrankRow = void 0;
const web3_js_1 = require("@solana/web3.js"); // eslint-disable-line @typescript-eslint/no-unused-vars
const common_1 = require("@switchboard-xyz/common"); // eslint-disable-line @typescript-eslint/no-unused-vars
const borsh = __importStar(require("@coral-xyz/borsh"));
class CrankRow {
    constructor(fields) {
        this.pubkey = fields.pubkey;
        this.nextTimestamp = fields.nextTimestamp;
    }
    static layout(property) {
        return borsh.struct([borsh.publicKey('pubkey'), borsh.i64('nextTimestamp')], property);
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    static fromDecoded(obj) {
        return new CrankRow({
            pubkey: obj.pubkey,
            nextTimestamp: obj.nextTimestamp,
        });
    }
    static toEncodable(fields) {
        return {
            pubkey: fields.pubkey,
            nextTimestamp: fields.nextTimestamp,
        };
    }
    toJSON() {
        return {
            pubkey: this.pubkey.toString(),
            nextTimestamp: this.nextTimestamp.toString(),
        };
    }
    static fromJSON(obj) {
        return new CrankRow({
            pubkey: new web3_js_1.PublicKey(obj.pubkey),
            nextTimestamp: new common_1.BN(obj.nextTimestamp),
        });
    }
    toEncodable() {
        return CrankRow.toEncodable(this);
    }
}
exports.CrankRow = CrankRow;
//# sourceMappingURL=CrankRow.js.map