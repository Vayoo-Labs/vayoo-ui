import * as anchor from "@project-serum/anchor";
import { vayooState } from "./types";
import { PublicKey, Transaction } from "@solana/web3.js";
import { COLLATERAL_MINT, USDC_MINT, VAYOO_CONTRACT_ID as PID } from "./constants";
import { useWallet, WalletContextState } from "@solana/wallet-adapter-react";
import { addZeros } from "./index";
import { getContractStatePDA, getPda, getUserStatePDA } from "./vayoo-pda";
import { BN } from "@project-serum/anchor";
import { createAssociatedTokenAccountInstruction, createInitializeAccountInstruction } from "@solana/spl-token";
import { sendTransaction } from "./web3-utils";

export async function initContract(
  vayooState: vayooState,
  contractName: string,
  amplitude: number,
  duration: number,
  pythFeed: string,
  wallet: WalletContextState
) {
  const connection = vayooState!.vayooProgram.provider.connection;
  const transaction = new Transaction();
  transaction.add(
    await initContractIx(
      vayooState,
      contractName,
      amplitude,
      duration,
      pythFeed,
      wallet.publicKey!
    )
  );
  const txHash = await wallet.sendTransaction(transaction, connection);
  
  return txHash.toString();
}

export async function initUserState(
  vayooState: vayooState,
  wallet: WalletContextState
) {
  const connection = vayooState!.vayooProgram.provider.connection;
  const transaction = new Transaction();
  transaction.add(
    await initUserStateIx(
      vayooState,
      wallet.publicKey!
    )
  );
  const txHash = await wallet.sendTransaction(transaction, connection);
  
  return txHash.toString();
}

export async function mintAsMm(
  vayooState: vayooState,
  amount: number,
  wallet: WalletContextState
) {
  const connection = vayooState!.vayooProgram.provider.connection;
  const transaction = new Transaction();
  if (!(await connection.getAccountInfo(vayooState?.accounts.mmLockedScontractAta))) {
    transaction.add(
      createAssociatedTokenAccountInstruction(
        wallet.publicKey!,
        vayooState?.accounts.mmLockedScontractAta,
        vayooState?.accounts.userStateKey,
        vayooState?.accounts.scontractMint
      )
    );
  }
  if (!(await connection.getAccountInfo(vayooState?.accounts.mmLcontractAta))) {
    transaction.add(
      createAssociatedTokenAccountInstruction(
        wallet.publicKey!,
        vayooState?.accounts.mmLcontractAta,
        wallet.publicKey!,
        vayooState?.accounts.lcontractMint
      )
    );
  }
  transaction.add(
    await mintAsMmIx(
      vayooState,
      amount,
    )
  );
  const txHash = await wallet.sendTransaction(transaction, connection);
  
  return txHash.toString();
}

export async function burnAsMm(
  vayooState: vayooState,
  amount: number,
  wallet: WalletContextState
) {
  const connection = vayooState!.vayooProgram.provider.connection;
  const transaction = new Transaction();

  transaction.add(
    await burnAsMmIx(
      vayooState,
      amount,
    )
  );
  const txHash = await wallet.sendTransaction(transaction, connection);
  
  return txHash.toString();
}

export async function depositCollateral(
  vayooState: vayooState,
  amount: number,
  wallet: WalletContextState
) {
  const connection = vayooState!.vayooProgram.provider.connection;
  const transaction = new Transaction();

  transaction.add(
    await depositIx(
      vayooState,
      amount,
    )
  );
  const txHash = await wallet.sendTransaction(transaction, connection);
  
  return txHash.toString();
}

export async function withdrawCollateral(
  vayooState: vayooState,
  amount: number,
  wallet: WalletContextState
) {
  const connection = vayooState!.vayooProgram.provider.connection;
  const transaction = new Transaction();
  if (!(await connection.getAccountInfo(vayooState?.accounts.userCollateralAta))) {
    transaction.add(
      createAssociatedTokenAccountInstruction(
        wallet.publicKey!,
        vayooState?.accounts.userCollateralAta,
        wallet.publicKey!,
        COLLATERAL_MINT
      )
    );
  }
  transaction.add(
    await withdrawIx(
      vayooState,
      amount,
    )
  );
  const txHash = await wallet.sendTransaction(transaction, connection);
  
  return txHash.toString();
}


