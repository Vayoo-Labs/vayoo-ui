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
exports.JobInitParams = void 0;
const common_1 = require("@switchboard-xyz/common"); // eslint-disable-line @typescript-eslint/no-unused-vars
const borsh = __importStar(require("@coral-xyz/borsh"));
class JobInitParams {
    constructor(fields) {
        this.name = fields.name;
        this.expiration = fields.expiration;
        this.stateBump = fields.stateBump;
        this.data = fields.data;
        this.size = fields.size;
    }
    static layout(property) {
        return borsh.struct([
            borsh.array(borsh.u8(), 32, 'name'),
            borsh.i64('expiration'),
            borsh.u8('stateBump'),
            borsh.vecU8('data'),
            borsh.option(borsh.u32(), 'size'),
        ], property);
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    static fromDecoded(obj) {
        return new JobInitParams({
            name: obj.name,
            expiration: obj.expiration,
            stateBump: obj.stateBump,
            data: new Uint8Array(obj.data.buffer, obj.data.byteOffset, obj.data.length),
            size: obj.size,
        });
    }
    static toEncodable(fields) {
        return {
            name: fields.name,
            expiration: fields.expiration,
            stateBump: fields.stateBump,
            data: Buffer.from(fields.data.buffer, fields.data.byteOffset, fields.data.length),
            size: fields.size,
        };
    }
    toJSON() {
        return {
            name: this.name,
            expiration: this.expiration.toString(),
            stateBump: this.stateBump,
            data: Array.from(this.data.values()),
            size: this.size,
        };
    }
    static fromJSON(obj) {
        return new JobInitParams({
            name: obj.name,
            expiration: new common_1.BN(obj.expiration),
            stateBump: obj.stateBump,
            data: Uint8Array.from(obj.data),
            size: obj.size,
        });
    }
    toEncodable() {
        return JobInitParams.toEncodable(this);
    }
}
exports.JobInitParams = JobInitParams;
//# sourceMappingURL=JobInitParams.js.map