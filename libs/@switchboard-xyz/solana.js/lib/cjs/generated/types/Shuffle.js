"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.layout = exports.fromJSON = exports.fromDecoded = exports.CACA = exports.DBBD = exports.ABAB = exports.ABDC = exports.CBCB = exports.ADDA = exports.BACD = exports.BADC = exports.BBBB = exports.AAAA = void 0;
const borsh = __importStar(require("@coral-xyz/borsh"));
class AAAA {
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
exports.AAAA = AAAA;
AAAA.discriminator = 0;
AAAA.kind = 'AAAA';
class BBBB {
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
exports.BBBB = BBBB;
BBBB.discriminator = 1;
BBBB.kind = 'BBBB';
class BADC {
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
exports.BADC = BADC;
BADC.discriminator = 2;
BADC.kind = 'BADC';
class BACD {
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
exports.BACD = BACD;
BACD.discriminator = 3;
BACD.kind = 'BACD';
class ADDA {
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
exports.ADDA = ADDA;
ADDA.discriminator = 4;
ADDA.kind = 'ADDA';
class CBCB {
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
exports.CBCB = CBCB;
CBCB.discriminator = 5;
CBCB.kind = 'CBCB';
class ABDC {
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
exports.ABDC = ABDC;
ABDC.discriminator = 6;
ABDC.kind = 'ABDC';
class ABAB {
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
exports.ABAB = ABAB;
ABAB.discriminator = 7;
ABAB.kind = 'ABAB';
class DBBD {
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
exports.DBBD = DBBD;
DBBD.discriminator = 8;
DBBD.kind = 'DBBD';
class CACA {
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
exports.CACA = CACA;
CACA.discriminator = 9;
CACA.kind = 'CACA';
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function fromDecoded(obj) {
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
exports.fromDecoded = fromDecoded;
function fromJSON(obj) {
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
exports.fromJSON = fromJSON;
function layout(property) {
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
exports.layout = layout;
//# sourceMappingURL=Shuffle.js.map