import { CreateQueueFeedParams } from '../accounts';
import { JobJson } from './job';
import { Keypair } from '@solana/web3.js';
export declare class AggregatorJson implements CreateQueueFeedParams {
    name: string;
    metadata: string;
    batchSize: number;
    minRequiredOracleResults: number;
    minRequiredJobResults: number;
    minUpdateDelaySeconds: number;
    startAfter: number;
    expiration: number;
    varianceThreshold: number;
    forceReportPeriod: number;
    historyLimit?: number;
    disableCrank: boolean;
    crankIndex?: number;
    slidingWindow?: boolean;
    basePriorityFee?: number;
    priorityFeeBump?: number;
    priorityFeeBumpPeriod?: number;
    maxPriorityFeeMultiplier?: number;
    fundAmount: number;
    enable: boolean;
    keypair: Keypair;
    authority?: Keypair;
    jobs: Array<JobJson>;
    constructor(object: Record<string, any>);
    static loadMultiple(object: Record<string, any>): Array<AggregatorJson>;
    toJSON(): {
        name: string;
        metadata: string;
        batchSize: number;
        minRequiredOracleResults: number;
        minRequiredJobResults: number;
        minUpdateDelaySeconds: number;
        startAfter: number;
        expiration: number;
        varianceThreshold: number;
        forceReportPeriod: number;
        historyLimit: number | undefined;
        disableCrank: boolean;
        slidingWindow: boolean | undefined;
        basePriorityFee: number | undefined;
        priorityFeeBump: number | undefined;
        priorityFeeBumpPeriod: number | undefined;
        maxPriorityFeeMultiplier: number | undefined;
        fundAmount: number;
        keypair: string;
        authority: string | undefined;
        jobs: {
            name: string;
            weight: number;
            expiration: number;
            keypair: string;
            authority: string | undefined;
            tasks: {
                [k: string]: any;
            };
        }[];
    };
}
//# sourceMappingURL=aggregator.d.ts.map