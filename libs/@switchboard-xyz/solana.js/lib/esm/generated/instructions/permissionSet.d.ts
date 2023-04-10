import { SwitchboardProgram } from '../../SwitchboardProgram';
import { TransactionInstruction, PublicKey } from '@solana/web3.js';
import * as types from '../types';
export interface PermissionSetArgs {
    params: types.PermissionSetParamsFields;
}
export interface PermissionSetAccounts {
    permission: PublicKey;
    authority: PublicKey;
}
export declare const layout: any;
export declare function permissionSet(program: SwitchboardProgram, args: PermissionSetArgs, accounts: PermissionSetAccounts): TransactionInstruction;
//# sourceMappingURL=permissionSet.d.ts.map