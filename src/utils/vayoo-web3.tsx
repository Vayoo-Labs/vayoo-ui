import * as anchor from "@project-serum/anchor";
import { vayooState } from "./types";
import { PublicKey, Transaction } from "@solana/web3.js";
import { COLLATERAL_MINT, USDC_MINT, VAYOO_CONTRACT_ID as PID, WHIRLPOOL_KEY } from "./constants";
import { useWallet, WalletContextState } from "@solana/wallet-adapter-react";
import { addZeros } from "./index";
import { getATAKey, getContractStatePDA, getPda, getUserStatePDA } from "./vayoo-pda";
import { BN } from "@project-serum/anchor";
import { createAssociatedTokenAccountInstruction } from "@solana/spl-token-v2";
import { sendTransaction } from "./web3-utils";
import { ORCA_WHIRLPOOL_PROGRAM_ID, PDAUtil, PriceMath, SwapUtils, TickArrayUtil } from "@orca-so/whirlpools-sdk";
import { DecimalUtil } from "@orca-so/common-sdk";

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

export async function triggerSettleMode(
  vayooState: vayooState,
  wallet: WalletContextState
) {
  const connection = vayooState!.vayooProgram.provider.connection;
  const transaction = new Transaction();
  transaction.add(
    await triggerSettleModeIx(
      vayooState,
    )
  );
  const txHash = await wallet.sendTransaction(transaction, connection);
  
  return txHash.toString();
}

export async function adminSettle(
  vayooState: vayooState,
  wallet: WalletContextState
) {
  const connection = vayooState!.vayooProgram.provider.connection;
  const transaction = new Transaction();
  transaction.add(
    await adminSettleIx(
      vayooState,
    )
  );
  const txHash = await wallet.sendTransaction(transaction, connection);
  
  return txHash.toString();
}

export async function userSettle(
  vayooState: vayooState,
  wallet: WalletContextState
) {
  const connection = vayooState!.vayooProgram.provider.connection;
  const transaction = new Transaction();
  transaction.add(
    await userSettleIx(
      vayooState,
    )
  );
  const txHash = await wallet.sendTransaction(transaction, connection);
  
  return txHash.toString();
}

