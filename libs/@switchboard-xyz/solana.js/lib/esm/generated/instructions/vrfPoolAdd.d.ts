import { SwitchboardProgram } from '../../SwitchboardProgram';
import { TransactionInstruction, PublicKey } from '@solana/web3.js';
import * as types from '../types';
export interface VrfPoolAddArgs {
    params: types.VrfPoolAddParamsFields;
}
export interface VrfPoolAddAccounts {
    authority: PublicKey;
    vrfPool: PublicKey;
    vrfLite: PublicKey;
    queue: PublicKey;
    permission: PublicKey;
}
export declare const layout: any;
export declare function vrfPoolAdd(program: SwitchboardProgram, args: VrfPoolAddArgs, accounts: VrfPoolAddAccounts): TransactionInstruction;
//# sourceMappingURL=vrfPoolAdd.d.ts.map