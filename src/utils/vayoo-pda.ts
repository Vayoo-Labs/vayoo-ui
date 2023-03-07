import { PublicKey } from '@solana/web3.js';
import { utils } from '@project-serum/anchor';
import { VAYOO_CONTRACT_ID as PID, CONTRACT_NAME, SUPER_USER_KEY, COLLATERAL_MINT } from './constants';
import { ASSOCIATED_TOKEN_PROGRAM_ID, TOKEN_PROGRAM_ID } from '@solana/spl-token';

const GLOBAL_STATE_SEED = 'GLOBAL_STATE_SEED';
const S_CONTRACT_MINT_SEED = 'scontract';
const L_CONTRACT_MINT_SEED = 'lcontract';
const ESCROW_SEED = 'escrow';
const FREE_SEED = 'free';
const LOCKED_SEED = 'locked';


export const getPda = (seeds: Buffer[], programId: PublicKey | string) => {
  return utils.publicKey.findProgramAddressSync(seeds, new PublicKey(programId));
};

export const getGlobalStatePDA = () => {
  const [pda, bump] = getPda([Buffer.from(GLOBAL_STATE_SEED)], PID);
  return {pda, bump};
};
export const getScontractMintPDA = () => {
  const [pda, bump] = getPda([Buffer.from(CONTRACT_NAME),Buffer.from(S_CONTRACT_MINT_SEED)], PID);
  return {pda, bump};
};
export const getLcontractMintPDA = () => {
    const [pda, bump] = getPda([Buffer.from(CONTRACT_NAME),Buffer.from(L_CONTRACT_MINT_SEED)], PID);
    return {pda, bump};
};
export const getContractStatePDA = (contractName: string = CONTRACT_NAME) => {
    const lContractMintKey = getLcontractMintPDA().pda;
    const [pda, bump] = getPda([Buffer.from(contractName),lContractMintKey.toBuffer(), SUPER_USER_KEY.toBuffer()], PID);
    return {pda, bump};
};
export const getEscrowVaultCollateralPDA = () => {
    const contractStateKey = getContractStatePDA().pda;
    const [pda, bump] = getPda([Buffer.from(ESCROW_SEED),COLLATERAL_MINT.toBuffer(), contractStateKey.toBuffer()], PID);
    return {pda, bump};
}
export const getUserStatePDA = (ownerKey: PublicKey) => {
    const contractStateKey = getContractStatePDA().pda;
    const [pda, bump] = getPda([contractStateKey.toBuffer(),ownerKey.toBuffer()], PID);
    return {pda, bump};
};
export const getFreeVaultCollateralPDA = (ownerKey: PublicKey) => {
    const userStateKey = getUserStatePDA(ownerKey).pda;
    const [pda, bump] = getPda([Buffer.from(FREE_SEED),userStateKey.toBuffer(), COLLATERAL_MINT.toBuffer()], PID);
    return {pda, bump};
};
export const getLockedVaultCollateralPDA = (ownerKey: PublicKey) => {
    const userStateKey = getUserStatePDA(ownerKey).pda;
    const [pda, bump] = getPda([Buffer.from(LOCKED_SEED),userStateKey.toBuffer(), COLLATERAL_MINT.toBuffer()], PID);
    return {pda, bump};
};
export const getFreeVaultScontractPDA = (ownerKey: PublicKey) => {
    const userStateKey = getUserStatePDA(ownerKey).pda;
    const sContractMintKey = getScontractMintPDA().pda;
    const [pda, bump] = getPda([Buffer.from(FREE_SEED),userStateKey.toBuffer(), sContractMintKey.toBuffer()], PID);
    return {pda, bump};
};
export const getLockedVaultScontractPDA = (ownerKey: PublicKey) => {
    const userStateKey = getUserStatePDA(ownerKey).pda;
    const sContractMintKey = getScontractMintPDA().pda;
    const [pda, bump] = getPda([Buffer.from(LOCKED_SEED),userStateKey.toBuffer(), sContractMintKey.toBuffer()], PID);
    return {pda, bump};
};
export const getATAKey = (owner: string | PublicKey, mint: string | PublicKey) => {
    const [ata, bump] = getPda(
      [new PublicKey(owner).toBuffer(), TOKEN_PROGRAM_ID.toBuffer(), new PublicKey(mint).toBuffer()],
      ASSOCIATED_TOKEN_PROGRAM_ID
    );
  
    return {ata, bump};
  };
