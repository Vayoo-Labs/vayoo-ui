import * as borsh from '@coral-xyz/borsh';
export class ModeRoundResolution {
    constructor() {
        this.discriminator = 0;
        this.kind = 'ModeRoundResolution';
    }
    toJSON() {
        return {
            kind: 'ModeRoundResolution',
        };
    }
    toEncodable() {
        return {
            ModeRoundResolution: {},
        };
    }
}
ModeRoundResolution.discriminator = 0;
ModeRoundResolution.kind = 'ModeRoundResolution';
export class ModeSlidingResolution {
    constructor() {
        this.discriminator = 1;
        this.kind = 'ModeSlidingResolution';
    }
    toJSON() {
        return {
            kind: 'ModeSlidingResolution',
        };
    }
    toEncodable() {
        return {
            ModeSlidingResolution: {},
        };
    }
}
ModeSlidingResolution.discriminator = 1;
ModeSlidingResolution.kind = 'ModeSlidingResolution';
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function fromDecoded(obj) {
    if (typeof obj !== 'object') {
        throw new Error('Invalid enum object');
    }
    if ('ModeRoundResolution' in obj) {
        return new ModeRoundResolution();
    }
    if ('ModeSlidingResolution' in obj) {
        return new ModeSlidingResolution();
    }
    throw new Error('Invalid enum object');
}
export function fromJSON(obj) {
    switch (obj.kind) {
        case 'ModeRoundResolution': {
            return new ModeRoundResolution();
        }
        case 'ModeSlidingResolution': {
            return new ModeSlidingResolution();
        }
    }
}
export function layout(property) {
    const ret = borsh.rustEnum([
        borsh.struct([], 'ModeRoundResolution'),
        borsh.struct([], 'ModeSlidingResolution'),
    ]);
    if (property !== undefined) {
        return ret.replicate(property);
    }
    return ret;
}
//# sourceMappingURL=AggregatorResolutionMode.js.map