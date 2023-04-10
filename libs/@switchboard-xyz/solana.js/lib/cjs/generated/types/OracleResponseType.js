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
exports.layout = exports.fromJSON = exports.fromDecoded = exports.TypeNoResponse = exports.TypeDisagreement = exports.TypeError = exports.TypeSuccess = void 0;
const borsh = __importStar(require("@coral-xyz/borsh"));
class TypeSuccess {
    constructor() {
        this.discriminator = 0;
        this.kind = 'TypeSuccess';
    }
    toJSON() {
        return {
            kind: 'TypeSuccess',
        };
    }
    toEncodable() {
        return {
            TypeSuccess: {},
        };
    }
}
exports.TypeSuccess = TypeSuccess;
TypeSuccess.discriminator = 0;
TypeSuccess.kind = 'TypeSuccess';
class TypeError {
    constructor() {
        this.discriminator = 1;
        this.kind = 'TypeError';
    }
    toJSON() {
        return {
            kind: 'TypeError',
        };
    }
    toEncodable() {
        return {
            TypeError: {},
        };
    }
}
exports.TypeError = TypeError;
TypeError.discriminator = 1;
TypeError.kind = 'TypeError';
class TypeDisagreement {
    constructor() {
        this.discriminator = 2;
        this.kind = 'TypeDisagreement';
    }
    toJSON() {
        return {
            kind: 'TypeDisagreement',
        };
    }
    toEncodable() {
        return {
            TypeDisagreement: {},
        };
    }
}
exports.TypeDisagreement = TypeDisagreement;
TypeDisagreement.discriminator = 2;
TypeDisagreement.kind = 'TypeDisagreement';
class TypeNoResponse {
    constructor() {
        this.discriminator = 3;
        this.kind = 'TypeNoResponse';
    }
    toJSON() {
        return {
            kind: 'TypeNoResponse',
        };
    }
    toEncodable() {
        return {
            TypeNoResponse: {},
        };
    }
}
exports.TypeNoResponse = TypeNoResponse;
TypeNoResponse.discriminator = 3;
TypeNoResponse.kind = 'TypeNoResponse';
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function fromDecoded(obj) {
    if (typeof obj !== 'object') {
        throw new Error('Invalid enum object');
    }
    if ('TypeSuccess' in obj) {
        return new TypeSuccess();
    }
    if ('TypeError' in obj) {
        return new TypeError();
    }
    if ('TypeDisagreement' in obj) {
        return new TypeDisagreement();
    }
    if ('TypeNoResponse' in obj) {
        return new TypeNoResponse();
    }
    throw new Error('Invalid enum object');
}
exports.fromDecoded = fromDecoded;
function fromJSON(obj) {
    switch (obj.kind) {
        case 'TypeSuccess': {
            return new TypeSuccess();
        }
        case 'TypeError': {
            return new TypeError();
        }
        case 'TypeDisagreement': {
            return new TypeDisagreement();
        }
        case 'TypeNoResponse': {
            return new TypeNoResponse();
        }
    }
}
exports.fromJSON = fromJSON;
function layout(property) {
    const ret = borsh.rustEnum([
        borsh.struct([], 'TypeSuccess'),
        borsh.struct([], 'TypeError'),
        borsh.struct([], 'TypeDisagreement'),
        borsh.struct([], 'TypeNoResponse'),
    ]);
    if (property !== undefined) {
        return ret.replicate(property);
    }
    return ret;
}
exports.layout = layout;
//# sourceMappingURL=OracleResponseType.js.map