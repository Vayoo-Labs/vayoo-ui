import { SwitchboardProgram } from '../../SwitchboardProgram';
import { TransactionInstruction, PublicKey } from '@solana/web3.js';
import * as types from '../types';
export interface VrfLiteCloseActionArgs {
    params: types.VrfLiteCloseParamsFields;
}
export interface VrfLiteCloseActionAccounts {
    authority: PublicKey;
    vrfLite: PublicKey;
    permission: PublicKey;
    queue: PublicKey;
    queueAuthority: PublicKey;
    programState: PublicKey;
    escrow: PublicKey;
    solDest: PublicKey;
    escrowDest: PublicKey;
    tokenProgram: PublicKey;
}
export declare const layout: any;
export declare function vrfLiteCloseAction(program: SwitchboardProgram, args: VrfLiteCloseActionArgs, accounts: VrfLiteCloseActionAccounts): TransactionInstruction;
//# sourceMappingURL=vrfLiteCloseAction.d.ts.map