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
exports.FieldElementZC = void 0;
const common_1 = require("@switchboard-xyz/common"); // eslint-disable-line @typescript-eslint/no-unused-vars
const borsh = __importStar(require("@coral-xyz/borsh"));
class FieldElementZC {
    constructor(fields) {
        this.bytes = fields.bytes;
    }
    static layout(property) {
        return borsh.struct([borsh.array(borsh.u64(), 5, 'bytes')], property);
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    static fromDecoded(obj) {
        return new FieldElementZC({
            bytes: obj.bytes,
        });
    }
    static toEncodable(fields) {
        return {
            bytes: fields.bytes,
        };
    }
    toJSON() {
        return {
            bytes: this.bytes.map(item => item.toString()),
        };
    }
    static fromJSON(obj) {
        return new FieldElementZC({
            bytes: obj.bytes.map(item => new common_1.BN(item)),
        });
    }
    toEncodable() {
        return FieldElementZC.toEncodable(this);
    }
}
exports.FieldElementZC = FieldElementZC;
//# sourceMappingURL=FieldElementZC.js.map