export async function mmSettle(
  vayooState: vayooState,
  amountToRedeem: number,
  wallet: WalletContextState
) {
  const connection = vayooState!.vayooProgram.provider.connection;
  const transaction = new Transaction();
  transaction.add(
    await mmSettleIx(
      vayooState,
      amountToRedeem
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

export async function openLong(
  vayooState: vayooState,
  amountInCollateral: number,
  wallet: WalletContextState
) {
  const connection = vayooState!.vayooProgram.provider.connection;
  try{
  const transaction = new Transaction();


  if (!(await connection.getAccountInfo(vayooState?.accounts.vaultLcontractAta))) {
    transaction.add(
      createAssociatedTokenAccountInstruction(
        wallet.publicKey!,
        vayooState?.accounts.vaultLcontractAta,
        vayooState?.accounts.userState,
        vayooState?.accounts.lcontractMint
      )
    );
  }

  transaction.add(
    await longIx(
      vayooState,
      amountInCollateral,
      true,
      0
    )
  );
  console.log('herhe')
  const txHash = await wallet.sendTransaction(transaction, connection);
  
  return txHash.toString();
}catch {
    const transaction = new Transaction();
  console.log("New long version")

  if (!(await connection.getAccountInfo(vayooState?.accounts.vaultLcontractAta))) {
    transaction.add(
      createAssociatedTokenAccountInstruction(
        wallet.publicKey!,
        vayooState?.accounts.vaultLcontractAta,
        vayooState?.accounts.userState,
        vayooState?.accounts.lcontractMint
      )
    );
  }

  transaction.add(
    await longIx(
      vayooState,
      amountInCollateral,
      true,
      1
    )
  );
  const txHash = await wallet.sendTransaction(transaction, connection);
  
  return txHash.toString();
}
}

export async function closeLong(
  vayooState: vayooState,
  amountInCollateral: number,
  wallet: WalletContextState
) {
  const connection = vayooState!.vayooProgram.provider.connection;
  try{
  const transaction = new Transaction();
  if (!(await connection.getAccountInfo(vayooState?.accounts.vaultLcontractAta))) {
    transaction.add(
      createAssociatedTokenAccountInstruction(
        wallet.publicKey!,
        vayooState?.accounts.vaultLcontractAta,
        vayooState?.accounts.userState,
        vayooState?.accounts.lcontractMint
      )
    );
  }

  transaction.add(
    await longIx(
      vayooState,
      amountInCollateral,
      false,
      0
    )
  );
  const txHash = await wallet.sendTransaction(transaction, connection);
  
  return txHash.toString();
}catch{
  console.log("New Close long version")
    const transaction = new Transaction();
  if (!(await connection.getAccountInfo(vayooState?.accounts.vaultLcontractAta))) {
    transaction.add(
      createAssociatedTokenAccountInstruction(
        wallet.publicKey!,
        vayooState?.accounts.vaultLcontractAta,
        vayooState?.accounts.userState,
        vayooState?.accounts.lcontractMint
      )
    );
  }

  transaction.add(
    await longIx(
      vayooState,
      amountInCollateral,
      false,
      1
    )
  );
  const txHash = await wallet.sendTransaction(transaction, connection);
  
  return txHash.toString();
}

}

export async function openShort(
  vayooState: vayooState,
  amountInCollateral: number,
  wallet: WalletContextState
) {
  const connection = vayooState!.vayooProgram.provider.connection;
  try{
  const transaction = new Transaction();
  if (!(await connection.getAccountInfo(vayooState?.accounts.vaultLcontractAta))) {
    transaction.add(
      createAssociatedTokenAccountInstruction(
        wallet.publicKey!,
        vayooState?.accounts.vaultLcontractAta,
        vayooState?.accounts.userState,
        vayooState?.accounts.lcontractMint
      )
    );
  }

  transaction.add(
    await shortIx(
      vayooState,
      amountInCollateral,
      true,
      0
    )
  );
  const txHash = await wallet.sendTransaction(transaction, connection);
  
  return txHash.toString();
}catch{
    const transaction = new Transaction();
  if (!(await connection.getAccountInfo(vayooState?.accounts.vaultLcontractAta))) {
    transaction.add(
      createAssociatedTokenAccountInstruction(
        wallet.publicKey!,
        vayooState?.accounts.vaultLcontractAta,
        vayooState?.accounts.userState,
        vayooState?.accounts.lcontractMint
      )
    );
  }

  transaction.add(
    await shortIx(
      vayooState,
      amountInCollateral,
      true,
      1
    )
  );
  const txHash = await wallet.sendTransaction(transaction, connection);
  
  return txHash.toString();
}
}

export async function closeShort(
  vayooState: vayooState,
  amountInCollateral: number,
  wallet: WalletContextState
) {
  const connection = vayooState!.vayooProgram.provider.connection;
  try{
  const transaction = new Transaction();
  if (!(await connection.getAccountInfo(vayooState?.accounts.vaultLcontractAta))) {
    transaction.add(
      createAssociatedTokenAccountInstruction(
        wallet.publicKey!,
        vayooState?.accounts.vaultLcontractAta,
        vayooState?.accounts.userState,
        vayooState?.accounts.lcontractMint
      )
    );
  }

  transaction.add(
    await shortIx(
      vayooState,
      amountInCollateral,
      false,
      0
    )
  );
  const txHash = await wallet.sendTransaction(transaction, connection);
  
  return txHash.toString();
}catch{
  const transaction = new Transaction();
  if (!(await connection.getAccountInfo(vayooState?.accounts.vaultLcontractAta))) {
    transaction.add(
      createAssociatedTokenAccountInstruction(
        wallet.publicKey!,
        vayooState?.accounts.vaultLcontractAta,
        vayooState?.accounts.userState,
        vayooState?.accounts.lcontractMint
      )
    );
  }

  transaction.add(
    await shortIx(
      vayooState,
      amountInCollateral,
      false,
      1
    )
  );
  const txHash = await wallet.sendTransaction(transaction, connection);
  
  return txHash.toString();
}
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
      ...vayooState!.accounts,
      contractAuthority: admin,
      contractState: contractStateKey,
      escrowVaultCollateral: escrowVaultCollateral,
      lcontractMint: lcontractMint,
      scontractMint: scontractMint,
      pythFeed: pyth,
      collateralMint: USDC_MINT,
    })
    .instruction();
  console.log('Contract key: ', contractStateKey.toString());
  console.log('L Contract Mint: ', lcontractMint.toString())
  console.log('S Contract Mint: ', scontractMint.toString())
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



async function longIx(
  vayooState: vayooState,
  amountInCollateral: number,
  open: boolean,
  adjusting_tick_array: number,
) {
  const whirlpool_oracle_pubkey = PDAUtil.getOracle(ORCA_WHIRLPOOL_PROGRAM_ID, WHIRLPOOL_KEY).publicKey;
  const poolData = vayooState?.poolState!;
  const poolPrice = PriceMath.sqrtPriceX64ToPrice(poolData.sqrtPrice, 6 , 6)
  console.log("Price:", poolPrice.toString())
  console.log("Liquidity:", poolData.liquidity.toString())

    // Arguments for swap
    const a_input = DecimalUtil.toU64(DecimalUtil.fromNumber(amountInCollateral), 6);
    const amount = new anchor.BN(a_input);
    const other_amount_threshold = new anchor.BN(0);
    const amount_specified_is_input = true;
    // Conditional Swap Direction, Super Important
    const mintAIsCollateral = poolData.tokenMintA.equals(vayooState?.accounts.collateralMint)!;
    let a_to_b = open ? mintAIsCollateral : !mintAIsCollateral;

    const sqrt_price_limit = SwapUtils.getDefaultSqrtPriceLimit(a_to_b);
    const tickArrays = TickArrayUtil.getTickArrayPDAs(poolData.tickCurrentIndex, poolData.tickSpacing, 4, ORCA_WHIRLPOOL_PROGRAM_ID, WHIRLPOOL_KEY, a_to_b);
    const accounts = {
         ...vayooState?.accounts,
        whirlpoolProgram: ORCA_WHIRLPOOL_PROGRAM_ID,
        whirlpool: WHIRLPOOL_KEY,
        tokenVaultA: poolData.tokenVaultA,
        tokenVaultB: poolData.tokenVaultB,
        tickArray0: tickArrays[0+adjusting_tick_array].publicKey,
        tickArray1: tickArrays[1+adjusting_tick_array].publicKey,
        tickArray2: tickArrays[2+adjusting_tick_array].publicKey,
        oracle: whirlpool_oracle_pubkey,
    }
    if (open) {
      const ix = await vayooState!.vayooProgram.methods
      .longUser(
        amount,
        other_amount_threshold,
        sqrt_price_limit,
        amount_specified_is_input,
        a_to_b,
      )
      .accounts(accounts)
      .instruction();

      console.log('Opening Long :', amountInCollateral);
      return ix;
    } else {
      const ix = await vayooState!.vayooProgram.methods
      .closeLongUser(
        amount,
        other_amount_threshold,
        sqrt_price_limit,
        amount_specified_is_input,
        a_to_b,
      )
      .accounts(accounts)
      .instruction();

      console.log('Closing Long :', amountInCollateral);
      return ix;
    }
}

async function shortIx(
  vayooState: vayooState,
  amountInCollateral: number,
  open: boolean,
  adjusting_tick_array:number,
) {
  const whirlpool_oracle_pubkey = PDAUtil.getOracle(ORCA_WHIRLPOOL_PROGRAM_ID, WHIRLPOOL_KEY).publicKey;
  const poolData = vayooState?.poolState!;
  const poolPrice = PriceMath.sqrtPriceX64ToPrice(poolData.sqrtPrice, 6 , 6)
  console.log("Price:", poolPrice.toString())
  console.log("Liquidity:", poolData.liquidity.toString())

    // Arguments for swap
    const a_input = DecimalUtil.toU64(DecimalUtil.fromNumber(amountInCollateral), 6);
    const amount = new anchor.BN(a_input);
    const other_amount_threshold = new anchor.BN(0);
    const amount_specified_is_input = true;
    // Conditional Swap Direction, Super Important
    const mintAIsCollateral = poolData.tokenMintA.equals(vayooState?.accounts.collateralMint)!;
    let a_to_b = open ? !mintAIsCollateral : mintAIsCollateral;

    const sqrt_price_limit = SwapUtils.getDefaultSqrtPriceLimit(a_to_b);
    const tickArrays = TickArrayUtil.getTickArrayPDAs(poolData.tickCurrentIndex, poolData.tickSpacing, 4, ORCA_WHIRLPOOL_PROGRAM_ID, WHIRLPOOL_KEY, a_to_b);
    const accounts = {
         ...vayooState?.accounts,
        whirlpoolProgram: ORCA_WHIRLPOOL_PROGRAM_ID,
        whirlpool: WHIRLPOOL_KEY,
        tokenVaultA: poolData.tokenVaultA,
        tokenVaultB: poolData.tokenVaultB,
        tickArray0: tickArrays[0+adjusting_tick_array].publicKey,
        tickArray1: tickArrays[1+adjusting_tick_array].publicKey,
        tickArray2: tickArrays[2+adjusting_tick_array].publicKey,
        oracle: whirlpool_oracle_pubkey,
    }
    if (open) {
      const ix = await vayooState!.vayooProgram.methods
      .shortUser(
        amount,
        other_amount_threshold,
        sqrt_price_limit,
        amount_specified_is_input,
        a_to_b,
      )
      .accounts(accounts)
      .instruction();

      console.log('Opening Short :', amountInCollateral);
      return ix;
    } else {
      const ix = await vayooState!.vayooProgram.methods
      .closeShortUser(
        amount,
        other_amount_threshold,
        sqrt_price_limit,
        amount_specified_is_input,
        a_to_b,
      )
      .accounts(accounts)
      .instruction();

      console.log('Closing Short :', amountInCollateral);
      return ix;
    }
}

async function triggerSettleModeIx(
  vayooState: vayooState,
) {
  const ix = await vayooState!.vayooProgram.methods
  .triggerSettleMode().accounts({
    ...vayooState?.accounts
  }).instruction();
  console.log('Trigger Settle Mode');
  return ix;
}

async function adminSettleIx(
  vayooState: vayooState,
) {
  const ix = await vayooState!.vayooProgram.methods
  .adminSettle().accounts({
    ...vayooState?.accounts
  }).instruction();
  console.log('Admin Settling');
  return ix;
}

async function userSettleIx(
  vayooState: vayooState,
) {
  const ix = await vayooState!.vayooProgram.methods
  .userSettleLong().accounts({
    ...vayooState?.accounts
  }).instruction();
  console.log('User Settling');
  return ix;
}

async function mmSettleIx(
  vayooState: vayooState,
  amountToRedeem: number
) {
  const nativeAmount = new BN(addZeros(amountToRedeem, 6));
  const ix = await vayooState!.vayooProgram.methods
  .mmSettleLong(nativeAmount).accounts({
    ...vayooState?.accounts
  }).instruction();
  console.log('Mm Settling :',amountToRedeem);
  return ix;
}