import { SwitchboardProgram } from '../../SwitchboardProgram';
import { TransactionInstruction, PublicKey } from '@solana/web3.js';
import * as types from '../types';
export interface BufferRelayerSaveResultArgs {
    params: types.BufferRelayerSaveResultParamsFields;
}
export interface BufferRelayerSaveResultAccounts {
    bufferRelayer: PublicKey;
    oracleAuthority: PublicKey;
    oracle: PublicKey;
    oracleQueue: PublicKey;
    dataBuffer: PublicKey;
    queueAuthority: PublicKey;
    permission: PublicKey;
    escrow: PublicKey;
    oracleWallet: PublicKey;
    programState: PublicKey;
    tokenProgram: PublicKey;
}
export declare const layout: any;
export declare function bufferRelayerSaveResult(program: SwitchboardProgram, args: BufferRelayerSaveResultArgs, accounts: BufferRelayerSaveResultAccounts): TransactionInstruction;
//# sourceMappingURL=bufferRelayerSaveResult.d.ts.map