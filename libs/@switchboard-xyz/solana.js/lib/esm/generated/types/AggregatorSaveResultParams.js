import * as types from '../types'; // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from '@coral-xyz/borsh';
export class AggregatorSaveResultParams {
    constructor(fields) {
        this.oracleIdx = fields.oracleIdx;
        this.error = fields.error;
        this.value = new types.BorshDecimal({ ...fields.value });
        this.jobsChecksum = fields.jobsChecksum;
        this.minResponse = new types.BorshDecimal({ ...fields.minResponse });
        this.maxResponse = new types.BorshDecimal({ ...fields.maxResponse });
        this.feedPermissionBump = fields.feedPermissionBump;
        this.oraclePermissionBump = fields.oraclePermissionBump;
        this.leaseBump = fields.leaseBump;
        this.stateBump = fields.stateBump;
    }
    static layout(property) {
        return borsh.struct([
            borsh.u32('oracleIdx'),
            borsh.bool('error'),
            types.BorshDecimal.layout('value'),
            borsh.array(borsh.u8(), 32, 'jobsChecksum'),
            types.BorshDecimal.layout('minResponse'),
            types.BorshDecimal.layout('maxResponse'),
            borsh.u8('feedPermissionBump'),
            borsh.u8('oraclePermissionBump'),
            borsh.u8('leaseBump'),
            borsh.u8('stateBump'),
        ], property);
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    static fromDecoded(obj) {
        return new AggregatorSaveResultParams({
            oracleIdx: obj.oracleIdx,
            error: obj.error,
            value: types.BorshDecimal.fromDecoded(obj.value),
            jobsChecksum: obj.jobsChecksum,
            minResponse: types.BorshDecimal.fromDecoded(obj.minResponse),
            maxResponse: types.BorshDecimal.fromDecoded(obj.maxResponse),
            feedPermissionBump: obj.feedPermissionBump,
            oraclePermissionBump: obj.oraclePermissionBump,
            leaseBump: obj.leaseBump,
            stateBump: obj.stateBump,
        });
    }
    static toEncodable(fields) {
        return {
            oracleIdx: fields.oracleIdx,
            error: fields.error,
            value: types.BorshDecimal.toEncodable(fields.value),
            jobsChecksum: fields.jobsChecksum,
            minResponse: types.BorshDecimal.toEncodable(fields.minResponse),
            maxResponse: types.BorshDecimal.toEncodable(fields.maxResponse),
            feedPermissionBump: fields.feedPermissionBump,
            oraclePermissionBump: fields.oraclePermissionBump,
            leaseBump: fields.leaseBump,
            stateBump: fields.stateBump,
        };
    }
    toJSON() {
        return {
            oracleIdx: this.oracleIdx,
            error: this.error,
            value: this.value.toJSON(),
            jobsChecksum: this.jobsChecksum,
            minResponse: this.minResponse.toJSON(),
            maxResponse: this.maxResponse.toJSON(),
            feedPermissionBump: this.feedPermissionBump,
            oraclePermissionBump: this.oraclePermissionBump,
            leaseBump: this.leaseBump,
            stateBump: this.stateBump,
        };
    }
    static fromJSON(obj) {
        return new AggregatorSaveResultParams({
            oracleIdx: obj.oracleIdx,
            error: obj.error,
            value: types.BorshDecimal.fromJSON(obj.value),
            jobsChecksum: obj.jobsChecksum,
            minResponse: types.BorshDecimal.fromJSON(obj.minResponse),
            maxResponse: types.BorshDecimal.fromJSON(obj.maxResponse),
            feedPermissionBump: obj.feedPermissionBump,
            oraclePermissionBump: obj.oraclePermissionBump,
            leaseBump: obj.leaseBump,
            stateBump: obj.stateBump,
        });
    }
    toEncodable() {
        return AggregatorSaveResultParams.toEncodable(this);
    }
}
//# sourceMappingURL=AggregatorSaveResultParams.js.map