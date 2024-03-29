/// <reference types="node" />
import * as types from '../generated';
import { VrfPoolRequestEvent } from '../SwitchboardEvents';
import { SwitchboardProgram } from '../SwitchboardProgram';
import { TransactionObject } from '../TransactionObject';
import { Account, OnAccountChangeCallback } from './account';
import { PermissionAccount } from './permissionAccount';
import { CreateVrfLiteParams, QueueAccount } from './queueAccount';
import { Callback } from './vrfAccount';
import { VrfLiteAccount } from './vrfLiteAccount';
import { AccountMeta, Commitment, Keypair, PublicKey, TransactionSignature } from '@solana/web3.js';
export type VrfPoolPushNewParams = CreateVrfLiteParams & Omit<VrfPoolPushParams, 'vrf'> & {
    queueAccount?: QueueAccount;
    vrfPool?: types.VrfPoolAccountData;
};
export interface VrfPoolInitParams {
    maxRows: number;
    minInterval?: number;
    authority?: PublicKey;
    keypair?: Keypair;
}
export interface VrfPoolPushParams {
    authority?: Keypair;
    vrf: VrfLiteAccount;
    permission?: PermissionAccount;
}
export interface VrfPoolPopParams {
    authority?: Keypair;
}
export interface VrfPoolRequestParams {
    authority?: Keypair;
    callback?: Callback;
}
export type VrfPoolDepositParams = {
    tokenWallet?: PublicKey;
    tokenAuthority?: Keypair;
    amount: number;
    disableWrap?: boolean;
};
export type VrfPoolAccountData = types.VrfPoolAccountData & {
    pool: Array<types.VrfPoolRow>;
};
export declare class VrfPoolAccount extends Account<VrfPoolAccountData> {
    size: number;
    /**
     * Invoke a callback each time a VrfAccount's data has changed on-chain.
     * @param callback - the callback invoked when the vrf state changes
     * @param commitment - optional, the desired transaction finality. defaults to 'confirmed'
     * @returns the websocket subscription id
     */
    onChange(callback: OnAccountChangeCallback<VrfPoolAccountData>, commitment?: Commitment): number;
    static decode(data: Buffer): VrfPoolAccountData;
    loadData(): Promise<VrfPoolAccountData>;
    static getSize(program: SwitchboardProgram, maxRows: number): any;
    static createInstruction(program: SwitchboardProgram, payer: PublicKey, params: VrfPoolInitParams & {
        queueAccount: QueueAccount;
    }): Promise<[VrfPoolAccount, TransactionObject]>;
    static create(program: SwitchboardProgram, params: VrfPoolInitParams & {
        queueAccount: QueueAccount;
    }): Promise<[VrfPoolAccount, TransactionSignature]>;
    pushNewInstruction(payer: PublicKey, params?: VrfPoolPushNewParams): Promise<[VrfLiteAccount, TransactionObject]>;
    pushNew(params?: VrfPoolPushNewParams): Promise<[VrfLiteAccount, TransactionSignature]>;
    pushInstruction(payer: PublicKey, params: VrfPoolPushParams): Promise<TransactionObject>;
    push(params: VrfPoolPushParams): Promise<TransactionSignature>;
    popInstructions(payer: PublicKey, params?: VrfPoolPopParams): Promise<TransactionObject>;
    pop(params?: VrfPoolPopParams): Promise<TransactionSignature>;
    /** Returns the sorted, next {@param size} rows in the pool */
    getRemainingAccounts(vrfPool: VrfPoolAccountData, queueAuthority: PublicKey, size?: number): Array<AccountMeta>;
    requestInstructions(payer: PublicKey, params?: VrfPoolRequestParams, size?: number): Promise<TransactionObject>;
    request(params?: VrfPoolRequestParams): Promise<TransactionSignature>;
    depositInstructions(payer: PublicKey, params: VrfPoolDepositParams): Promise<TransactionObject>;
    deposit(params: VrfPoolDepositParams): Promise<TransactionSignature>;
    requestAndAwaitEvent(params?: {
        vrf?: types.VrfAccountData;
    } & (VrfPoolRequestParams | {
        requestFunction: (...args: any[]) => Promise<TransactionSignature>;
    }), timeout?: number): Promise<[VrfPoolRequestEvent, TransactionSignature]>;
    getPermissionAccount(queuePubkey: PublicKey, queueAuthority: PublicKey): [PermissionAccount, number];
    getEscrow(): PublicKey;
    fetchBalance(escrow?: PublicKey): Promise<number>;
    fundUpToInstruction(payer: PublicKey, fundUpTo: number, disableWrap?: boolean): Promise<[TransactionObject | undefined, number | undefined]>;
    fundUpTo(payer: PublicKey, fundUpTo: number, disableWrap?: boolean): Promise<[TransactionSignature | undefined, number | undefined]>;
}
//# sourceMappingURL=vrfPoolAccount.d.ts.map