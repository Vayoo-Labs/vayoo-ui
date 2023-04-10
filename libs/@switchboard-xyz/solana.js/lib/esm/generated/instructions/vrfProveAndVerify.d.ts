import { SwitchboardProgram } from '../../SwitchboardProgram';
import { TransactionInstruction, PublicKey } from '@solana/web3.js';
import * as types from '../types';
export interface VrfProveAndVerifyArgs {
    params: types.VrfProveAndVerifyParamsFields;
}
export interface VrfProveAndVerifyAccounts {
    vrf: PublicKey;
    callbackPid: PublicKey;
    tokenProgram: PublicKey;
    escrow: PublicKey;
    programState: PublicKey;
    oracle: PublicKey;
    oracleAuthority: PublicKey;
    oracleWallet: PublicKey;
    instructionsSysvar: PublicKey;
}
export declare const layout: any;
export declare function vrfProveAndVerify(program: SwitchboardProgram, args: VrfProveAndVerifyArgs, accounts: VrfProveAndVerifyAccounts): TransactionInstruction;
//# sourceMappingURL=vrfProveAndVerify.d.ts.map