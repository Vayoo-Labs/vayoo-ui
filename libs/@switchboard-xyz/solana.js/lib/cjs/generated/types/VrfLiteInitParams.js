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
exports.VrfLiteInitParams = void 0;
const common_1 = require("@switchboard-xyz/common"); // eslint-disable-line @typescript-eslint/no-unused-vars
const types = __importStar(require("../types")); // eslint-disable-line @typescript-eslint/no-unused-vars
const borsh = __importStar(require("@coral-xyz/borsh"));
class VrfLiteInitParams {
    constructor(fields) {
        this.callback =
            (fields.callback && new types.Callback({ ...fields.callback })) || null;
        this.stateBump = fields.stateBump;
        this.expiration = fields.expiration;
    }
    static layout(property) {
        return borsh.struct([
            borsh.option(types.Callback.layout(), 'callback'),
            borsh.u8('stateBump'),
            borsh.option(borsh.i64(), 'expiration'),
        ], property);
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    static fromDecoded(obj) {
        return new VrfLiteInitParams({
            callback: (obj.callback && types.Callback.fromDecoded(obj.callback)) || null,
            stateBump: obj.stateBump,
            expiration: obj.expiration,
        });
    }
    static toEncodable(fields) {
        return {
            callback: (fields.callback && types.Callback.toEncodable(fields.callback)) ||
                null,
            stateBump: fields.stateBump,
            expiration: fields.expiration,
        };
    }
    toJSON() {
        return {
            callback: (this.callback && this.callback.toJSON()) || null,
            stateBump: this.stateBump,
            expiration: (this.expiration && this.expiration.toString()) || null,
        };
    }
    static fromJSON(obj) {
        return new VrfLiteInitParams({
            callback: (obj.callback && types.Callback.fromJSON(obj.callback)) || null,
            stateBump: obj.stateBump,
            expiration: (obj.expiration && new common_1.BN(obj.expiration)) || null,
        });
    }
    toEncodable() {
        return VrfLiteInitParams.toEncodable(this);
    }
}
exports.VrfLiteInitParams = VrfLiteInitParams;
//# sourceMappingURL=VrfLiteInitParams.js.map