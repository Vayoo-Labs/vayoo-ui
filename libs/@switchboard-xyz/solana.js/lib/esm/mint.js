import { InsufficientFundsError, NativeMintOnlyError } from './errors';
import { SwitchboardDecimal } from './generated';
import { TransactionObject } from './TransactionObject';
import * as spl from '@solana/spl-token-v2';
import { Keypair, PublicKey, SystemProgram, } from '@solana/web3.js';
import { Big, BN } from '@switchboard-xyz/common';
export class Mint {
    constructor(provider, mint) {
        this.provider = provider;
        this.mint = mint;
    }
    get address() {
        return this.mint.address;
    }
    get connection() {
        return this.provider.connection;
    }
    static async load(provider, mint = Mint.native) {
        const splMint = await spl.getMint(provider.connection, mint);
        return new Mint(provider, splMint);
    }
    toTokenAmount(amount) {
        const big = new Big(amount);
        const tokenAmount = big.mul(new Big(10).pow(this.mint.decimals));
        // We need to fix tokenAmount to 0 decimal places because the amount in base units must be an integer.
        return BigInt(tokenAmount.toFixed(0));
    }
    toTokenAmountBN(amount) {
        const big = new Big(amount);
        const tokenAmount = big.mul(new Big(10).pow(this.mint.decimals));
        return new BN(tokenAmount.toFixed(0));
    }
    fromTokenAmount(amount) {
        const swbDecimal = new SwitchboardDecimal({
            mantissa: new BN(amount.toString()),
            scale: this.mint.decimals,
        });
        return swbDecimal.toBig().toNumber();
    }
    fromTokenAmountBN(amount) {
        const swbDecimal = new SwitchboardDecimal({
            mantissa: amount,
            scale: this.mint.decimals,
        });
        return swbDecimal.toBig().toNumber();
    }
    async getAssociatedAccount(owner) {
        const ownerTokenAddress = this.getAssociatedAddress(owner);
        const ownerTokenAccountInfo = await this.provider.connection.getAccountInfo(ownerTokenAddress);
        if (ownerTokenAccountInfo === null)
            return null;
        const account = spl.unpackAccount(ownerTokenAddress, ownerTokenAccountInfo);
        return account;
    }
    async getAssociatedBalance(owner) {
        const ownerAccount = await this.getAssociatedAccount(owner);
        if (ownerAccount === null)
            return null;
        return this.fromTokenAmount(ownerAccount.amount);
    }
    async getAccount(tokenAddress) {
        const tokenAccountInfo = await this.provider.connection.getAccountInfo(tokenAddress);
        if (!tokenAccountInfo)
            return null;
        const account = spl.unpackAccount(tokenAddress, tokenAccountInfo);
        return account;
    }
    async fetchBalance(tokenAddress) {
        const tokenAccount = await this.getAccount(tokenAddress);
        if (tokenAccount === null)
            return null;
        return this.fromTokenAmount(tokenAccount.amount);
    }
    async fetchBalanceBN(tokenAddress) {
        const tokenAccount = await this.getAccount(tokenAddress);
        if (tokenAccount === null)
            return null;
        return new BN(tokenAccount.amount.toString(10));
    }
    getAssociatedAddress(user) {
        return Mint.getAssociatedAddress(user, this.mint.address);
    }
    static getAssociatedAddress(owner, mint) {
        const [associatedToken] = PublicKey.findProgramAddressSync([owner.toBuffer(), spl.TOKEN_PROGRAM_ID.toBuffer(), mint.toBuffer()], spl.ASSOCIATED_TOKEN_PROGRAM_ID);
        return associatedToken;
    }
    async getOrCreateAssociatedUser(payer, user) {
        const owner = user ?? payer;
        const associatedToken = this.getAssociatedAddress(owner);
        const accountInfo = await this.connection.getAccountInfo(associatedToken);
        if (accountInfo === null) {
            await this.createAssocatedUser(payer, user);
            return associatedToken;
        }
        else {
            return associatedToken;
        }
    }
    async createAssocatedUser(payer, user) {
        const [txn, associatedToken] = this.createAssocatedUserInstruction(payer, user);
        const sig = await this.signAndSend(txn);
        return [associatedToken, sig];
    }
    static createAssocatedUserInstruction(payer, mint, user) {
        const owner = user ?? payer;
        const associatedToken = Mint.getAssociatedAddress(owner, mint);
        const ixn = spl.createAssociatedTokenAccountInstruction(payer, associatedToken, owner, Mint.native);
        return [new TransactionObject(payer, [ixn], []), associatedToken];
    }
    createAssocatedUserInstruction(payer, user) {
        return Mint.createAssocatedUserInstruction(payer, this.mint.address, user);
    }
    static createUserInstruction(payer, mint, user) {
        const owner = user ? user.publicKey : payer;
        const account = Mint.getAssociatedAddress(owner, mint);
        const ixn = spl.createInitializeAccountInstruction(account, Mint.native, owner);
        return [account, new TransactionObject(payer, [ixn], [])];
    }
    createUserInstruction(payer, user) {
        return Mint.createUserInstruction(payer, this.mint.address, user);
    }
    async createUser(payer, user) {
        const [account, txn] = this.createUserInstruction(payer, user);
        const sig = await this.signAndSend(txn);
        return [account, sig];
    }
    async signAndSend(txn, opts = {
        skipPreflight: false,
        maxRetries: 10,
    }) {
        const blockhash = await this.connection.getLatestBlockhash();
        const txnSignature = await this.provider.sendAndConfirm(await this.provider.wallet.signTransaction(txn.toTxn(blockhash)), txn.signers, opts);
        return txnSignature;
    }
}
Mint.native = new PublicKey('So11111111111111111111111111111111111111112');
export class NativeMint extends Mint {
    static async load(provider) {
        const splMint = await spl.getMint(provider.connection, Mint.native);
        return new NativeMint(provider, splMint);
    }
    async getOrCreateWrappedUser(payer, params, user) {
        const [userAddress, userInit] = await this.getOrCreateWrappedUserInstructions(payer, params, user);
        if (userInit && userInit.ixns.length > 0) {
            const signature = await this.signAndSend(userInit);
            return [userAddress, signature];
        }
        return [userAddress, undefined];
    }
    async getOrCreateWrappedUserInstructions(payer, params, user) {
        const owner = user ? user.publicKey : payer;
        const associatedToken = Mint.getAssociatedAddress(owner, NativeMint.address);
        const accountInfo = await this.connection.getAccountInfo(associatedToken);
        if (accountInfo === null) {
            const amount = 'fundUpTo' in params
                ? params.fundUpTo
                : 'amount' in params
                    ? params.amount
                    : 0;
            const userInit = (await this.createWrappedUserInstructions(payer, amount, user))[1];
            return [associatedToken, userInit];
        }
        else {
            if ('fundUpTo' in params) {
                if (params.fundUpTo < 0) {
                    throw new Error(`fundUpTo must be a positive number`);
                }
                if (params.fundUpTo === 0) {
                    return [associatedToken, undefined];
                }
                const tokenBalance = (await this.getAssociatedBalance(owner)) ?? 0;
                if (tokenBalance > (params.fundUpTo ?? 0)) {
                    return [associatedToken, new TransactionObject(payer, [], [])];
                }
                const userWrap = await this.wrapInstructions(payer, { fundUpTo: params.fundUpTo ?? 0 }, user);
                return [associatedToken, userWrap];
            }
            if ('amount' in params) {
                if (params.amount < 0) {
                    throw new Error(`amount must be a positive number`);
                }
                if (params.amount === 0) {
                    return [associatedToken, undefined];
                }
                const userWrap = await this.wrapInstructions(payer, { amount: params.amount ?? 0 }, user);
                return [associatedToken, userWrap];
            }
        }
        throw new Error(`Failed to getOrCreate the users wrapped SOL account`);
    }
    async createWrappedUserInstructions(payer, amount, user) {
        const owner = user ? user.publicKey : payer;
        const associatedAddress = this.getAssociatedAddress(owner);
        const associatedAccountInfo = this.connection.getAccountInfo(associatedAddress);
        if (!associatedAccountInfo) {
            throw new Error(`Associated token address already exists for this user ${owner}`);
        }
        const ephemeralAccount = Keypair.generate();
        const ephemeralWallet = this.getAssociatedAddress(ephemeralAccount.publicKey);
        const wrapAmountLamports = this.toTokenAmount(amount);
        return [
            associatedAddress,
            new TransactionObject(payer, [
                spl.createAssociatedTokenAccountInstruction(payer, associatedAddress, owner, Mint.native),
                // only wrap funds if needed
                ...(amount > 0
                    ? [
                        spl.createAssociatedTokenAccountInstruction(payer, ephemeralWallet, ephemeralAccount.publicKey, spl.NATIVE_MINT),
                        SystemProgram.transfer({
                            fromPubkey: owner,
                            toPubkey: ephemeralWallet,
                            lamports: wrapAmountLamports,
                        }),
                        spl.createSyncNativeInstruction(ephemeralWallet),
                        spl.createTransferInstruction(ephemeralWallet, associatedAddress, ephemeralAccount.publicKey, wrapAmountLamports),
                        spl.createCloseAccountInstruction(ephemeralWallet, owner, ephemeralAccount.publicKey),
                    ]
                    : []),
            ], user ? [user, ephemeralAccount] : [ephemeralAccount]),
        ];
    }
    async createWrappedUser(payer, amount, user) {
        const [tokenAccount, createWrappedUserTxn] = await this.createWrappedUserInstructions(payer, amount, user);
        const txSignature = await this.signAndSend(createWrappedUserTxn);
        return [tokenAccount, txSignature];
    }
    async wrapInstructions(payer, params, user) {
        const ixns = [];
        const owner = user ? user.publicKey : payer;
        const userBalance = new Big(await this.connection.getBalance(owner));
        const userTokenAddress = this.getAssociatedAddress(owner);
        const userAccount = await this.getAccount(userTokenAddress);
        const userTokenBalance = userAccount === null
            ? new Big(0)
            : new Big(this.fromTokenAmount(userAccount.amount));
        let wrapAmount;
        if ('fundUpTo' in params) {
            if (userTokenBalance.gte(params.fundUpTo)) {
                return new TransactionObject(payer, [], []);
            }
            wrapAmount = new Big(params.fundUpTo).sub(userTokenBalance);
        }
        else if ('amount' in params) {
            wrapAmount = new Big(params.amount);
        }
        else {
            throw new Error(`Must specify fundUpTo or amount to perform this actions`);
        }
        if (userBalance.lte(wrapAmount)) {
            throw new InsufficientFundsError(wrapAmount.toNumber(), userBalance.toNumber());
        }
        const ephemeralAccount = Keypair.generate();
        const ephemeralWallet = this.getAssociatedAddress(ephemeralAccount.publicKey);
        const wrapAmountLamports = this.toTokenAmount(wrapAmount.toNumber());
        ixns.push(spl.createAssociatedTokenAccountInstruction(payer, ephemeralWallet, ephemeralAccount.publicKey, spl.NATIVE_MINT), SystemProgram.transfer({
            fromPubkey: owner,
            toPubkey: ephemeralWallet,
            lamports: wrapAmountLamports,
        }), spl.createSyncNativeInstruction(ephemeralWallet), spl.createTransferInstruction(ephemeralWallet, userTokenAddress, ephemeralAccount.publicKey, wrapAmountLamports), spl.createCloseAccountInstruction(ephemeralWallet, owner, ephemeralAccount.publicKey));
        return new TransactionObject(payer, ixns, user ? [user, ephemeralAccount] : [ephemeralAccount]);
    }
    async wrap(payer, params, user) {
        const wrapIxns = await this.wrapInstructions(payer, params, user);
        const txSignature = await this.signAndSend(wrapIxns);
        return txSignature;
    }
    async unwrapInstructions(payer, amount, user) {
        const owner = user ? user.publicKey : payer;
        const ixns = [];
        const signers = user ? [user] : [];
        const userAddress = this.getAssociatedAddress(owner);
        if (amount !== undefined && amount > 0) {
            const ephemeralAccount = Keypair.generate();
            const ephemeralWallet = this.getAssociatedAddress(ephemeralAccount.publicKey);
            const unwrapAmountLamports = this.toTokenAmount(amount);
            signers.push(ephemeralAccount);
            ixns.push(spl.createAssociatedTokenAccountInstruction(payer, ephemeralWallet, ephemeralAccount.publicKey, Mint.native), spl.createTransferInstruction(userAddress, ephemeralWallet, owner, unwrapAmountLamports), spl.createCloseAccountInstruction(ephemeralWallet, owner, ephemeralAccount.publicKey));
        }
        else {
            ixns.push(spl.createCloseAccountInstruction(userAddress, owner, owner));
        }
        return new TransactionObject(payer, ixns, signers);
    }
    async unwrap(payer, amount, user) {
        if (!this.address.equals(Mint.native)) {
            throw new NativeMintOnlyError();
        }
        const unwrapTxn = await this.unwrapInstructions(payer, amount, user);
        const txSignature = await this.signAndSend(unwrapTxn);
        return txSignature;
    }
}
NativeMint.address = Mint.native;
//# sourceMappingURL=mint.js.map