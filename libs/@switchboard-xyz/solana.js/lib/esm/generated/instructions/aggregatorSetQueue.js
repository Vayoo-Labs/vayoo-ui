import { TransactionInstruction, } from '@solana/web3.js'; // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from '@coral-xyz/borsh'; // eslint-disable-line @typescript-eslint/no-unused-vars
import * as types from '../types'; // eslint-disable-line @typescript-eslint/no-unused-vars
export const layout = borsh.struct([
    types.AggregatorSetQueueParams.layout('params'),
]);
export function aggregatorSetQueue(program, args, accounts) {
    const keys = [
        { pubkey: accounts.aggregator, isSigner: false, isWritable: true },
        { pubkey: accounts.authority, isSigner: true, isWritable: false },
        { pubkey: accounts.queue, isSigner: false, isWritable: false },
    ];
    const identifier = Buffer.from([111, 152, 142, 153, 206, 39, 22, 148]);
    const buffer = Buffer.alloc(1000);
    const len = layout.encode({
        params: types.AggregatorSetQueueParams.toEncodable(args.params),
    }, buffer);
    const data = Buffer.concat([identifier, buffer]).slice(0, 8 + len);
    const ix = new TransactionInstruction({
        keys,
        programId: program.programId,
        data,
    });
    return ix;
}
//# sourceMappingURL=aggregatorSetQueue.js.map