import { SwitchboardProgram } from '../../SwitchboardProgram';
import { TransactionInstruction, PublicKey } from '@solana/web3.js';
import * as types from '../types';
export interface VrfRequestRandomnessArgs {
    params: types.VrfRequestRandomnessParamsFields;
}
export interface VrfRequestRandomnessAccounts {
    authority: PublicKey;
    vrf: PublicKey;
    oracleQueue: PublicKey;
    queueAuthority: PublicKey;
    dataBuffer: PublicKey;
    permission: PublicKey;
    escrow: PublicKey;
    payerWallet: PublicKey;
    payerAuthority: PublicKey;
    recentBlockhashes: PublicKey;
    programState: PublicKey;
    tokenProgram: PublicKey;
}
export declare const layout: any;
export declare function vrfRequestRandomness(program: SwitchboardProgram, args: VrfRequestRandomnessArgs, accounts: VrfRequestRandomnessAccounts): TransactionInstruction;
//# sourceMappingURL=vrfRequestRandomness.d.ts.map