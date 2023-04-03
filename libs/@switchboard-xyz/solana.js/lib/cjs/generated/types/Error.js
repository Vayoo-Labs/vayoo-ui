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
exports.layout = exports.fromJSON = exports.fromDecoded = exports.InvalidDataError = exports.DeserializationError = exports.SerializationError = exports.InvalidPublicKey = void 0;
const borsh = __importStar(require("@coral-xyz/borsh"));
class InvalidPublicKey {
    constructor() {
        this.discriminator = 0;
        this.kind = 'InvalidPublicKey';
    }
    toJSON() {
        return {
            kind: 'InvalidPublicKey',
        };
    }
    toEncodable() {
        return {
            InvalidPublicKey: {},
        };
    }
}
exports.InvalidPublicKey = InvalidPublicKey;
InvalidPublicKey.discriminator = 0;
InvalidPublicKey.kind = 'InvalidPublicKey';
class SerializationError {
    constructor() {
        this.discriminator = 1;
        this.kind = 'SerializationError';
    }
    toJSON() {
        return {
            kind: 'SerializationError',
        };
    }
    toEncodable() {
        return {
            SerializationError: {},
        };
    }
}
exports.SerializationError = SerializationError;
SerializationError.discriminator = 1;
SerializationError.kind = 'SerializationError';
class DeserializationError {
    constructor() {
        this.discriminator = 2;
        this.kind = 'DeserializationError';
    }
    toJSON() {
        return {
            kind: 'DeserializationError',
        };
    }
    toEncodable() {
        return {
            DeserializationError: {},
        };
    }
}
exports.DeserializationError = DeserializationError;
DeserializationError.discriminator = 2;
DeserializationError.kind = 'DeserializationError';
class InvalidDataError {
    constructor() {
        this.discriminator = 3;
        this.kind = 'InvalidDataError';
    }
    toJSON() {
        return {
            kind: 'InvalidDataError',
        };
    }
    toEncodable() {
        return {
            InvalidDataError: {},
        };
    }
}
exports.InvalidDataError = InvalidDataError;
InvalidDataError.discriminator = 3;
InvalidDataError.kind = 'InvalidDataError';
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function fromDecoded(obj) {
    if (typeof obj !== 'object') {
        throw new Error('Invalid enum object');
    }
    if ('InvalidPublicKey' in obj) {
        return new InvalidPublicKey();
    }
    if ('SerializationError' in obj) {
        return new SerializationError();
    }
    if ('DeserializationError' in obj) {
        return new DeserializationError();
    }
    if ('InvalidDataError' in obj) {
        return new InvalidDataError();
    }
    throw new Error('Invalid enum object');
}
exports.fromDecoded = fromDecoded;
function fromJSON(obj) {
    switch (obj.kind) {
        case 'InvalidPublicKey': {
            return new InvalidPublicKey();
        }
        case 'SerializationError': {
            return new SerializationError();
        }
        case 'DeserializationError': {
            return new DeserializationError();
        }
        case 'InvalidDataError': {
            return new InvalidDataError();
        }
    }
}
exports.fromJSON = fromJSON;
function layout(property) {
    const ret = borsh.rustEnum([
        borsh.struct([], 'InvalidPublicKey'),
        borsh.struct([], 'SerializationError'),
        borsh.struct([], 'DeserializationError'),
        borsh.struct([], 'InvalidDataError'),
    ]);
    if (property !== undefined) {
        return ret.replicate(property);
    }
    return ret;
}
exports.layout = layout;
//# sourceMappingURL=Error.js.map