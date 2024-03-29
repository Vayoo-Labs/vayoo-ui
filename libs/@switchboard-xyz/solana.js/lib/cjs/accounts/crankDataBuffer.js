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
exports.CrankDataBuffer = void 0;
const errors = __importStar(require("../errors"));
const types = __importStar(require("../generated"));
const account_1 = require("./account");
const anchor = __importStar(require("@coral-xyz/anchor"));
const web3_js_1 = require("@solana/web3.js");
/**
 * Account holding a priority queue of aggregators and their next available update time.
 *
 * Data: Array<{@linkcode types.CrankRow}>
 */
class CrankDataBuffer extends account_1.Account {
    constructor() {
        super(...arguments);
        this.size = 40;
    }
    /**
     * Invoke a callback each time a crank's buffer has changed on-chain. The buffer stores a list of {@linkcode AggregatorAccount} public keys along with their next available update time.
     * @param callback - the callback invoked when the crank's buffer changes
     * @param commitment - optional, the desired transaction finality. defaults to 'confirmed'
     * @returns the websocket subscription id
     */
    onChange(callback, commitment = 'confirmed') {
        if (this.publicKey.equals(web3_js_1.PublicKey.default)) {
            throw new Error(`No crank dataBuffer provided. Call crankAccount.loadData() or pass it to this function in order to watch the account for changes`);
        }
        return this.program.connection.onAccountChange(this.publicKey, accountInfo => callback(CrankDataBuffer.decode(accountInfo)), commitment);
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
            throw new errors.AccountNotFoundError('Crank Data Buffer', this.publicKey);
        const data = CrankDataBuffer.decode(accountInfo);
        return data;
    }
    static decode(bufferAccountInfo) {
        const buffer = bufferAccountInfo.data.slice(8) ?? Buffer.from('');
        const maxRows = Math.floor(buffer.byteLength / 40);
        const pqData = [];
        for (let i = 0; i < maxRows * 40; i += 40) {
            if (buffer.byteLength - i < 40) {
                break;
            }
            const rowBuf = buffer.slice(i, i + 40);
            const pubkey = new web3_js_1.PublicKey(rowBuf.slice(0, 32));
            if (pubkey.equals(web3_js_1.PublicKey.default)) {
                break;
            }
            const nextTimestamp = new anchor.BN(rowBuf.slice(32, 40), 'le');
            pqData.push(new types.CrankRow({ pubkey, nextTimestamp }));
        }
        return pqData;
    }
    static getAccountSize(size) {
        return 8 + size * 40;
    }
    static default(size = 100) {
        const buffer = Buffer.alloc(CrankDataBuffer.getAccountSize(size), 0);
        account_1.BUFFER_DISCRIMINATOR.copy(buffer, 0);
        return buffer;
    }
    static sort(crankRows) {
        const sorted = [];
        const rows = [...crankRows];
        while (rows.length > 0) {
            const popped = pqPop(rows);
            if (popped !== undefined) {
                sorted.push(popped);
            }
        }
        if (sorted.length !== crankRows.length) {
            throw new Error(`Crank sort error`);
        }
        return sorted;
    }
    /**
     * Return a crank's dataBuffer
     *
     * @throws {string} if dataBuffer is equal to default publicKey
     */
    static fromCrank(program, crank) {
        if (crank.dataBuffer.equals(web3_js_1.PublicKey.default)) {
            throw new Error(`Failed to find crank data buffer`);
        }
        return new CrankDataBuffer(program, crank.dataBuffer);
    }
}
exports.CrankDataBuffer = CrankDataBuffer;
CrankDataBuffer.accountName = 'CrankDataBuffer';
function pqPop(crankData) {
    const ret = crankData[0];
    crankData[0] = crankData.at(-1);
    crankData.pop();
    let current = 0;
    let maxLoops = crankData.length * 2;
    while (maxLoops > 0) {
        const leftChildIdx = current * 2 + 1;
        const rightChildIdx = current * 2 + 2;
        let swapIdx = rightChildIdx;
        if (rightChildIdx < crankData.length) {
            const leftChild = crankData[leftChildIdx];
            const rightChild = crankData[rightChildIdx];
            if (leftChild.nextTimestamp < rightChild.nextTimestamp) {
                swapIdx = leftChildIdx;
            }
        }
        if (swapIdx >= crankData.length) {
            swapIdx = leftChildIdx;
        }
        if (swapIdx >= crankData.length) {
            break;
        }
        const currentItem = crankData[current];
        const swapItem = crankData[swapIdx];
        if (currentItem.nextTimestamp < swapItem.nextTimestamp) {
            break;
        }
        crankData[current] = swapItem;
        crankData[swapIdx] = currentItem;
        current = swapIdx;
        --maxLoops;
        if (maxLoops === 0) {
            throw new Error(`Failed to sort crank rows in ${crankData.length * 2} loops`);
        }
    }
    return ret;
}
//# sourceMappingURL=crankDataBuffer.js.map