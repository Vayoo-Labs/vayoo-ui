import { TransactionInstruction, } from '@solana/web3.js'; // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from '@coral-xyz/borsh'; // eslint-disable-line @typescript-eslint/no-unused-vars
import * as types from '../types'; // eslint-disable-line @typescript-eslint/no-unused-vars
export const layout = borsh.struct([
    types.PermissionInitParams.layout('params'),
]);
export function permissionInit(program, args, accounts) {
    const keys = [
        { pubkey: accounts.permission, isSigner: false, isWritable: true },
        { pubkey: accounts.authority, isSigner: false, isWritable: false },
        { pubkey: accounts.granter, isSigner: false, isWritable: false },
        { pubkey: accounts.grantee, isSigner: false, isWritable: false },
        { pubkey: accounts.payer, isSigner: true, isWritable: true },
        { pubkey: accounts.systemProgram, isSigner: false, isWritable: false },
    ];
    const identifier = Buffer.from([177, 116, 201, 233, 16, 2, 11, 179]);
    const buffer = Buffer.alloc(1000);
    const len = layout.encode({
        params: types.PermissionInitParams.toEncodable(args.params),
    }, buffer);
    const data = Buffer.concat([identifier, buffer]).slice(0, 8 + len);
    const ix = new TransactionInstruction({
        keys,
        programId: program.programId,
        data,
    });
    return ix;
}
//# sourceMappingURL=permissionInit.js.map