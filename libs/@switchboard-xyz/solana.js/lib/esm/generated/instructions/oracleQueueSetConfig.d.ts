import { SwitchboardProgram } from '../../SwitchboardProgram';
import { TransactionInstruction, PublicKey } from '@solana/web3.js';
import * as types from '../types';
export interface OracleQueueSetConfigArgs {
    params: types.OracleQueueSetConfigParamsFields;
}
export interface OracleQueueSetConfigAccounts {
    queue: PublicKey;
    authority: PublicKey;
}
export declare const layout: any;
export declare function oracleQueueSetConfig(program: SwitchboardProgram, args: OracleQueueSetConfigArgs, accounts: OracleQueueSetConfigAccounts): TransactionInstruction;
//# sourceMappingURL=oracleQueueSetConfig.d.ts.map