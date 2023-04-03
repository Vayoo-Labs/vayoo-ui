import { SwitchboardProgram } from '../../SwitchboardProgram';
import { TransactionInstruction, PublicKey } from '@solana/web3.js';
import * as types from '../types';
export interface AggregatorSetQueueArgs {
    params: types.AggregatorSetQueueParamsFields;
}
export interface AggregatorSetQueueAccounts {
    aggregator: PublicKey;
    authority: PublicKey;
    queue: PublicKey;
}
export declare const layout: any;
export declare function aggregatorSetQueue(program: SwitchboardProgram, args: AggregatorSetQueueArgs, accounts: AggregatorSetQueueAccounts): TransactionInstruction;
//# sourceMappingURL=aggregatorSetQueue.d.ts.map