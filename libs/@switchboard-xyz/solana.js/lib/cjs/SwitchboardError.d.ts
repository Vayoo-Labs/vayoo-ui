import { SwitchboardProgram } from './SwitchboardProgram';
/**
 * Switchboard wrapper for anchor program errors.
 */
export declare class SwitchboardError {
    /**
     * Converts a numerical error code to a SwitchboardError based on the program
     * IDL.
     * @param program the Switchboard program object containing the program IDL.
     * @param code Error code to convert to a SwitchboardError object.
     * @return SwitchboardError
     */
    static fromCode(program: SwitchboardProgram, code: number): SwitchboardError;
    /**
     *  The program containing the Switchboard IDL specifying error codes.
     */
    readonly program: SwitchboardProgram;
    /**
     *  Stringified name of the error type.
     */
    readonly name: string;
    /**
     *  Numerical SwitchboardError representation.
     */
    readonly code: number;
    /**
     *  Message describing this error in detail.
     */
    readonly msg?: string;
    private constructor();
}
//# sourceMappingURL=SwitchboardError.d.ts.map