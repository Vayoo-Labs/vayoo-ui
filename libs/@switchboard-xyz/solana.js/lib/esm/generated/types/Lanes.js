import * as borsh from '@coral-xyz/borsh';
export class D {
    constructor() {
        this.discriminator = 0;
        this.kind = 'D';
    }
    toJSON() {
        return {
            kind: 'D',
        };
    }
    toEncodable() {
        return {
            D: {},
        };
    }
}
D.discriminator = 0;
D.kind = 'D';
export class C {
    constructor() {
        this.discriminator = 1;
        this.kind = 'C';
    }
    toJSON() {
        return {
            kind: 'C',
        };
    }
    toEncodable() {
        return {
            C: {},
        };
    }
}
C.discriminator = 1;
C.kind = 'C';
export class AB {
    constructor() {
        this.discriminator = 2;
        this.kind = 'AB';
    }
    toJSON() {
        return {
            kind: 'AB',
        };
    }
    toEncodable() {
        return {
            AB: {},
        };
    }
}
AB.discriminator = 2;
AB.kind = 'AB';
export class AC {
    constructor() {
        this.discriminator = 3;
        this.kind = 'AC';
    }
    toJSON() {
        return {
            kind: 'AC',
        };
    }
    toEncodable() {
        return {
            AC: {},
        };
    }
}
AC.discriminator = 3;
AC.kind = 'AC';
export class AD {
    constructor() {
        this.discriminator = 4;
        this.kind = 'AD';
    }
    toJSON() {
        return {
            kind: 'AD',
        };
    }
    toEncodable() {
        return {
            AD: {},
        };
    }
}
AD.discriminator = 4;
AD.kind = 'AD';
export class BCD {
    constructor() {
        this.discriminator = 5;
        this.kind = 'BCD';
    }
    toJSON() {
        return {
            kind: 'BCD',
        };
    }
    toEncodable() {
        return {
            BCD: {},
        };
    }
}
BCD.discriminator = 5;
BCD.kind = 'BCD';
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function fromDecoded(obj) {
    if (typeof obj !== 'object') {
        throw new Error('Invalid enum object');
    }
    if ('D' in obj) {
        return new D();
    }
    if ('C' in obj) {
        return new C();
    }
    if ('AB' in obj) {
        return new AB();
    }
    if ('AC' in obj) {
        return new AC();
    }
    if ('AD' in obj) {
        return new AD();
    }
    throw new Error('Invalid enum object');
}
export function fromJSON(obj) {
    switch (obj.kind) {
        case 'D': {
            return new D();
        }
        case 'C': {
            return new C();
        }
        case 'AB': {
            return new AB();
        }
        case 'AC': {
            return new AC();
        }
        case 'AD': {
            return new AD();
        }
    }
}
export function layout(property) {
    const ret = borsh.rustEnum([
        borsh.struct([], 'D'),
        borsh.struct([], 'C'),
        borsh.struct([], 'AB'),
        borsh.struct([], 'AC'),
        borsh.struct([], 'AD'),
        borsh.struct([], 'BCD'),
    ]);
    if (property !== undefined) {
        return ret.replicate(property);
    }
    return ret;
}
//# sourceMappingURL=Lanes.js.map