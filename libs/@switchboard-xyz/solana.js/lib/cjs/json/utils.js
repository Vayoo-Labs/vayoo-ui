"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.keypairToString = exports.parseBoolean = exports.parseNumber = exports.parseString = void 0;
function parseString(object, key, defaultString = '') {
    if (key in object) {
        switch (typeof object[key]) {
            case 'string':
                return object[key];
            default:
                String(object[key]);
        }
    }
    return defaultString;
}
exports.parseString = parseString;
function parseNumber(object, key, defaultNumber = 0) {
    if (key in object) {
        switch (typeof object[key]) {
            case 'number':
                return object[key];
            default:
                Number(object[key]);
        }
    }
    return defaultNumber;
}
exports.parseNumber = parseNumber;
function parseBoolean(object, key, defaultBoolean = false) {
    if (key in object) {
        switch (typeof object[key]) {
            case 'boolean':
                return object[key];
            default:
                return Boolean(object[key]);
        }
    }
    return defaultBoolean;
}
exports.parseBoolean = parseBoolean;
const keypairToString = (keypair) => `[${keypair.secretKey}]`;
exports.keypairToString = keypairToString;
//# sourceMappingURL=utils.js.map