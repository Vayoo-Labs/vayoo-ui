import { SwitchboardProgram } from '../../SwitchboardProgram';
import { TransactionInstruction, PublicKey } from '@solana/web3.js';
import * as types from '../types';
export interface JobSetDataArgs {
    params: types.JobSetDataParamsFields;
}
export interface JobSetDataAccounts {
    job: PublicKey;
    authority: PublicKey;
}
export declare const layout: any;
export declare function jobSetData(program: SwitchboardProgram, args: JobSetDataArgs, accounts: JobSetDataAccounts): TransactionInstruction;
//# sourceMappingURL=jobSetData.d.ts.map