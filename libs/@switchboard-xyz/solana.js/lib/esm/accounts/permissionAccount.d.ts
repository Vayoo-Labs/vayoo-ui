/// <reference types="node" />
import * as types from '../generated';
import { SwitchboardProgram } from '../SwitchboardProgram';
import { TransactionObject } from '../TransactionObject';
import { Account } from './account';
import { AccountInfo, Keypair, PublicKey, TransactionSignature } from '@solana/web3.js';
/**
 *  Parameters for initializing an {@linkcode PermissionAccount}
 */
export interface PermissionAccountInitParams {
    granter: PublicKey;
    grantee: PublicKey;
    authority: PublicKey;
}
export interface PermissionSetParams {
    /** Whether to enable PERMIT_ORACLE_HEARTBEAT permissions. **Note:** Requires a provided queueAuthority keypair or payer to be the assigned queue authority. */
    enable: boolean;
    /** Keypair used to enable heartbeat permissions if payer is not the queue authority. */
    queueAuthority?: Keypair;
}
/**
 * Account type dictating the level of permissions between a granter and a grantee.
 *
 * A {@linkcode QueueAccount} acts as the granter where the queue authority assigns or revokes a grantee's {@linkcode types.SwitchboardPermission}. A grantee can be one of the following: {@linkcode AggregatorAccount}, {@linkcode BufferRelayerAccount}, or {@linkcode VrfAccount}.
 *
 * Data: {@linkcode types.PermissionAccountData}
 */
export declare class PermissionAccount extends Account<types.PermissionAccountData> {
    static accountName: string;
    static size: number;
    /**
     * Returns the size of an on-chain {@linkcode PermissionAccount}.
     */
    readonly size: number;
    /**
     * Retrieve and decode the {@linkcode types.PermissionAccountData} stored in this account.
     */
    loadData(): Promise<types.PermissionAccountData>;
    static getPermissions(permission: types.PermissionAccountData): types.SwitchboardPermissionKind;
    /**
     * Return a permission account state initialized to the default values.
     */
    static default(): types.PermissionAccountData;
    /**
     * Create a mock account info for a given permission config. Useful for test integrations.
     */
    static createMock(programId: PublicKey, data: Partial<types.PermissionAccountData>, options?: {
        lamports?: number;
        rentEpoch?: number;
    }): AccountInfo<Buffer>;
    /** Load an existing PermissionAccount with its current on-chain state */
    static load(program: SwitchboardProgram, authority: PublicKey | string, granter: PublicKey | string, grantee: PublicKey | string): Promise<[PermissionAccount, types.PermissionAccountData, number]>;
    /**
     * Loads a PermissionAccount from the expected PDA seed format.
     * @param program The Switchboard program for the current connection.
     * @param authority The authority pubkey to be incorporated into the account seed.
     * @param granter The granter pubkey to be incorporated into the account seed.
     * @param grantee The grantee pubkey to be incorporated into the account seed.
     * @return PermissionAccount and PDA bump.
     */
    static fromSeed(program: SwitchboardProgram, authority: PublicKey, granter: PublicKey, grantee: PublicKey): [PermissionAccount, number];
    static createInstruction(program: SwitchboardProgram, payer: PublicKey, params: PermissionAccountInitParams): [PermissionAccount, TransactionObject];
    static create(program: SwitchboardProgram, params: PermissionAccountInitParams): Promise<[PermissionAccount, TransactionSignature]>;
    /**
     * Check if a specific permission is enabled on this permission account
     */
    isPermissionEnabled(permission: any): Promise<boolean>;
    /**
     * Produces the instruction to set the permission in the PermissionAccount
     */
    setInstruction(payer: PublicKey, params: PermissionSetParams & {
        /** The {@linkcode types.SwitchboardPermission} to set for the grantee. */
        permission: types.SwitchboardPermissionKind;
    }): TransactionObject;
    /**
     * Sets the permission in the PermissionAccount
     */
    set(params: PermissionSetParams & {
        /** The {@linkcode types.SwitchboardPermission} to set for the grantee. */
        permission: types.SwitchboardPermissionKind;
    }): Promise<string>;
    static getGranteePermissions(grantee: AccountInfo<Buffer>): types.SwitchboardPermissionKind;
}
//# sourceMappingURL=permissionAccount.d.ts.map