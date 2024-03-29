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
exports.JobAccount = void 0;
const errors = __importStar(require("../errors"));
const types = __importStar(require("../generated"));
const TransactionObject_1 = require("../TransactionObject");
const account_1 = require("./account");
const anchor = __importStar(require("@coral-xyz/anchor"));
const web3_js_1 = require("@solana/web3.js");
const common_1 = require("@switchboard-xyz/common");
/**
 * Account type storing a list of SwitchboardTasks {@linkcode OracleJob.Task} dictating how to source data off-chain.
 *
 * Data: {@linkcode types.JobAccountData}
 */
class JobAccount extends account_1.Account {
    constructor() {
        super(...arguments);
        /**
         * Get the size of an {@linkcode JobAccount} on-chain.
         */
        this.size = this.program.account.jobAccountData.size;
    }
    static getAccountSize(byteLength) {
        return 181 + byteLength;
    }
    /**
     * Return a job account initialized to the default values.
     *
     * @params byteLength - the length of the serialized job
     */
    static default(byteLength) {
        const buffer = Buffer.alloc(JobAccount.getAccountSize(byteLength), 0);
        types.LeaseAccountData.discriminator.copy(buffer, 0);
        return types.LeaseAccountData.decode(buffer);
    }
    /**
     * Creates a mock account info for a given job. Useful for test integrations.
     */
    static createMock(programId, data, options) {
        let jobData = undefined;
        if ('data' in data && data.data && data.data.byteLength > 0) {
            jobData = Buffer.from(data.data);
        }
        if ('job' in data) {
            jobData = Buffer.from(common_1.OracleJob.encodeDelimited(data.job).finish());
        }
        else if ('tasks' in data) {
            jobData = Buffer.from(common_1.OracleJob.encodeDelimited(common_1.OracleJob.fromObject(data.tasks)).finish());
        }
        if (!jobData) {
            throw new Error(`No job data found to create mock`);
        }
        const fields = {
            ...JobAccount.default(jobData.byteLength),
            ...data,
            // any cleanup actions here
        };
        const state = new types.LeaseAccountData(fields);
        const buffer = Buffer.alloc(JobAccount.getAccountSize(jobData.byteLength), 0);
        types.LeaseAccountData.discriminator.copy(buffer, 0);
        types.LeaseAccountData.layout.encode(state, buffer, 8);
        jobData.copy(buffer, 181);
        return {
            executable: false,
            owner: programId,
            lamports: options?.lamports ?? 1 * web3_js_1.LAMPORTS_PER_SOL,
            data: buffer,
            rentEpoch: options?.rentEpoch ?? 0,
        };
    }
    /** Load an existing JobAccount with its current on-chain state */
    static async load(program, publicKey) {
        const account = new JobAccount(program, typeof publicKey === 'string' ? new web3_js_1.PublicKey(publicKey) : publicKey);
        const state = await account.loadData();
        return [account, state];
    }
    /**
     * Retrieve and decode the {@linkcode types.JobAccountData} stored in this account.
     */
    async loadData() {
        const data = await types.JobAccountData.fetch(this.program, this.publicKey);
        if (data === null)
            throw new errors.AccountNotFoundError('Job', this.publicKey);
        return data;
    }
    static createInstructions(program, payer, params, options) {
        if (params.data.byteLength > 6400) {
            throw new Error('Switchboard jobs need to be less than 6400 bytes');
        }
        const jobKeypair = params.keypair ?? web3_js_1.Keypair.generate();
        program.verifyNewKeypair(jobKeypair);
        const authority = params.authority ? params.authority.publicKey : payer;
        const CHUNK_SIZE = 800;
        const txns = [];
        if (params.data.byteLength <= CHUNK_SIZE) {
            const jobInitIxn = types.jobInit(program, {
                params: {
                    name: [...Buffer.from(params.name ?? '', 'utf8').slice(0, 32)],
                    expiration: new anchor.BN(params.expiration ?? 0),
                    stateBump: program.programState.bump,
                    data: params.data,
                    size: params.data.byteLength,
                },
            }, {
                job: jobKeypair.publicKey,
                authority: authority,
                programState: program.programState.publicKey,
                payer,
                systemProgram: web3_js_1.SystemProgram.programId,
            });
            txns.push(new TransactionObject_1.TransactionObject(payer, [jobInitIxn], params.authority ? [jobKeypair, params.authority] : [jobKeypair], options));
        }
        else {
            const chunks = [];
            for (let i = 0; i < params.data.byteLength;) {
                const end = i + CHUNK_SIZE >= params.data.byteLength
                    ? params.data.byteLength
                    : i + CHUNK_SIZE;
                chunks.push(params.data.slice(i, end));
                i = end;
            }
            const jobInitIxn = types.jobInit(program, {
                params: {
                    name: [...Buffer.from(params.name ?? '', 'utf8').slice(0, 32)],
                    expiration: new anchor.BN(params.expiration ?? 0),
                    stateBump: program.programState.bump,
                    data: new Uint8Array(),
                    size: params.data.byteLength,
                },
            }, {
                job: jobKeypair.publicKey,
                authority: authority,
                programState: program.programState.publicKey,
                payer,
                systemProgram: web3_js_1.SystemProgram.programId,
            });
            txns.push(new TransactionObject_1.TransactionObject(payer, [jobInitIxn], params.authority ? [jobKeypair, params.authority] : [jobKeypair], options));
            for (const [n, chunk] of chunks.entries()) {
                const jobSetDataIxn = types.jobSetData(program, {
                    params: {
                        data: chunk,
                        chunkIdx: n,
                    },
                }, {
                    job: jobKeypair.publicKey,
                    authority: authority,
                });
                txns.push(new TransactionObject_1.TransactionObject(payer, [jobSetDataIxn], params.authority ? [params.authority] : [], options));
            }
        }
        return [new JobAccount(program, jobKeypair.publicKey), txns];
    }
    static async create(program, params, options) {
        const [account, transactions] = JobAccount.createInstructions(program, program.walletPubkey, params, options);
        const txSignature = await program.signAndSendAll(transactions);
        return [account, txSignature];
    }
    decode(data) {
        try {
            return types.JobAccountData.decode(data);
        }
        catch {
            return this.program.coder.decode(JobAccount.accountName, data);
        }
    }
    static decode(program, accountInfo) {
        if (!accountInfo || accountInfo.data === null) {
            throw new Error('Cannot decode empty JobAccountData');
        }
        return program.coder.decode(JobAccount.accountName, accountInfo?.data);
    }
    static decodeJob(program, accountInfo) {
        return common_1.OracleJob.decodeDelimited(JobAccount.decode(program, accountInfo).data);
    }
    async toAccountsJSON(_job) {
        const job = _job ?? (await this.loadData());
        const oracleJob = common_1.OracleJob.decodeDelimited(job.data);
        return {
            publicKey: this.publicKey,
            ...job.toJSON(),
            tasks: oracleJob.tasks,
        };
    }
    static async fetchMultiple(program, publicKeys, commitment = 'confirmed') {
        const jobs = [];
        const accountInfos = await anchor.utils.rpc.getMultipleAccounts(program.connection, publicKeys, commitment);
        for (const accountInfo of accountInfos) {
            if (!accountInfo?.publicKey) {
                continue;
            }
            try {
                const account = new JobAccount(program, accountInfo.publicKey);
                const data = types.JobAccountData.decode(accountInfo.account.data);
                const job = common_1.OracleJob.decodeDelimited(data.data);
                jobs.push({ account, data, job });
                // eslint-disable-next-line no-empty
            }
            catch { }
        }
        return jobs;
    }
}
exports.JobAccount = JobAccount;
JobAccount.accountName = 'JobAccountData';
/**
 * Returns the job's name buffer in a stringified format.
 */
JobAccount.getName = (job) => (0, common_1.toUtf8)(job.name);
/**
 * Returns the job's metadata buffer in a stringified format.
 */
JobAccount.getMetadata = (job) => (0, common_1.toUtf8)(job.metadata);
//# sourceMappingURL=jobAccount.js.map