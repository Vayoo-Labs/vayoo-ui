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
exports.aggregatorClose = exports.layout = void 0;
const web3_js_1 = require("@solana/web3.js"); // eslint-disable-line @typescript-eslint/no-unused-vars
const borsh = __importStar(require("@coral-xyz/borsh")); // eslint-disable-line @typescript-eslint/no-unused-vars
const types = __importStar(require("../types")); // eslint-disable-line @typescript-eslint/no-unused-vars
exports.layout = borsh.struct([
    types.AggregatorCloseParams.layout('params'),
]);
function aggregatorClose(program, args, accounts) {
    const keys = [
        { pubkey: accounts.authority, isSigner: true, isWritable: false },
        { pubkey: accounts.aggregator, isSigner: false, isWritable: true },
        { pubkey: accounts.permission, isSigner: false, isWritable: true },
        { pubkey: accounts.lease, isSigner: false, isWritable: true },
        { pubkey: accounts.escrow, isSigner: false, isWritable: true },
        { pubkey: accounts.oracleQueue, isSigner: false, isWritable: false },
        { pubkey: accounts.queueAuthority, isSigner: false, isWritable: false },
        { pubkey: accounts.programState, isSigner: false, isWritable: false },
        { pubkey: accounts.solDest, isSigner: false, isWritable: false },
        { pubkey: accounts.escrowDest, isSigner: false, isWritable: true },
        { pubkey: accounts.tokenProgram, isSigner: false, isWritable: false },
        { pubkey: accounts.crank, isSigner: false, isWritable: true },
        { pubkey: accounts.dataBuffer, isSigner: false, isWritable: true },
        { pubkey: accounts.slidingWindow, isSigner: false, isWritable: true },
    ];
    const identifier = Buffer.from([77, 29, 85, 88, 224, 181, 157, 69]);
    const buffer = Buffer.alloc(1000);
    const len = exports.layout.encode({
        params: types.AggregatorCloseParams.toEncodable(args.params),
    }, buffer);
    const data = Buffer.concat([identifier, buffer]).slice(0, 8 + len);
    const ix = new web3_js_1.TransactionInstruction({
        keys,
        programId: program.programId,
        data,
    });
    return ix;
}
exports.aggregatorClose = aggregatorClose;
//# sourceMappingURL=aggregatorClose.js.map