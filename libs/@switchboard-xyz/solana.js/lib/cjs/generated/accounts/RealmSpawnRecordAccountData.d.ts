/// <reference types="node" />
import { SwitchboardProgram } from '../../SwitchboardProgram';
import { PublicKey } from '@solana/web3.js';
export interface RealmSpawnRecordAccountDataFields {
    ebuf: Array<number>;
}
export interface RealmSpawnRecordAccountDataJSON {
    ebuf: Array<number>;
}
export declare class RealmSpawnRecordAccountData {
    readonly ebuf: Array<number>;
    static readonly discriminator: Buffer;
    static readonly layout: any;
    constructor(fields: RealmSpawnRecordAccountDataFields);
    static fetch(program: SwitchboardProgram, address: PublicKey): Promise<RealmSpawnRecordAccountData | null>;
    static fetchMultiple(program: SwitchboardProgram, addresses: PublicKey[]): Promise<Array<RealmSpawnRecordAccountData | null>>;
    static decode(data: Buffer): RealmSpawnRecordAccountData;
    toJSON(): RealmSpawnRecordAccountDataJSON;
    static fromJSON(obj: RealmSpawnRecordAccountDataJSON): RealmSpawnRecordAccountData;
}
//# sourceMappingURL=RealmSpawnRecordAccountData.d.ts.map