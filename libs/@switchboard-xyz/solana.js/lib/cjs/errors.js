"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IncorrectOwner = exports.AggregatorConfigError = exports.IncorrectAuthority = exports.TransactionMissingSignerError = exports.TransactionSerializationOverflowError = exports.TransactionAccountOverflowError = exports.TransactionInstructionOverflowError = exports.TransactionOverflowError = exports.InsufficientFundsError = exports.NativeMintOnlyError = exports.InstructionsPackingError = exports.AccountNotFoundError = exports.ExistingKeypair = exports.SwitchboardProgramReadOnlyError = exports.SwitchboardProgramIsBrowserError = void 0;
class SwitchboardProgramIsBrowserError extends Error {
    constructor() {
        super("SwitchboardProgram can't sign and submit from browsers.");
        Object.setPrototypeOf(this, SwitchboardProgramIsBrowserError.prototype);
    }
}
exports.SwitchboardProgramIsBrowserError = SwitchboardProgramIsBrowserError;
class SwitchboardProgramReadOnlyError extends Error {
    constructor() {
        super('SwitchboardProgram is in Read-Only mode, no keypair was provided.');
        Object.setPrototypeOf(this, SwitchboardProgramReadOnlyError.prototype);
    }
}
exports.SwitchboardProgramReadOnlyError = SwitchboardProgramReadOnlyError;
class ExistingKeypair extends Error {
    constructor() {
        super('Provided keypair corresponds to an existing account.');
        Object.setPrototypeOf(this, ExistingKeypair.prototype);
    }
}
exports.ExistingKeypair = ExistingKeypair;
class AccountNotFoundError extends Error {
    constructor(label, publicKey) {
        super(`Failed to find ${label} at address ${publicKey.toBase58()}`);
        Object.setPrototypeOf(this, AccountNotFoundError.prototype);
    }
}
exports.AccountNotFoundError = AccountNotFoundError;
class InstructionsPackingError extends Error {
    constructor() {
        super('Each instruction group must fit into a single transaction');
        Object.setPrototypeOf(this, InstructionsPackingError.prototype);
    }
}
exports.InstructionsPackingError = InstructionsPackingError;
class NativeMintOnlyError extends Error {
    constructor() {
        super('Wrap/Unwrap can only be called on a native mint');
        Object.setPrototypeOf(this, NativeMintOnlyError.prototype);
    }
}
exports.NativeMintOnlyError = NativeMintOnlyError;
class InsufficientFundsError extends Error {
    constructor(required, current) {
        super(`Insufficient funds to perform this action, required ${required}, current balance ${current}`);
        Object.setPrototypeOf(this, InsufficientFundsError.prototype);
    }
}
exports.InsufficientFundsError = InsufficientFundsError;
class TransactionOverflowError extends Error {
    constructor(msg) {
        super(`TransactionOverflowError: ${msg}`);
        Object.setPrototypeOf(this, TransactionOverflowError.prototype);
    }
}
exports.TransactionOverflowError = TransactionOverflowError;
class TransactionInstructionOverflowError extends TransactionOverflowError {
    constructor(numIxns) {
        super(`number of instructions exceeded (${numIxns})`);
        Object.setPrototypeOf(this, TransactionInstructionOverflowError.prototype);
    }
}
exports.TransactionInstructionOverflowError = TransactionInstructionOverflowError;
class TransactionAccountOverflowError extends TransactionOverflowError {
    constructor(numAccounts) {
        super(`number of accounts exceeded (${numAccounts})`);
        Object.setPrototypeOf(this, TransactionAccountOverflowError.prototype);
    }
}
exports.TransactionAccountOverflowError = TransactionAccountOverflowError;
class TransactionSerializationOverflowError extends TransactionOverflowError {
    constructor(numBytes) {
        super(`serialized transaction size exceeded (${numBytes})`);
        Object.setPrototypeOf(this, TransactionSerializationOverflowError.prototype);
    }
}
exports.TransactionSerializationOverflowError = TransactionSerializationOverflowError;
class TransactionMissingSignerError extends Error {
    constructor(signers) {
        super(`missing signers [${signers.join(', ')}]`);
        Object.setPrototypeOf(this, TransactionMissingSignerError.prototype);
    }
}
exports.TransactionMissingSignerError = TransactionMissingSignerError;
class IncorrectAuthority extends Error {
    constructor(expectedAuthority, receivedAuthority) {
        super(`incorrect authority, expected ${expectedAuthority}, received ${receivedAuthority}`);
        Object.setPrototypeOf(this, IncorrectAuthority.prototype);
    }
}
exports.IncorrectAuthority = IncorrectAuthority;
class AggregatorConfigError extends Error {
    constructor(property, message) {
        super(`failed to validate property '${property}' - ${message}`);
        Object.setPrototypeOf(this, AggregatorConfigError.prototype);
    }
}
exports.AggregatorConfigError = AggregatorConfigError;
class IncorrectOwner extends Error {
    constructor(expectedOwner, receivedOwner) {
        super(`incorrect account owner, expected ${expectedOwner}, received ${receivedOwner}`);
        Object.setPrototypeOf(this, IncorrectOwner.prototype);
    }
}
exports.IncorrectOwner = IncorrectOwner;
//# sourceMappingURL=errors.js.map