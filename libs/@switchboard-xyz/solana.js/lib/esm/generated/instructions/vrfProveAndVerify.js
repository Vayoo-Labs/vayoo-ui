import { TransactionInstruction, } from '@solana/web3.js'; // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from '@coral-xyz/borsh'; // eslint-disable-line @typescript-eslint/no-unused-vars
import * as types from '../types'; // eslint-disable-line @typescript-eslint/no-unused-vars
export const layout = borsh.struct([
    types.VrfProveAndVerifyParams.layout('params'),
]);
export function vrfProveAndVerify(program, args, accounts) {
    const keys = [
        { pubkey: accounts.vrf, isSigner: false, isWritable: true },
        { pubkey: accounts.callbackPid, isSigner: false, isWritable: false },
        { pubkey: accounts.tokenProgram, isSigner: false, isWritable: false },
        { pubkey: accounts.escrow, isSigner: false, isWritable: true },
        { pubkey: accounts.programState, isSigner: false, isWritable: false },
        { pubkey: accounts.oracle, isSigner: false, isWritable: false },
        { pubkey: accounts.oracleAuthority, isSigner: true, isWritable: false },
        { pubkey: accounts.oracleWallet, isSigner: false, isWritable: true },
        { pubkey: accounts.instructionsSysvar, isSigner: false, isWritable: false },
    ];
    const identifier = Buffer.from([133, 190, 186, 48, 208, 164, 205, 34]);
    const buffer = Buffer.alloc(1000);
    const len = layout.encode({
        params: types.VrfProveAndVerifyParams.toEncodable(args.params),
    }, buffer);
    const data = Buffer.concat([identifier, buffer]).slice(0, 8 + len);
    const ix = new TransactionInstruction({
        keys,
        programId: program.programId,
        data,
    });
    return ix;
}
//# sourceMappingURL=vrfProveAndVerify.js.map