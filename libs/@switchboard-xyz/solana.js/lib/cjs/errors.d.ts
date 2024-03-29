import * as anchor from '@coral-xyz/anchor';
import { PublicKey } from '@solana/web3.js';
export declare class SwitchboardProgramIsBrowserError extends Error {
    constructor();
}
export declare class SwitchboardProgramReadOnlyError extends Error {
    constructor();
}
export declare class ExistingKeypair extends Error {
    constructor();
}
export declare class AccountNotFoundError extends Error {
    constructor(label: string, publicKey: anchor.web3.PublicKey);
}
export declare class InstructionsPackingError extends Error {
    constructor();
}
export declare class NativeMintOnlyError extends Error {
    constructor();
}
export declare class InsufficientFundsError extends Error {
    constructor(required: number, current: number);
}
export declare class TransactionOverflowError extends Error {
    constructor(msg: string);
}
export declare class TransactionInstructionOverflowError extends TransactionOverflowError {
    constructor(numIxns: number);
}
export declare class TransactionAccountOverflowError extends TransactionOverflowError {
    constructor(numAccounts: number);
}
export declare class TransactionSerializationOverflowError extends TransactionOverflowError {
    constructor(numBytes: number);
}
export declare class TransactionMissingSignerError extends Error {
    constructor(signers: string[]);
}
export declare class IncorrectAuthority extends Error {
    constructor(expectedAuthority: PublicKey, receivedAuthority: PublicKey);
}
export declare class AggregatorConfigError extends Error {
    constructor(property: string, message: string);
}
export declare class IncorrectOwner extends Error {
    constructor(expectedOwner: PublicKey, receivedOwner: PublicKey);
}
//# sourceMappingURL=errors.d.ts.map