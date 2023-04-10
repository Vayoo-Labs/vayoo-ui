import { SwitchboardProgram } from '../../SwitchboardProgram';
import { TransactionInstruction, PublicKey } from '@solana/web3.js';
import * as types from '../types';
export interface ProgramConfigArgs {
    params: types.ProgramConfigParamsFields;
}
export interface ProgramConfigAccounts {
    authority: PublicKey;
    programState: PublicKey;
    daoMint: PublicKey;
}
export declare const layout: any;
export declare function programConfig(program: SwitchboardProgram, args: ProgramConfigArgs, accounts: ProgramConfigAccounts): TransactionInstruction;
//# sourceMappingURL=programConfig.d.ts.map