import * as borsh from '@coral-xyz/borsh';
export class AAAA {
    constructor() {
        this.discriminator = 0;
        this.kind = 'AAAA';
    }
    toJSON() {
        return {
            kind: 'AAAA',
        };
    }
    toEncodable() {
        return {
            AAAA: {},
        };
    }
}
AAAA.discriminator = 0;
AAAA.kind = 'AAAA';
export class BBBB {
    constructor() {
        this.discriminator = 1;
        this.kind = 'BBBB';
    }
    toJSON() {
        return {
            kind: 'BBBB',
        };
    }
    toEncodable() {
        return {
            BBBB: {},
        };
    }
}
BBBB.discriminator = 1;
BBBB.kind = 'BBBB';
export class BADC {
    constructor() {
        this.discriminator = 2;
        this.kind = 'BADC';
    }
    toJSON() {
        return {
            kind: 'BADC',
        };
    }
    toEncodable() {
        return {
            BADC: {},
        };
    }
}
BADC.discriminator = 2;
BADC.kind = 'BADC';
export class BACD {
    constructor() {
        this.discriminator = 3;
        this.kind = 'BACD';
    }
    toJSON() {
        return {
            kind: 'BACD',
        };
    }
    toEncodable() {
        return {
            BACD: {},
        };
    }
}
BACD.discriminator = 3;
BACD.kind = 'BACD';
export class ADDA {
    constructor() {
        this.discriminator = 4;
        this.kind = 'ADDA';
    }
    toJSON() {
        return {
            kind: 'ADDA',
        };
    }
    toEncodable() {
        return {
            ADDA: {},
        };
    }
}
ADDA.discriminator = 4;
ADDA.kind = 'ADDA';
export class CBCB {
    constructor() {
        this.discriminator = 5;
        this.kind = 'CBCB';
    }
    toJSON() {
        return {
            kind: 'CBCB',
        };
    }
    toEncodable() {
        return {
            CBCB: {},
        };
    }
}
CBCB.discriminator = 5;
CBCB.kind = 'CBCB';
export class ABDC {
    constructor() {
        this.discriminator = 6;
        this.kind = 'ABDC';
    }
    toJSON() {
        return {
            kind: 'ABDC',
        };
    }
    toEncodable() {
        return {
            ABDC: {},
        };
    }
}
ABDC.discriminator = 6;
ABDC.kind = 'ABDC';
export class ABAB {
    constructor() {
        this.discriminator = 7;
        this.kind = 'ABAB';
    }
    toJSON() {
        return {
            kind: 'ABAB',
        };
    }
    toEncodable() {
        return {
            ABAB: {},
        };
    }
}
ABAB.discriminator = 7;
ABAB.kind = 'ABAB';
export class DBBD {
    constructor() {
        this.discriminator = 8;
        this.kind = 'DBBD';
    }
    toJSON() {
        return {
            kind: 'DBBD',
        };
    }
    toEncodable() {
        return {
            DBBD: {},
        };
    }
}
DBBD.discriminator = 8;
DBBD.kind = 'DBBD';
export class CACA {
    constructor() {
        this.discriminator = 9;
        this.kind = 'CACA';
    }
    toJSON() {
        return {
            kind: 'CACA',
        };
    }
    toEncodable() {
        return {
            CACA: {},
        };
    }
}
CACA.discriminator = 9;
CACA.kind = 'CACA';
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function fromDecoded(obj) {
    if (typeof obj !== 'object') {
        throw new Error('Invalid enum object');
    }
    if ('AAAA' in obj) {
        return new AAAA();
    }
    if ('BBBB' in obj) {
        return new BBBB();
    }
    if ('BADC' in obj) {
        return new BADC();
    }
    if ('BACD' in obj) {
        return new BACD();
    }
    if ('ADDA' in obj) {
        return new ADDA();
    }
    if ('CBCB' in obj) {
        return new CBCB();
    }
    if ('ABDC' in obj) {
        return new ABDC();
    }
    if ('ABAB' in obj) {
        return new ABAB();
    }
    if ('DBBD' in obj) {
        return new DBBD();
    }
    if ('CACA' in obj) {
        return new CACA();
    }
    throw new Error('Invalid enum object');
}
export function fromJSON(obj) {
    switch (obj.kind) {
        case 'AAAA': {
            return new AAAA();
        }
        case 'BBBB': {
            return new BBBB();
        }
        case 'BADC': {
            return new BADC();
        }
        case 'BACD': {
            return new BACD();
        }
        case 'ADDA': {
            return new ADDA();
        }
        case 'CBCB': {
            return new CBCB();
        }
        case 'ABDC': {
            return new ABDC();
        }
        case 'ABAB': {
            return new ABAB();
        }
        case 'DBBD': {
            return new DBBD();
        }
        case 'CACA': {
            return new CACA();
        }
    }
}
export function layout(property) {
    const ret = borsh.rustEnum([
        borsh.struct([], 'AAAA'),
        borsh.struct([], 'BBBB'),
        borsh.struct([], 'BADC'),
        borsh.struct([], 'BACD'),
        borsh.struct([], 'ADDA'),
        borsh.struct([], 'CBCB'),
        borsh.struct([], 'ABDC'),
        borsh.struct([], 'ABAB'),
        borsh.struct([], 'DBBD'),
        borsh.struct([], 'CACA'),
    ]);
    if (property !== undefined) {
        return ret.replicate(property);
    }
    return ret;
}
//# sourceMappingURL=Shuffle.js.map