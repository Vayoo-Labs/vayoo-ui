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
exports.RealmSpawnRecordAccountData = void 0;
const borsh = __importStar(require("@coral-xyz/borsh")); // eslint-disable-line @typescript-eslint/no-unused-vars
class RealmSpawnRecordAccountData {
    constructor(fields) {
        this.ebuf = fields.ebuf;
    }
    static async fetch(program, address) {
        const info = await program.connection.getAccountInfo(address);
        if (info === null) {
            return null;
        }
        if (!info.owner.equals(program.programId)) {
            throw new Error("account doesn't belong to this program");
        }
        return this.decode(info.data);
    }
    static async fetchMultiple(program, addresses) {
        const infos = await program.connection.getMultipleAccountsInfo(addresses);
        return infos.map(info => {
            if (info === null) {
                return null;
            }
            if (!info.owner.equals(program.programId)) {
                throw new Error("account doesn't belong to this program");
            }
            return this.decode(info.data);
        });
    }
    static decode(data) {
        if (!data.slice(0, 8).equals(RealmSpawnRecordAccountData.discriminator)) {
            throw new Error('invalid account discriminator');
        }
        const dec = RealmSpawnRecordAccountData.layout.decode(data.slice(8));
        return new RealmSpawnRecordAccountData({
            ebuf: dec.ebuf,
        });
    }
    toJSON() {
        return {
            ebuf: this.ebuf,
        };
    }
    static fromJSON(obj) {
        return new RealmSpawnRecordAccountData({
            ebuf: obj.ebuf,
        });
    }
}
exports.RealmSpawnRecordAccountData = RealmSpawnRecordAccountData;
RealmSpawnRecordAccountData.discriminator = Buffer.from([
    229, 116, 99, 2, 145, 96, 5, 95,
]);
RealmSpawnRecordAccountData.layout = borsh.struct([borsh.array(borsh.u8(), 256, 'ebuf')]);
//# sourceMappingURL=RealmSpawnRecordAccountData.js.map