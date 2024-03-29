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
exports.AggregatorRound = void 0;
const web3_js_1 = require("@solana/web3.js"); // eslint-disable-line @typescript-eslint/no-unused-vars
const common_1 = require("@switchboard-xyz/common"); // eslint-disable-line @typescript-eslint/no-unused-vars
const types = __importStar(require("../types")); // eslint-disable-line @typescript-eslint/no-unused-vars
const borsh = __importStar(require("@coral-xyz/borsh"));
class AggregatorRound {
    constructor(fields) {
        this.numSuccess = fields.numSuccess;
        this.numError = fields.numError;
        this.isClosed = fields.isClosed;
        this.roundOpenSlot = fields.roundOpenSlot;
        this.roundOpenTimestamp = fields.roundOpenTimestamp;
        this.result = new types.SwitchboardDecimal({ ...fields.result });
        this.stdDeviation = new types.SwitchboardDecimal({
            ...fields.stdDeviation,
        });
        this.minResponse = new types.SwitchboardDecimal({ ...fields.minResponse });
        this.maxResponse = new types.SwitchboardDecimal({ ...fields.maxResponse });
        this.oraclePubkeysData = fields.oraclePubkeysData;
        this.mediansData = fields.mediansData.map(item => new types.SwitchboardDecimal({ ...item }));
        this.currentPayout = fields.currentPayout;
        this.mediansFulfilled = fields.mediansFulfilled;
        this.errorsFulfilled = fields.errorsFulfilled;
    }
    static layout(property) {
        return borsh.struct([
            borsh.u32('numSuccess'),
            borsh.u32('numError'),
            borsh.bool('isClosed'),
            borsh.u64('roundOpenSlot'),
            borsh.i64('roundOpenTimestamp'),
            types.SwitchboardDecimal.layout('result'),
            types.SwitchboardDecimal.layout('stdDeviation'),
            types.SwitchboardDecimal.layout('minResponse'),
            types.SwitchboardDecimal.layout('maxResponse'),
            borsh.array(borsh.publicKey(), 16, 'oraclePubkeysData'),
            borsh.array(types.SwitchboardDecimal.layout(), 16, 'mediansData'),
            borsh.array(borsh.i64(), 16, 'currentPayout'),
            borsh.array(borsh.bool(), 16, 'mediansFulfilled'),
            borsh.array(borsh.bool(), 16, 'errorsFulfilled'),
        ], property);
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    static fromDecoded(obj) {
        return new AggregatorRound({
            numSuccess: obj.numSuccess,
            numError: obj.numError,
            isClosed: obj.isClosed,
            roundOpenSlot: obj.roundOpenSlot,
            roundOpenTimestamp: obj.roundOpenTimestamp,
            result: types.SwitchboardDecimal.fromDecoded(obj.result),
            stdDeviation: types.SwitchboardDecimal.fromDecoded(obj.stdDeviation),
            minResponse: types.SwitchboardDecimal.fromDecoded(obj.minResponse),
            maxResponse: types.SwitchboardDecimal.fromDecoded(obj.maxResponse),
            oraclePubkeysData: obj.oraclePubkeysData,
            mediansData: obj.mediansData.map((item /* eslint-disable-line @typescript-eslint/no-explicit-any */) => types.SwitchboardDecimal.fromDecoded(item)),
            currentPayout: obj.currentPayout,
            mediansFulfilled: obj.mediansFulfilled,
            errorsFulfilled: obj.errorsFulfilled,
        });
    }
    static toEncodable(fields) {
        return {
            numSuccess: fields.numSuccess,
            numError: fields.numError,
            isClosed: fields.isClosed,
            roundOpenSlot: fields.roundOpenSlot,
            roundOpenTimestamp: fields.roundOpenTimestamp,
            result: types.SwitchboardDecimal.toEncodable(fields.result),
            stdDeviation: types.SwitchboardDecimal.toEncodable(fields.stdDeviation),
            minResponse: types.SwitchboardDecimal.toEncodable(fields.minResponse),
            maxResponse: types.SwitchboardDecimal.toEncodable(fields.maxResponse),
            oraclePubkeysData: fields.oraclePubkeysData,
            mediansData: fields.mediansData.map(item => types.SwitchboardDecimal.toEncodable(item)),
            currentPayout: fields.currentPayout,
            mediansFulfilled: fields.mediansFulfilled,
            errorsFulfilled: fields.errorsFulfilled,
        };
    }
    toJSON() {
        return {
            numSuccess: this.numSuccess,
            numError: this.numError,
            isClosed: this.isClosed,
            roundOpenSlot: this.roundOpenSlot.toString(),
            roundOpenTimestamp: this.roundOpenTimestamp.toString(),
            result: this.result.toJSON(),
            stdDeviation: this.stdDeviation.toJSON(),
            minResponse: this.minResponse.toJSON(),
            maxResponse: this.maxResponse.toJSON(),
            oraclePubkeysData: this.oraclePubkeysData.map(item => item.toString()),
            mediansData: this.mediansData.map(item => item.toJSON()),
            currentPayout: this.currentPayout.map(item => item.toString()),
            mediansFulfilled: this.mediansFulfilled,
            errorsFulfilled: this.errorsFulfilled,
        };
    }
    static fromJSON(obj) {
        return new AggregatorRound({
            numSuccess: obj.numSuccess,
            numError: obj.numError,
            isClosed: obj.isClosed,
            roundOpenSlot: new common_1.BN(obj.roundOpenSlot),
            roundOpenTimestamp: new common_1.BN(obj.roundOpenTimestamp),
            result: types.SwitchboardDecimal.fromJSON(obj.result),
            stdDeviation: types.SwitchboardDecimal.fromJSON(obj.stdDeviation),
            minResponse: types.SwitchboardDecimal.fromJSON(obj.minResponse),
            maxResponse: types.SwitchboardDecimal.fromJSON(obj.maxResponse),
            oraclePubkeysData: obj.oraclePubkeysData.map(item => new web3_js_1.PublicKey(item)),
            mediansData: obj.mediansData.map(item => types.SwitchboardDecimal.fromJSON(item)),
            currentPayout: obj.currentPayout.map(item => new common_1.BN(item)),
            mediansFulfilled: obj.mediansFulfilled,
            errorsFulfilled: obj.errorsFulfilled,
        });
    }
    toEncodable() {
        return AggregatorRound.toEncodable(this);
    }
}
exports.AggregatorRound = AggregatorRound;
//# sourceMappingURL=AggregatorRound.js.map