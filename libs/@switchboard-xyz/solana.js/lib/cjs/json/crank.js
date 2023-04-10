"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CrankJson = void 0;
const utils_1 = require("../utils");
const utils_2 = require("./utils");
const web3_js_1 = require("@solana/web3.js");
class CrankJson {
    constructor(object) {
        this.name = (0, utils_2.parseString)(object, 'name', '');
        this.metadata = (0, utils_2.parseString)(object, 'metadata', '');
        this.maxRows = (0, utils_2.parseNumber)(object, 'maxRows', 100);
        // accounts
        const keypairPath = (0, utils_2.parseString)(object, 'keypair');
        this.keypair = keypairPath ? (0, utils_1.loadKeypair)(keypairPath) : web3_js_1.Keypair.generate();
        const dataBufferPath = (0, utils_2.parseString)(object, 'dataBufferKeypair');
        this.dataBufferKeypair = dataBufferPath
            ? (0, utils_1.loadKeypair)(dataBufferPath)
            : web3_js_1.Keypair.generate();
    }
    static loadMultiple(object) {
        const crankJsons = [];
        if ('cranks' in object && Array.isArray(object.cranks)) {
            for (const crank of object.cranks) {
                if ('maxRows' in crank) {
                    crankJsons.push(new CrankJson(crank));
                }
            }
        }
        return crankJsons;
    }
    toJSON() {
        return {
            name: this.name,
            metadata: this.metadata,
            maxRows: this.maxRows,
            keypair: (0, utils_2.keypairToString)(this.keypair),
            dataBufferKeypair: (0, utils_2.keypairToString)(this.dataBufferKeypair),
        };
    }
}
exports.CrankJson = CrankJson;
//# sourceMappingURL=crank.js.map