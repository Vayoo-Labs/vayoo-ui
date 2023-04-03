import { SwitchboardProgram } from '../../SwitchboardProgram';
import { TransactionInstruction, PublicKey } from '@solana/web3.js';
import * as types from '../types';
export interface AggregatorAddJobArgs {
    params: types.AggregatorAddJobParamsFields;
}
export interface AggregatorAddJobAccounts {
    aggregator: PublicKey;
    authority: PublicKey;
    job: PublicKey;
}
export declare const layout: any;
export declare function aggregatorAddJob(program: SwitchboardProgram, args: AggregatorAddJobArgs, accounts: AggregatorAddJobAccounts): TransactionInstruction;
//# sourceMappingURL=aggregatorAddJob.d.ts.map