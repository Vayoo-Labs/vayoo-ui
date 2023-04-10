import { SwitchboardProgram } from '../../SwitchboardProgram';
import { TransactionInstruction, PublicKey } from '@solana/web3.js';
import * as types from '../types';
export interface OracleWithdrawArgs {
    params: types.OracleWithdrawParamsFields;
}
export interface OracleWithdrawAccounts {
    oracle: PublicKey;
    oracleAuthority: PublicKey;
    tokenAccount: PublicKey;
    withdrawAccount: PublicKey;
    oracleQueue: PublicKey;
    permission: PublicKey;
    tokenProgram: PublicKey;
    programState: PublicKey;
    payer: PublicKey;
    systemProgram: PublicKey;
}
export declare const layout: any;
export declare function oracleWithdraw(program: SwitchboardProgram, args: OracleWithdrawArgs, accounts: OracleWithdrawAccounts): TransactionInstruction;
//# sourceMappingURL=oracleWithdraw.d.ts.map