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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.QueueDataBuffer = void 0;
const errors = __importStar(require("../errors"));
const account_1 = require("./account");
const web3_js_1 = require("@solana/web3.js");
const assert_1 = __importDefault(require("assert"));
/**
 * Account holding a list of oracles actively heartbeating on the queue
 *
 * Data: Array<{@linkcode PublicKey}>
 */
class QueueDataBuffer extends account_1.Account {
    constructor() {
        super(...arguments);
        this.size = 32;
    }
    static getAccountSize(size) {
        return 8 + size * 32;
    }
    /**
     * Return an oracle queue buffer initialized to the default values.
     *
     * @param size - the number of oracles the buffer should support
     */
    static default(size = 100) {
        const buffer = Buffer.alloc(QueueDataBuffer.getAccountSize(size), 0);
        account_1.BUFFER_DISCRIMINATOR.copy(buffer, 0);
        return buffer;
    }
    /**
     * Create a mock account info for a given vrf config. Useful for test integrations.
     */
    static createMock(programId, data, options) {
        const size = data.size ?? 100;
        const oracles = Array(size).fill(web3_js_1.PublicKey.default);
        for (const [n, oracle] of (data.oracles ?? []).entries()) {
            oracles[n] = oracle;
        }
        const buffer = Buffer.alloc(QueueDataBuffer.getAccountSize(size), 0);
        account_1.BUFFER_DISCRIMINATOR.copy(buffer, 0);
        for (const [n, oracle] of oracles.entries()) {
            const oracleBuffer = oracle.toBuffer();
            (0, assert_1.default)(oracleBuffer.byteLength === 32);
            oracleBuffer.copy(buffer, 8 + n * 32);
        }
        return {
            executable: false,
            owner: programId,
            lamports: options?.lamports ?? 1 * web3_js_1.LAMPORTS_PER_SOL,
            data: buffer,
            rentEpoch: options?.rentEpoch ?? 0,
        };
    }
    /**
     * Invoke a callback each time a QueueAccount's oracle queue buffer has changed on-chain. The buffer stores a list of oracle's and their last heartbeat timestamp.
     * @param callback - the callback invoked when the queues buffer changes
     * @param commitment - optional, the desired transaction finality. defaults to 'confirmed'
     * @returns the websocket subscription id
     */
    onChange(callback, commitment = 'confirmed') {
        if (this.publicKey.equals(web3_js_1.PublicKey.default)) {
            throw new Error(`No queue dataBuffer provided. Call crankAccount.loadData() or pass it to this function in order to watch the account for changes`);
        }
        return this.program.connection.onAccountChange(this.publicKey, accountInfo => callback(QueueDataBuffer.decode(accountInfo)), commitment);
    }
    /**
     * Retrieve and decode the {@linkcode types.CrankAccountData} stored in this account.
     */
    async loadData() {
        if (this.publicKey.equals(web3_js_1.PublicKey.default)) {
            return [];
        }
        const accountInfo = await this.program.connection.getAccountInfo(this.publicKey);
        if (accountInfo === null)
            throw new errors.AccountNotFoundError('Oracle Queue Buffer', this.publicKey);
        const data = QueueDataBuffer.decode(accountInfo);
        return data;
    }
    static decode(bufferAccountInfo) {
        const buffer = bufferAccountInfo.data.slice(8) ?? Buffer.from('');
        const oracles = [];
        for (let i = 0; i < buffer.byteLength * 32; i += 32) {
            if (buffer.byteLength - i < 32) {
                break;
            }
            const pubkeyBuf = buffer.slice(i, i + 32);
            const pubkey = new web3_js_1.PublicKey(pubkeyBuf);
            if (web3_js_1.PublicKey.default.equals(pubkey)) {
                break;
            }
            oracles.push(pubkey);
        }
        return oracles;
    }
    /**
     * Return a queues dataBuffer
     *
     * @throws {string} if dataBuffer is equal to default publicKey
     */
    static fromQueue(program, queue) {
        if (queue.dataBuffer.equals(web3_js_1.PublicKey.default)) {
            throw new Error(`Failed to find queue data buffer`);
        }
        return new QueueDataBuffer(program, queue.dataBuffer);
    }
}
exports.QueueDataBuffer = QueueDataBuffer;
QueueDataBuffer.accountName = 'QueueDataBuffer';
//# sourceMappingURL=queueDataBuffer.js.map