import { TransactionInstruction, } from '@solana/web3.js'; // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from '@coral-xyz/borsh'; // eslint-disable-line @typescript-eslint/no-unused-vars
import * as types from '../types'; // eslint-disable-line @typescript-eslint/no-unused-vars
export const layout = borsh.struct([types.ProgramInitParams.layout('params')]);
export function programInit(program, args, accounts) {
    const keys = [
        { pubkey: accounts.state, isSigner: false, isWritable: true },
        { pubkey: accounts.authority, isSigner: false, isWritable: false },
        { pubkey: accounts.tokenMint, isSigner: false, isWritable: true },
        { pubkey: accounts.vault, isSigner: false, isWritable: true },
        { pubkey: accounts.payer, isSigner: true, isWritable: true },
        { pubkey: accounts.systemProgram, isSigner: false, isWritable: false },
        { pubkey: accounts.tokenProgram, isSigner: false, isWritable: false },
        { pubkey: accounts.daoMint, isSigner: false, isWritable: false },
    ];
    const identifier = Buffer.from([199, 209, 193, 213, 138, 30, 175, 13]);
    const buffer = Buffer.alloc(1000);
    const len = layout.encode({
        params: types.ProgramInitParams.toEncodable(args.params),
    }, buffer);
    const data = Buffer.concat([identifier, buffer]).slice(0, 8 + len);
    const ix = new TransactionInstruction({
        keys,
        programId: program.programId,
        data,
    });
    return ix;
}
//# sourceMappingURL=programInit.js.map