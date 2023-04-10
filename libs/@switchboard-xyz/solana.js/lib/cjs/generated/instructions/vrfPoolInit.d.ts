import { SwitchboardProgram } from '../../SwitchboardProgram';
import { TransactionInstruction, PublicKey } from '@solana/web3.js';
import * as types from '../types';
export interface VrfPoolInitArgs {
    params: types.VrfPoolInitParamsFields;
}
export interface VrfPoolInitAccounts {
    authority: PublicKey;
    vrfPool: PublicKey;
    queue: PublicKey;
    mint: PublicKey;
    escrow: PublicKey;
    programState: PublicKey;
    payer: PublicKey;
    tokenProgram: PublicKey;
    associatedTokenProgram: PublicKey;
    systemProgram: PublicKey;
    rent: PublicKey;
}
export declare const layout: any;
export declare function vrfPoolInit(program: SwitchboardProgram, args: VrfPoolInitArgs, accounts: VrfPoolInitAccounts): TransactionInstruction;
//# sourceMappingURL=vrfPoolInit.d.ts.map