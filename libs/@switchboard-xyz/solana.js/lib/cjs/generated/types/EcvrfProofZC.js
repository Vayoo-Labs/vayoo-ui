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
exports.EcvrfProofZC = void 0;
const types = __importStar(require("../types")); // eslint-disable-line @typescript-eslint/no-unused-vars
const borsh = __importStar(require("@coral-xyz/borsh"));
class EcvrfProofZC {
    constructor(fields) {
        this.gamma = new types.EdwardsPointZC({ ...fields.gamma });
        this.c = new types.Scalar({ ...fields.c });
        this.s = new types.Scalar({ ...fields.s });
    }
    static layout(property) {
        return borsh.struct([
            types.EdwardsPointZC.layout('gamma'),
            types.Scalar.layout('c'),
            types.Scalar.layout('s'),
        ], property);
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    static fromDecoded(obj) {
        return new EcvrfProofZC({
            gamma: types.EdwardsPointZC.fromDecoded(obj.gamma),
            c: types.Scalar.fromDecoded(obj.c),
            s: types.Scalar.fromDecoded(obj.s),
        });
    }
    static toEncodable(fields) {
        return {
            gamma: types.EdwardsPointZC.toEncodable(fields.gamma),
            c: types.Scalar.toEncodable(fields.c),
            s: types.Scalar.toEncodable(fields.s),
        };
    }
    toJSON() {
        return {
            gamma: this.gamma.toJSON(),
            c: this.c.toJSON(),
            s: this.s.toJSON(),
        };
    }
    static fromJSON(obj) {
        return new EcvrfProofZC({
            gamma: types.EdwardsPointZC.fromJSON(obj.gamma),
            c: types.Scalar.fromJSON(obj.c),
            s: types.Scalar.fromJSON(obj.s),
        });
    }
    toEncodable() {
        return EcvrfProofZC.toEncodable(this);
    }
}
exports.EcvrfProofZC = EcvrfProofZC;
//# sourceMappingURL=EcvrfProofZC.js.map