import { PublicKey } from '@solana/web3.js';
import { BN } from '@switchboard-xyz/common'; // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from '@coral-xyz/borsh'; // eslint-disable-line @typescript-eslint/no-unused-vars
import * as types from '../types'; // eslint-disable-line @typescript-eslint/no-unused-vars
export class OracleAccountData {
    constructor(fields) {
        this.name = fields.name;
        this.metadata = fields.metadata;
        this.oracleAuthority = fields.oracleAuthority;
        this.lastHeartbeat = fields.lastHeartbeat;
        this.numInUse = fields.numInUse;
        this.tokenAccount = fields.tokenAccount;
        this.queuePubkey = fields.queuePubkey;
        this.metrics = new types.OracleMetrics({ ...fields.metrics });
        this.bump = fields.bump;
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
        if (!data.slice(0, 8).equals(OracleAccountData.discriminator)) {
            throw new Error('invalid account discriminator');
        }
        const dec = OracleAccountData.layout.decode(data.slice(8));
        return new OracleAccountData({
            name: dec.name,
            metadata: dec.metadata,
            oracleAuthority: dec.oracleAuthority,
            lastHeartbeat: dec.lastHeartbeat,
            numInUse: dec.numInUse,
            tokenAccount: dec.tokenAccount,
            queuePubkey: dec.queuePubkey,
            metrics: types.OracleMetrics.fromDecoded(dec.metrics),
            bump: dec.bump,
            ebuf: dec.ebuf,
        });
    }
    toJSON() {
        return {
            name: this.name,
            metadata: this.metadata,
            oracleAuthority: this.oracleAuthority.toString(),
            lastHeartbeat: this.lastHeartbeat.toString(),
            numInUse: this.numInUse,
            tokenAccount: this.tokenAccount.toString(),
            queuePubkey: this.queuePubkey.toString(),
            metrics: this.metrics.toJSON(),
            bump: this.bump,
            ebuf: this.ebuf,
        };
    }
    static fromJSON(obj) {
        return new OracleAccountData({
            name: obj.name,
            metadata: obj.metadata,
            oracleAuthority: new PublicKey(obj.oracleAuthority),
            lastHeartbeat: new BN(obj.lastHeartbeat),
            numInUse: obj.numInUse,
            tokenAccount: new PublicKey(obj.tokenAccount),
            queuePubkey: new PublicKey(obj.queuePubkey),
            metrics: types.OracleMetrics.fromJSON(obj.metrics),
            bump: obj.bump,
            ebuf: obj.ebuf,
        });
    }
}
OracleAccountData.discriminator = Buffer.from([
    128, 30, 16, 241, 170, 73, 55, 54,
]);
OracleAccountData.layout = borsh.struct([
    borsh.array(borsh.u8(), 32, 'name'),
    borsh.array(borsh.u8(), 128, 'metadata'),
    borsh.publicKey('oracleAuthority'),
    borsh.i64('lastHeartbeat'),
    borsh.u32('numInUse'),
    borsh.publicKey('tokenAccount'),
    borsh.publicKey('queuePubkey'),
    types.OracleMetrics.layout('metrics'),
    borsh.u8('bump'),
    borsh.array(borsh.u8(), 255, 'ebuf'),
]);
//# sourceMappingURL=OracleAccountData.js.map