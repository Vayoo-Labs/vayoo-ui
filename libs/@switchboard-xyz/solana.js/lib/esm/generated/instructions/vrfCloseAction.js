import { TransactionInstruction, } from '@solana/web3.js'; // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from '@coral-xyz/borsh'; // eslint-disable-line @typescript-eslint/no-unused-vars
import * as types from '../types'; // eslint-disable-line @typescript-eslint/no-unused-vars
export const layout = borsh.struct([types.VrfCloseParams.layout('params')]);
export function vrfCloseAction(program, args, accounts) {
    const keys = [
        { pubkey: accounts.authority, isSigner: true, isWritable: false },
        { pubkey: accounts.vrf, isSigner: false, isWritable: true },
        { pubkey: accounts.permission, isSigner: false, isWritable: true },
        { pubkey: accounts.oracleQueue, isSigner: false, isWritable: false },
        { pubkey: accounts.queueAuthority, isSigner: false, isWritable: false },
        { pubkey: accounts.programState, isSigner: false, isWritable: false },
        { pubkey: accounts.escrow, isSigner: false, isWritable: true },
        { pubkey: accounts.solDest, isSigner: false, isWritable: false },
        { pubkey: accounts.escrowDest, isSigner: false, isWritable: true },
        { pubkey: accounts.tokenProgram, isSigner: false, isWritable: false },
    ];
    const identifier = Buffer.from([97, 172, 124, 16, 175, 10, 246, 147]);
    const buffer = Buffer.alloc(1000);
    const len = layout.encode({
        params: types.VrfCloseParams.toEncodable(args.params),
    }, buffer);
    const data = Buffer.concat([identifier, buffer]).slice(0, 8 + len);
    const ix = new TransactionInstruction({
        keys,
        programId: program.programId,
        data,
    });
    return ix;
}
//# sourceMappingURL=vrfCloseAction.js.map