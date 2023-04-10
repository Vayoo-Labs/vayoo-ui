import { SwitchboardProgram } from '../../SwitchboardProgram';
import { TransactionInstruction, PublicKey } from '@solana/web3.js';
import * as types from '../types';
export interface PermissionInitArgs {
    params: types.PermissionInitParamsFields;
}
export interface PermissionInitAccounts {
    permission: PublicKey;
    authority: PublicKey;
    granter: PublicKey;
    grantee: PublicKey;
    payer: PublicKey;
    systemProgram: PublicKey;
}
export declare const layout: any;
export declare function permissionInit(program: SwitchboardProgram, args: PermissionInitArgs, accounts: PermissionInitAccounts): TransactionInstruction;
//# sourceMappingURL=permissionInit.d.ts.map