import { SwitchboardProgram } from '../../SwitchboardProgram';
import { TransactionInstruction, PublicKey } from '@solana/web3.js';
import * as types from '../types';
export interface BufferRelayerOpenRoundArgs {
    params: types.BufferRelayerOpenRoundParamsFields;
}
export interface BufferRelayerOpenRoundAccounts {
    bufferRelayer: PublicKey;
    oracleQueue: PublicKey;
    dataBuffer: PublicKey;
    permission: PublicKey;
    escrow: PublicKey;
    programState: PublicKey;
}
export declare const layout: any;
export declare function bufferRelayerOpenRound(program: SwitchboardProgram, args: BufferRelayerOpenRoundArgs, accounts: BufferRelayerOpenRoundAccounts): TransactionInstruction;
//# sourceMappingURL=bufferRelayerOpenRound.d.ts.map