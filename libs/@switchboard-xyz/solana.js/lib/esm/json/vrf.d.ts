import { Callback, CreateQueueVrfParams } from '../accounts';
import { Keypair, PublicKey } from '@solana/web3.js';
export type IVrfJson = Omit<CreateQueueVrfParams, 'callback'> & {
    callback: Callback;
};
export declare class VrfJson implements IVrfJson {
    callback: Callback;
    enable: boolean;
    vrfKeypair: Keypair;
    authorityKeypair?: Keypair;
    authority?: PublicKey;
    constructor(object: Record<string, any>);
    static loadMultiple(object: Record<string, any>): Array<VrfJson>;
    toJSON(): {
        callback: {
            programId: string;
            accounts: {
                pubkey: string;
                isSigner: boolean;
                isWritable: boolean;
            }[];
            isData: string;
        };
        keypair: string;
        authority: string | undefined;
        authorityKeypair: string | undefined;
    };
}
//# sourceMappingURL=vrf.d.ts.map