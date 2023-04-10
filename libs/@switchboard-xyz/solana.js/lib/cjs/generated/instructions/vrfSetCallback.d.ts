import { SwitchboardProgram } from '../../SwitchboardProgram';
import { TransactionInstruction, PublicKey } from '@solana/web3.js';
import * as types from '../types';
export interface VrfSetCallbackArgs {
    params: types.VrfSetCallbackParamsFields;
}
export interface VrfSetCallbackAccounts {
    vrf: PublicKey;
    authority: PublicKey;
}
export declare const layout: any;
export declare function vrfSetCallback(program: SwitchboardProgram, args: VrfSetCallbackArgs, accounts: VrfSetCallbackAccounts): TransactionInstruction;
//# sourceMappingURL=vrfSetCallback.d.ts.map