"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VrfJson = void 0;
const generated_1 = require("../generated");
const utils_1 = require("../utils");
const utils_2 = require("./utils");
const web3_js_1 = require("@solana/web3.js");
class VrfJson {
    constructor(object) {
        if (!('callback' in object)) {
            throw new Error(`VRF has no callback defined`);
        }
        const callbackJson = generated_1.Callback.fromJSON(object.callback);
        this.callback = {
            programId: callbackJson.programId,
            accounts: callbackJson.accounts.map((a) => {
                return {
                    pubkey: a.pubkey,
                    isSigner: a.isSigner,
                    isWritable: a.isWritable,
                };
            }),
            ixData: Buffer.from(callbackJson.ixData),
        };
        // permissions
        this.enable = (0, utils_2.parseBoolean)(object, 'enable', false);
        // accounts
        const keypairPath = (0, utils_2.parseString)(object, 'keypair');
        this.vrfKeypair = keypairPath
            ? (0, utils_1.loadKeypair)(keypairPath)
            : web3_js_1.Keypair.generate();
        if ('authorityKeypair' in object) {
            const authorityPath = (0, utils_2.parseString)(object, 'authorityKeypair');
            this.authorityKeypair = authorityPath
                ? (0, utils_1.loadKeypair)(authorityPath)
                : undefined;
            this.authority = this.authorityKeypair
                ? this.authorityKeypair.publicKey
                : undefined;
        }
        else if ('authority' in object) {
            if (typeof object.authority !== 'string') {
                throw new Error(`Vrf authority field should be a string`);
            }
            this.authority = new web3_js_1.PublicKey(object.authority);
        }
    }
    static loadMultiple(object) {
        const vrfJsons = [];
        if ('vrfs' in object && Array.isArray(object.vrfs)) {
            for (const vrf of object.vrfs) {
                vrfJsons.push(new VrfJson(vrf));
            }
        }
        return vrfJsons;
    }
    toJSON() {
        return {
            callback: {
                programId: this.callback.programId.toBase58(),
                accounts: this.callback.accounts
                    .filter(a => !a.pubkey.equals(web3_js_1.PublicKey.default))
                    .map(a => {
                    return {
                        pubkey: a.pubkey.toBase58(),
                        isSigner: a.isSigner,
                        isWritable: a.isWritable,
                    };
                }),
                isData: `[${new Uint8Array(this.callback.ixData)}]`,
            },
            keypair: (0, utils_2.keypairToString)(this.vrfKeypair),
            authority: this.authority?.toBase58() ?? undefined,
            authorityKeypair: this.authorityKeypair
                ? (0, utils_2.keypairToString)(this.authorityKeypair)
                : undefined,
        };
    }
}
exports.VrfJson = VrfJson;
//# sourceMappingURL=vrf.js.map