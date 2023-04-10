import { SwitchboardProgram } from '../../SwitchboardProgram';
import { TransactionInstruction, PublicKey } from '@solana/web3.js';
import * as types from '../types';
export interface AggregatorSetAuthorityArgs {
    params: types.AggregatorSetAuthorityParamsFields;
}
export interface AggregatorSetAuthorityAccounts {
    aggregator: PublicKey;
    authority: PublicKey;
    newAuthority: PublicKey;
}
export declare const layout: any;
export declare function aggregatorSetAuthority(program: SwitchboardProgram, args: AggregatorSetAuthorityArgs, accounts: AggregatorSetAuthorityAccounts): TransactionInstruction;
//# sourceMappingURL=aggregatorSetAuthority.d.ts.map