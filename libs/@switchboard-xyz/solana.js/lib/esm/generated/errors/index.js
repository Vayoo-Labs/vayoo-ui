import { SBV2_DEVNET_PID, SBV2_MAINNET_PID } from '../../SwitchboardProgram';
import * as anchor from './anchor';
import * as custom from './custom';
export function fromCode(code, logs) {
    return code >= 6000
        ? custom.fromCode(code, logs)
        : anchor.fromCode(code, logs);
}
function hasOwnProperty(obj, prop) {
    return Object.hasOwnProperty.call(obj, prop);
}
const errorRe = /Program (\w+) failed: custom program error: (\w+)/;
export function fromTxError(err) {
    if (typeof err !== 'object' ||
        err === null ||
        !hasOwnProperty(err, 'logs') ||
        !Array.isArray(err.logs)) {
        return null;
    }
    let firstMatch = null;
    for (const logLine of err.logs) {
        firstMatch = errorRe.exec(logLine);
        if (firstMatch !== null) {
            break;
        }
    }
    if (firstMatch === null) {
        return null;
    }
    const [programIdRaw, codeRaw] = firstMatch.slice(1);
    if (programIdRaw !== SBV2_DEVNET_PID.toString() &&
        programIdRaw !== SBV2_MAINNET_PID.toString()) {
        return null;
    }
    let errorCode;
    try {
        errorCode = parseInt(codeRaw, 16);
    }
    catch (parseErr) {
        return null;
    }
    return fromCode(errorCode, err.logs);
}
//# sourceMappingURL=index.js.map