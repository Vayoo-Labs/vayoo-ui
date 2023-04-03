import { SwitchboardProgram } from '../../SwitchboardProgram';
import { TransactionInstruction, PublicKey } from '@solana/web3.js';
import * as types from '../types';
export interface VrfPoolRemoveArgs {
    params: types.VrfPoolRemoveParamsFields;
}
export interface VrfPoolRemoveAccounts {
    authority: PublicKey;
    vrfPool: PublicKey;
    queue: PublicKey;
}
export declare const layout: any;
export declare function vrfPoolRemove(program: SwitchboardProgram, args: VrfPoolRemoveArgs, accounts: VrfPoolRemoveAccounts): TransactionInstruction;
//# sourceMappingURL=vrfPoolRemove.d.ts.map