import { SwitchboardProgram } from '../../SwitchboardProgram';
import { TransactionInstruction, PublicKey } from '@solana/web3.js';
import * as types from '../types';
export interface AggregatorSetHistoryBufferArgs {
    params: types.AggregatorSetHistoryBufferParamsFields;
}
export interface AggregatorSetHistoryBufferAccounts {
    aggregator: PublicKey;
    authority: PublicKey;
    buffer: PublicKey;
}
export declare const layout: any;
export declare function aggregatorSetHistoryBuffer(program: SwitchboardProgram, args: AggregatorSetHistoryBufferArgs, accounts: AggregatorSetHistoryBufferAccounts): TransactionInstruction;
//# sourceMappingURL=aggregatorSetHistoryBuffer.d.ts.map