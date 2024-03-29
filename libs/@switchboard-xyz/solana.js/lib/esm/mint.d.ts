import { TransactionObject } from './TransactionObject';
import * as anchor from '@coral-xyz/anchor';
import * as spl from '@solana/spl-token-v2';
import { Keypair, PublicKey, TransactionSignature } from '@solana/web3.js';
import { BN } from '@switchboard-xyz/common';
export declare class Mint {
    readonly provider: anchor.AnchorProvider;
    readonly mint: spl.Mint;
    static native: anchor.web3.PublicKey;
    constructor(provider: anchor.AnchorProvider, mint: spl.Mint);
    get address(): anchor.web3.PublicKey;
    get connection(): anchor.web3.Connection;
    static load(provider: anchor.AnchorProvider, mint?: anchor.web3.PublicKey): Promise<Mint>;
    toTokenAmount(amount: number): bigint;
    toTokenAmountBN(amount: number): BN;
    fromTokenAmount(amount: bigint): number;
    fromTokenAmountBN(amount: BN): number;
    getAssociatedAccount(owner: PublicKey): Promise<spl.Account | null>;
    getAssociatedBalance(owner: PublicKey): Promise<number | null>;
    getAccount(tokenAddress: PublicKey): Promise<spl.Account | null>;
    fetchBalance(tokenAddress: PublicKey): Promise<number | null>;
    fetchBalanceBN(tokenAddress: PublicKey): Promise<BN | null>;
    getAssociatedAddress(user: PublicKey): PublicKey;
    static getAssociatedAddress(owner: PublicKey, mint: PublicKey): PublicKey;
    getOrCreateAssociatedUser(payer: PublicKey, user?: PublicKey): Promise<PublicKey>;
    createAssocatedUser(payer: PublicKey, user?: PublicKey): Promise<[PublicKey, string]>;
    static createAssocatedUserInstruction(payer: PublicKey, mint: PublicKey, user?: PublicKey): [TransactionObject, PublicKey];
    createAssocatedUserInstruction(payer: PublicKey, user?: PublicKey): [TransactionObject, PublicKey];
    static createUserInstruction(payer: PublicKey, mint: PublicKey, user?: Keypair): [PublicKey, TransactionObject];
    createUserInstruction(payer: PublicKey, user?: Keypair): [PublicKey, TransactionObject];
    createUser(payer: PublicKey, user?: Keypair): Promise<[PublicKey, string]>;
    signAndSend(txn: TransactionObject, opts?: anchor.web3.ConfirmOptions): Promise<TransactionSignature>;
}
export declare class NativeMint extends Mint {
    static address: anchor.web3.PublicKey;
    static load(provider: anchor.AnchorProvider): Promise<NativeMint>;
    getOrCreateWrappedUser(payer: PublicKey, params: {
        amount: number;
    } | {
        fundUpTo: number;
    }, user?: Keypair): Promise<[PublicKey, TransactionSignature | undefined]>;
    getOrCreateWrappedUserInstructions(payer: PublicKey, params: {
        amount: number;
    } | {
        fundUpTo: number;
    }, user?: Keypair): Promise<[PublicKey, TransactionObject | undefined]>;
    createWrappedUserInstructions(payer: PublicKey, amount: number, user?: Keypair): Promise<[PublicKey, TransactionObject]>;
    createWrappedUser(payer: PublicKey, amount: number, user?: Keypair): Promise<[PublicKey, TransactionSignature]>;
    wrapInstructions(payer: PublicKey, params: {
        amount: number;
    } | {
        fundUpTo: number;
    }, user?: Keypair): Promise<TransactionObject>;
    wrap(payer: PublicKey, params: {
        amount: number;
    } | {
        fundUpTo: number;
    }, user?: Keypair): Promise<string>;
    unwrapInstructions(payer: PublicKey, amount?: number, user?: Keypair): Promise<TransactionObject>;
    unwrap(payer: PublicKey, amount?: number, user?: Keypair): Promise<TransactionSignature>;
}
//# sourceMappingURL=mint.d.ts.map