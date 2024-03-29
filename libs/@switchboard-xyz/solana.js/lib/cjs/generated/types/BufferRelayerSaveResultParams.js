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
exports.BufferRelayerSaveResultParams = void 0;
const borsh = __importStar(require("@coral-xyz/borsh"));
class BufferRelayerSaveResultParams {
    constructor(fields) {
        this.stateBump = fields.stateBump;
        this.permissionBump = fields.permissionBump;
        this.result = fields.result;
        this.success = fields.success;
    }
    static layout(property) {
        return borsh.struct([
            borsh.u8('stateBump'),
            borsh.u8('permissionBump'),
            borsh.vecU8('result'),
            borsh.bool('success'),
        ], property);
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    static fromDecoded(obj) {
        return new BufferRelayerSaveResultParams({
            stateBump: obj.stateBump,
            permissionBump: obj.permissionBump,
            result: new Uint8Array(obj.result.buffer, obj.result.byteOffset, obj.result.length),
            success: obj.success,
        });
    }
    static toEncodable(fields) {
        return {
            stateBump: fields.stateBump,
            permissionBump: fields.permissionBump,
            result: Buffer.from(fields.result.buffer, fields.result.byteOffset, fields.result.length),
            success: fields.success,
        };
    }
    toJSON() {
        return {
            stateBump: this.stateBump,
            permissionBump: this.permissionBump,
            result: Array.from(this.result.values()),
            success: this.success,
        };
    }
    static fromJSON(obj) {
        return new BufferRelayerSaveResultParams({
            stateBump: obj.stateBump,
            permissionBump: obj.permissionBump,
            result: Uint8Array.from(obj.result),
            success: obj.success,
        });
    }
    toEncodable() {
        return BufferRelayerSaveResultParams.toEncodable(this);
    }
}
exports.BufferRelayerSaveResultParams = BufferRelayerSaveResultParams;
//# sourceMappingURL=BufferRelayerSaveResultParams.js.map