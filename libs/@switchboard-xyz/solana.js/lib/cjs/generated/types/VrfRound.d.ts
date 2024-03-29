import { BN } from '@switchboard-xyz/common';
import * as types from '../types';
export interface VrfRoundFields {
    /** The alpha bytes used to calculate the VRF proof. */
    alpha: Array<number>;
    /** The number of bytes in the alpha buffer. */
    alphaLen: number;
    /** The Slot when the VRF round was opened. */
    requestSlot: BN;
    /** The unix timestamp when the VRF round was opened. */
    requestTimestamp: BN;
    /** The VRF round result. Will be zeroized if still awaiting fulfillment. */
    result: Array<number>;
    /** The number of builders who verified the VRF proof. */
    numVerified: number;
    /** Reserved for future info. */
    ebuf: Array<number>;
}
export interface VrfRoundJSON {
    /** The alpha bytes used to calculate the VRF proof. */
    alpha: Array<number>;
    /** The number of bytes in the alpha buffer. */
    alphaLen: number;
    /** The Slot when the VRF round was opened. */
    requestSlot: string;
    /** The unix timestamp when the VRF round was opened. */
    requestTimestamp: string;
    /** The VRF round result. Will be zeroized if still awaiting fulfillment. */
    result: Array<number>;
    /** The number of builders who verified the VRF proof. */
    numVerified: number;
    /** Reserved for future info. */
    ebuf: Array<number>;
}
export declare class VrfRound {
    /** The alpha bytes used to calculate the VRF proof. */
    readonly alpha: Array<number>;
    /** The number of bytes in the alpha buffer. */
    readonly alphaLen: number;
    /** The Slot when the VRF round was opened. */
    readonly requestSlot: BN;
    /** The unix timestamp when the VRF round was opened. */
    readonly requestTimestamp: BN;
    /** The VRF round result. Will be zeroized if still awaiting fulfillment. */
    readonly result: Array<number>;
    /** The number of builders who verified the VRF proof. */
    readonly numVerified: number;
    /** Reserved for future info. */
    readonly ebuf: Array<number>;
    constructor(fields: VrfRoundFields);
    static layout(property?: string): any;
    static fromDecoded(obj: any): types.VrfRound;
    static toEncodable(fields: VrfRoundFields): {
        alpha: number[];
        alphaLen: number;
        requestSlot: BN;
        requestTimestamp: BN;
        result: number[];
        numVerified: number;
        ebuf: number[];
    };
    toJSON(): VrfRoundJSON;
    static fromJSON(obj: VrfRoundJSON): VrfRound;
    toEncodable(): {
        alpha: number[];
        alphaLen: number;
        requestSlot: BN;
        requestTimestamp: BN;
        result: number[];
        numVerified: number;
        ebuf: number[];
    };
}
//# sourceMappingURL=VrfRound.d.ts.map