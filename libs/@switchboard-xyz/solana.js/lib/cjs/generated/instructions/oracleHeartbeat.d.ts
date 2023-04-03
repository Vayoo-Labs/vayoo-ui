import { SwitchboardProgram } from '../../SwitchboardProgram';
import { TransactionInstruction, PublicKey } from '@solana/web3.js';
import * as types from '../types';
export interface OracleHeartbeatArgs {
    params: types.OracleHeartbeatParamsFields;
}
export interface OracleHeartbeatAccounts {
    oracle: PublicKey;
    oracleAuthority: PublicKey;
    tokenAccount: PublicKey;
    gcOracle: PublicKey;
    oracleQueue: PublicKey;
    permission: PublicKey;
    dataBuffer: PublicKey;
}
export declare const layout: any;
export declare function oracleHeartbeat(program: SwitchboardProgram, args: OracleHeartbeatArgs, accounts: OracleHeartbeatAccounts): TransactionInstruction;
//# sourceMappingURL=oracleHeartbeat.d.ts.map