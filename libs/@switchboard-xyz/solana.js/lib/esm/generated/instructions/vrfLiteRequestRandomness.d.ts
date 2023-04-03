import { SwitchboardProgram } from '../../SwitchboardProgram';
import { TransactionInstruction, PublicKey } from '@solana/web3.js';
import * as types from '../types';
export interface VrfLiteRequestRandomnessArgs {
    params: types.VrfLiteRequestRandomnessParamsFields;
}
export interface VrfLiteRequestRandomnessAccounts {
    authority: PublicKey;
    vrfLite: PublicKey;
    queue: PublicKey;
    queueAuthority: PublicKey;
    dataBuffer: PublicKey;
    permission: PublicKey;
    escrow: PublicKey;
    recentBlockhashes: PublicKey;
    programState: PublicKey;
    tokenProgram: PublicKey;
}
export declare const layout: any;
export declare function vrfLiteRequestRandomness(program: SwitchboardProgram, args: VrfLiteRequestRandomnessArgs, accounts: VrfLiteRequestRandomnessAccounts): TransactionInstruction;
//# sourceMappingURL=vrfLiteRequestRandomness.d.ts.map