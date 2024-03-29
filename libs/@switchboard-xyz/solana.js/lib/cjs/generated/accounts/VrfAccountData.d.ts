/// <reference types="node" />
import { SwitchboardProgram } from '../../SwitchboardProgram';
import { PublicKey } from '@solana/web3.js';
import { BN } from '@switchboard-xyz/common';
import * as types from '../types';
export interface VrfAccountDataFields {
    /** The current status of the VRF account. */
    status: types.VrfStatusKind;
    /** Incremental counter for tracking VRF rounds. */
    counter: BN;
    /** On-chain account delegated for making account changes. */
    authority: PublicKey;
    /** The OracleQueueAccountData that is assigned to fulfill VRF update request. */
    oracleQueue: PublicKey;
    /** The token account used to hold funds for VRF update request. */
    escrow: PublicKey;
    /** The callback that is invoked when an update request is successfully verified. */
    callback: types.CallbackZCFields;
    /** The number of oracles assigned to a VRF update request. */
    batchSize: number;
    /** Struct containing the intermediate state between VRF crank actions. */
    builders: Array<types.VrfBuilderFields>;
    /** The number of builders. */
    buildersLen: number;
    testMode: boolean;
    /** Oracle results from the current round of update request that has not been accepted as valid yet */
    currentRound: types.VrfRoundFields;
    /** Reserved for future info. */
    ebuf: Array<number>;
}
export interface VrfAccountDataJSON {
    /** The current status of the VRF account. */
    status: types.VrfStatusJSON;
    /** Incremental counter for tracking VRF rounds. */
    counter: string;
    /** On-chain account delegated for making account changes. */
    authority: string;
    /** The OracleQueueAccountData that is assigned to fulfill VRF update request. */
    oracleQueue: string;
    /** The token account used to hold funds for VRF update request. */
    escrow: string;
    /** The callback that is invoked when an update request is successfully verified. */
    callback: types.CallbackZCJSON;
    /** The number of oracles assigned to a VRF update request. */
    batchSize: number;
    /** Struct containing the intermediate state between VRF crank actions. */
    builders: Array<types.VrfBuilderJSON>;
    /** The number of builders. */
    buildersLen: number;
    testMode: boolean;
    /** Oracle results from the current round of update request that has not been accepted as valid yet */
    currentRound: types.VrfRoundJSON;
    /** Reserved for future info. */
    ebuf: Array<number>;
}
export declare class VrfAccountData {
    /** The current status of the VRF account. */
    readonly status: types.VrfStatusKind;
    /** Incremental counter for tracking VRF rounds. */
    readonly counter: BN;
    /** On-chain account delegated for making account changes. */
    readonly authority: PublicKey;
    /** The OracleQueueAccountData that is assigned to fulfill VRF update request. */
    readonly oracleQueue: PublicKey;
    /** The token account used to hold funds for VRF update request. */
    readonly escrow: PublicKey;
    /** The callback that is invoked when an update request is successfully verified. */
    readonly callback: types.CallbackZC;
    /** The number of oracles assigned to a VRF update request. */
    readonly batchSize: number;
    /** Struct containing the intermediate state between VRF crank actions. */
    readonly builders: Array<types.VrfBuilder>;
    /** The number of builders. */
    readonly buildersLen: number;
    readonly testMode: boolean;
    /** Oracle results from the current round of update request that has not been accepted as valid yet */
    readonly currentRound: types.VrfRound;
    /** Reserved for future info. */
    readonly ebuf: Array<number>;
    static readonly discriminator: Buffer;
    static readonly layout: any;
    constructor(fields: VrfAccountDataFields);
    static fetch(program: SwitchboardProgram, address: PublicKey): Promise<VrfAccountData | null>;
    static fetchMultiple(program: SwitchboardProgram, addresses: PublicKey[]): Promise<Array<VrfAccountData | null>>;
    static decode(data: Buffer): VrfAccountData;
    toJSON(): VrfAccountDataJSON;
    static fromJSON(obj: VrfAccountDataJSON): VrfAccountData;
}
//# sourceMappingURL=VrfAccountData.d.ts.map