import { SwitchboardProgram } from '../../SwitchboardProgram';
import { TransactionInstruction, PublicKey } from '@solana/web3.js';
import * as types from '../types';
export interface CrankInitArgs {
    params: types.CrankInitParamsFields;
}
export interface CrankInitAccounts {
    crank: PublicKey;
    queue: PublicKey;
    buffer: PublicKey;
    payer: PublicKey;
    systemProgram: PublicKey;
}
export declare const layout: any;
export declare function crankInit(program: SwitchboardProgram, args: CrankInitArgs, accounts: CrankInitAccounts): TransactionInstruction;
//# sourceMappingURL=crankInit.d.ts.map