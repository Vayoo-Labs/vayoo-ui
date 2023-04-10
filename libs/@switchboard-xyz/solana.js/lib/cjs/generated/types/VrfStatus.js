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
exports.layout = exports.fromJSON = exports.fromDecoded = exports.StatusVerifyFailure = exports.StatusCallbackSuccess = exports.StatusVerified = exports.StatusVerifying = exports.StatusRequesting = exports.StatusNone = void 0;
const borsh = __importStar(require("@coral-xyz/borsh"));
class StatusNone {
    constructor() {
        this.discriminator = 0;
        this.kind = 'StatusNone';
    }
    toJSON() {
        return {
            kind: 'StatusNone',
        };
    }
    toEncodable() {
        return {
            StatusNone: {},
        };
    }
}
exports.StatusNone = StatusNone;
StatusNone.discriminator = 0;
StatusNone.kind = 'StatusNone';
class StatusRequesting {
    constructor() {
        this.discriminator = 1;
        this.kind = 'StatusRequesting';
    }
    toJSON() {
        return {
            kind: 'StatusRequesting',
        };
    }
    toEncodable() {
        return {
            StatusRequesting: {},
        };
    }
}
exports.StatusRequesting = StatusRequesting;
StatusRequesting.discriminator = 1;
StatusRequesting.kind = 'StatusRequesting';
class StatusVerifying {
    constructor() {
        this.discriminator = 2;
        this.kind = 'StatusVerifying';
    }
    toJSON() {
        return {
            kind: 'StatusVerifying',
        };
    }
    toEncodable() {
        return {
            StatusVerifying: {},
        };
    }
}
exports.StatusVerifying = StatusVerifying;
StatusVerifying.discriminator = 2;
StatusVerifying.kind = 'StatusVerifying';
class StatusVerified {
    constructor() {
        this.discriminator = 3;
        this.kind = 'StatusVerified';
    }
    toJSON() {
        return {
            kind: 'StatusVerified',
        };
    }
    toEncodable() {
        return {
            StatusVerified: {},
        };
    }
}
exports.StatusVerified = StatusVerified;
StatusVerified.discriminator = 3;
StatusVerified.kind = 'StatusVerified';
class StatusCallbackSuccess {
    constructor() {
        this.discriminator = 4;
        this.kind = 'StatusCallbackSuccess';
    }
    toJSON() {
        return {
            kind: 'StatusCallbackSuccess',
        };
    }
    toEncodable() {
        return {
            StatusCallbackSuccess: {},
        };
    }
}
exports.StatusCallbackSuccess = StatusCallbackSuccess;
StatusCallbackSuccess.discriminator = 4;
StatusCallbackSuccess.kind = 'StatusCallbackSuccess';
class StatusVerifyFailure {
    constructor() {
        this.discriminator = 5;
        this.kind = 'StatusVerifyFailure';
    }
    toJSON() {
        return {
            kind: 'StatusVerifyFailure',
        };
    }
    toEncodable() {
        return {
            StatusVerifyFailure: {},
        };
    }
}
exports.StatusVerifyFailure = StatusVerifyFailure;
StatusVerifyFailure.discriminator = 5;
StatusVerifyFailure.kind = 'StatusVerifyFailure';
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function fromDecoded(obj) {
    if (typeof obj !== 'object') {
        throw new Error('Invalid enum object');
    }
    if ('StatusNone' in obj) {
        return new StatusNone();
    }
    if ('StatusRequesting' in obj) {
        return new StatusRequesting();
    }
    if ('StatusVerifying' in obj) {
        return new StatusVerifying();
    }
    if ('StatusVerified' in obj) {
        return new StatusVerified();
    }
    if ('StatusCallbackSuccess' in obj) {
        return new StatusCallbackSuccess();
    }
    if ('StatusVerifyFailure' in obj) {
        return new StatusVerifyFailure();
    }
    throw new Error('Invalid enum object');
}
exports.fromDecoded = fromDecoded;
function fromJSON(obj) {
    switch (obj.kind) {
        case 'StatusNone': {
            return new StatusNone();
        }
        case 'StatusRequesting': {
            return new StatusRequesting();
        }
        case 'StatusVerifying': {
            return new StatusVerifying();
        }
        case 'StatusVerified': {
            return new StatusVerified();
        }
        case 'StatusCallbackSuccess': {
            return new StatusCallbackSuccess();
        }
        case 'StatusVerifyFailure': {
            return new StatusVerifyFailure();
        }
    }
}
exports.fromJSON = fromJSON;
function layout(property) {
    const ret = borsh.rustEnum([
        borsh.struct([], 'StatusNone'),
        borsh.struct([], 'StatusRequesting'),
        borsh.struct([], 'StatusVerifying'),
        borsh.struct([], 'StatusVerified'),
        borsh.struct([], 'StatusCallbackSuccess'),
        borsh.struct([], 'StatusVerifyFailure'),
    ]);
    if (property !== undefined) {
        return ret.replicate(property);
    }
    return ret;
}
exports.layout = layout;
//# sourceMappingURL=VrfStatus.js.map