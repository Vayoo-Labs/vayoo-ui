import * as types from '../types';
import * as borsh from '@coral-xyz/borsh';
export interface ModeRoundResolutionJSON {
    kind: 'ModeRoundResolution';
}
export declare class ModeRoundResolution {
    static readonly discriminator = 0;
    static readonly kind = "ModeRoundResolution";
    readonly discriminator = 0;
    readonly kind = "ModeRoundResolution";
    toJSON(): ModeRoundResolutionJSON;
    toEncodable(): {
        ModeRoundResolution: {};
    };
}
export interface ModeSlidingResolutionJSON {
    kind: 'ModeSlidingResolution';
}
export declare class ModeSlidingResolution {
    static readonly discriminator = 1;
    static readonly kind = "ModeSlidingResolution";
    readonly discriminator = 1;
    readonly kind = "ModeSlidingResolution";
    toJSON(): ModeSlidingResolutionJSON;
    toEncodable(): {
        ModeSlidingResolution: {};
    };
}
export declare function fromDecoded(obj: any): types.AggregatorResolutionModeKind;
export declare function fromJSON(obj: types.AggregatorResolutionModeJSON): types.AggregatorResolutionModeKind;
export declare function layout(property?: string): borsh.EnumLayout<unknown>;
//# sourceMappingURL=AggregatorResolutionMode.d.ts.map