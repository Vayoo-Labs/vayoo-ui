import { TransactionInstruction, } from '@solana/web3.js'; // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from '@coral-xyz/borsh'; // eslint-disable-line @typescript-eslint/no-unused-vars
import * as types from '../types'; // eslint-disable-line @typescript-eslint/no-unused-vars
export const layout = borsh.struct([
    types.OracleHeartbeatParams.layout('params'),
]);
export function oracleHeartbeat(program, args, accounts) {
    const keys = [
        { pubkey: accounts.oracle, isSigner: false, isWritable: true },
        { pubkey: accounts.oracleAuthority, isSigner: true, isWritable: false },
        { pubkey: accounts.tokenAccount, isSigner: false, isWritable: false },
        { pubkey: accounts.gcOracle, isSigner: false, isWritable: true },
        { pubkey: accounts.oracleQueue, isSigner: false, isWritable: true },
        { pubkey: accounts.permission, isSigner: false, isWritable: false },
        { pubkey: accounts.dataBuffer, isSigner: false, isWritable: true },
    ];
    const identifier = Buffer.from([10, 175, 217, 130, 111, 35, 117, 54]);
    const buffer = Buffer.alloc(1000);
    const len = layout.encode({
        params: types.OracleHeartbeatParams.toEncodable(args.params),
    }, buffer);
    const data = Buffer.concat([identifier, buffer]).slice(0, 8 + len);
    const ix = new TransactionInstruction({
        keys,
        programId: program.programId,
        data,
    });
    return ix;
}
//# sourceMappingURL=oracleHeartbeat.js.map