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
exports.SolanaClock = void 0;
const borsh = __importStar(require("@coral-xyz/borsh"));
const web3_js_1 = require("@solana/web3.js");
class SolanaClock {
    constructor(fields) {
        this.slot = fields.slot;
        this.epochStartTimestamp = fields.epochStartTimestamp;
        this.epoch = fields.epoch;
        this.leaderScheduleEpoch = fields.epochStartTimestamp;
        this.unixTimestamp = fields.unixTimestamp;
    }
    static decode(data) {
        const dec = SolanaClock.layout.decode(data);
        return new SolanaClock({
            slot: dec.slot,
            epochStartTimestamp: dec.epochStartTimestamp,
            epoch: dec.epoch,
            leaderScheduleEpoch: dec.leaderScheduleEpoch,
            unixTimestamp: dec.unixTimestamp,
        });
    }
    static decodeUnixTimestamp(data) {
        return borsh.u64('unixTimestamp').decode(data, data.byteLength - 8);
    }
    static async fetch(connection) {
        const sysclockInfo = await connection.getAccountInfo(web3_js_1.SYSVAR_CLOCK_PUBKEY);
        if (!sysclockInfo) {
            throw new Error(`Failed to fetch SYSVAR_CLOCK AccountInfo`);
        }
        const clock = SolanaClock.decode(sysclockInfo.data);
        return clock;
    }
}
exports.SolanaClock = SolanaClock;
SolanaClock.layout = borsh.struct([
    borsh.u64('slot'),
    borsh.i64('epochStartTimestamp'),
    borsh.u64('epoch'),
    borsh.u64('leaderScheduleEpoch'),
    borsh.i64('unixTimestamp'),
]);
//# sourceMappingURL=SolanaClock.js.map