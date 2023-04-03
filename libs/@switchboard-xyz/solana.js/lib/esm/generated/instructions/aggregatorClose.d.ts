import { SwitchboardProgram } from '../../SwitchboardProgram';
import { TransactionInstruction, PublicKey } from '@solana/web3.js';
import * as types from '../types';
export interface AggregatorCloseArgs {
    params: types.AggregatorCloseParamsFields;
}
export interface AggregatorCloseAccounts {
    authority: PublicKey;
    aggregator: PublicKey;
    permission: PublicKey;
    lease: PublicKey;
    escrow: PublicKey;
    oracleQueue: PublicKey;
    queueAuthority: PublicKey;
    programState: PublicKey;
    solDest: PublicKey;
    escrowDest: PublicKey;
    tokenProgram: PublicKey;
    /** Optional accounts */
    crank: PublicKey;
    dataBuffer: PublicKey;
    slidingWindow: PublicKey;
}
export declare const layout: any;
export declare function aggregatorClose(program: SwitchboardProgram, args: AggregatorCloseArgs, accounts: AggregatorCloseAccounts): TransactionInstruction;
//# sourceMappingURL=aggregatorClose.d.ts.map