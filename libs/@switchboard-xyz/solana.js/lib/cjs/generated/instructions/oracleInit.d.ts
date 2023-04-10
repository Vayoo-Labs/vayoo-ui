import { SwitchboardProgram } from '../../SwitchboardProgram';
import { TransactionInstruction, PublicKey } from '@solana/web3.js';
import * as types from '../types';
export interface OracleInitArgs {
    params: types.OracleInitParamsFields;
}
export interface OracleInitAccounts {
    oracle: PublicKey;
    oracleAuthority: PublicKey;
    wallet: PublicKey;
    programState: PublicKey;
    queue: PublicKey;
    payer: PublicKey;
    systemProgram: PublicKey;
}
export declare const layout: any;
export declare function oracleInit(program: SwitchboardProgram, args: OracleInitArgs, accounts: OracleInitAccounts): TransactionInstruction;
//# sourceMappingURL=oracleInit.d.ts.map