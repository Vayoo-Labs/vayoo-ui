import { SwitchboardProgram } from '../../SwitchboardProgram';
import { TransactionInstruction, PublicKey } from '@solana/web3.js';
import * as types from '../types';
export interface SetBumpsArgs {
    params: types.SetBumpsParamsFields;
}
export interface SetBumpsAccounts {
    state: PublicKey;
}
export declare const layout: any;
export declare function setBumps(program: SwitchboardProgram, args: SetBumpsArgs, accounts: SetBumpsAccounts): TransactionInstruction;
//# sourceMappingURL=setBumps.d.ts.map