import { SwitchboardProgram } from '../../SwitchboardProgram';
import { TransactionInstruction, PublicKey } from '@solana/web3.js';
import * as types from '../types';
export interface VrfLiteInitArgs {
    params: types.VrfLiteInitParamsFields;
}
export interface VrfLiteInitAccounts {
    authority: PublicKey;
    vrf: PublicKey;
    mint: PublicKey;
    escrow: PublicKey;
    queueAuthority: PublicKey;
    queue: PublicKey;
    permission: PublicKey;
    programState: PublicKey;
    payer: PublicKey;
    tokenProgram: PublicKey;
    associatedTokenProgram: PublicKey;
    systemProgram: PublicKey;
    rent: PublicKey;
}
export declare const layout: any;
export declare function vrfLiteInit(program: SwitchboardProgram, args: VrfLiteInitArgs, accounts: VrfLiteInitAccounts): TransactionInstruction;
//# sourceMappingURL=vrfLiteInit.d.ts.map