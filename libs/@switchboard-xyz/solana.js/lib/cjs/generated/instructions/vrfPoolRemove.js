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
exports.vrfPoolRemove = exports.layout = void 0;
const web3_js_1 = require("@solana/web3.js"); // eslint-disable-line @typescript-eslint/no-unused-vars
const borsh = __importStar(require("@coral-xyz/borsh")); // eslint-disable-line @typescript-eslint/no-unused-vars
const types = __importStar(require("../types")); // eslint-disable-line @typescript-eslint/no-unused-vars
exports.layout = borsh.struct([
    types.VrfPoolRemoveParams.layout('params'),
]);
function vrfPoolRemove(program, args, accounts) {
    const keys = [
        { pubkey: accounts.authority, isSigner: true, isWritable: false },
        { pubkey: accounts.vrfPool, isSigner: false, isWritable: true },
        { pubkey: accounts.queue, isSigner: false, isWritable: false },
    ];
    const identifier = Buffer.from([15, 73, 86, 124, 75, 183, 20, 199]);
    const buffer = Buffer.alloc(1000);
    const len = exports.layout.encode({
        params: types.VrfPoolRemoveParams.toEncodable(args.params),
    }, buffer);
    const data = Buffer.concat([identifier, buffer]).slice(0, 8 + len);
    const ix = new web3_js_1.TransactionInstruction({
        keys,
        programId: program.programId,
        data,
    });
    return ix;
}
exports.vrfPoolRemove = vrfPoolRemove;
//# sourceMappingURL=vrfPoolRemove.js.map