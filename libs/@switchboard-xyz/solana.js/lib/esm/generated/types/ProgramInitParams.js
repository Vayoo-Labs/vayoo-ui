import * as borsh from '@coral-xyz/borsh';
export class ProgramInitParams {
    constructor(fields) {
        this.stateBump = fields.stateBump;
    }
    static layout(property) {
        return borsh.struct([borsh.u8('stateBump')], property);
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    static fromDecoded(obj) {
        return new ProgramInitParams({
            stateBump: obj.stateBump,
        });
    }
    static toEncodable(fields) {
        return {
            stateBump: fields.stateBump,
        };
    }
    toJSON() {
        return {
            stateBump: this.stateBump,
        };
    }
    static fromJSON(obj) {
        return new ProgramInitParams({
            stateBump: obj.stateBump,
        });
    }
    toEncodable() {
        return ProgramInitParams.toEncodable(this);
    }
}
//# sourceMappingURL=ProgramInitParams.js.map