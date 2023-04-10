import * as types from '../generated';
import { SwitchboardProgram } from '../SwitchboardProgram';
import { TransactionObject, TransactionObjectOptions } from '../TransactionObject';
import { Account, OnAccountChangeCallback } from './account';
import { PermissionAccount } from './permissionAccount';
import { QueueAccount } from './queueAccount';
import { Callback } from './vrfAccount';
import { Commitment, Keypair, PublicKey, TransactionSignature } from '@solana/web3.js';
import { BN } from '@switchboard-xyz/common';
export interface VrfLiteInitParams {
    callback?: Callback;
    expiration?: number;
    keypair?: Keypair;
    authority?: PublicKey;
}
export type VrfLiteDepositParams = {
    tokenWallet?: PublicKey;
    tokenAuthority?: Keypair;
    amount: number;
};
export interface VrfLiteProveAndVerifyParams {
    vrfLite: types.VrfLiteAccountData;
    counter?: BN;
    proof: string;
    oraclePubkey: PublicKey;
    oracleTokenWallet: PublicKey;
    oracleAuthority: PublicKey;
}
export interface VrfLiteCloseParams {
    destination?: PublicKey;
    authority?: Keypair;
    queueAccount?: QueueAccount;
    queueAuthority?: PublicKey;
}
export declare class VrfLiteAccount extends Account<types.VrfLiteAccountData> {
    size: number;
    /**
     * Invoke a callback each time a VrfAccount's data has changed on-chain.
     * @param callback - the callback invoked when the vrf state changes
     * @param commitment - optional, the desired transaction finality. defaults to 'confirmed'
     * @returns the websocket subscription id
     */
    onChange(callback: OnAccountChangeCallback<types.VrfLiteAccountData>, commitment?: Commitment): number;
    loadData(): Promise<types.VrfLiteAccountData>;
    static createInstruction(program: SwitchboardProgram, payer: PublicKey, params: VrfLiteInitParams & {
        queueAccount: QueueAccount;
    }): Promise<[VrfLiteAccount, TransactionObject]>;
    static create(program: SwitchboardProgram, params: VrfLiteInitParams & {
        queueAccount: QueueAccount;
    }): Promise<[VrfLiteAccount, TransactionSignature]>;
    depositInstructions(payer: PublicKey, params: VrfLiteDepositParams): Promise<TransactionObject>;
    deposit(params: VrfLiteDepositParams): Promise<TransactionSignature>;
    proveAndVerifyInstructions(params: VrfLiteProveAndVerifyParams, options?: TransactionObjectOptions, numTxns?: number): Array<TransactionObject>;
    proveAndVerify(params: Partial<VrfLiteProveAndVerifyParams> & {
        skipPreflight?: boolean;
    }, options?: TransactionObjectOptions, numTxns?: number): Promise<Array<TransactionSignature>>;
    awaitRandomness(params: {
        requestSlot: BN;
    }, timeout?: number): Promise<types.VrfLiteAccountData>;
    closeAccountInstruction(payer: PublicKey, params?: VrfLiteCloseParams): Promise<TransactionObject>;
    closeAccount(params?: VrfLiteCloseParams): Promise<TransactionSignature>;
    getPermissionAccount(queuePubkey: PublicKey, queueAuthority: PublicKey): [PermissionAccount, number];
    getEscrow(): PublicKey;
}
//# sourceMappingURL=vrfLiteAccount.d.ts.map