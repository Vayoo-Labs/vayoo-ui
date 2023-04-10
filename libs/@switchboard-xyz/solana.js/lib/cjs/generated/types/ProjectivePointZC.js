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
exports.ProjectivePointZC = void 0;
const types = __importStar(require("../types")); // eslint-disable-line @typescript-eslint/no-unused-vars
const borsh = __importStar(require("@coral-xyz/borsh"));
class ProjectivePointZC {
    constructor(fields) {
        this.x = new types.FieldElementZC({ ...fields.x });
        this.y = new types.FieldElementZC({ ...fields.y });
        this.z = new types.FieldElementZC({ ...fields.z });
    }
    static layout(property) {
        return borsh.struct([
            types.FieldElementZC.layout('x'),
            types.FieldElementZC.layout('y'),
            types.FieldElementZC.layout('z'),
        ], property);
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    static fromDecoded(obj) {
        return new ProjectivePointZC({
            x: types.FieldElementZC.fromDecoded(obj.x),
            y: types.FieldElementZC.fromDecoded(obj.y),
            z: types.FieldElementZC.fromDecoded(obj.z),
        });
    }
    static toEncodable(fields) {
        return {
            x: types.FieldElementZC.toEncodable(fields.x),
            y: types.FieldElementZC.toEncodable(fields.y),
            z: types.FieldElementZC.toEncodable(fields.z),
        };
    }
    toJSON() {
        return {
            x: this.x.toJSON(),
            y: this.y.toJSON(),
            z: this.z.toJSON(),
        };
    }
    static fromJSON(obj) {
        return new ProjectivePointZC({
            x: types.FieldElementZC.fromJSON(obj.x),
            y: types.FieldElementZC.fromJSON(obj.y),
            z: types.FieldElementZC.fromJSON(obj.z),
        });
    }
    toEncodable() {
        return ProjectivePointZC.toEncodable(this);
    }
}
exports.ProjectivePointZC = ProjectivePointZC;
//# sourceMappingURL=ProjectivePointZC.js.map