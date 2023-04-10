import { SwitchboardProgram } from '../../SwitchboardProgram';
import { TransactionInstruction, PublicKey } from '@solana/web3.js';
import * as types from '../types';
export interface AggregatorSetResolutionModeArgs {
    params: types.AggregatorSetResolutionModeParamsFields;
}
export interface AggregatorSetResolutionModeAccounts {
    aggregator: PublicKey;
    authority: PublicKey;
    slidingWindow: PublicKey;
    payer: PublicKey;
    systemProgram: PublicKey;
}
export declare const layout: any;
export declare function aggregatorSetResolutionMode(program: SwitchboardProgram, args: AggregatorSetResolutionModeArgs, accounts: AggregatorSetResolutionModeAccounts): TransactionInstruction;
//# sourceMappingURL=aggregatorSetResolutionMode.d.ts.map