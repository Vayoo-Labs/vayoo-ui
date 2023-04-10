import { SwitchboardProgram } from '../../SwitchboardProgram';
import { TransactionInstruction, PublicKey } from '@solana/web3.js';
import * as types from '../types';
export interface VrfLiteProveAndVerifyArgs {
    params: types.VrfLiteProveAndVerifyParamsFields;
}
export interface VrfLiteProveAndVerifyAccounts {
    vrfLite: PublicKey;
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
export declare function vrfLiteProveAndVerify(program: SwitchboardProgram, args: VrfLiteProveAndVerifyArgs, accounts: VrfLiteProveAndVerifyAccounts): TransactionInstruction;
//# sourceMappingURL=vrfLiteProveAndVerify.d.ts.map