import { SwitchboardProgram } from '../../SwitchboardProgram';
import { TransactionInstruction, PublicKey } from '@solana/web3.js';
import * as types from '../types';
export interface LeaseInitArgs {
    params: types.LeaseInitParamsFields;
}
export interface LeaseInitAccounts {
    lease: PublicKey;
    queue: PublicKey;
    aggregator: PublicKey;
    funder: PublicKey;
    payer: PublicKey;
    systemProgram: PublicKey;
    tokenProgram: PublicKey;
    owner: PublicKey;
    escrow: PublicKey;
    programState: PublicKey;
    mint: PublicKey;
}
export declare const layout: any;
export declare function leaseInit(program: SwitchboardProgram, args: LeaseInitArgs, accounts: LeaseInitAccounts): TransactionInstruction;
//# sourceMappingURL=leaseInit.d.ts.map