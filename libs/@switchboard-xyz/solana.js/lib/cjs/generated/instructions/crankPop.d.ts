import { SwitchboardProgram } from '../../SwitchboardProgram';
import { TransactionInstruction, PublicKey } from '@solana/web3.js';
import * as types from '../types';
export interface CrankPopArgs {
    params: types.CrankPopParamsFields;
}
export interface CrankPopAccounts {
    crank: PublicKey;
    oracleQueue: PublicKey;
    queueAuthority: PublicKey;
    programState: PublicKey;
    payoutWallet: PublicKey;
    tokenProgram: PublicKey;
    crankDataBuffer: PublicKey;
    queueDataBuffer: PublicKey;
    mint: PublicKey;
}
export declare const layout: any;
export declare function crankPop(program: SwitchboardProgram, args: CrankPopArgs, accounts: CrankPopAccounts): TransactionInstruction;
//# sourceMappingURL=crankPop.d.ts.map