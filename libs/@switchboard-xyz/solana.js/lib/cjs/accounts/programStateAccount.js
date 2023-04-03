"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProgramStateAccount = void 0;
const errors = __importStar(require("../errors"));
const types = __importStar(require("../generated"));
const mint_1 = require("../mint");
const TransactionObject_1 = require("../TransactionObject");
const account_1 = require("./account");
const spl = __importStar(require("@solana/spl-token"));
const web3_js_1 = require("@solana/web3.js");
/**
 * Account type representing Switchboard global program state.
 *
 * Data: {@linkcode types.SbState}
 */
class ProgramStateAccount extends account_1.Account {
    constructor() {
        super(...arguments);
        /**
         * @return account size of the global {@linkcode ProgramStateAccount}.
         */
        this.size = this.program.account.sbState.size;
    }
    /**
     * Return a program state account state initialized to the default values.
     */
    static default() {
        const buffer = Buffer.alloc(ProgramStateAccount.size, 0);
        types.SbState.discriminator.copy(buffer, 0);
        return types.SbState.decode(buffer);
    }
    /**
     * Create a mock account info for a given program state config. Useful for test integrations.
     */
    static createMock(programId, data, options) {
        const fields = {
            ...ProgramStateAccount.default(),
            ...data,
            // any cleanup actions here
        };
        const state = new types.SbState(fields);
        const buffer = Buffer.alloc(ProgramStateAccount.size, 0);
        types.SbState.discriminator.copy(buffer, 0);
        types.SbState.layout.encode(state, buffer, 8);
        return {
            executable: false,
            owner: programId,
            lamports: options?.lamports ?? 1 * web3_js_1.LAMPORTS_PER_SOL,
            data: buffer,
            rentEpoch: options?.rentEpoch ?? 0,
        };
    }
    /** Load the ProgramStateAccount with its current on-chain state */
    static async load(program, publicKey) {
        const account = new ProgramStateAccount(program, typeof publicKey === 'string' ? new web3_js_1.PublicKey(publicKey) : publicKey);
        const state = await account.loadData();
        return [account, state];
    }
    /**
     * Retrieve and decode the {@linkcode types.SbState} stored in this account.
     */
    async loadData() {
        const data = await types.SbState.fetch(this.program, this.publicKey);
        if (data === null)
            throw new errors.AccountNotFoundError('Program State', this.publicKey);
        return data;
    }
    /**
     * Retrieves the {@linkcode ProgramStateAccount}, creates it if it doesn't exist;
     */
    static async getOrCreate(program, params = {
        mint: mint_1.Mint.native,
        daoMint: mint_1.Mint.native,
    }) {
        const [account, bump, txn] = await ProgramStateAccount.getOrCreateInstructions(program, program.walletPubkey, params);
        if (txn) {
            const txnSignature = await program.signAndSend(txn);
            return [account, bump, txnSignature];
        }
        return [account, bump, undefined];
    }
    static async getOrCreateInstructions(program, payer, params = {
        mint: mint_1.Mint.native,
        daoMint: mint_1.Mint.native,
    }) {
        const [account, bump] = ProgramStateAccount.fromSeed(program);
        try {
            await account.loadData();
            return [account, bump, undefined];
        }
        catch (e) {
            const ixns = [];
            const signers = [];
            let mint = params.mint;
            if (!mint) {
                const mintKeypair = web3_js_1.Keypair.generate();
                mint = mintKeypair.publicKey;
                signers.push(mintKeypair);
            }
            const daoMint = params.daoMint ?? mint;
            const vaultKeypair = params.vaultKeypair ?? web3_js_1.Keypair.generate();
            signers.push(vaultKeypair);
            // load the mint
            let splMint;
            try {
                // try to load mint if it exists
                splMint = await spl.getMint(program.connection, mint);
            }
            catch {
                // create new mint
                ixns.push(web3_js_1.SystemProgram.createAccount({
                    fromPubkey: payer,
                    newAccountPubkey: vaultKeypair.publicKey,
                    space: spl.MintLayout.span,
                    lamports: await program.connection.getMinimumBalanceForRentExemption(spl.MintLayout.span),
                    programId: spl.TOKEN_PROGRAM_ID,
                }), spl.createInitializeMintInstruction(mint, 9, payer, payer));
                splMint = {
                    address: mint,
                    mintAuthority: payer,
                    supply: BigInt('100000000000000000'),
                    decimals: 9,
                    isInitialized: true,
                    freezeAuthority: payer,
                    tlvData: Buffer.from(''),
                };
            }
            // create the vault
            ixns.push(web3_js_1.SystemProgram.createAccount({
                fromPubkey: payer,
                newAccountPubkey: vaultKeypair.publicKey,
                space: spl.AccountLayout.span,
                lamports: await program.connection.getMinimumBalanceForRentExemption(spl.AccountLayout.span),
                programId: spl.TOKEN_PROGRAM_ID,
            }), spl.createInitializeAccountInstruction(vaultKeypair.publicKey, splMint.address, payer));
            // if authorized, mint tokens to vault
            if (splMint.mintAuthority?.equals(payer)) {
                ixns.push(spl.createMintToInstruction(splMint.address, vaultKeypair.publicKey, payer, BigInt('100000000000000000')));
            }
            ixns.push(types.programInit(program, { params: { stateBump: bump } }, {
                state: account.publicKey,
                authority: program.wallet.publicKey,
                payer: program.wallet.publicKey,
                tokenMint: splMint.address,
                vault: vaultKeypair.publicKey,
                systemProgram: web3_js_1.SystemProgram.programId,
                tokenProgram: spl.TOKEN_PROGRAM_ID,
                daoMint: daoMint,
            }));
            const programInit = new TransactionObject_1.TransactionObject(payer, ixns, signers);
            return [account, bump, programInit];
        }
    }
    /**
     * Finds the {@linkcode ProgramStateAccount} from the static seed from which it was generated.
     * @return ProgramStateAccount and PDA bump tuple.
     */
    static fromSeed(program) {
        const [publicKey, bump] = web3_js_1.PublicKey.findProgramAddressSync([Buffer.from('STATE')], program.programId);
        return [new ProgramStateAccount(program, publicKey), bump];
    }
    /**
     * Transfer N tokens from the program vault to a specified account.
     * @param to The recipient of the vault tokens.
     * @param authority The vault authority required to sign the transfer tx.
     * @param params specifies the amount to transfer.
     * @return TransactionSignature
     */
    static async vaultTransfer(program, to, authority, params) {
        const [account, bump] = ProgramStateAccount.fromSeed(program);
        const vault = (await account.loadData()).tokenVault;
        const vaultTransfer = new TransactionObject_1.TransactionObject(program.walletPubkey, [
            types.vaultTransfer(program, { params: { stateBump: bump, amount: params.amount } }, {
                state: account.publicKey,
                to,
                vault,
                authority: authority.publicKey,
                tokenProgram: spl.TOKEN_PROGRAM_ID,
            }),
        ], []);
        const txnSignature = await program.signAndSend(vaultTransfer);
        return txnSignature;
    }
}
exports.ProgramStateAccount = ProgramStateAccount;
ProgramStateAccount.accountName = 'SbState';
ProgramStateAccount.size = 1128;
//# sourceMappingURL=programStateAccount.js.map