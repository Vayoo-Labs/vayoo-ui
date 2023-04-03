import { SwitchboardProgram } from '../../SwitchboardProgram';
import { TransactionInstruction, PublicKey } from '@solana/web3.js';
import * as types from '../types';
export interface VaultTransferArgs {
    params: types.VaultTransferParamsFields;
}
export interface VaultTransferAccounts {
    state: PublicKey;
    authority: PublicKey;
    to: PublicKey;
    vault: PublicKey;
    tokenProgram: PublicKey;
}
export declare const layout: any;
export declare function vaultTransfer(program: SwitchboardProgram, args: VaultTransferArgs, accounts: VaultTransferAccounts): TransactionInstruction;
//# sourceMappingURL=vaultTransfer.d.ts.map