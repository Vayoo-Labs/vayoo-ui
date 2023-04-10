import { SwitchboardProgram } from '../../SwitchboardProgram';
import { TransactionInstruction, PublicKey } from '@solana/web3.js';
import * as types from '../types';
export interface BufferRelayerInitArgs {
    params: types.BufferRelayerInitParamsFields;
}
export interface BufferRelayerInitAccounts {
    bufferRelayer: PublicKey;
    escrow: PublicKey;
    authority: PublicKey;
    queue: PublicKey;
    job: PublicKey;
    programState: PublicKey;
    mint: PublicKey;
    payer: PublicKey;
    tokenProgram: PublicKey;
    associatedTokenProgram: PublicKey;
    systemProgram: PublicKey;
    rent: PublicKey;
}
export declare const layout: any;
export declare function bufferRelayerInit(program: SwitchboardProgram, args: BufferRelayerInitArgs, accounts: BufferRelayerInitAccounts): TransactionInstruction;
//# sourceMappingURL=bufferRelayerInit.d.ts.map