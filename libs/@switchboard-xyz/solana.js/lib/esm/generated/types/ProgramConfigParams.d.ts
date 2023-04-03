import { PublicKey } from '@solana/web3.js';
import * as types from '../types';
export interface ProgramConfigParamsFields {
    token: PublicKey;
    bump: number;
    daoMint: PublicKey;
}
export interface ProgramConfigParamsJSON {
    token: string;
    bump: number;
    daoMint: string;
}
export declare class ProgramConfigParams {
    readonly token: PublicKey;
    readonly bump: number;
    readonly daoMint: PublicKey;
    constructor(fields: ProgramConfigParamsFields);
    static layout(property?: string): any;
    static fromDecoded(obj: any): types.ProgramConfigParams;
    static toEncodable(fields: ProgramConfigParamsFields): {
        token: PublicKey;
        bump: number;
        daoMint: PublicKey;
    };
    toJSON(): ProgramConfigParamsJSON;
    static fromJSON(obj: ProgramConfigParamsJSON): ProgramConfigParams;
    toEncodable(): {
        token: PublicKey;
        bump: number;
        daoMint: PublicKey;
    };
}
//# sourceMappingURL=ProgramConfigParams.d.ts.map