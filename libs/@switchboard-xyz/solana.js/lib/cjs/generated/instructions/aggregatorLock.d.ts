import { SwitchboardProgram } from '../../SwitchboardProgram';
import { TransactionInstruction, PublicKey } from '@solana/web3.js';
import * as types from '../types';
export interface AggregatorLockArgs {
    params: types.AggregatorLockParamsFields;
}
export interface AggregatorLockAccounts {
    aggregator: PublicKey;
    authority: PublicKey;
}
export declare const layout: any;
export declare function aggregatorLock(program: SwitchboardProgram, args: AggregatorLockArgs, accounts: AggregatorLockAccounts): TransactionInstruction;
//# sourceMappingURL=aggregatorLock.d.ts.map