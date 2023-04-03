import { QueueInitParams } from '../accounts';
import { Keypair } from '@solana/web3.js';
export type IQueueInitParams = Omit<QueueInitParams, 'authority'> & {
    authority?: Keypair;
};
export declare class QueueJson implements IQueueInitParams {
    name?: string;
    metadata?: string;
    reward: number;
    minStake: number;
    feedProbationPeriod?: number;
    oracleTimeout?: number;
    slashingEnabled?: boolean;
    varianceToleranceMultiplier?: number;
    consecutiveFeedFailureLimit?: number;
    consecutiveOracleFailureLimit?: number;
    queueSize: number;
    unpermissionedFeeds?: boolean;
    unpermissionedVrf?: boolean;
    enableBufferRelayers?: boolean;
    authority?: Keypair;
    keypair: Keypair;
    dataBufferKeypair: Keypair;
    constructor(object: Record<string, any>);
    toJSON(): {
        name: string | undefined;
        metadata: string | undefined;
        reward: number;
        minStake: number;
        feedProbationPeriod: number | undefined;
        oracleTimeout: number | undefined;
        slashingEnabled: boolean | undefined;
        varianceToleranceMultiplier: number | undefined;
        consecutiveFeedFailureLimit: number | undefined;
        consecutiveOracleFailureLimit: number | undefined;
        queueSize: number;
        unpermissionedFeeds: boolean | undefined;
        unpermissionedVrf: boolean | undefined;
        enableBufferRelayers: boolean | undefined;
        authority: string | undefined;
        keypair: string;
        dataBufferKeypair: string;
    };
}
//# sourceMappingURL=queue.d.ts.map