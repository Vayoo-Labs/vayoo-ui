import * as anchor from '@coral-xyz/anchor';
export class Account {
    /**
     * Account constructor
     * @param program SwitchboardProgram
     * @param publicKey PublicKey of the on-chain resource
     */
    constructor(program, publicKey) {
        this.program = program;
        this.publicKey =
            typeof publicKey === 'string'
                ? new anchor.web3.PublicKey(publicKey)
                : publicKey;
    }
}
import { AggregatorAccountData, BufferRelayerAccountData, CrankAccountData, JobAccountData, LeaseAccountData, OracleAccountData, OracleQueueAccountData, PermissionAccountData, SbState, SlidingResultAccountData, VrfAccountData, } from '../generated';
export const BUFFER_DISCRIMINATOR = Buffer.from([
    66,
    85,
    70,
    70,
    69,
    82,
    120,
    120, // BUFFERxx
]);
export const DISCRIMINATOR_MAP = new Map([
    [AggregatorAccountData.discriminator.toString('utf-8'), 'Aggregator'],
    [BufferRelayerAccountData.discriminator.toString('utf-8'), 'BufferRelayer'],
    [CrankAccountData.discriminator.toString('utf-8'), 'Crank'],
    [JobAccountData.discriminator.toString('utf-8'), 'Job'],
    [LeaseAccountData.discriminator.toString('utf-8'), 'Lease'],
    [OracleAccountData.discriminator.toString('utf-8'), 'Oracle'],
    [PermissionAccountData.discriminator.toString('utf-8'), 'Permission'],
    [SbState.discriminator.toString('utf-8'), 'ProgramState'],
    [OracleQueueAccountData.discriminator.toString('utf-8'), 'Queue'],
    [SlidingResultAccountData.discriminator.toString('utf-8'), 'SlidingWindow'],
    [VrfAccountData.discriminator.toString('utf-8'), 'Vrf'],
    [BUFFER_DISCRIMINATOR.toString('utf-8'), 'Buffer'],
]);
//# sourceMappingURL=account.js.map