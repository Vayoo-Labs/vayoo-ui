import { TransactionInstruction, } from '@solana/web3.js'; // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from '@coral-xyz/borsh'; // eslint-disable-line @typescript-eslint/no-unused-vars
import * as types from '../types'; // eslint-disable-line @typescript-eslint/no-unused-vars
export const layout = borsh.struct([types.VrfPoolAddParams.layout('params')]);
export function vrfPoolAdd(program, args, accounts) {
    const keys = [
        { pubkey: accounts.authority, isSigner: false, isWritable: false },
        { pubkey: accounts.vrfPool, isSigner: false, isWritable: true },
        { pubkey: accounts.vrfLite, isSigner: false, isWritable: true },
        { pubkey: accounts.queue, isSigner: false, isWritable: false },
        { pubkey: accounts.permission, isSigner: false, isWritable: false },
    ];
    const identifier = Buffer.from([234, 143, 61, 230, 212, 57, 8, 234]);
    const buffer = Buffer.alloc(1000);
    const len = layout.encode({
        params: types.VrfPoolAddParams.toEncodable(args.params),
    }, buffer);
    const data = Buffer.concat([identifier, buffer]).slice(0, 8 + len);
    const ix = new TransactionInstruction({
        keys,
        programId: program.programId,
        data,
    });
    return ix;
}
//# sourceMappingURL=vrfPoolAdd.js.map