import { TransactionInstruction, } from '@solana/web3.js'; // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from '@coral-xyz/borsh'; // eslint-disable-line @typescript-eslint/no-unused-vars
import * as types from '../types'; // eslint-disable-line @typescript-eslint/no-unused-vars
export const layout = borsh.struct([
    types.LeaseSetAuthorityParams.layout('params'),
]);
export function leaseSetAuthority(program, args, accounts) {
    const keys = [
        { pubkey: accounts.lease, isSigner: false, isWritable: true },
        { pubkey: accounts.withdrawAuthority, isSigner: true, isWritable: false },
        { pubkey: accounts.newAuthority, isSigner: false, isWritable: false },
    ];
    const identifier = Buffer.from([255, 4, 88, 2, 213, 175, 87, 22]);
    const buffer = Buffer.alloc(1000);
    const len = layout.encode({
        params: types.LeaseSetAuthorityParams.toEncodable(args.params),
    }, buffer);
    const data = Buffer.concat([identifier, buffer]).slice(0, 8 + len);
    const ix = new TransactionInstruction({
        keys,
        programId: program.programId,
        data,
    });
    return ix;
}
//# sourceMappingURL=leaseSetAuthority.js.map