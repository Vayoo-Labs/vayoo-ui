import { SwitchboardProgram } from '../../SwitchboardProgram';
import { TransactionInstruction, PublicKey } from '@solana/web3.js';
import * as types from '../types';
export interface AggregatorSaveResultV2Args {
    params: types.AggregatorSaveResultParamsFields;
}
export interface AggregatorSaveResultV2Accounts {
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
export declare function aggregatorSaveResultV2(program: SwitchboardProgram, args: AggregatorSaveResultV2Args, accounts: AggregatorSaveResultV2Accounts): TransactionInstruction;
//# sourceMappingURL=aggregatorSaveResultV2.d.ts.map