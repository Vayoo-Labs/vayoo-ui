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
exports.CrankInitParams = void 0;
const borsh = __importStar(require("@coral-xyz/borsh"));
class CrankInitParams {
    constructor(fields) {
        this.name = fields.name;
        this.metadata = fields.metadata;
        this.crankSize = fields.crankSize;
    }
    static layout(property) {
        return borsh.struct([borsh.vecU8('name'), borsh.vecU8('metadata'), borsh.u32('crankSize')], property);
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    static fromDecoded(obj) {
        return new CrankInitParams({
            name: new Uint8Array(obj.name.buffer, obj.name.byteOffset, obj.name.length),
            metadata: new Uint8Array(obj.metadata.buffer, obj.metadata.byteOffset, obj.metadata.length),
            crankSize: obj.crankSize,
        });
    }
    static toEncodable(fields) {
        return {
            name: Buffer.from(fields.name.buffer, fields.name.byteOffset, fields.name.length),
            metadata: Buffer.from(fields.metadata.buffer, fields.metadata.byteOffset, fields.metadata.length),
            crankSize: fields.crankSize,
        };
    }
    toJSON() {
        return {
            name: Array.from(this.name.values()),
            metadata: Array.from(this.metadata.values()),
            crankSize: this.crankSize,
        };
    }
    static fromJSON(obj) {
        return new CrankInitParams({
            name: Uint8Array.from(obj.name),
            metadata: Uint8Array.from(obj.metadata),
            crankSize: obj.crankSize,
        });
    }
    toEncodable() {
        return CrankInitParams.toEncodable(this);
    }
}
exports.CrankInitParams = CrankInitParams;
//# sourceMappingURL=CrankInitParams.js.map