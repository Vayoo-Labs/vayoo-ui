import { Keypair } from '@solana/web3.js';
import { OracleJob } from '@switchboard-xyz/common';
export declare class JobJson {
    name: string;
    weight: number;
    expiration: number;
    job: OracleJob;
    data: Uint8Array;
    keypair: Keypair;
    authority?: Keypair;
    constructor(object: Record<string, any>);
    static loadMultiple(object: Record<string, any>): Array<JobJson>;
    toJSON(): {
        name: string;
        weight: number;
        expiration: number;
        keypair: string;
        authority: string | undefined;
        tasks: {
            [k: string]: any;
        };
    };
}
//# sourceMappingURL=job.d.ts.map