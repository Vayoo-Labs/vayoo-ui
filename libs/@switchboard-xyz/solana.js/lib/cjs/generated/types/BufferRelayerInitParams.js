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
exports.BufferRelayerInitParams = void 0;
const borsh = __importStar(require("@coral-xyz/borsh"));
class BufferRelayerInitParams {
    constructor(fields) {
        this.name = fields.name;
        this.minUpdateDelaySeconds = fields.minUpdateDelaySeconds;
        this.stateBump = fields.stateBump;
    }
    static layout(property) {
        return borsh.struct([
            borsh.array(borsh.u8(), 32, 'name'),
            borsh.u32('minUpdateDelaySeconds'),
            borsh.u8('stateBump'),
        ], property);
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    static fromDecoded(obj) {
        return new BufferRelayerInitParams({
            name: obj.name,
            minUpdateDelaySeconds: obj.minUpdateDelaySeconds,
            stateBump: obj.stateBump,
        });
    }
    static toEncodable(fields) {
        return {
            name: fields.name,
            minUpdateDelaySeconds: fields.minUpdateDelaySeconds,
            stateBump: fields.stateBump,
        };
    }
    toJSON() {
        return {
            name: this.name,
            minUpdateDelaySeconds: this.minUpdateDelaySeconds,
            stateBump: this.stateBump,
        };
    }
    static fromJSON(obj) {
        return new BufferRelayerInitParams({
            name: obj.name,
            minUpdateDelaySeconds: obj.minUpdateDelaySeconds,
            stateBump: obj.stateBump,
        });
    }
    toEncodable() {
        return BufferRelayerInitParams.toEncodable(this);
    }
}
exports.BufferRelayerInitParams = BufferRelayerInitParams;
//# sourceMappingURL=BufferRelayerInitParams.js.map