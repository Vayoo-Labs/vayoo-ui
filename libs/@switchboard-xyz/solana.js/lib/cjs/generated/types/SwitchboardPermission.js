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
exports.layout = exports.fromJSON = exports.fromDecoded = exports.PermitVrfRequests = exports.PermitOracleQueueUsage = exports.PermitOracleHeartbeat = exports.PermitNone = void 0;
const borsh = __importStar(require("@coral-xyz/borsh"));
class PermitNone {
    constructor() {
        this.discriminator = 0;
        this.kind = 'PermitNone';
    }
    toJSON() {
        return {
            kind: 'PermitNone',
        };
    }
    toEncodable() {
        return {
            PermitOracleHeartbeat: {},
        };
    }
}
exports.PermitNone = PermitNone;
PermitNone.discriminator = 0;
PermitNone.kind = 'NONE';
class PermitOracleHeartbeat {
    constructor() {
        this.discriminator = 1;
        this.kind = 'PermitOracleHeartbeat';
    }
    toJSON() {
        return {
            kind: 'PermitOracleHeartbeat',
        };
    }
    toEncodable() {
        return {
            PermitOracleHeartbeat: {},
        };
    }
}
exports.PermitOracleHeartbeat = PermitOracleHeartbeat;
PermitOracleHeartbeat.discriminator = 1;
PermitOracleHeartbeat.kind = 'PermitOracleHeartbeat';
class PermitOracleQueueUsage {
    constructor() {
        this.discriminator = 2;
        this.kind = 'PermitOracleQueueUsage';
    }
    toJSON() {
        return {
            kind: 'PermitOracleQueueUsage',
        };
    }
    toEncodable() {
        return {
            PermitOracleQueueUsage: {},
        };
    }
}
exports.PermitOracleQueueUsage = PermitOracleQueueUsage;
PermitOracleQueueUsage.discriminator = 2;
PermitOracleQueueUsage.kind = 'PermitOracleQueueUsage';
class PermitVrfRequests {
    constructor() {
        this.discriminator = 4;
        this.kind = 'PermitVrfRequests';
    }
    toJSON() {
        return {
            kind: 'PermitVrfRequests',
        };
    }
    toEncodable() {
        return {
            PermitVrfRequests: {},
        };
    }
}
exports.PermitVrfRequests = PermitVrfRequests;
PermitVrfRequests.discriminator = 4;
PermitVrfRequests.kind = 'PermitVrfRequests';
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function fromDecoded(obj) {
    if (typeof obj !== 'object') {
        throw new Error('Invalid enum object');
    }
    if ('PermitNone' in obj) {
        return new PermitNone();
    }
    if ('PermitOracleHeartbeat' in obj) {
        return new PermitOracleHeartbeat();
    }
    if ('PermitOracleQueueUsage' in obj) {
        return new PermitOracleQueueUsage();
    }
    if ('PermitVrfRequests' in obj) {
        return new PermitVrfRequests();
    }
    throw new Error('Invalid enum object');
}
exports.fromDecoded = fromDecoded;
function fromJSON(obj) {
    switch (obj.kind) {
        case 'PermitNone': {
            return new PermitNone();
        }
        case 'PermitOracleHeartbeat': {
            return new PermitOracleHeartbeat();
        }
        case 'PermitOracleQueueUsage': {
            return new PermitOracleQueueUsage();
        }
        case 'PermitVrfRequests': {
            return new PermitVrfRequests();
        }
    }
}
exports.fromJSON = fromJSON;
function layout(property) {
    const ret = borsh.rustEnum([
        // borsh.struct([], 'PermitNone'),
        borsh.struct([], 'PermitOracleHeartbeat'),
        borsh.struct([], 'PermitOracleQueueUsage'),
        borsh.struct([], 'PermitVrfRequests'),
    ]);
    if (property !== undefined) {
        return ret.replicate(property);
    }
    return ret;
}
exports.layout = layout;
//# sourceMappingURL=SwitchboardPermission.js.map