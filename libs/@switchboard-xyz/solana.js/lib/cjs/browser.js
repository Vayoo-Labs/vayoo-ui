"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isBrowser = void 0;
/**
 * Returns true if being run inside a web browser, false if in a Node process or electron app.
 *
 * Taken from @coral-xyz/anchor implementation.
 */
exports.isBrowser = process.env.ANCHOR_BROWSER ||
    (typeof window !== 'undefined' && !window.process?.hasOwnProperty('type')); // eslint-disable-line no-prototype-builtins
//# sourceMappingURL=browser.js.map