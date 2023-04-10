import { loadKeypair } from '../utils';
import { keypairToString, parseNumber, parseString } from './utils';
import { Keypair } from '@solana/web3.js';
export class CrankJson {
    constructor(object) {
        this.name = parseString(object, 'name', '');
        this.metadata = parseString(object, 'metadata', '');
        this.maxRows = parseNumber(object, 'maxRows', 100);
        // accounts
        const keypairPath = parseString(object, 'keypair');
        this.keypair = keypairPath ? loadKeypair(keypairPath) : Keypair.generate();
        const dataBufferPath = parseString(object, 'dataBufferKeypair');
        this.dataBufferKeypair = dataBufferPath
            ? loadKeypair(dataBufferPath)
            : Keypair.generate();
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
            keypair: keypairToString(this.keypair),
            dataBufferKeypair: keypairToString(this.dataBufferKeypair),
        };
    }
}
//# sourceMappingURL=crank.js.map