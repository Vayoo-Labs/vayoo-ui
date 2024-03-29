/// <reference types="node" />
import { SwitchboardProgram } from '../../SwitchboardProgram';
import { PublicKey } from '@solana/web3.js';
import { BN } from '@switchboard-xyz/common';
import * as types from '../types';
export interface VrfLiteAccountDataFields {
    /** The bump used to derive the SbState account. */
    stateBump: number;
    /** The bump used to derive the permission account. */
    permissionBump: number;
    /** The VrfPool the account belongs to. */
    vrfPool: PublicKey;
    /** The current status of the VRF account. */
    status: types.VrfStatusKind;
    /** The VRF round result. Will be zeroized if still awaiting fulfillment. */
    result: Array<number>;
    /** Incremental counter for tracking VRF rounds. */
    counter: BN;
    /** The alpha bytes used to calculate the VRF proof. */
    alpha: Array<number>;
    /** The number of bytes in the alpha buffer. */
    alphaLen: number;
    /** The Slot when the VRF round was opened. */
    requestSlot: BN;
    /** The unix timestamp when the VRF round was opened. */
    requestTimestamp: BN;
    /** On-chain account delegated for making account changes. */
    authority: PublicKey;
    /** The OracleQueueAccountData that is assigned to fulfill VRF update request. */
    queue: PublicKey;
    /** The token account used to hold funds for VRF update request. */
    escrow: PublicKey;
    /** The callback that is invoked when an update request is successfully verified. */
    callback: types.CallbackZCFields;
    /** The incremental VRF proof calculation. */
    builder: types.VrfBuilderFields;
    expiration: BN;
    ebuf: Array<number>;
}
export interface VrfLiteAccountDataJSON {
    /** The bump used to derive the SbState account. */
    stateBump: number;
    /** The bump used to derive the permission account. */
    permissionBump: number;
    /** The VrfPool the account belongs to. */
    vrfPool: string;
    /** The current status of the VRF account. */
    status: types.VrfStatusJSON;
    /** The VRF round result. Will be zeroized if still awaiting fulfillment. */
    result: Array<number>;
    /** Incremental counter for tracking VRF rounds. */
    counter: string;
    /** The alpha bytes used to calculate the VRF proof. */
    alpha: Array<number>;
    /** The number of bytes in the alpha buffer. */
    alphaLen: number;
    /** The Slot when the VRF round was opened. */
    requestSlot: string;
    /** The unix timestamp when the VRF round was opened. */
    requestTimestamp: string;
    /** On-chain account delegated for making account changes. */
    authority: string;
    /** The OracleQueueAccountData that is assigned to fulfill VRF update request. */
    queue: string;
    /** The token account used to hold funds for VRF update request. */
    escrow: string;
    /** The callback that is invoked when an update request is successfully verified. */
    callback: types.CallbackZCJSON;
    /** The incremental VRF proof calculation. */
    builder: types.VrfBuilderJSON;
    expiration: string;
    ebuf: Array<number>;
}
export declare class VrfLiteAccountData {
    /** The bump used to derive the SbState account. */
    readonly stateBump: number;
    /** The bump used to derive the permission account. */
    readonly permissionBump: number;
    /** The VrfPool the account belongs to. */
    readonly vrfPool: PublicKey;
    /** The current status of the VRF account. */
    readonly status: types.VrfStatusKind;
    /** The VRF round result. Will be zeroized if still awaiting fulfillment. */
    readonly result: Array<number>;
    /** Incremental counter for tracking VRF rounds. */
    readonly counter: BN;
    /** The alpha bytes used to calculate the VRF proof. */
    readonly alpha: Array<number>;
    /** The number of bytes in the alpha buffer. */
    readonly alphaLen: number;
    /** The Slot when the VRF round was opened. */
    readonly requestSlot: BN;
    /** The unix timestamp when the VRF round was opened. */
    readonly requestTimestamp: BN;
    /** On-chain account delegated for making account changes. */
    readonly authority: PublicKey;
    /** The OracleQueueAccountData that is assigned to fulfill VRF update request. */
    readonly queue: PublicKey;
    /** The token account used to hold funds for VRF update request. */
    readonly escrow: PublicKey;
    /** The callback that is invoked when an update request is successfully verified. */
    readonly callback: types.CallbackZC;
    /** The incremental VRF proof calculation. */
    readonly builder: types.VrfBuilder;
    readonly expiration: BN;
    readonly ebuf: Array<number>;
    static readonly discriminator: Buffer;
    static readonly layout: any;
    constructor(fields: VrfLiteAccountDataFields);
    static fetch(program: SwitchboardProgram, address: PublicKey): Promise<VrfLiteAccountData | null>;
    static fetchMultiple(program: SwitchboardProgram, addresses: PublicKey[]): Promise<Array<VrfLiteAccountData | null>>;
    static decode(data: Buffer): VrfLiteAccountData;
    toJSON(): VrfLiteAccountDataJSON;
    static fromJSON(obj: VrfLiteAccountDataJSON): VrfLiteAccountData;
}
//# sourceMappingURL=VrfLiteAccountData.d.ts.map