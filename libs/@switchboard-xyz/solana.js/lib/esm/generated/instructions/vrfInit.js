import { TransactionInstruction, } from '@solana/web3.js'; // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from '@coral-xyz/borsh'; // eslint-disable-line @typescript-eslint/no-unused-vars
import * as types from '../types'; // eslint-disable-line @typescript-eslint/no-unused-vars
export const layout = borsh.struct([types.VrfInitParams.layout('params')]);
export function vrfInit(program, args, accounts) {
    const keys = [
        { pubkey: accounts.vrf, isSigner: false, isWritable: true },
        { pubkey: accounts.authority, isSigner: false, isWritable: false },
        { pubkey: accounts.oracleQueue, isSigner: false, isWritable: false },
        { pubkey: accounts.escrow, isSigner: false, isWritable: true },
        { pubkey: accounts.programState, isSigner: false, isWritable: false },
        { pubkey: accounts.tokenProgram, isSigner: false, isWritable: false },
    ];
    const identifier = Buffer.from([241, 76, 92, 234, 230, 240, 164, 0]);
    const buffer = Buffer.alloc(1000);
    const len = layout.encode({
        params: types.VrfInitParams.toEncodable(args.params),
    }, buffer);
    const data = Buffer.concat([identifier, buffer]).slice(0, 8 + len);
    const ix = new TransactionInstruction({
        keys,
        programId: program.programId,
        data,
    });
    return ix;
}
//# sourceMappingURL=vrfInit.js.map