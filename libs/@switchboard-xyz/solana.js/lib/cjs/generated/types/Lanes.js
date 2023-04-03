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
exports.layout = exports.fromJSON = exports.fromDecoded = exports.BCD = exports.AD = exports.AC = exports.AB = exports.C = exports.D = void 0;
const borsh = __importStar(require("@coral-xyz/borsh"));
class D {
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
exports.D = D;
D.discriminator = 0;
D.kind = 'D';
class C {
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
exports.C = C;
C.discriminator = 1;
C.kind = 'C';
class AB {
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
exports.AB = AB;
AB.discriminator = 2;
AB.kind = 'AB';
class AC {
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
exports.AC = AC;
AC.discriminator = 3;
AC.kind = 'AC';
class AD {
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
exports.AD = AD;
AD.discriminator = 4;
AD.kind = 'AD';
class BCD {
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
exports.BCD = BCD;
BCD.discriminator = 5;
BCD.kind = 'BCD';
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function fromDecoded(obj) {
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
exports.fromDecoded = fromDecoded;
function fromJSON(obj) {
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
exports.fromJSON = fromJSON;
function layout(property) {
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
exports.layout = layout;
//# sourceMappingURL=Lanes.js.map