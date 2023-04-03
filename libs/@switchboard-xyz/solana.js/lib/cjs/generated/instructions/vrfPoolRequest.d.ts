import { SwitchboardProgram } from '../../SwitchboardProgram';
import { TransactionInstruction, PublicKey } from '@solana/web3.js';
import * as types from '../types';
export interface VrfPoolRequestArgs {
    params: types.VrfPoolRequestParamsFields;
}
export interface VrfPoolRequestAccounts {
    authority: PublicKey;
    vrfPool: PublicKey;
    escrow: PublicKey;
    mint: PublicKey;
    queue: PublicKey;
    queueAuthority: PublicKey;
    dataBuffer: PublicKey;
    recentBlockhashes: PublicKey;
    programState: PublicKey;
    tokenProgram: PublicKey;
}
export declare const layout: any;
export declare function vrfPoolRequest(program: SwitchboardProgram, args: VrfPoolRequestArgs, accounts: VrfPoolRequestAccounts): TransactionInstruction;
//# sourceMappingURL=vrfPoolRequest.d.ts.map