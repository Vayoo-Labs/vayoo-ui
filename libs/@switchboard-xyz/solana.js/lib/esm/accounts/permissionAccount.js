import * as errors from '../errors';
import * as types from '../generated';
import { PermitNone, PermitOracleHeartbeat, PermitOracleQueueUsage, PermitVrfRequests, } from '../generated/types/SwitchboardPermission';
import { TransactionObject } from '../TransactionObject';
import { Account } from './account';
import { ACCOUNT_DISCRIMINATOR_SIZE } from '@coral-xyz/anchor';
import { LAMPORTS_PER_SOL, PublicKey, SystemProgram, } from '@solana/web3.js';
/**
 * Account type dictating the level of permissions between a granter and a grantee.
 *
 * A {@linkcode QueueAccount} acts as the granter where the queue authority assigns or revokes a grantee's {@linkcode types.SwitchboardPermission}. A grantee can be one of the following: {@linkcode AggregatorAccount}, {@linkcode BufferRelayerAccount}, or {@linkcode VrfAccount}.
 *
 * Data: {@linkcode types.PermissionAccountData}
 */
export class PermissionAccount extends Account {
    constructor() {
        super(...arguments);
        /**
         * Returns the size of an on-chain {@linkcode PermissionAccount}.
         */
        this.size = this.program.account.permissionAccountData.size;
    }
    /**
     * Retrieve and decode the {@linkcode types.PermissionAccountData} stored in this account.
     */
    async loadData() {
        const data = await types.PermissionAccountData.fetch(this.program, this.publicKey);
        if (data === null)
            throw new errors.AccountNotFoundError('Permissions', this.publicKey);
        return data;
    }
    static getPermissions(permission) {
        switch (permission.permissions) {
            case PermitNone.discriminator:
                return new PermitNone();
            case PermitOracleHeartbeat.discriminator:
                return new PermitOracleHeartbeat();
            case PermitOracleQueueUsage.discriminator:
                return new PermitOracleQueueUsage();
            case PermitVrfRequests.discriminator:
                return new PermitVrfRequests();
        }
        throw new Error(`Failed to find the assigned permissions, expected [${PermitNone.discriminator}, ${PermitOracleHeartbeat.discriminator}, ${PermitOracleQueueUsage.discriminator}, or ${PermitVrfRequests.discriminator}], received ${permission.permissions}`);
    }
    /**
     * Return a permission account state initialized to the default values.
     */
    static default() {
        const buffer = Buffer.alloc(PermissionAccount.size, 0);
        types.PermissionAccountData.discriminator.copy(buffer, 0);
        return types.PermissionAccountData.decode(buffer);
    }
    /**
     * Create a mock account info for a given permission config. Useful for test integrations.
     */
    static createMock(programId, data, options) {
        const fields = {
            ...PermissionAccount.default(),
            ...data,
            // any cleanup actions here
        };
        const state = new types.PermissionAccountData(fields);
        const buffer = Buffer.alloc(PermissionAccount.size, 0);
        types.PermissionAccountData.discriminator.copy(buffer, 0);
        types.PermissionAccountData.layout.encode(state, buffer, 8);
        return {
            executable: false,
            owner: programId,
            lamports: options?.lamports ?? 1 * LAMPORTS_PER_SOL,
            data: buffer,
            rentEpoch: options?.rentEpoch ?? 0,
        };
    }
    /** Load an existing PermissionAccount with its current on-chain state */
    static async load(program, authority, granter, grantee) {
        const [account, bump] = PermissionAccount.fromSeed(program, typeof authority === 'string' ? new PublicKey(authority) : authority, typeof granter === 'string' ? new PublicKey(granter) : granter, typeof grantee === 'string' ? new PublicKey(grantee) : grantee);
        const state = await account.loadData();
        return [account, state, bump];
    }
    /**
     * Loads a PermissionAccount from the expected PDA seed format.
     * @param program The Switchboard program for the current connection.
     * @param authority The authority pubkey to be incorporated into the account seed.
     * @param granter The granter pubkey to be incorporated into the account seed.
     * @param grantee The grantee pubkey to be incorporated into the account seed.
     * @return PermissionAccount and PDA bump.
     */
    static fromSeed(program, authority, granter, grantee) {
        const [publicKey, bump] = PublicKey.findProgramAddressSync([
            Buffer.from('PermissionAccountData'),
            authority.toBytes(),
            granter.toBytes(),
            grantee.toBytes(),
        ], program.programId);
        return [new PermissionAccount(program, publicKey), bump];
    }
    static createInstruction(program, payer, params) {
        const [account] = PermissionAccount.fromSeed(program, params.authority, params.granter, params.grantee);
        const instruction = types.permissionInit(program, { params: {} }, {
            permission: account.publicKey,
            granter: params.granter,
            grantee: params.grantee,
            systemProgram: SystemProgram.programId,
            authority: params.authority,
            payer,
        });
        return [account, new TransactionObject(payer, [instruction], [])];
    }
    static async create(program, params) {
        const [account, txnObject] = this.createInstruction(program, program.walletPubkey, params);
        const txSignature = await program.signAndSend(txnObject);
        return [account, txSignature];
    }
    /**
     * Check if a specific permission is enabled on this permission account
     */
    async isPermissionEnabled(permission) {
        const permissions = (await this.loadData()).permissions;
        return (permissions & permission) !== 0;
    }
    /**
     * Produces the instruction to set the permission in the PermissionAccount
     */
    setInstruction(payer, params) {
        return new TransactionObject(payer, [
            types.permissionSet(this.program, {
                params: {
                    permission: params.permission,
                    enable: params.enable,
                },
            }, {
                permission: this.publicKey,
                authority: params.queueAuthority
                    ? params.queueAuthority.publicKey
                    : payer,
            }),
        ], params.queueAuthority ? [params.queueAuthority] : []);
    }
    /**
     * Sets the permission in the PermissionAccount
     */
    async set(params) {
        const setTxn = this.setInstruction(this.program.walletPubkey, params);
        const txnSignature = await this.program.signAndSend(setTxn);
        return txnSignature;
    }
    static getGranteePermissions(grantee) {
        if (grantee.data.byteLength < ACCOUNT_DISCRIMINATOR_SIZE) {
            throw new Error(`Cannot assign permissions to grantee`);
        }
        const discriminator = grantee.data.slice(0, ACCOUNT_DISCRIMINATOR_SIZE);
        // check oracle
        if (types.OracleAccountData.discriminator.compare(discriminator) === 0) {
            return new PermitOracleHeartbeat();
        }
        // check aggregator and buffer relayer
        if (types.AggregatorAccountData.discriminator.compare(discriminator) === 0 ||
            types.BufferRelayerAccountData.discriminator.compare(discriminator) === 0) {
            return new PermitOracleQueueUsage();
        }
        // check vrf
        if (types.VrfAccountData.discriminator.compare(discriminator) === 0) {
            return new PermitVrfRequests();
        }
        throw new Error(`Cannot find permissions to assign for account with discriminator of [${discriminator.join(', ')}]`);
    }
}
PermissionAccount.accountName = 'PermissionAccountData';
PermissionAccount.size = 372;
//# sourceMappingURL=permissionAccount.js.map