import { CreateQueueCrankParams } from '../accounts';
import { Keypair } from '@solana/web3.js';
export declare class CrankJson implements CreateQueueCrankParams {
    name: string;
    metadata: string;
    maxRows: number;
    keypair: Keypair;
    dataBufferKeypair: Keypair;
    constructor(object: Record<string, any>);
    static loadMultiple(object: Record<string, any>): Array<CrankJson>;
    toJSON(): {
        name: string;
        metadata: string;
        maxRows: number;
        keypair: string;
        dataBufferKeypair: string;
    };
}
//# sourceMappingURL=crank.d.ts.map