import { TransactionInstruction, } from '@solana/web3.js'; // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from '@coral-xyz/borsh'; // eslint-disable-line @typescript-eslint/no-unused-vars
import * as types from '../types'; // eslint-disable-line @typescript-eslint/no-unused-vars
export const layout = borsh.struct([types.VrfLiteInitParams.layout('params')]);
export function vrfLiteInit(program, args, accounts) {
    const keys = [
        { pubkey: accounts.authority, isSigner: false, isWritable: false },
        { pubkey: accounts.vrf, isSigner: true, isWritable: true },
        { pubkey: accounts.mint, isSigner: false, isWritable: false },
        { pubkey: accounts.escrow, isSigner: false, isWritable: true },
        { pubkey: accounts.queueAuthority, isSigner: false, isWritable: false },
        { pubkey: accounts.queue, isSigner: false, isWritable: false },
        { pubkey: accounts.permission, isSigner: false, isWritable: true },
        { pubkey: accounts.programState, isSigner: false, isWritable: false },
        { pubkey: accounts.payer, isSigner: true, isWritable: true },
        { pubkey: accounts.tokenProgram, isSigner: false, isWritable: false },
        {
            pubkey: accounts.associatedTokenProgram,
            isSigner: false,
            isWritable: false,
        },
        { pubkey: accounts.systemProgram, isSigner: false, isWritable: false },
        { pubkey: accounts.rent, isSigner: false, isWritable: false },
    ];
    const identifier = Buffer.from([144, 40, 147, 33, 238, 92, 88, 46]);
    const buffer = Buffer.alloc(1000);
    const len = layout.encode({
        params: types.VrfLiteInitParams.toEncodable(args.params),
    }, buffer);
    const data = Buffer.concat([identifier, buffer]).slice(0, 8 + len);
    const ix = new TransactionInstruction({
        keys,
        programId: program.programId,
        data,
    });
    return ix;
}
//# sourceMappingURL=vrfLiteInit.js.map