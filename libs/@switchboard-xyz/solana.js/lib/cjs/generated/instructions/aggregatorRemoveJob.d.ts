import { SwitchboardProgram } from '../../SwitchboardProgram';
import { TransactionInstruction, PublicKey } from '@solana/web3.js';
import * as types from '../types';
export interface AggregatorRemoveJobArgs {
    params: types.AggregatorRemoveJobParamsFields;
}
export interface AggregatorRemoveJobAccounts {
    aggregator: PublicKey;
    authority: PublicKey;
    job: PublicKey;
}
export declare const layout: any;
export declare function aggregatorRemoveJob(program: SwitchboardProgram, args: AggregatorRemoveJobArgs, accounts: AggregatorRemoveJobAccounts): TransactionInstruction;
//# sourceMappingURL=aggregatorRemoveJob.d.ts.map