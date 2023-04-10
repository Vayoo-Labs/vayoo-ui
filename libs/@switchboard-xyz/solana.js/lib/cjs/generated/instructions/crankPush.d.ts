import { SwitchboardProgram } from '../../SwitchboardProgram';
import { TransactionInstruction, PublicKey } from '@solana/web3.js';
import * as types from '../types';
export interface CrankPushArgs {
    params: types.CrankPushParamsFields;
}
export interface CrankPushAccounts {
    crank: PublicKey;
    aggregator: PublicKey;
    oracleQueue: PublicKey;
    queueAuthority: PublicKey;
    permission: PublicKey;
    lease: PublicKey;
    escrow: PublicKey;
    programState: PublicKey;
    dataBuffer: PublicKey;
}
export declare const layout: any;
export declare function crankPush(program: SwitchboardProgram, args: CrankPushArgs, accounts: CrankPushAccounts): TransactionInstruction;
//# sourceMappingURL=crankPush.d.ts.map