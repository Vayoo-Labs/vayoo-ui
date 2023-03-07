import * as anchor from "@project-serum/anchor";
import { vayooState } from "./types";
import { PublicKey, Transaction } from "@solana/web3.js";
import { USDC_MINT, VAYOO_CONTRACT_ID as PID } from "./constants";
import { useWallet, WalletContextState } from "@solana/wallet-adapter-react";
import { addZeros } from "./index";
import { getContractStatePDA, getPda } from "./vayoo-pda";
import { BN } from "@project-serum/anchor";

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

export async function initContractIx(
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
      new BN(amplitude),
      new BN(contractEndTime)
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
