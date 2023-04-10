/// <reference types="node" />
import * as types from '../generated';
import { SwitchboardProgram } from '../SwitchboardProgram';
import { TransactionObject } from '../TransactionObject';
import { Account } from './account';
import * as anchor from '@coral-xyz/anchor';
import { AccountInfo, Keypair, PublicKey, TransactionSignature } from '@solana/web3.js';
/**
 * Account type representing Switchboard global program state.
 *
 * Data: {@linkcode types.SbState}
 */
export declare class ProgramStateAccount extends Account<types.SbState> {
    static accountName: string;
    static size: number;
    /**
     * @return account size of the global {@linkcode ProgramStateAccount}.
     */
    readonly size: number;
    /**
     * Return a program state account state initialized to the default values.
     */
    static default(): types.SbState;
    /**
     * Create a mock account info for a given program state config. Useful for test integrations.
     */
    static createMock(programId: PublicKey, data: Partial<types.SbState>, options?: {
        lamports?: number;
        rentEpoch?: number;
    }): AccountInfo<Buffer>;
    /** Load the ProgramStateAccount with its current on-chain state */
    static load(program: SwitchboardProgram, publicKey: PublicKey | string): Promise<[ProgramStateAccount, types.SbState]>;
    /**
     * Retrieve and decode the {@linkcode types.SbState} stored in this account.
     */
    loadData(): Promise<types.SbState>;
    /**
     * Retrieves the {@linkcode ProgramStateAccount}, creates it if it doesn't exist;
     */
    static getOrCreate(program: SwitchboardProgram, params?: ProgramInitParams): Promise<[ProgramStateAccount, number, TransactionSignature | undefined]>;
    static getOrCreateInstructions(program: SwitchboardProgram, payer: PublicKey, params?: ProgramInitParams): Promise<[ProgramStateAccount, number, TransactionObject | undefined]>;
    /**
     * Finds the {@linkcode ProgramStateAccount} from the static seed from which it was generated.
     * @return ProgramStateAccount and PDA bump tuple.
     */
    static fromSeed(program: SwitchboardProgram): [ProgramStateAccount, number];
    /**
     * Transfer N tokens from the program vault to a specified account.
     * @param to The recipient of the vault tokens.
     * @param authority The vault authority required to sign the transfer tx.
     * @param params specifies the amount to transfer.
     * @return TransactionSignature
     */
    static vaultTransfer(program: SwitchboardProgram, to: PublicKey, authority: anchor.web3.Keypair, params: {
        stateBump: number;
        amount: anchor.BN;
    }): Promise<TransactionSignature>;
}
export interface ProgramInitParams {
    mint?: PublicKey;
    daoMint?: PublicKey;
    vaultKeypair?: Keypair;
}
//# sourceMappingURL=programStateAccount.d.ts.map