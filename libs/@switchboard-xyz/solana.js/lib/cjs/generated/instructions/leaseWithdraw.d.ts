import { SwitchboardProgram } from '../../SwitchboardProgram';
import { TransactionInstruction, PublicKey } from '@solana/web3.js';
import * as types from '../types';
export interface LeaseWithdrawArgs {
    params: types.LeaseWithdrawParamsFields;
}
export interface LeaseWithdrawAccounts {
    lease: PublicKey;
    escrow: PublicKey;
    aggregator: PublicKey;
    queue: PublicKey;
    withdrawAuthority: PublicKey;
    withdrawAccount: PublicKey;
    tokenProgram: PublicKey;
    programState: PublicKey;
    mint: PublicKey;
}
export declare const layout: any;
export declare function leaseWithdraw(program: SwitchboardProgram, args: LeaseWithdrawArgs, accounts: LeaseWithdrawAccounts): TransactionInstruction;
//# sourceMappingURL=leaseWithdraw.d.ts.map