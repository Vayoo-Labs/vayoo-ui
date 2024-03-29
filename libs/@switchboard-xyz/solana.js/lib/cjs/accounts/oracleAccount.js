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
exports.OracleAccount = void 0;
const errors = __importStar(require("../errors"));
const types = __importStar(require("../generated"));
const TransactionObject_1 = require("../TransactionObject");
const account_1 = require("./account");
const permissionAccount_1 = require("./permissionAccount");
const queueAccount_1 = require("./queueAccount");
const anchor = __importStar(require("@coral-xyz/anchor"));
const spl = __importStar(require("@solana/spl-token-v2"));
const web3_js_1 = require("@solana/web3.js");
/**
 * Account type holding an oracle's configuration including the authority and the reward/slashing wallet along with a set of metrics tracking its reliability.
 *
 * An oracle is a server that sits between the internet and a blockchain and facilitates the flow of information and is rewarded for responding with the honest majority.
 *
 * Data: {@linkcode types.OracleAccountData}
 */
class OracleAccount extends account_1.Account {
    constructor() {
        super(...arguments);
        /**
         * Get the size of an {@linkcode OracleAccount} on-chain.
         */
        this.size = this.program.account.oracleAccountData.size;
    }
    /**
     * Return an oracle account state initialized to the default values.
     */
    static default() {
        const buffer = Buffer.alloc(OracleAccount.size, 0);
        types.OracleAccountData.discriminator.copy(buffer, 0);
        return types.OracleAccountData.decode(buffer);
    }
    /**
     * Create a mock account info for a given oracle config. Useful for test integrations.
     */
    static createMock(programId, data, options) {
        const fields = {
            ...OracleAccount.default(),
            ...data,
            // any cleanup actions here
        };
        const state = new types.OracleAccountData(fields);
        const buffer = Buffer.alloc(OracleAccount.size, 0);
        types.OracleAccountData.discriminator.copy(buffer, 0);
        types.OracleAccountData.layout.encode(state, buffer, 8);
        return {
            executable: false,
            owner: programId,
            lamports: options?.lamports ?? 1 * web3_js_1.LAMPORTS_PER_SOL,
            data: buffer,
            rentEpoch: options?.rentEpoch ?? 0,
        };
    }
    /** Load an existing OracleAccount with its current on-chain state */
    static async load(program, publicKey) {
        const account = new OracleAccount(program, typeof publicKey === 'string' ? new web3_js_1.PublicKey(publicKey) : publicKey);
        const state = await account.loadData();
        return [account, state];
    }
    decode(data) {
        try {
            return types.OracleAccountData.decode(data);
        }
        catch {
            return this.program.coder.decode(OracleAccount.accountName, data);
        }
    }
    /**
     * Invoke a callback each time an OracleAccount's data has changed on-chain.
     * @param callback - the callback invoked when the oracle state changes
     * @param commitment - optional, the desired transaction finality. defaults to 'confirmed'
     * @returns the websocket subscription id
     */
    onChange(callback, commitment = 'confirmed') {
        return this.program.connection.onAccountChange(this.publicKey, accountInfo => callback(this.decode(accountInfo.data)), commitment);
    }
    async fetchBalance(stakingWallet) {
        const tokenAccount = stakingWallet ?? (await this.loadData()).tokenAccount;
        const amount = await this.program.mint.fetchBalance(tokenAccount);
        if (amount === null) {
            throw new Error(`Failed to fetch oracle staking wallet balance`);
        }
        return amount;
    }
    async fetchBalanceBN(stakingWallet) {
        const tokenAccount = stakingWallet ?? (await this.loadData()).tokenAccount;
        const amount = await this.program.mint.fetchBalanceBN(tokenAccount);
        if (amount === null) {
            throw new Error(`Failed to fetch oracle staking wallet balance`);
        }
        return amount;
    }
    /**
     * Retrieve and decode the {@linkcode types.OracleAccountData} stored in this account.
     */
    async loadData() {
        const data = await types.OracleAccountData.fetch(this.program, this.publicKey);
        if (data === null)
            throw new errors.AccountNotFoundError('Oracle', this.publicKey);
        return data;
    }
    /**
     * Loads an OracleAccount from the expected PDA seed format.
     * @param program The Switchboard program for the current connection.
     * @param queue The queue pubkey to be incorporated into the account seed.
     * @param wallet The oracles token wallet to be incorporated into the account seed.
     * @return OracleAccount and PDA bump.
     */
    static fromSeed(program, queue, wallet) {
        const [publicKey, bump] = web3_js_1.PublicKey.findProgramAddressSync([Buffer.from('OracleAccountData'), queue.toBuffer(), wallet.toBuffer()], program.programId);
        return [new OracleAccount(program, publicKey), bump];
    }
    async getPermissions(_oracle, _queueAccount, _queue) {
        const oracle = _oracle ?? (await this.loadData());
        const queueAccount = _queueAccount ?? new queueAccount_1.QueueAccount(this.program, oracle.queuePubkey);
        const queue = _queue ?? (await queueAccount.loadData());
        const [permissionAccount, permissionBump] = this.getPermissionAccount(queueAccount.publicKey, queue.authority);
        const permission = await permissionAccount.loadData();
        return [permissionAccount, permissionBump, permission];
    }
    static async createInstructions(program, payer, params) {
        const txns = [];
        const tokenWallet = params.stakingWalletKeypair ?? web3_js_1.Keypair.generate();
        const authority = params.authority?.publicKey ?? payer;
        const [oracleAccount, oracleBump] = OracleAccount.fromSeed(program, params.queueAccount.publicKey, tokenWallet.publicKey);
        const oracleInit = new TransactionObject_1.TransactionObject(payer, [
            web3_js_1.SystemProgram.createAccount({
                fromPubkey: payer,
                newAccountPubkey: tokenWallet.publicKey,
                space: spl.ACCOUNT_SIZE,
                lamports: await program.connection.getMinimumBalanceForRentExemption(spl.ACCOUNT_SIZE),
                programId: spl.TOKEN_PROGRAM_ID,
            }),
            spl.createInitializeAccountInstruction(tokenWallet.publicKey, program.mint.address, authority),
            spl.createSetAuthorityInstruction(tokenWallet.publicKey, authority, spl.AuthorityType.AccountOwner, program.programState.publicKey),
            types.oracleInit(program, {
                params: {
                    name: new Uint8Array(Buffer.from(params.name ?? '', 'utf8').slice(0, 32)),
                    metadata: new Uint8Array(Buffer.from(params.metadata ?? '', 'utf8').slice(0, 128)),
                    oracleBump,
                    stateBump: program.programState.bump,
                },
            }, {
                oracle: oracleAccount.publicKey,
                oracleAuthority: authority,
                wallet: tokenWallet.publicKey,
                programState: program.programState.publicKey,
                queue: params.queueAccount.publicKey,
                payer,
                systemProgram: web3_js_1.SystemProgram.programId,
            }),
        ], params.authority ? [params.authority, tokenWallet] : [tokenWallet]);
        txns.push(oracleInit);
        if (params.stakeAmount && params.stakeAmount > 0) {
            const depositTxn = await oracleAccount.stakeInstructions(payer, {
                ...params,
                tokenAccount: tokenWallet.publicKey,
                stakeAmount: params.stakeAmount ?? 0,
            });
            txns.push(depositTxn);
        }
        return [oracleAccount, TransactionObject_1.TransactionObject.pack(txns)];
    }
    static async create(program, params) {
        const [oracleAccount, txns] = await OracleAccount.createInstructions(program, program.walletPubkey, params);
        const signatures = await program.signAndSendAll(txns);
        return [oracleAccount, signatures];
    }
    stakeInstruction(stakeAmount, oracleStakingWallet, funderTokenWallet, funderAuthority) {
        if (stakeAmount <= 0) {
            throw new Error(`stake amount should be greater than 0`);
        }
        return spl.createTransferInstruction(funderTokenWallet, oracleStakingWallet, funderAuthority, this.program.mint.toTokenAmount(stakeAmount));
    }
    async stakeInstructions(payer, params) {
        const txns = [];
        if (!params.stakeAmount || params.stakeAmount <= 0) {
            throw new Error(`stake amount should be greater than 0`);
        }
        const tokenWallet = params.tokenAccount ?? (await this.loadData()).tokenAccount;
        const owner = params.funderAuthority
            ? params.funderAuthority.publicKey
            : payer;
        let funderTokenWallet;
        if (params.disableWrap) {
            funderTokenWallet =
                params.funderTokenWallet ??
                    this.program.mint.getAssociatedAddress(owner);
        }
        else {
            let tokenTxn;
            // now we need to wrap some funds
            if (params.funderTokenWallet) {
                funderTokenWallet = params.funderTokenWallet;
                tokenTxn = await this.program.mint.wrapInstructions(payer, {
                    fundUpTo: params.stakeAmount ?? 0,
                }, params.funderAuthority);
            }
            else {
                [funderTokenWallet, tokenTxn] =
                    await this.program.mint.getOrCreateWrappedUserInstructions(payer, { fundUpTo: params.stakeAmount ?? 0 }, params.funderAuthority);
            }
            if (tokenTxn) {
                txns.push(tokenTxn);
            }
        }
        const transferTxn = new TransactionObject_1.TransactionObject(payer, [
            spl.createTransferInstruction(funderTokenWallet, tokenWallet, params.funderAuthority ? params.funderAuthority.publicKey : payer, this.program.mint.toTokenAmount(params.stakeAmount)),
        ], params.funderAuthority ? [params.funderAuthority] : []);
        txns.push(transferTxn);
        const packed = TransactionObject_1.TransactionObject.pack(txns);
        if (packed.length > 1) {
            throw new Error(`Failed to pack transactions into a single transactions`);
        }
        return packed[0];
    }
    async stake(params) {
        const stakeTxn = await this.stakeInstructions(this.program.walletPubkey, params);
        const txnSignature = await this.program.signAndSend(stakeTxn);
        return txnSignature;
    }
    heartbeatInstruction(payer, params) {
        const [permissionAccount, permissionBump] = params.permission;
        return types.oracleHeartbeat(this.program, { params: { permissionBump } }, {
            oracle: this.publicKey,
            oracleAuthority: params.authority ?? payer,
            tokenAccount: params.tokenWallet,
            gcOracle: params.gcOracle,
            oracleQueue: params.oracleQueue,
            permission: permissionAccount.publicKey,
            dataBuffer: params.dataBuffer,
        });
    }
    async heartbeat(params, opts) {
        const oracle = await this.loadData();
        const tokenWallet = params?.tokenWallet ?? oracle.tokenAccount;
        const queueAccount = params?.queueAccount ??
            new queueAccount_1.QueueAccount(this.program, oracle.queuePubkey);
        const queue = params?.queue ?? (await queueAccount.loadData());
        const oracles = await queueAccount.loadOracles();
        let lastPubkey = this.publicKey;
        if (oracles.length !== 0) {
            lastPubkey = oracles[queue.gcIdx];
        }
        const [permissionAccount, permissionBump] = params?.permission ??
            this.getPermissionAccount(queueAccount.publicKey, queue.authority);
        try {
            await permissionAccount.loadData();
        }
        catch (_) {
            throw new Error('A requested oracle permission pda account has not been initialized.');
        }
        if (params?.authority &&
            !oracle.oracleAuthority.equals(params.authority.publicKey)) {
            throw new errors.IncorrectAuthority(oracle.oracleAuthority, params.authority.publicKey);
        }
        const heartbeatTxn = new TransactionObject_1.TransactionObject(this.program.walletPubkey, [
            this.heartbeatInstruction(this.program.walletPubkey, {
                tokenWallet: tokenWallet,
                gcOracle: lastPubkey,
                oracleQueue: queueAccount.publicKey,
                dataBuffer: queue.dataBuffer,
                permission: [permissionAccount, permissionBump],
                authority: oracle.oracleAuthority,
            }),
        ], params?.authority ? [params.authority] : [], opts);
        const txnSignature = await this.program.signAndSend(heartbeatTxn);
        return txnSignature;
    }
    async withdrawInstruction(payer, params, opts) {
        const tokenAmount = this.program.mint.toTokenAmountBN(params.amount);
        const oracle = await this.loadData();
        const queueAccount = new queueAccount_1.QueueAccount(this.program, oracle.queuePubkey);
        const queue = await queueAccount.loadData();
        const [permissionAccount, permissionBump] = await this.getPermissions(oracle, queueAccount, queue);
        if (params.unwrap) {
            const ephemeralWallet = web3_js_1.Keypair.generate();
            const ixns = [
                // initialize space for ephemeral token account
                web3_js_1.SystemProgram.createAccount({
                    fromPubkey: payer,
                    newAccountPubkey: ephemeralWallet.publicKey,
                    lamports: await this.program.connection.getMinimumBalanceForRentExemption(spl.ACCOUNT_SIZE),
                    space: spl.ACCOUNT_SIZE,
                    programId: spl.TOKEN_PROGRAM_ID,
                }),
                // initialize ephemeral token account
                spl.createInitializeAccountInstruction(ephemeralWallet.publicKey, this.program.mint.address, payer, spl.TOKEN_PROGRAM_ID),
                types.oracleWithdraw(this.program, {
                    params: {
                        stateBump: this.program.programState.bump,
                        permissionBump,
                        amount: tokenAmount,
                    },
                }, {
                    oracle: this.publicKey,
                    oracleAuthority: oracle.oracleAuthority,
                    tokenAccount: oracle.tokenAccount,
                    withdrawAccount: ephemeralWallet.publicKey,
                    oracleQueue: queueAccount.publicKey,
                    permission: permissionAccount.publicKey,
                    tokenProgram: spl.TOKEN_PROGRAM_ID,
                    programState: this.program.programState.publicKey,
                    payer: payer,
                    systemProgram: web3_js_1.SystemProgram.programId,
                }),
                spl.createCloseAccountInstruction(ephemeralWallet.publicKey, oracle.oracleAuthority, payer),
            ];
            const txn = new TransactionObject_1.TransactionObject(payer, ixns, params.authority
                ? [params.authority, ephemeralWallet]
                : [ephemeralWallet], opts);
            return txn;
        }
        const withdrawAccount = params.withdrawAccount ?? this.program.mint.getAssociatedAddress(payer);
        const withdrawIxn = types.oracleWithdraw(this.program, {
            params: {
                stateBump: this.program.programState.bump,
                permissionBump,
                amount: tokenAmount,
            },
        }, {
            oracle: this.publicKey,
            oracleAuthority: oracle.oracleAuthority,
            tokenAccount: oracle.tokenAccount,
            withdrawAccount: withdrawAccount,
            oracleQueue: queueAccount.publicKey,
            permission: permissionAccount.publicKey,
            tokenProgram: spl.TOKEN_PROGRAM_ID,
            programState: this.program.programState.publicKey,
            payer: payer,
            systemProgram: web3_js_1.SystemProgram.programId,
        });
        return new TransactionObject_1.TransactionObject(payer, [withdrawIxn], params.authority ? [params.authority] : [], opts);
    }
    async withdraw(params, opts) {
        const withdrawTxn = await this.withdrawInstruction(this.program.walletPubkey, params, opts);
        const txnSignature = await this.program.signAndSend(withdrawTxn);
        return txnSignature;
    }
    getPermissionAccount(queuePubkey, queueAuthority) {
        return permissionAccount_1.PermissionAccount.fromSeed(this.program, queueAuthority, queuePubkey, this.publicKey);
    }
    async toAccountsJSON(_oracle, _permissionAccount, _permission) {
        const oracle = _oracle ?? (await this.loadData());
        let permissionAccount = _permissionAccount;
        let permission = _permission;
        if (!permissionAccount || !permission) {
            const queueAccount = new queueAccount_1.QueueAccount(this.program, oracle.queuePubkey);
            const queue = await queueAccount.loadData();
            [permissionAccount] = this.getPermissionAccount(queueAccount.publicKey, queue.authority);
            permission = await permissionAccount.loadData();
        }
        const oracleBalance = (await this.program.mint.fetchBalance(oracle.tokenAccount)) ?? 0;
        return {
            publicKey: this.publicKey,
            balance: oracleBalance,
            ...oracle.toJSON(),
            permission: {
                publicKey: permissionAccount.publicKey,
                ...permission.toJSON(),
            },
        };
    }
    static async fetchMultiple(program, publicKeys, commitment = 'confirmed') {
        const oracles = [];
        const accountInfos = await anchor.utils.rpc.getMultipleAccounts(program.connection, publicKeys, commitment);
        for (const accountInfo of accountInfos) {
            if (!accountInfo?.publicKey) {
                continue;
            }
            try {
                const account = new OracleAccount(program, accountInfo.publicKey);
                const data = types.OracleAccountData.decode(accountInfo.account.data);
                oracles.push({ account, data });
                // eslint-disable-next-line no-empty
            }
            catch { }
        }
        return oracles;
    }
}
exports.OracleAccount = OracleAccount;
OracleAccount.accountName = 'OracleAccountData';
OracleAccount.size = 636;
//# sourceMappingURL=oracleAccount.js.map