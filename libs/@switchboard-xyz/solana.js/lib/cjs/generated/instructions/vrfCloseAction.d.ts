import { SwitchboardProgram } from '../../SwitchboardProgram';
import { TransactionInstruction, PublicKey } from '@solana/web3.js';
import * as types from '../types';
export interface VrfCloseActionArgs {
    params: types.VrfCloseParamsFields;
}
export interface VrfCloseActionAccounts {
    authority: PublicKey;
    vrf: PublicKey;
    permission: PublicKey;
    oracleQueue: PublicKey;
    queueAuthority: PublicKey;
    programState: PublicKey;
    escrow: PublicKey;
    solDest: PublicKey;
    escrowDest: PublicKey;
    tokenProgram: PublicKey;
}
export declare const layout: any;
export declare function vrfCloseAction(program: SwitchboardProgram, args: VrfCloseActionArgs, accounts: VrfCloseActionAccounts): TransactionInstruction;
//# sourceMappingURL=vrfCloseAction.d.ts.map