"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VRF_POOL_REQUEST_AMOUNT = exports.MAINNET_GENESIS_HASH = exports.DEVNET_GENESIS_HASH = exports.SWITCHBOARD_LABS_DEVNET_PERMISSIONLESS_CRANK = exports.SWITCHBOARD_LABS_DEVNET_PERMISSIONLESS_QUEUE = exports.SWITCHBOARD_LABS_DEVNET_PERMISSIONED_CRANK = exports.SWITCHBOARD_LABS_DEVNET_PERMISSIONED_QUEUE = exports.SWITCHBOARD_LABS_MAINNET_PERMISSIONLESS_CRANK = exports.SWITCHBOARD_LABS_MAINNET_PERMISSIONLESS_QUEUE = exports.SWITCHBOARD_LABS_MAINNET_PERMISSIONED_CRANK = exports.SWITCHBOARD_LABS_MAINNET_PERMISSIONED_QUEUE = void 0;
const web3_js_1 = require("@solana/web3.js");
// mainnet-beta permissioned queue
exports.SWITCHBOARD_LABS_MAINNET_PERMISSIONED_QUEUE = new web3_js_1.PublicKey('3HBb2DQqDfuMdzWxNk1Eo9RTMkFYmuEAd32RiLKn9pAn');
// mainnet-beta permissioned crank
exports.SWITCHBOARD_LABS_MAINNET_PERMISSIONED_CRANK = new web3_js_1.PublicKey('GdNVLWzcE6h9SPuSbmu69YzxAj8enim9t6mjzuqTXgLd');
// mainnet-beta permissionless queue
exports.SWITCHBOARD_LABS_MAINNET_PERMISSIONLESS_QUEUE = new web3_js_1.PublicKey('5JYwqvKkqp35w8Nq3ba4z1WYUeJQ1rB36V8XvaGp6zn1');
// mainnet-beta permissionless crank
exports.SWITCHBOARD_LABS_MAINNET_PERMISSIONLESS_CRANK = new web3_js_1.PublicKey('BKtF8yyQsj3Ft6jb2nkfpEKzARZVdGgdEPs6mFmZNmbA');
// devnet permissioned queue
exports.SWITCHBOARD_LABS_DEVNET_PERMISSIONED_QUEUE = new web3_js_1.PublicKey('PeRMnAqNqHQYHUuCBEjhm1XPeVTh4BxjY4t4TPan1pG');
// devnet permissioned crank
exports.SWITCHBOARD_LABS_DEVNET_PERMISSIONED_CRANK = new web3_js_1.PublicKey('crnKsPsuP6f7uiDbAYYw66h2RNBrqoazmtZHwazkC6V');
// devnet permissionless queue
exports.SWITCHBOARD_LABS_DEVNET_PERMISSIONLESS_QUEUE = new web3_js_1.PublicKey('uPeRMdfPmrPqgRWSrjAnAkH78RqAhe5kXoW6vBYRqFX');
// devnet permissionless crank
exports.SWITCHBOARD_LABS_DEVNET_PERMISSIONLESS_CRANK = new web3_js_1.PublicKey('UcrnK4w2HXCEjY8z6TcQ9tysYr3c9VcFLdYAU9YQP5e');
exports.DEVNET_GENESIS_HASH = 'EtWTRABZaYq6iMfeYKouRu166VU2xqa1wcaWoxPkrZBG';
exports.MAINNET_GENESIS_HASH = '5eykt4UsFv8P8NJdTREpY1vzqKqZKvdpKuc147dw2N9d';
exports.VRF_POOL_REQUEST_AMOUNT = 0.002;
//# sourceMappingURL=const.js.map