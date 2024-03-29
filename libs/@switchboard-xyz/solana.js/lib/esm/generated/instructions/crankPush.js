import { TransactionInstruction, } from '@solana/web3.js'; // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from '@coral-xyz/borsh'; // eslint-disable-line @typescript-eslint/no-unused-vars
import * as types from '../types'; // eslint-disable-line @typescript-eslint/no-unused-vars
export const layout = borsh.struct([types.CrankPushParams.layout('params')]);
export function crankPush(program, args, accounts) {
    const keys = [
        { pubkey: accounts.crank, isSigner: false, isWritable: true },
        { pubkey: accounts.aggregator, isSigner: false, isWritable: true },
        { pubkey: accounts.oracleQueue, isSigner: false, isWritable: true },
        { pubkey: accounts.queueAuthority, isSigner: false, isWritable: false },
        { pubkey: accounts.permission, isSigner: false, isWritable: false },
        { pubkey: accounts.lease, isSigner: false, isWritable: true },
        { pubkey: accounts.escrow, isSigner: false, isWritable: true },
        { pubkey: accounts.programState, isSigner: false, isWritable: false },
        { pubkey: accounts.dataBuffer, isSigner: false, isWritable: true },
    ];
    const identifier = Buffer.from([155, 175, 160, 18, 7, 147, 249, 16]);
    const buffer = Buffer.alloc(1000);
    const len = layout.encode({
        params: types.CrankPushParams.toEncodable(args.params),
    }, buffer);
    const data = Buffer.concat([identifier, buffer]).slice(0, 8 + len);
    const ix = new TransactionInstruction({
        keys,
        programId: program.programId,
        data,
    });
    return ix;
}
//# sourceMappingURL=crankPush.js.map