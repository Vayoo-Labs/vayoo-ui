import { PublicKey } from '@solana/web3.js';
import { BN } from '@switchboard-xyz/common';
import * as types from '../types';
export interface VrfBuilderFields {
    /** The OracleAccountData that is producing the randomness. */
    producer: PublicKey;
    /** The current status of the VRF verification. */
    status: types.VrfStatusKind;
    /** The VRF proof sourced from the producer. */
    reprProof: Array<number>;
    proof: types.EcvrfProofZCFields;
    yPoint: PublicKey;
    stage: number;
    stage1Out: types.EcvrfIntermediateFields;
    r1: types.EdwardsPointZCFields;
    r2: types.EdwardsPointZCFields;
    stage3Out: types.EcvrfIntermediateFields;
    hPoint: types.EdwardsPointZCFields;
    sReduced: types.ScalarFields;
    yPointBuilder: Array<types.FieldElementZCFields>;
    yRistrettoPoint: types.EdwardsPointZCFields;
    mulRound: number;
    hashPointsRound: number;
    mulTmp1: types.CompletedPointZCFields;
    uPoint1: types.EdwardsPointZCFields;
    uPoint2: types.EdwardsPointZCFields;
    vPoint1: types.EdwardsPointZCFields;
    vPoint2: types.EdwardsPointZCFields;
    uPoint: types.EdwardsPointZCFields;
    vPoint: types.EdwardsPointZCFields;
    u1: types.FieldElementZCFields;
    u2: types.FieldElementZCFields;
    invertee: types.FieldElementZCFields;
    y: types.FieldElementZCFields;
    z: types.FieldElementZCFields;
    p1Bytes: Array<number>;
    p2Bytes: Array<number>;
    p3Bytes: Array<number>;
    p4Bytes: Array<number>;
    cPrimeHashbuf: Array<number>;
    m1: types.FieldElementZCFields;
    m2: types.FieldElementZCFields;
    /** The number of transactions remaining to verify the VRF proof. */
    txRemaining: number;
    /** Whether the VRF proof has been verified on-chain. */
    verified: boolean;
    /** The VRF proof verification result. Will be zeroized if still awaiting fulfillment. */
    result: Array<number>;
}
export interface VrfBuilderJSON {
    /** The OracleAccountData that is producing the randomness. */
    producer: string;
    /** The current status of the VRF verification. */
    status: types.VrfStatusJSON;
    /** The VRF proof sourced from the producer. */
    reprProof: Array<number>;
    proof: types.EcvrfProofZCJSON;
    yPoint: string;
    stage: number;
    stage1Out: types.EcvrfIntermediateJSON;
    r1: types.EdwardsPointZCJSON;
    r2: types.EdwardsPointZCJSON;
    stage3Out: types.EcvrfIntermediateJSON;
    hPoint: types.EdwardsPointZCJSON;
    sReduced: types.ScalarJSON;
    yPointBuilder: Array<types.FieldElementZCJSON>;
    yRistrettoPoint: types.EdwardsPointZCJSON;
    mulRound: number;
    hashPointsRound: number;
    mulTmp1: types.CompletedPointZCJSON;
    uPoint1: types.EdwardsPointZCJSON;
    uPoint2: types.EdwardsPointZCJSON;
    vPoint1: types.EdwardsPointZCJSON;
    vPoint2: types.EdwardsPointZCJSON;
    uPoint: types.EdwardsPointZCJSON;
    vPoint: types.EdwardsPointZCJSON;
    u1: types.FieldElementZCJSON;
    u2: types.FieldElementZCJSON;
    invertee: types.FieldElementZCJSON;
    y: types.FieldElementZCJSON;
    z: types.FieldElementZCJSON;
    p1Bytes: Array<number>;
    p2Bytes: Array<number>;
    p3Bytes: Array<number>;
    p4Bytes: Array<number>;
    cPrimeHashbuf: Array<number>;
    m1: types.FieldElementZCJSON;
    m2: types.FieldElementZCJSON;
    /** The number of transactions remaining to verify the VRF proof. */
    txRemaining: number;
    /** Whether the VRF proof has been verified on-chain. */
    verified: boolean;
    /** The VRF proof verification result. Will be zeroized if still awaiting fulfillment. */
    result: Array<number>;
}
export declare class VrfBuilder {
    /** The OracleAccountData that is producing the randomness. */
    readonly producer: PublicKey;
    /** The current status of the VRF verification. */
    readonly status: types.VrfStatusKind;
    /** The VRF proof sourced from the producer. */
    readonly reprProof: Array<number>;
    readonly proof: types.EcvrfProofZC;
    readonly yPoint: PublicKey;
    readonly stage: number;
    readonly stage1Out: types.EcvrfIntermediate;
    readonly r1: types.EdwardsPointZC;
    readonly r2: types.EdwardsPointZC;
    readonly stage3Out: types.EcvrfIntermediate;
    readonly hPoint: types.EdwardsPointZC;
    readonly sReduced: types.Scalar;
    readonly yPointBuilder: Array<types.FieldElementZC>;
    readonly yRistrettoPoint: types.EdwardsPointZC;
    readonly mulRound: number;
    readonly hashPointsRound: number;
    readonly mulTmp1: types.CompletedPointZC;
    readonly uPoint1: types.EdwardsPointZC;
    readonly uPoint2: types.EdwardsPointZC;
    readonly vPoint1: types.EdwardsPointZC;
    readonly vPoint2: types.EdwardsPointZC;
    readonly uPoint: types.EdwardsPointZC;
    readonly vPoint: types.EdwardsPointZC;
    readonly u1: types.FieldElementZC;
    readonly u2: types.FieldElementZC;
    readonly invertee: types.FieldElementZC;
    readonly y: types.FieldElementZC;
    readonly z: types.FieldElementZC;
    readonly p1Bytes: Array<number>;
    readonly p2Bytes: Array<number>;
    readonly p3Bytes: Array<number>;
    readonly p4Bytes: Array<number>;
    readonly cPrimeHashbuf: Array<number>;
    readonly m1: types.FieldElementZC;
    readonly m2: types.FieldElementZC;
    /** The number of transactions remaining to verify the VRF proof. */
    readonly txRemaining: number;
    /** Whether the VRF proof has been verified on-chain. */
    readonly verified: boolean;
    /** The VRF proof verification result. Will be zeroized if still awaiting fulfillment. */
    readonly result: Array<number>;
    constructor(fields: VrfBuilderFields);
    static layout(property?: string): any;
    static fromDecoded(obj: any): types.VrfBuilder;
    static toEncodable(fields: VrfBuilderFields): {
        producer: PublicKey;
        status: {
            StatusNone: {};
        } | {
            StatusRequesting: {};
        } | {
            StatusVerifying: {};
        } | {
            StatusVerified: {};
        } | {
            StatusCallbackSuccess: {};
        } | {
            StatusVerifyFailure: {};
        };
        reprProof: number[];
        proof: {
            gamma: {
                x: {
                    bytes: BN[];
                };
                y: {
                    bytes: BN[];
                };
                z: {
                    bytes: BN[];
                };
                t: {
                    bytes: BN[];
                };
            };
            c: {
                /** The VRF proof sourced from the producer. */
                bytes: number[];
            };
            s: {
                /** The VRF proof sourced from the producer. */
                bytes: number[];
            };
        };
        yPoint: PublicKey;
        stage: number;
        stage1Out: {
            r: {
                bytes: BN[];
            };
            nS: {
                bytes: BN[];
            };
            d: {
                bytes: BN[];
            };
            t13: {
                bytes: BN[];
            };
            t15: {
                bytes: BN[];
            };
        };
        r1: {
            x: {
                bytes: BN[];
            };
            y: {
                bytes: BN[];
            };
            z: {
                bytes: BN[];
            };
            t: {
                bytes: BN[];
            };
        };
        r2: {
            x: {
                bytes: BN[];
            };
            y: {
                bytes: BN[];
            };
            z: {
                bytes: BN[];
            };
            t: {
                bytes: BN[];
            };
        };
        stage3Out: {
            r: {
                bytes: BN[];
            };
            nS: {
                bytes: BN[];
            };
            d: {
                bytes: BN[];
            };
            t13: {
                bytes: BN[];
            };
            t15: {
                bytes: BN[];
            };
        };
        hPoint: {
            x: {
                bytes: BN[];
            };
            y: {
                bytes: BN[];
            };
            z: {
                bytes: BN[];
            };
            t: {
                bytes: BN[];
            };
        };
        sReduced: {
            /** The VRF proof sourced from the producer. */
            bytes: number[];
        };
        yPointBuilder: {
            bytes: BN[];
        }[];
        yRistrettoPoint: {
            x: {
                bytes: BN[];
            };
            y: {
                bytes: BN[];
            };
            z: {
                bytes: BN[];
            };
            t: {
                bytes: BN[];
            };
        };
        mulRound: number;
        hashPointsRound: number;
        mulTmp1: {
            x: {
                bytes: BN[];
            };
            y: {
                bytes: BN[];
            };
            z: {
                bytes: BN[];
            };
            t: {
                bytes: BN[];
            };
        };
        uPoint1: {
            x: {
                bytes: BN[];
            };
            y: {
                bytes: BN[];
            };
            z: {
                bytes: BN[];
            };
            t: {
                bytes: BN[];
            };
        };
        uPoint2: {
            x: {
                bytes: BN[];
            };
            y: {
                bytes: BN[];
            };
            z: {
                bytes: BN[];
            };
            t: {
                bytes: BN[];
            };
        };
        vPoint1: {
            x: {
                bytes: BN[];
            };
            y: {
                bytes: BN[];
            };
            z: {
                bytes: BN[];
            };
            t: {
                bytes: BN[];
            };
        };
        vPoint2: {
            x: {
                bytes: BN[];
            };
            y: {
                bytes: BN[];
            };
            z: {
                bytes: BN[];
            };
            t: {
                bytes: BN[];
            };
        };
        uPoint: {
            x: {
                bytes: BN[];
            };
            y: {
                bytes: BN[];
            };
            z: {
                bytes: BN[];
            };
            t: {
                bytes: BN[];
            };
        };
        vPoint: {
            x: {
                bytes: BN[];
            };
            y: {
                bytes: BN[];
            };
            z: {
                bytes: BN[];
            };
            t: {
                bytes: BN[];
            };
        };
        u1: {
            bytes: BN[];
        };
        u2: {
            bytes: BN[];
        };
        invertee: {
            bytes: BN[];
        };
        y: {
            bytes: BN[];
        };
        z: {
            bytes: BN[];
        };
        p1Bytes: number[];
        p2Bytes: number[];
        p3Bytes: number[];
        p4Bytes: number[];
        cPrimeHashbuf: number[];
        m1: {
            bytes: BN[];
        };
        m2: {
            bytes: BN[];
        };
        txRemaining: number;
        verified: boolean;
        result: number[];
    };
    toJSON(): VrfBuilderJSON;
    static fromJSON(obj: VrfBuilderJSON): VrfBuilder;
    toEncodable(): {
        producer: PublicKey;
        status: {
            StatusNone: {};
        } | {
            StatusRequesting: {};
        } | {
            StatusVerifying: {};
        } | {
            StatusVerified: {};
        } | {
            StatusCallbackSuccess: {};
        } | {
            StatusVerifyFailure: {};
        };
        reprProof: number[];
        proof: {
            gamma: {
                x: {
                    bytes: BN[];
                };
                y: {
                    bytes: BN[];
                };
                z: {
                    bytes: BN[];
                };
                t: {
                    bytes: BN[];
                };
            };
            c: {
                /** The VRF proof sourced from the producer. */
                bytes: number[];
            };
            s: {
                /** The VRF proof sourced from the producer. */
                bytes: number[];
            };
        };
        yPoint: PublicKey;
        stage: number;
        stage1Out: {
            r: {
                bytes: BN[];
            };
            nS: {
                bytes: BN[];
            };
            d: {
                bytes: BN[];
            };
            t13: {
                bytes: BN[];
            };
            t15: {
                bytes: BN[];
            };
        };
        r1: {
            x: {
                bytes: BN[];
            };
            y: {
                bytes: BN[];
            };
            z: {
                bytes: BN[];
            };
            t: {
                bytes: BN[];
            };
        };
        r2: {
            x: {
                bytes: BN[];
            };
            y: {
                bytes: BN[];
            };
            z: {
                bytes: BN[];
            };
            t: {
                bytes: BN[];
            };
        };
        stage3Out: {
            r: {
                bytes: BN[];
            };
            nS: {
                bytes: BN[];
            };
            d: {
                bytes: BN[];
            };
            t13: {
                bytes: BN[];
            };
            t15: {
                bytes: BN[];
            };
        };
        hPoint: {
            x: {
                bytes: BN[];
            };
            y: {
                bytes: BN[];
            };
            z: {
                bytes: BN[];
            };
            t: {
                bytes: BN[];
            };
        };
        sReduced: {
            /** The VRF proof sourced from the producer. */
            bytes: number[];
        };
        yPointBuilder: {
            bytes: BN[];
        }[];
        yRistrettoPoint: {
            x: {
                bytes: BN[];
            };
            y: {
                bytes: BN[];
            };
            z: {
                bytes: BN[];
            };
            t: {
                bytes: BN[];
            };
        };
        mulRound: number;
        hashPointsRound: number;
        mulTmp1: {
            x: {
                bytes: BN[];
            };
            y: {
                bytes: BN[];
            };
            z: {
                bytes: BN[];
            };
            t: {
                bytes: BN[];
            };
        };
        uPoint1: {
            x: {
                bytes: BN[];
            };
            y: {
                bytes: BN[];
            };
            z: {
                bytes: BN[];
            };
            t: {
                bytes: BN[];
            };
        };
        uPoint2: {
            x: {
                bytes: BN[];
            };
            y: {
                bytes: BN[];
            };
            z: {
                bytes: BN[];
            };
            t: {
                bytes: BN[];
            };
        };
        vPoint1: {
            x: {
                bytes: BN[];
            };
            y: {
                bytes: BN[];
            };
            z: {
                bytes: BN[];
            };
            t: {
                bytes: BN[];
            };
        };
        vPoint2: {
            x: {
                bytes: BN[];
            };
            y: {
                bytes: BN[];
            };
            z: {
                bytes: BN[];
            };
            t: {
                bytes: BN[];
            };
        };
        uPoint: {
            x: {
                bytes: BN[];
            };
            y: {
                bytes: BN[];
            };
            z: {
                bytes: BN[];
            };
            t: {
                bytes: BN[];
            };
        };
        vPoint: {
            x: {
                bytes: BN[];
            };
            y: {
                bytes: BN[];
            };
            z: {
                bytes: BN[];
            };
            t: {
                bytes: BN[];
            };
        };
        u1: {
            bytes: BN[];
        };
        u2: {
            bytes: BN[];
        };
        invertee: {
            bytes: BN[];
        };
        y: {
            bytes: BN[];
        };
        z: {
            bytes: BN[];
        };
        p1Bytes: number[];
        p2Bytes: number[];
        p3Bytes: number[];
        p4Bytes: number[];
        cPrimeHashbuf: number[];
        m1: {
            bytes: BN[];
        };
        m2: {
            bytes: BN[];
        };
        txRemaining: number;
        verified: boolean;
        result: number[];
    };
}
//# sourceMappingURL=VrfBuilder.d.ts.map