"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loadKeypair = void 0;
const web3_js_1 = require("@solana/web3.js");
const fs_1 = __importDefault(require("fs"));
const os_1 = __importDefault(require("os"));
const path_1 = __importDefault(require("path"));
function loadKeypair(keypairPath) {
    const fullPath = keypairPath.startsWith('/') || keypairPath.startsWith('C:')
        ? keypairPath
        : keypairPath.startsWith('~')
            ? os_1.default.homedir() + keypairPath.slice(1)
            : path_1.default.join(process.cwd(), keypairPath);
    if (!fs_1.default.existsSync(fullPath)) {
        const keypair = web3_js_1.Keypair.generate();
        const dir = path_1.default.dirname(fullPath);
        if (!fs_1.default.existsSync(dir)) {
            fs_1.default.mkdirSync(dir, { recursive: true });
        }
        fs_1.default.writeFileSync(fullPath, `[${keypair.secretKey}]`);
        return keypair;
    }
    return web3_js_1.Keypair.fromSecretKey(new Uint8Array(JSON.parse(fs_1.default.readFileSync(fullPath, 'utf-8'))));
}
exports.loadKeypair = loadKeypair;
//# sourceMappingURL=utils.js.map