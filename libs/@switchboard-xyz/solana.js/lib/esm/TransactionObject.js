import { isBrowser } from './browser';
import * as errors from './errors';
import { fromTxError } from './generated';
import { DEFAULT_SEND_TRANSACTION_OPTIONS, } from './SwitchboardProgram';
import { ComputeBudgetProgram, PACKET_DATA_SIZE, PublicKey, Transaction, TransactionMessage, VersionedTransaction, } from '@solana/web3.js';
import { sleep } from '@switchboard-xyz/common';
import _ from 'lodash';
/**
 Compare two instructions to see if a transaction already includes a given type of instruction. Does not compare if the ixn has the same data.
 */
export const ixnsEqual = (a, b) => {
    return (a.programId.equals(b.programId) &&
        a.keys.length === b.keys.length &&
        JSON.stringify(a) === JSON.stringify(b) &&
        a.data.length === b.data.length);
};
/**
 Compare two instructions to see if a transaction already includes a given type of instruction. Returns false if the ixn data is different.
 */
export const ixnsDeepEqual = (a, b) => {
    return ixnsEqual(a, b) && Buffer.compare(a.data, b.data) === 0;
};
export class TransactionObject {
    /** Return the number of instructions, including the durable nonce placeholder if enabled */
    get length() {
        return this.enableDurableNonce ? this.ixns.length + 1 : this.ixns.length;
    }
    constructor(payer, ixns, signers, options) {
        this.payer = payer;
        this.signers = signers;
        this.enableDurableNonce = options?.enableDurableNonce ?? false;
        this.computeUnitPrice = options?.computeUnitPrice ?? 0;
        this.computeUnitLimit = options?.computeUnitLimit ?? 0;
        const instructions = [...ixns];
        const computeLimitIxn = TransactionObject.getComputeUnitLimitIxn(options?.computeUnitLimit);
        if (computeLimitIxn !== undefined &&
            instructions.findIndex(ixn => ixnsEqual(ixn, computeLimitIxn)) === -1) {
            instructions.unshift(computeLimitIxn);
        }
        const priorityTxn = TransactionObject.getComputeUnitPriceIxn(options?.computeUnitPrice);
        if (priorityTxn !== undefined &&
            instructions.findIndex(ixn => ixnsEqual(ixn, priorityTxn)) === -1) {
            instructions.unshift(priorityTxn);
        }
        this.ixns = instructions;
        this.verify();
    }
    /** Build a new transaction with options */
    static new(payer, options) {
        const preIxns = options?.preIxns ?? [];
        const postIxns = options?.postIxns ?? [];
        return new TransactionObject(payer, [...preIxns, ...postIxns], [], options);
    }
    verify() {
        return TransactionObject.verify(this.payer, this.ixns, this.signers, this.enableDurableNonce);
    }
    static getComputeUnitLimitIxn(computeUnitLimit) {
        if (computeUnitLimit && computeUnitLimit > 0) {
            return ComputeBudgetProgram.setComputeUnitLimit({
                units: computeUnitLimit,
            });
        }
        return undefined;
    }
    static getComputeUnitPriceIxn(computeUnitPrice) {
        if (computeUnitPrice && computeUnitPrice > 0) {
            return ComputeBudgetProgram.setComputeUnitPrice({
                microLamports: computeUnitPrice,
            });
        }
        return undefined;
    }
    /**
     * Append instructions to the beginning of a TransactionObject
     */
    unshift(ixn, signers) {
        const newIxns = [...this.ixns];
        if (Array.isArray(ixn)) {
            newIxns.unshift(...ixn);
        }
        else {
            newIxns.unshift(ixn);
        }
        const newSigners = [...this.signers];
        if (signers) {
            signers.forEach(s => {
                if (newSigners.findIndex(signer => signer.publicKey.equals(s.publicKey)) === -1) {
                    newSigners.push(s);
                }
            });
        }
        TransactionObject.verify(this.payer, newIxns, newSigners, this.enableDurableNonce);
        this.ixns = newIxns;
        this.signers = newSigners;
        return this;
    }
    insert(ixn, index, signers) {
        const newIxns = [...this.ixns];
        newIxns.splice(index, 0, ixn);
        const newSigners = [...this.signers];
        if (signers) {
            signers.forEach(s => {
                if (newSigners.findIndex(signer => signer.publicKey.equals(s.publicKey)) === -1) {
                    newSigners.push(s);
                }
            });
        }
        TransactionObject.verify(this.payer, newIxns, newSigners, this.enableDurableNonce);
        this.ixns = newIxns;
        this.signers = newSigners;
        return this;
    }
    /**
     * Append instructions to the end of a TransactionObject
     */
    add(ixn, signers) {
        const newIxns = [...this.ixns];
        if (Array.isArray(ixn)) {
            newIxns.push(...ixn);
        }
        else {
            newIxns.push(ixn);
        }
        const newSigners = [...this.signers];
        if (signers) {
            signers.forEach(s => {
                if (newSigners.findIndex(signer => signer.publicKey.equals(s.publicKey)) === -1) {
                    newSigners.push(s);
                }
            });
        }
        TransactionObject.verify(this.payer, newIxns, newSigners, this.enableDurableNonce);
        this.ixns = newIxns;
        this.signers = newSigners;
        return this;
    }
    /**
     * Verify a transaction object has less than 10 instructions, less than 1232 bytes, and contains all required signers minus the payer
     * @throws if more than 10 instructions, serialized size is greater than 1232 bytes, or if object is missing a required signer minus the payer
     */
    static verify(payer, ixns, signers, enableDurableNonce) {
        // verify payer is not default pubkey
        if (payer.equals(PublicKey.default)) {
            throw new errors.SwitchboardProgramReadOnlyError();
        }
        // if empty object, return
        if (ixns.length === 0) {
            return;
        }
        const ixnLength = enableDurableNonce ? ixns.length + 1 : ixns.length;
        // verify num ixns
        if (ixnLength > 10) {
            throw new errors.TransactionInstructionOverflowError(ixnLength);
        }
        const uniqueAccounts = ixns.reduce((accounts, ixn) => {
            ixn.keys.forEach(a => accounts.add(a.pubkey.toBase58()));
            return accounts;
        }, new Set());
        if (uniqueAccounts.size > 32) {
            throw new errors.TransactionAccountOverflowError(uniqueAccounts.size);
        }
        const padding = enableDurableNonce ? 96 : 0;
        // verify serialized size
        const size = TransactionObject.size(payer, ixns);
        if (size > PACKET_DATA_SIZE - padding) {
            throw new errors.TransactionSerializationOverflowError(size);
        }
        // verify signers
        TransactionObject.verifySigners(payer, ixns, signers);
    }
    /**
     * Return the serialized size of an array of TransactionInstructions
     */
    static size(payer, ixns) {
        const encodeLength = (len) => {
            const bytes = new Array();
            let remLen = len;
            for (;;) {
                let elem = remLen & 0x7f;
                remLen >>= 7;
                if (remLen === 0) {
                    bytes.push(elem);
                    break;
                }
                else {
                    elem |= 0x80;
                    bytes.push(elem);
                }
            }
            return bytes;
        };
        const reqSigners = ixns.reduce((signers, ixn) => {
            ixn.keys.map(a => {
                if (a.isSigner) {
                    signers.add(a.pubkey.toBase58());
                }
            });
            return signers;
        }, new Set());
        // need to include the payer as a signer
        if (!reqSigners.has(payer.toBase58())) {
            reqSigners.add(payer.toBase58());
        }
        const txn = new Transaction({
            feePayer: PublicKey.default,
            blockhash: '1'.repeat(32),
            lastValidBlockHeight: 200000000,
        }).add(...ixns);
        const txnSize = txn.serializeMessage().length +
            reqSigners.size * 64 +
            encodeLength(reqSigners.size).length;
        return txnSize;
    }
    get size() {
        return TransactionObject.size(this.payer, this.ixns);
    }
    /**
     * Try to combine two {@linkcode TransactionObject}'s
     * @throws if verification fails. See TransactionObject.verify
     */
    combine(otherObject) {
        if (!this.payer.equals(otherObject.payer)) {
            throw new Error(`Cannot combine transactions with different payers`);
        }
        return this.add(otherObject.ixns, otherObject.signers);
    }
    static verifySigners(payer, ixns, signers) {
        // get all required signers
        const reqSigners = ixns.reduce((signers, ixn) => {
            ixn.keys.map(a => {
                if (a.isSigner) {
                    signers.add(a.pubkey.toBase58());
                }
            });
            return signers;
        }, new Set());
        if (reqSigners.has(payer.toBase58())) {
            reqSigners.delete(payer.toBase58());
        }
        signers.forEach(s => {
            if (reqSigners.has(s.publicKey.toBase58())) {
                reqSigners.delete(s.publicKey.toBase58());
            }
        });
        if (reqSigners.size > 0) {
            throw new errors.TransactionMissingSignerError(Array.from(reqSigners));
        }
    }
    /**
     * Convert the TransactionObject into a Solana Transaction
     */
    toTxn(options) {
        if ('nonceInfo' in options) {
            const txn = new Transaction({
                feePayer: this.payer,
                nonceInfo: options.nonceInfo,
                minContextSlot: options.minContextSlot,
            }).add(...this.ixns);
            return txn;
        }
        const txn = new Transaction({
            feePayer: this.payer,
            blockhash: options.blockhash,
            lastValidBlockHeight: options.lastValidBlockHeight,
        }).add(...this.ixns);
        return txn;
    }
    toVersionedTxn(options) {
        if ('nonceInfo' in options) {
            const messageV0 = new TransactionMessage({
                payerKey: this.payer,
                recentBlockhash: options.nonceInfo.nonce,
                instructions: this.ixns,
            }).compileToLegacyMessage();
            const transaction = new VersionedTransaction(messageV0);
            return transaction;
        }
        const messageV0 = new TransactionMessage({
            payerKey: this.payer,
            recentBlockhash: options.blockhash,
            instructions: this.ixns,
        }).compileToLegacyMessage();
        const transaction = new VersionedTransaction(messageV0);
        return transaction;
    }
    /**
     * Return a Transaction signed by the provided signers
     */
    sign(options, signers) {
        const txn = this.toTxn(options);
        const allSigners = [...this.signers];
        if (signers) {
            allSigners.unshift(...signers);
        }
        if (allSigners.length) {
            txn.sign(...allSigners);
        }
        return txn;
    }
    /**
     * Pack an array of TransactionObject's into as few transactions as possible.
     */
    static pack(_txns, options) {
        const txns = [..._txns.filter(Boolean)];
        if (txns.length === 0) {
            throw new Error(`No transactions to pack`);
        }
        const payers = Array.from(txns
            .reduce((payers, txn) => {
            payers.add(txn.payer.toBase58());
            return payers;
        }, new Set())
            .values());
        if (payers.length > 1) {
            throw new Error(`Packed transactions should have the same payer`);
        }
        const payer = new PublicKey(payers.shift());
        const signers = _.flatten(txns.map(t => t.signers));
        const ixns = _.flatten(txns.map(t => t.ixns));
        return TransactionObject.packIxns(payer, ixns, signers, options);
    }
    /**
     * Pack an array of TransactionInstructions into as few transactions as possible. Assumes only a single signer
     */
    static packIxns(payer, _ixns, signers, options) {
        const ixns = [..._ixns];
        const txns = [];
        let txn = TransactionObject.new(payer, options);
        while (ixns.length) {
            const ixn = ixns.shift();
            const reqSigners = filterSigners(payer, [ixn], signers ?? []);
            try {
                txn.insert(ixn, txn.ixns.length - (options?.postIxns?.length ?? 0), reqSigners);
            }
            catch {
                txns.push(txn);
                txn = TransactionObject.new(payer, options);
                txn.insert(ixn, txn.ixns.length - (options?.postIxns?.length ?? 0), reqSigners);
            }
        }
        txns.push(txn);
        return txns;
    }
    static async signAndSendAll(provider, txns, opts = DEFAULT_SEND_TRANSACTION_OPTIONS, txnOptions, delay = 0) {
        if (isBrowser)
            throw new errors.SwitchboardProgramIsBrowserError();
        const txnSignatures = [];
        for await (const [i, txn] of txns.entries()) {
            txnSignatures.push(await txn.signAndSend(provider, opts, txnOptions));
            if (i !== txns.length - 1 &&
                delay &&
                typeof delay === 'number' &&
                delay > 0) {
                await sleep(delay);
            }
        }
        return txnSignatures;
    }
    async signAndSend(provider, opts = DEFAULT_SEND_TRANSACTION_OPTIONS, txnOptions) {
        if (isBrowser)
            throw new errors.SwitchboardProgramIsBrowserError();
        if (this.payer.equals(PublicKey.default))
            throw new errors.SwitchboardProgramReadOnlyError();
        if (!this.payer.equals(provider.publicKey)) {
            throw new Error(`Payer keypair mismatch`);
        }
        const signers = filterSigners(this.payer, this.ixns, this.signers);
        signers.unshift(provider.wallet.payer);
        try {
            // skip confirmation
            if (opts &&
                typeof opts.skipConfrimation === 'boolean' &&
                opts.skipConfrimation) {
                const transaction = this.toTxn(txnOptions ?? (await provider.connection.getLatestBlockhash()));
                const txnSignature = await provider.connection.sendTransaction(transaction, signers, opts);
                return txnSignature;
            }
            const transaction = this.toTxn(txnOptions ?? (await provider.connection.getLatestBlockhash()));
            return await provider.sendAndConfirm(transaction, signers, {
                ...DEFAULT_SEND_TRANSACTION_OPTIONS,
                ...opts,
            });
        }
        catch (error) {
            const err = fromTxError(error);
            if (err === null) {
                throw error;
            }
            throw err;
        }
    }
}
function filterSigners(payer, ixns, signers) {
    const allSigners = [...signers];
    const reqSigners = ixns.reduce((signers, ixn) => {
        ixn.keys.map(a => {
            if (a.isSigner) {
                signers.add(a.pubkey.toBase58());
            }
        });
        return signers;
    }, new Set());
    const filteredSigners = allSigners.filter(s => !s.publicKey.equals(payer) && reqSigners.has(s.publicKey.toBase58()));
    return filteredSigners;
}
//# sourceMappingURL=TransactionObject.js.map