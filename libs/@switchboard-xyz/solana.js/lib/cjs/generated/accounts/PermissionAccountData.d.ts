/// <reference types="node" />
import { SwitchboardProgram } from '../../SwitchboardProgram';
import { PublicKey } from '@solana/web3.js';
import { BN } from '@switchboard-xyz/common';
export interface PermissionAccountDataFields {
    /** The authority that is allowed to set permissions for this account. */
    authority: PublicKey;
    /** The SwitchboardPermission enumeration assigned by the granter to the grantee. */
    permissions: number;
    /** Public key of account that is granting permissions to use its resources. */
    granter: PublicKey;
    /** Public key of account that is being assigned permissions to use a granters resources. */
    grantee: PublicKey;
    /**
     * unused currently. may want permission PDA per permission for
     * unique expiration periods, BUT currently only one permission
     * per account makes sense for the infra. Dont over engineer.
     */
    expiration: BN;
    /** The PDA bump to derive the pubkey. */
    bump: number;
    /** Reserved for future info. */
    ebuf: Array<number>;
}
export interface PermissionAccountDataJSON {
    /** The authority that is allowed to set permissions for this account. */
    authority: string;
    /** The SwitchboardPermission enumeration assigned by the granter to the grantee. */
    permissions: number;
    /** Public key of account that is granting permissions to use its resources. */
    granter: string;
    /** Public key of account that is being assigned permissions to use a granters resources. */
    grantee: string;
    /**
     * unused currently. may want permission PDA per permission for
     * unique expiration periods, BUT currently only one permission
     * per account makes sense for the infra. Dont over engineer.
     */
    expiration: string;
    /** The PDA bump to derive the pubkey. */
    bump: number;
    /** Reserved for future info. */
    ebuf: Array<number>;
}
export declare class PermissionAccountData {
    /** The authority that is allowed to set permissions for this account. */
    readonly authority: PublicKey;
    /** The SwitchboardPermission enumeration assigned by the granter to the grantee. */
    readonly permissions: number;
    /** Public key of account that is granting permissions to use its resources. */
    readonly granter: PublicKey;
    /** Public key of account that is being assigned permissions to use a granters resources. */
    readonly grantee: PublicKey;
    /**
     * unused currently. may want permission PDA per permission for
     * unique expiration periods, BUT currently only one permission
     * per account makes sense for the infra. Dont over engineer.
     */
    readonly expiration: BN;
    /** The PDA bump to derive the pubkey. */
    readonly bump: number;
    /** Reserved for future info. */
    readonly ebuf: Array<number>;
    static readonly discriminator: Buffer;
    static readonly layout: any;
    constructor(fields: PermissionAccountDataFields);
    static fetch(program: SwitchboardProgram, address: PublicKey): Promise<PermissionAccountData | null>;
    static fetchMultiple(program: SwitchboardProgram, addresses: PublicKey[]): Promise<Array<PermissionAccountData | null>>;
    static decode(data: Buffer): PermissionAccountData;
    toJSON(): PermissionAccountDataJSON;
    static fromJSON(obj: PermissionAccountDataJSON): PermissionAccountData;
}
//# sourceMappingURL=PermissionAccountData.d.ts.map