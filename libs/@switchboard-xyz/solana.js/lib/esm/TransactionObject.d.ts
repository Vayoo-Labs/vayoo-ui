import { SendTransactionOptions } from './SwitchboardProgram';
import { AnchorProvider } from '@coral-xyz/anchor';
import { Keypair, NonceInformation, PublicKey, Transaction, TransactionInstruction, TransactionSignature, VersionedTransaction } from '@solana/web3.js';
export interface ITransactionObject extends Required<TransactionObjectOptions> {
    /** The public key of the account that will pay the transaction fees */
    payer: PublicKey;
    /** An array of TransactionInstructions that will be added to the transaction */
    ixns: Array<TransactionInstruction>;
    /** An array of signers used to sign the transaction before sending. This may not include the payer keypair for web wallet support */
    signers: Array<Keypair>;
}
export interface TransactionObjectOptions {
    enableDurableNonce?: boolean;
    computeUnitPrice?: number;
    computeUnitLimit?: number;
}
export type TransactionPackOptions = TransactionObjectOptions & {
    preIxns?: Array<TransactionInstruction>;
    postIxns?: Array<TransactionInstruction>;
};
/**
 Compare two instructions to see if a transaction already includes a given type of instruction. Does not compare if the ixn has the same data.
 */
export declare const ixnsEqual: (a: TransactionInstruction, b: TransactionInstruction) => boolean;
/**
 Compare two instructions to see if a transaction already includes a given type of instruction. Returns false if the ixn data is different.
 */
export declare const ixnsDeepEqual: (a: TransactionInstruction, b: TransactionInstruction) => boolean;
export type TransactionOptions = {
    blockhash: string;
    lastValidBlockHeight: number;
} | {
    nonceInfo: NonceInformation;
    minContextSlot: number;
};
export declare class TransactionObject implements ITransactionObject {
    enableDurableNonce: boolean;
    computeUnitPrice: number;
    computeUnitLimit: number;
    payer: PublicKey;
    ixns: Array<TransactionInstruction>;
    signers: Array<Keypair>;
    /** Return the number of instructions, including the durable nonce placeholder if enabled */
    get length(): number;
    constructor(payer: PublicKey, ixns: Array<TransactionInstruction>, signers: Array<Keypair>, options?: TransactionObjectOptions);
    /** Build a new transaction with options */
    private static new;
    verify(): void;
    static getComputeUnitLimitIxn(computeUnitLimit?: number): TransactionInstruction | undefined;
    static getComputeUnitPriceIxn(computeUnitPrice?: number): TransactionInstruction | undefined;
    /**
     * Append instructions to the beginning of a TransactionObject
     */
    unshift(ixn: TransactionInstruction | Array<TransactionInstruction>, signers?: Array<Keypair>): TransactionObject;
    insert(ixn: TransactionInstruction, index: number, signers?: Array<Keypair>): this;
    /**
     * Append instructions to the end of a TransactionObject
     */
    add(ixn: TransactionInstruction | Array<TransactionInstruction>, signers?: Array<Keypair>): TransactionObject;
    /**
     * Verify a transaction object has less than 10 instructions, less than 1232 bytes, and contains all required signers minus the payer
     * @throws if more than 10 instructions, serialized size is greater than 1232 bytes, or if object is missing a required signer minus the payer
     */
    static verify(payer: PublicKey, ixns: Array<TransactionInstruction>, signers: Array<Keypair>, enableDurableNonce: boolean): void;
    /**
     * Return the serialized size of an array of TransactionInstructions
     */
    static size(payer: PublicKey, ixns: Array<TransactionInstruction>): number;
    get size(): number;
    /**
     * Try to combine two {@linkcode TransactionObject}'s
     * @throws if verification fails. See TransactionObject.verify
     */
    combine(otherObject: TransactionObject): TransactionObject;
    private static verifySigners;
    /**
     * Convert the TransactionObject into a Solana Transaction
     */
    toTxn(options: TransactionOptions): Transaction;
    toVersionedTxn(options: TransactionOptions): VersionedTransaction;
    /**
     * Return a Transaction signed by the provided signers
     */
    sign(options: TransactionOptions, signers?: Array<Keypair>): Transaction;
    /**
     * Pack an array of TransactionObject's into as few transactions as possible.
     */
    static pack(_txns: Array<TransactionObject>, options?: TransactionPackOptions): Array<TransactionObject>;
    /**
     * Pack an array of TransactionInstructions into as few transactions as possible. Assumes only a single signer
     */
    static packIxns(payer: PublicKey, _ixns: Array<TransactionInstruction>, signers?: Array<Keypair>, options?: TransactionPackOptions): Array<TransactionObject>;
    static signAndSendAll(provider: AnchorProvider, txns: Array<TransactionObject>, opts?: SendTransactionOptions, txnOptions?: TransactionOptions, delay?: number): Promise<Array<TransactionSignature>>;
    signAndSend(provider: AnchorProvider, opts?: SendTransactionOptions, txnOptions?: TransactionOptions): Promise<TransactionSignature>;
}
//# sourceMappingURL=TransactionObject.d.ts.map