export function parseString(object, key, defaultString = '') {
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
export function parseNumber(object, key, defaultNumber = 0) {
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
export function parseBoolean(object, key, defaultBoolean = false) {
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
export const keypairToString = (keypair) => `[${keypair.secretKey}]`;
//# sourceMappingURL=utils.js.map