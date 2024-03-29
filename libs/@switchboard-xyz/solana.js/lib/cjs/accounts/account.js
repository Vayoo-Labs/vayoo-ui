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
exports.DISCRIMINATOR_MAP = exports.BUFFER_DISCRIMINATOR = exports.Account = void 0;
const anchor = __importStar(require("@coral-xyz/anchor"));
class Account {
    /**
     * Account constructor
     * @param program SwitchboardProgram
     * @param publicKey PublicKey of the on-chain resource
     */
    constructor(program, publicKey) {
        this.program = program;
        this.publicKey =
            typeof publicKey === 'string'
                ? new anchor.web3.PublicKey(publicKey)
                : publicKey;
    }
}
exports.Account = Account;
const generated_1 = require("../generated");
exports.BUFFER_DISCRIMINATOR = Buffer.from([
    66,
    85,
    70,
    70,
    69,
    82,
    120,
    120, // BUFFERxx
]);
exports.DISCRIMINATOR_MAP = new Map([
    [generated_1.AggregatorAccountData.discriminator.toString('utf-8'), 'Aggregator'],
    [generated_1.BufferRelayerAccountData.discriminator.toString('utf-8'), 'BufferRelayer'],
    [generated_1.CrankAccountData.discriminator.toString('utf-8'), 'Crank'],
    [generated_1.JobAccountData.discriminator.toString('utf-8'), 'Job'],
    [generated_1.LeaseAccountData.discriminator.toString('utf-8'), 'Lease'],
    [generated_1.OracleAccountData.discriminator.toString('utf-8'), 'Oracle'],
    [generated_1.PermissionAccountData.discriminator.toString('utf-8'), 'Permission'],
    [generated_1.SbState.discriminator.toString('utf-8'), 'ProgramState'],
    [generated_1.OracleQueueAccountData.discriminator.toString('utf-8'), 'Queue'],
    [generated_1.SlidingResultAccountData.discriminator.toString('utf-8'), 'SlidingWindow'],
    [generated_1.VrfAccountData.discriminator.toString('utf-8'), 'Vrf'],
    [exports.BUFFER_DISCRIMINATOR.toString('utf-8'), 'Buffer'],
]);
//# sourceMappingURL=account.js.map