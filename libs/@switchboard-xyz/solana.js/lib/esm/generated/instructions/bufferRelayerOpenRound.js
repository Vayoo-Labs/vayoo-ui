import { TransactionInstruction, } from '@solana/web3.js'; // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from '@coral-xyz/borsh'; // eslint-disable-line @typescript-eslint/no-unused-vars
import * as types from '../types'; // eslint-disable-line @typescript-eslint/no-unused-vars
export const layout = borsh.struct([
    types.BufferRelayerOpenRoundParams.layout('params'),
]);
export function bufferRelayerOpenRound(program, args, accounts) {
    const keys = [
        { pubkey: accounts.bufferRelayer, isSigner: false, isWritable: true },
        { pubkey: accounts.oracleQueue, isSigner: false, isWritable: true },
        { pubkey: accounts.dataBuffer, isSigner: false, isWritable: true },
        { pubkey: accounts.permission, isSigner: false, isWritable: true },
        { pubkey: accounts.escrow, isSigner: false, isWritable: true },
        { pubkey: accounts.programState, isSigner: false, isWritable: false },
    ];
    const identifier = Buffer.from([192, 42, 231, 189, 35, 172, 51, 9]);
    const buffer = Buffer.alloc(1000);
    const len = layout.encode({
        params: types.BufferRelayerOpenRoundParams.toEncodable(args.params),
    }, buffer);
    const data = Buffer.concat([identifier, buffer]).slice(0, 8 + len);
    const ix = new TransactionInstruction({
        keys,
        programId: program.programId,
        data,
    });
    return ix;
}
//# sourceMappingURL=bufferRelayerOpenRound.js.map