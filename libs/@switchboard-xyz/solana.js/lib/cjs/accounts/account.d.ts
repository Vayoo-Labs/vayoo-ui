/// <reference types="node" />
import { SwitchboardProgram } from '../SwitchboardProgram';
import * as anchor from '@coral-xyz/anchor';
export declare abstract class Account<T> {
    readonly program: SwitchboardProgram;
    readonly publicKey: anchor.web3.PublicKey;
    /**
     * Account constructor
     * @param program SwitchboardProgram
     * @param publicKey PublicKey of the on-chain resource
     */
    constructor(program: SwitchboardProgram, publicKey: anchor.web3.PublicKey | string);
    /**
     * @return on-chain account size.
     */
    abstract get size(): number;
    /**
     * Retrieve and decode the data in this account.
     */
    abstract loadData(): Promise<T>;
}
/** Callback to pass deserialized account data when updated on-chain */
export type OnAccountChangeCallback<T> = (accountData: T) => void;
import { AggregatorAccountData, BufferRelayerAccountData, CrankAccountData, JobAccountData, LeaseAccountData, OracleAccountData, OracleQueueAccountData, PermissionAccountData, SbState, SlidingResultAccountData, VrfAccountData } from '../generated';
import { AggregatorAccount } from './aggregatorAccount';
import { AggregatorHistoryBuffer } from './aggregatorHistoryBuffer';
import { BufferRelayerAccount } from './bufferRelayAccount';
import { CrankAccount } from './crankAccount';
import { CrankDataBuffer } from './crankDataBuffer';
import { JobAccount } from './jobAccount';
import { LeaseAccount } from './leaseAccount';
import { OracleAccount } from './oracleAccount';
import { PermissionAccount } from './permissionAccount';
import { ProgramStateAccount } from './programStateAccount';
import { QueueAccount } from './queueAccount';
import { QueueDataBuffer } from './queueDataBuffer';
import { VrfAccount } from './vrfAccount';
export declare const BUFFER_DISCRIMINATOR: Buffer;
export type SwitchboardAccountType = 'Aggregator' | 'AggregatorHistory' | 'BufferRelayer' | 'Crank' | 'CrankBuffer' | 'Job' | 'Lease' | 'Oracle' | 'Permission' | 'ProgramState' | 'Queue' | 'QueueBuffer' | 'SlidingWindow' | 'Vrf' | 'Buffer';
export type SwitchboardAccount = AggregatorAccount | AggregatorHistoryBuffer | BufferRelayerAccount | CrankAccount | CrankDataBuffer | JobAccount | LeaseAccount | OracleAccount | PermissionAccount | ProgramStateAccount | QueueAccount | QueueDataBuffer | VrfAccount;
export type SwitchboardAccountData = AggregatorAccountData | BufferRelayerAccountData | CrankAccountData | JobAccountData | LeaseAccountData | OracleAccountData | PermissionAccountData | SbState | OracleQueueAccountData | SlidingResultAccountData | VrfAccountData;
export declare const DISCRIMINATOR_MAP: Map<string, SwitchboardAccountType>;
//# sourceMappingURL=account.d.ts.map