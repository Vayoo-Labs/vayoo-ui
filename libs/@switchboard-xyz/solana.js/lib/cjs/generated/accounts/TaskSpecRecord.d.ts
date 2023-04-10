/// <reference types="node" />
import { SwitchboardProgram } from '../../SwitchboardProgram';
import { PublicKey } from '@solana/web3.js';
import * as types from '../types';
export interface TaskSpecRecordFields {
    hash: types.HashFields;
}
export interface TaskSpecRecordJSON {
    hash: types.HashJSON;
}
export declare class TaskSpecRecord {
    readonly hash: types.Hash;
    static readonly discriminator: Buffer;
    static readonly layout: any;
    constructor(fields: TaskSpecRecordFields);
    static fetch(program: SwitchboardProgram, address: PublicKey): Promise<TaskSpecRecord | null>;
    static fetchMultiple(program: SwitchboardProgram, addresses: PublicKey[]): Promise<Array<TaskSpecRecord | null>>;
    static decode(data: Buffer): TaskSpecRecord;
    toJSON(): TaskSpecRecordJSON;
    static fromJSON(obj: TaskSpecRecordJSON): TaskSpecRecord;
}
//# sourceMappingURL=TaskSpecRecord.d.ts.map