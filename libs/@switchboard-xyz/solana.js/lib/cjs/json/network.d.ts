import { AggregatorJson } from './aggregator';
import { CrankJson } from './crank';
import { OracleJson } from './oracle';
import { QueueJson } from './queue';
import { VrfJson } from './vrf';
export declare class NetworkJSON {
    queue: QueueJson;
    cranks: Array<CrankJson>;
    oracles: Array<OracleJson>;
    aggregators: Array<AggregatorJson>;
    vrfs: Array<VrfJson>;
    constructor(object: Record<string, any>);
    toJSON(): {
        queue: {
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
        cranks: {
            name: string;
            metadata: string;
            maxRows: number;
            keypair: string;
            dataBufferKeypair: string;
        }[];
        oracles: {
            name: string;
            metadata: string;
            stakeAmount: number;
            authority: string | undefined;
            stakingWalletKeypair: string;
        }[];
        aggregators: {
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
        }[];
        vrfs: {
            callback: {
                programId: string;
                accounts: {
                    pubkey: string;
                    isSigner: boolean;
                    isWritable: boolean;
                }[];
                isData: string;
            };
            keypair: string;
            authority: string | undefined;
            authorityKeypair: string | undefined;
        }[];
    };
}
//# sourceMappingURL=network.d.ts.map