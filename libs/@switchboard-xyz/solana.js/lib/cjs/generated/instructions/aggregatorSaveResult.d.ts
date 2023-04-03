import { SwitchboardProgram } from '../../SwitchboardProgram';
import { TransactionInstruction, PublicKey } from '@solana/web3.js';
import * as types from '../types';
export interface AggregatorSaveResultArgs {
    params: types.AggregatorSaveResultParamsFields;
}
export interface AggregatorSaveResultAccounts {
    aggregator: PublicKey;
    oracle: PublicKey;
    oracleAuthority: PublicKey;
    oracleQueue: PublicKey;
    queueAuthority: PublicKey;
    feedPermission: PublicKey;
    oraclePermission: PublicKey;
    lease: PublicKey;
    escrow: PublicKey;
    tokenProgram: PublicKey;
    programState: PublicKey;
    historyBuffer: PublicKey;
    mint: PublicKey;
}
export declare const layout: any;
export declare function aggregatorSaveResult(program: SwitchboardProgram, args: AggregatorSaveResultArgs, accounts: AggregatorSaveResultAccounts): TransactionInstruction;
//# sourceMappingURL=aggregatorSaveResult.d.ts.map