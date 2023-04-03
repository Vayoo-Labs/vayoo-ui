import { SwitchboardProgram } from '../../SwitchboardProgram';
import { TransactionInstruction, PublicKey } from '@solana/web3.js';
import * as types from '../types';
export interface JobInitArgs {
    params: types.JobInitParamsFields;
}
export interface JobInitAccounts {
    job: PublicKey;
    authority: PublicKey;
    programState: PublicKey;
    payer: PublicKey;
    systemProgram: PublicKey;
}
export declare const layout: any;
export declare function jobInit(program: SwitchboardProgram, args: JobInitArgs, accounts: JobInitAccounts): TransactionInstruction;
//# sourceMappingURL=jobInit.d.ts.map