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
exports.EcvrfIntermediate = void 0;
const types = __importStar(require("../types")); // eslint-disable-line @typescript-eslint/no-unused-vars
const borsh = __importStar(require("@coral-xyz/borsh"));
class EcvrfIntermediate {
    constructor(fields) {
        this.r = new types.FieldElementZC({ ...fields.r });
        this.nS = new types.FieldElementZC({ ...fields.nS });
        this.d = new types.FieldElementZC({ ...fields.d });
        this.t13 = new types.FieldElementZC({ ...fields.t13 });
        this.t15 = new types.FieldElementZC({ ...fields.t15 });
    }
    static layout(property) {
        return borsh.struct([
            types.FieldElementZC.layout('r'),
            types.FieldElementZC.layout('nS'),
            types.FieldElementZC.layout('d'),
            types.FieldElementZC.layout('t13'),
            types.FieldElementZC.layout('t15'),
        ], property);
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    static fromDecoded(obj) {
        return new EcvrfIntermediate({
            r: types.FieldElementZC.fromDecoded(obj.r),
            nS: types.FieldElementZC.fromDecoded(obj.nS),
            d: types.FieldElementZC.fromDecoded(obj.d),
            t13: types.FieldElementZC.fromDecoded(obj.t13),
            t15: types.FieldElementZC.fromDecoded(obj.t15),
        });
    }
    static toEncodable(fields) {
        return {
            r: types.FieldElementZC.toEncodable(fields.r),
            nS: types.FieldElementZC.toEncodable(fields.nS),
            d: types.FieldElementZC.toEncodable(fields.d),
            t13: types.FieldElementZC.toEncodable(fields.t13),
            t15: types.FieldElementZC.toEncodable(fields.t15),
        };
    }
    toJSON() {
        return {
            r: this.r.toJSON(),
            nS: this.nS.toJSON(),
            d: this.d.toJSON(),
            t13: this.t13.toJSON(),
            t15: this.t15.toJSON(),
        };
    }
    static fromJSON(obj) {
        return new EcvrfIntermediate({
            r: types.FieldElementZC.fromJSON(obj.r),
            nS: types.FieldElementZC.fromJSON(obj.nS),
            d: types.FieldElementZC.fromJSON(obj.d),
            t13: types.FieldElementZC.fromJSON(obj.t13),
            t15: types.FieldElementZC.fromJSON(obj.t15),
        });
    }
    toEncodable() {
        return EcvrfIntermediate.toEncodable(this);
    }
}
exports.EcvrfIntermediate = EcvrfIntermediate;
//# sourceMappingURL=EcvrfIntermediate.js.map