import { SwitchboardProgram } from '../../SwitchboardProgram';
import { TransactionInstruction, PublicKey } from '@solana/web3.js';
import * as types from '../types';
export interface OracleQueueInitArgs {
    params: types.OracleQueueInitParamsFields;
}
export interface OracleQueueInitAccounts {
    oracleQueue: PublicKey;
    authority: PublicKey;
    buffer: PublicKey;
    payer: PublicKey;
    systemProgram: PublicKey;
    mint: PublicKey;
}
export declare const layout: any;
export declare function oracleQueueInit(program: SwitchboardProgram, args: OracleQueueInitArgs, accounts: OracleQueueInitAccounts): TransactionInstruction;
//# sourceMappingURL=oracleQueueInit.d.ts.map