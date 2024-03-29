/// <reference types="node" />
import { SwitchboardProgram } from '../../SwitchboardProgram';
import { PublicKey } from '@solana/web3.js';
export interface CrankAccountDataFields {
    /** Name of the crank to store on-chain. */
    name: Array<number>;
    /** Metadata of the crank to store on-chain. */
    metadata: Array<number>;
    /** Public key of the oracle queue who owns the crank. */
    queuePubkey: PublicKey;
    /** Number of aggregators added to the crank. */
    pqSize: number;
    /** Maximum number of aggregators allowed to be added to a crank. */
    maxRows: number;
    /** Pseudorandom value added to next aggregator update time. */
    jitterModifier: number;
    /** Reserved for future info. */
    ebuf: Array<number>;
    /** The public key of the CrankBuffer account holding a collection of Aggregator pubkeys and their next allowed update time. */
    dataBuffer: PublicKey;
}
export interface CrankAccountDataJSON {
    /** Name of the crank to store on-chain. */
    name: Array<number>;
    /** Metadata of the crank to store on-chain. */
    metadata: Array<number>;
    /** Public key of the oracle queue who owns the crank. */
    queuePubkey: string;
    /** Number of aggregators added to the crank. */
    pqSize: number;
    /** Maximum number of aggregators allowed to be added to a crank. */
    maxRows: number;
    /** Pseudorandom value added to next aggregator update time. */
    jitterModifier: number;
    /** Reserved for future info. */
    ebuf: Array<number>;
    /** The public key of the CrankBuffer account holding a collection of Aggregator pubkeys and their next allowed update time. */
    dataBuffer: string;
}
export declare class CrankAccountData {
    /** Name of the crank to store on-chain. */
    readonly name: Array<number>;
    /** Metadata of the crank to store on-chain. */
    readonly metadata: Array<number>;
    /** Public key of the oracle queue who owns the crank. */
    readonly queuePubkey: PublicKey;
    /** Number of aggregators added to the crank. */
    readonly pqSize: number;
    /** Maximum number of aggregators allowed to be added to a crank. */
    readonly maxRows: number;
    /** Pseudorandom value added to next aggregator update time. */
    readonly jitterModifier: number;
    /** Reserved for future info. */
    readonly ebuf: Array<number>;
    /** The public key of the CrankBuffer account holding a collection of Aggregator pubkeys and their next allowed update time. */
    readonly dataBuffer: PublicKey;
    static readonly discriminator: Buffer;
    static readonly layout: any;
    constructor(fields: CrankAccountDataFields);
    static fetch(program: SwitchboardProgram, address: PublicKey): Promise<CrankAccountData | null>;
    static fetchMultiple(program: SwitchboardProgram, addresses: PublicKey[]): Promise<Array<CrankAccountData | null>>;
    static decode(data: Buffer): CrankAccountData;
    toJSON(): CrankAccountDataJSON;
    static fromJSON(obj: CrankAccountDataJSON): CrankAccountData;
}
//# sourceMappingURL=CrankAccountData.d.ts.map