async function initContractIx(
  vayooState: vayooState,
  contractName: string,
  amplitude: number,
  duration: number,
  pythFeed: string,
  admin: PublicKey
) {
  const timeNow = Math.floor(Date.now() / 1000);
  const contractEndTime = new BN(timeNow + duration);
  const [scontractMint, scontractMintBump] = getPda(
    [Buffer.from(contractName), Buffer.from("scontract")],
    PID
  );
  const [lcontractMint, lcontractMintBump] =
    anchor.web3.PublicKey.findProgramAddressSync(
      [Buffer.from(contractName), Buffer.from("lcontract")],
      PID
    );
  const [contractStateKey, contractStateKeyBump] = getPda(
    [Buffer.from(contractName), lcontractMint.toBuffer(), admin.toBuffer()],
    PID
  );
  const [escrowVaultCollateral, escrowVaultCollateralBump] = getPda(
    [Buffer.from("escrow"), USDC_MINT.toBuffer(), contractStateKey.toBuffer()],
    PID
  );
  const pyth = new PublicKey(pythFeed);

  const ix = await vayooState!.vayooProgram.methods
    .initializeContract(
      contractName,
      contractStateKeyBump,
      new BN(contractEndTime),
      new BN(amplitude)
    )
    .accounts({
      contractAuthority: admin,
      contractState: contractStateKey,
      escrowVaultCollateral: escrowVaultCollateral,
      lcontractMint: lcontractMint,
      scontractMint: scontractMint,
      pythFeed: pyth,
      collateralMint: USDC_MINT,
      ...vayooState!.accounts,
    })
    .instruction();
  console.log('Contract key: ', contractStateKey.toString());
  return ix;
}

async function initUserStateIx(
  vayooState: vayooState,
  user: PublicKey
) {
  const bump = getUserStatePDA(user).bump;

  const ix = await vayooState!.vayooProgram.methods
  .initializeUser(
    bump
  ).accounts({
    ...vayooState?.accounts
  }).instruction();
  console.log('User State Key: ', vayooState?.accounts.userState.toString());
  return ix;
}

async function depositIx(
  vayooState: vayooState,
  amount: number,
) {
  const nativeAmount = new BN(addZeros(amount, 6));
  const ix = await vayooState!.vayooProgram.methods
  .depositCollateral(
    nativeAmount
  ).accounts({
    ...vayooState?.accounts
  }).instruction();
  console.log('Depositing :', amount);
  return ix;
}

async function mintAsMmIx(
  vayooState: vayooState,
  amount: number,
) {
  const nativeAmount = new BN(addZeros(amount, 6));
  const ix = await vayooState!.vayooProgram.methods
  .mintLContractMm(
    nativeAmount
  ).accounts({
    ...vayooState?.accounts
  }).instruction();
  console.log('Minting as MM :', amount);
  return ix;
}

async function burnAsMmIx(
  vayooState: vayooState,
  amount: number,
) {
  const nativeAmount = new BN(addZeros(amount, 6));
  const ix = await vayooState!.vayooProgram.methods
  .burnLContractMm(
    nativeAmount
  ).accounts({
    ...vayooState?.accounts
  }).instruction();
  console.log('Burning as Mm:', amount);
  return ix;
}

async function withdrawIx(
  vayooState: vayooState,
  amount: number,
) {
  const nativeAmount = new BN(addZeros(amount, 6));
  const ix = await vayooState!.vayooProgram.methods
  .withdrawCollateral(
    nativeAmount
  ).accounts({
    ...vayooState?.accounts
  }).instruction();
  console.log('Withdrawing :', amount);
  return ix;
}

