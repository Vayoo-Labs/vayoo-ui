import { TransactionInstruction, } from '@solana/web3.js'; // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from '@coral-xyz/borsh'; // eslint-disable-line @typescript-eslint/no-unused-vars
import * as types from '../types'; // eslint-disable-line @typescript-eslint/no-unused-vars
export const layout = borsh.struct([
    types.ProgramConfigParams.layout('params'),
]);
export function programConfig(program, args, accounts) {
    const keys = [
        { pubkey: accounts.authority, isSigner: true, isWritable: false },
        { pubkey: accounts.programState, isSigner: false, isWritable: true },
        { pubkey: accounts.daoMint, isSigner: false, isWritable: false },
    ];
    const identifier = Buffer.from([62, 123, 20, 150, 56, 109, 209, 145]);
    const buffer = Buffer.alloc(1000);
    const len = layout.encode({
        params: types.ProgramConfigParams.toEncodable(args.params),
    }, buffer);
    const data = Buffer.concat([identifier, buffer]).slice(0, 8 + len);
    const ix = new TransactionInstruction({
        keys,
        programId: program.programId,
        data,
    });
    return ix;
}
//# sourceMappingURL=programConfig.js.map