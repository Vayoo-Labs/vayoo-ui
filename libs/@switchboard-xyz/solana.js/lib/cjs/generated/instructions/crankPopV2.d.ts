import { SwitchboardProgram } from '../../SwitchboardProgram';
import { TransactionInstruction, PublicKey } from '@solana/web3.js';
import * as types from '../types';
export interface CrankPopV2Args {
    params: types.CrankPopParamsV2Fields;
}
export interface CrankPopV2Accounts {
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
export declare function crankPopV2(program: SwitchboardProgram, args: CrankPopV2Args, accounts: CrankPopV2Accounts): TransactionInstruction;
//# sourceMappingURL=crankPopV2.d.ts.map