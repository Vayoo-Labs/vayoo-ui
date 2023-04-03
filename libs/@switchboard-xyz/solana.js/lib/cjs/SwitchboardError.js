"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SwitchboardError = void 0;
/**
 * Switchboard wrapper for anchor program errors.
 */
class SwitchboardError {
    /**
     * Converts a numerical error code to a SwitchboardError based on the program
     * IDL.
     * @param program the Switchboard program object containing the program IDL.
     * @param code Error code to convert to a SwitchboardError object.
     * @return SwitchboardError
     */
    static fromCode(program, code) {
        for (const e of program.idl.errors ?? []) {
            if (code === e.code) {
                return new SwitchboardError(program, e.name, e.code, e.msg);
            }
        }
        throw new Error(`Could not find SwitchboardError for error code ${code}`);
    }
    constructor(program, name, code, msg) {
        this.program = program;
        this.name = name;
        this.code = code;
        this.msg = msg;
    }
}
exports.SwitchboardError = SwitchboardError;
//# sourceMappingURL=SwitchboardError.js.map