import { SwitchboardProgram } from '../../SwitchboardProgram';
import { TransactionInstruction, PublicKey } from '@solana/web3.js';
import * as types from '../types';
export interface AggregatorSetConfigArgs {
    params: types.AggregatorSetConfigParamsFields;
}
export interface AggregatorSetConfigAccounts {
    aggregator: PublicKey;
    authority: PublicKey;
}
export declare const layout: any;
export declare function aggregatorSetConfig(program: SwitchboardProgram, args: AggregatorSetConfigArgs, accounts: AggregatorSetConfigAccounts): TransactionInstruction;
//# sourceMappingURL=aggregatorSetConfig.d.ts.map