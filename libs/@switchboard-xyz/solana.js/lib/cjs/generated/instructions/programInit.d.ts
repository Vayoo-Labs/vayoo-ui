import { SwitchboardProgram } from '../../SwitchboardProgram';
import { TransactionInstruction, PublicKey } from '@solana/web3.js';
import * as types from '../types';
export interface ProgramInitArgs {
    params: types.ProgramInitParamsFields;
}
export interface ProgramInitAccounts {
    state: PublicKey;
    authority: PublicKey;
    tokenMint: PublicKey;
    vault: PublicKey;
    payer: PublicKey;
    systemProgram: PublicKey;
    tokenProgram: PublicKey;
    daoMint: PublicKey;
}
export declare const layout: any;
export declare function programInit(program: SwitchboardProgram, args: ProgramInitArgs, accounts: ProgramInitAccounts): TransactionInstruction;
//# sourceMappingURL=programInit.d.ts.map