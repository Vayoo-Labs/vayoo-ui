import { CreateQueueOracleParams } from '../accounts';
import { Keypair } from '@solana/web3.js';
export declare class OracleJson implements CreateQueueOracleParams {
    name: string;
    metadata: string;
    stakeAmount: number;
    enable: boolean;
    authority?: Keypair;
    stakingWalletKeypair: Keypair;
    constructor(object: Record<string, any>);
    static loadMultiple(object: Record<string, any>): Array<OracleJson>;
    toJSON(): {
        name: string;
        metadata: string;
        stakeAmount: number;
        authority: string | undefined;
        stakingWalletKeypair: string;
    };
}
//# sourceMappingURL=oracle.d.ts.map