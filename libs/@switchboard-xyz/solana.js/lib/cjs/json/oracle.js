"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OracleJson = void 0;
const utils_1 = require("../utils");
const utils_2 = require("./utils");
const web3_js_1 = require("@solana/web3.js");
class OracleJson {
    constructor(object) {
        this.name = (0, utils_2.parseString)(object, 'name', '');
        this.metadata = (0, utils_2.parseString)(object, 'metadata', '');
        // staking
        this.stakeAmount = (0, utils_2.parseNumber)(object, 'stakeAmount', 0);
        // permission
        this.enable = (0, utils_2.parseBoolean)(object, 'enable', false);
        // accounts
        const authorityPath = (0, utils_2.parseString)(object, 'authority');
        this.authority = authorityPath ? (0, utils_1.loadKeypair)(authorityPath) : undefined;
        const stakingWalletPath = (0, utils_2.parseString)(object, 'stakingWalletKeypair');
        this.stakingWalletKeypair = stakingWalletPath
            ? (0, utils_1.loadKeypair)(stakingWalletPath)
            : web3_js_1.Keypair.generate();
    }
    static loadMultiple(object) {
        const oracleJsons = [];
        if ('oracles' in object && Array.isArray(object.oracles)) {
            for (const oracle of object.oracles) {
                oracleJsons.push(new OracleJson(oracle));
            }
        }
        return oracleJsons;
    }
    toJSON() {
        return {
            name: this.name,
            metadata: this.metadata,
            stakeAmount: this.stakeAmount,
            authority: this.authority ? (0, utils_2.keypairToString)(this.authority) : undefined,
            stakingWalletKeypair: (0, utils_2.keypairToString)(this.stakingWalletKeypair),
        };
    }
}
exports.OracleJson = OracleJson;
//# sourceMappingURL=oracle.js.map