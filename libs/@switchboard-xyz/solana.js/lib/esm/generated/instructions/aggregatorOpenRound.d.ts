import { SwitchboardProgram } from '../../SwitchboardProgram';
import { TransactionInstruction, PublicKey } from '@solana/web3.js';
import * as types from '../types';
export interface AggregatorOpenRoundArgs {
    params: types.AggregatorOpenRoundParamsFields;
}
export interface AggregatorOpenRoundAccounts {
    aggregator: PublicKey;
    lease: PublicKey;
    oracleQueue: PublicKey;
    queueAuthority: PublicKey;
    permission: PublicKey;
    escrow: PublicKey;
    programState: PublicKey;
    payoutWallet: PublicKey;
    tokenProgram: PublicKey;
    dataBuffer: PublicKey;
    mint: PublicKey;
}
export declare const layout: any;
export declare function aggregatorOpenRound(program: SwitchboardProgram, args: AggregatorOpenRoundArgs, accounts: AggregatorOpenRoundAccounts): TransactionInstruction;
//# sourceMappingURL=aggregatorOpenRound.d.ts.map