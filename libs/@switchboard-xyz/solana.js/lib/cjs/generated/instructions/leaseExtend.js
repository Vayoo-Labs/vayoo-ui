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
exports.leaseExtend = exports.layout = void 0;
const web3_js_1 = require("@solana/web3.js"); // eslint-disable-line @typescript-eslint/no-unused-vars
const borsh = __importStar(require("@coral-xyz/borsh")); // eslint-disable-line @typescript-eslint/no-unused-vars
const types = __importStar(require("../types")); // eslint-disable-line @typescript-eslint/no-unused-vars
exports.layout = borsh.struct([types.LeaseExtendParams.layout('params')]);
function leaseExtend(program, args, accounts) {
    const keys = [
        { pubkey: accounts.lease, isSigner: false, isWritable: true },
        { pubkey: accounts.aggregator, isSigner: false, isWritable: false },
        { pubkey: accounts.queue, isSigner: false, isWritable: false },
        { pubkey: accounts.funder, isSigner: false, isWritable: true },
        { pubkey: accounts.owner, isSigner: true, isWritable: true },
        { pubkey: accounts.escrow, isSigner: false, isWritable: true },
        { pubkey: accounts.tokenProgram, isSigner: false, isWritable: false },
        { pubkey: accounts.programState, isSigner: false, isWritable: false },
        { pubkey: accounts.mint, isSigner: false, isWritable: false },
    ];
    const identifier = Buffer.from([202, 70, 141, 29, 136, 142, 230, 118]);
    const buffer = Buffer.alloc(1000);
    const len = exports.layout.encode({
        params: types.LeaseExtendParams.toEncodable(args.params),
    }, buffer);
    const data = Buffer.concat([identifier, buffer]).slice(0, 8 + len);
    const ix = new web3_js_1.TransactionInstruction({
        keys,
        programId: program.programId,
        data,
    });
    return ix;
}
exports.leaseExtend = leaseExtend;
//# sourceMappingURL=leaseExtend.js.map