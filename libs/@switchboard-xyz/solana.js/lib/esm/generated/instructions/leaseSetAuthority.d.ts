import { SwitchboardProgram } from '../../SwitchboardProgram';
import { TransactionInstruction, PublicKey } from '@solana/web3.js';
import * as types from '../types';
export interface LeaseSetAuthorityArgs {
    params: types.LeaseSetAuthorityParamsFields;
}
export interface LeaseSetAuthorityAccounts {
    lease: PublicKey;
    withdrawAuthority: PublicKey;
    newAuthority: PublicKey;
}
export declare const layout: any;
export declare function leaseSetAuthority(program: SwitchboardProgram, args: LeaseSetAuthorityArgs, accounts: LeaseSetAuthorityAccounts): TransactionInstruction;
//# sourceMappingURL=leaseSetAuthority.d.ts.map