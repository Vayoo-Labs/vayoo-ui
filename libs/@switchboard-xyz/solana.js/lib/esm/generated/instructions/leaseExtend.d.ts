import { SwitchboardProgram } from '../../SwitchboardProgram';
import { TransactionInstruction, PublicKey } from '@solana/web3.js';
import * as types from '../types';
export interface LeaseExtendArgs {
    params: types.LeaseExtendParamsFields;
}
export interface LeaseExtendAccounts {
    lease: PublicKey;
    aggregator: PublicKey;
    queue: PublicKey;
    funder: PublicKey;
    owner: PublicKey;
    escrow: PublicKey;
    tokenProgram: PublicKey;
    programState: PublicKey;
    mint: PublicKey;
}
export declare const layout: any;
export declare function leaseExtend(program: SwitchboardProgram, args: LeaseExtendArgs, accounts: LeaseExtendAccounts): TransactionInstruction;
//# sourceMappingURL=leaseExtend.d.ts.map