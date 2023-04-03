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
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BN = exports.Big = void 0;
__exportStar(require("./SwitchboardDecimal"), exports);
__exportStar(require("./OracleJob"), exports);
__exportStar(require("./utils"), exports);
__exportStar(require("./protos/index.js"), exports);
var big_js_1 = require("big.js");
Object.defineProperty(exports, "Big", { enumerable: true, get: function () { return __importDefault(big_js_1).default; } });
var bn_js_1 = require("bn.js");
Object.defineProperty(exports, "BN", { enumerable: true, get: function () { return __importDefault(bn_js_1).default; } });
const minimal_js_1 = __importDefault(require("protobufjs/minimal.js"));
minimal_js_1.default.util.toJSONOptions = {
    longs: String,
    enums: String,
    bytes: String,
    json: true,
};
//# sourceMappingURL=index.js.map