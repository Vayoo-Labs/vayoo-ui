import { SwitchboardProgram } from '../../SwitchboardProgram';
import { TransactionInstruction, PublicKey } from '@solana/web3.js';
import * as types from '../types';
export interface AggregatorInitArgs {
    params: types.AggregatorInitParamsFields;
}
export interface AggregatorInitAccounts {
    aggregator: PublicKey;
    authority: PublicKey;
    queue: PublicKey;
    programState: PublicKey;
}
export declare const layout: any;
export declare function aggregatorInit(program: SwitchboardProgram, args: AggregatorInitArgs, accounts: AggregatorInitAccounts): TransactionInstruction;
//# sourceMappingURL=aggregatorInit.d.ts.map