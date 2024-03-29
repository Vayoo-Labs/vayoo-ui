import { PublicKey } from '@solana/web3.js';
import { BN } from '@switchboard-xyz/common';
import * as types from '../types';
export interface AggregatorRoundFields {
    /**
     * Maintains the number of successful responses received from nodes.
     * Nodes can submit one successful response per round.
     */
    numSuccess: number;
    /** Number of error responses. */
    numError: number;
    /** Whether an update request round has ended. */
    isClosed: boolean;
    /** Maintains the `solana_program::clock::Slot` that the round was opened at. */
    roundOpenSlot: BN;
    /** Maintains the `solana_program::clock::UnixTimestamp;` the round was opened at. */
    roundOpenTimestamp: BN;
    /** Maintains the current median of all successful round responses. */
    result: types.SwitchboardDecimalFields;
    /** Standard deviation of the accepted results in the round. */
    stdDeviation: types.SwitchboardDecimalFields;
    /** Maintains the minimum node response this round. */
    minResponse: types.SwitchboardDecimalFields;
    /** Maintains the maximum node response this round. */
    maxResponse: types.SwitchboardDecimalFields;
    /** Pubkeys of the oracles fulfilling this round. */
    oraclePubkeysData: Array<PublicKey>;
    /** Represents all successful node responses this round. `NaN` if empty. */
    mediansData: Array<types.SwitchboardDecimalFields>;
    /** Current rewards/slashes oracles have received this round. */
    currentPayout: Array<BN>;
    /** Keep track of which responses are fulfilled here. */
    mediansFulfilled: Array<boolean>;
    /** Keeps track of which errors are fulfilled here. */
    errorsFulfilled: Array<boolean>;
}
export interface AggregatorRoundJSON {
    /**
     * Maintains the number of successful responses received from nodes.
     * Nodes can submit one successful response per round.
     */
    numSuccess: number;
    /** Number of error responses. */
    numError: number;
    /** Whether an update request round has ended. */
    isClosed: boolean;
    /** Maintains the `solana_program::clock::Slot` that the round was opened at. */
    roundOpenSlot: string;
    /** Maintains the `solana_program::clock::UnixTimestamp;` the round was opened at. */
    roundOpenTimestamp: string;
    /** Maintains the current median of all successful round responses. */
    result: types.SwitchboardDecimalJSON;
    /** Standard deviation of the accepted results in the round. */
    stdDeviation: types.SwitchboardDecimalJSON;
    /** Maintains the minimum node response this round. */
    minResponse: types.SwitchboardDecimalJSON;
    /** Maintains the maximum node response this round. */
    maxResponse: types.SwitchboardDecimalJSON;
    /** Pubkeys of the oracles fulfilling this round. */
    oraclePubkeysData: Array<string>;
    /** Represents all successful node responses this round. `NaN` if empty. */
    mediansData: Array<types.SwitchboardDecimalJSON>;
    /** Current rewards/slashes oracles have received this round. */
    currentPayout: Array<string>;
    /** Keep track of which responses are fulfilled here. */
    mediansFulfilled: Array<boolean>;
    /** Keeps track of which errors are fulfilled here. */
    errorsFulfilled: Array<boolean>;
}
export declare class AggregatorRound {
    /**
     * Maintains the number of successful responses received from nodes.
     * Nodes can submit one successful response per round.
     */
    readonly numSuccess: number;
    /** Number of error responses. */
    readonly numError: number;
    /** Whether an update request round has ended. */
    readonly isClosed: boolean;
    /** Maintains the `solana_program::clock::Slot` that the round was opened at. */
    readonly roundOpenSlot: BN;
    /** Maintains the `solana_program::clock::UnixTimestamp;` the round was opened at. */
    readonly roundOpenTimestamp: BN;
    /** Maintains the current median of all successful round responses. */
    readonly result: types.SwitchboardDecimal;
    /** Standard deviation of the accepted results in the round. */
    readonly stdDeviation: types.SwitchboardDecimal;
    /** Maintains the minimum node response this round. */
    readonly minResponse: types.SwitchboardDecimal;
    /** Maintains the maximum node response this round. */
    readonly maxResponse: types.SwitchboardDecimal;
    /** Pubkeys of the oracles fulfilling this round. */
    readonly oraclePubkeysData: Array<PublicKey>;
    /** Represents all successful node responses this round. `NaN` if empty. */
    readonly mediansData: Array<types.SwitchboardDecimal>;
    /** Current rewards/slashes oracles have received this round. */
    readonly currentPayout: Array<BN>;
    /** Keep track of which responses are fulfilled here. */
    readonly mediansFulfilled: Array<boolean>;
    /** Keeps track of which errors are fulfilled here. */
    readonly errorsFulfilled: Array<boolean>;
    constructor(fields: AggregatorRoundFields);
    static layout(property?: string): any;
    static fromDecoded(obj: any): types.AggregatorRound;
    static toEncodable(fields: AggregatorRoundFields): {
        numSuccess: number;
        numError: number;
        isClosed: boolean;
        roundOpenSlot: BN;
        roundOpenTimestamp: BN;
        result: {
            mantissa: BN;
            scale: number;
        };
        stdDeviation: {
            mantissa: BN;
            scale: number;
        };
        minResponse: {
            mantissa: BN;
            scale: number;
        };
        maxResponse: {
            mantissa: BN;
            scale: number;
        };
        oraclePubkeysData: PublicKey[];
        mediansData: {
            mantissa: BN;
            scale: number;
        }[];
        currentPayout: BN[];
        mediansFulfilled: boolean[];
        errorsFulfilled: boolean[];
    };
    toJSON(): AggregatorRoundJSON;
    static fromJSON(obj: AggregatorRoundJSON): AggregatorRound;
    toEncodable(): {
        numSuccess: number;
        numError: number;
        isClosed: boolean;
        roundOpenSlot: BN;
        roundOpenTimestamp: BN;
        result: {
            mantissa: BN;
            scale: number;
        };
        stdDeviation: {
            mantissa: BN;
            scale: number;
        };
        minResponse: {
            mantissa: BN;
            scale: number;
        };
        maxResponse: {
            mantissa: BN;
            scale: number;
        };
        oraclePubkeysData: PublicKey[];
        mediansData: {
            mantissa: BN;
            scale: number;
        }[];
        currentPayout: BN[];
        mediansFulfilled: boolean[];
        errorsFulfilled: boolean[];
    };
}
//# sourceMappingURL=AggregatorRound.d.ts.map