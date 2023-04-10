import { SwitchboardProgram } from '../../SwitchboardProgram';
import { TransactionInstruction, PublicKey } from '@solana/web3.js';
import * as types from '../types';
export interface VrfInitArgs {
    params: types.VrfInitParamsFields;
}
export interface VrfInitAccounts {
    vrf: PublicKey;
    authority: PublicKey;
    oracleQueue: PublicKey;
    escrow: PublicKey;
    programState: PublicKey;
    tokenProgram: PublicKey;
}
export declare const layout: any;
export declare function vrfInit(program: SwitchboardProgram, args: VrfInitArgs, accounts: VrfInitAccounts): TransactionInstruction;
//# sourceMappingURL=vrfInit.d.ts.map