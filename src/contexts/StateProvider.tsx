import {
  SignatureResult,
  SystemProgram,
  SYSVAR_RENT_PUBKEY,
} from "@solana/web3.js";
import React, { useEffect, useState } from "react";

import { getVayooProgramInstance, sleep } from "../utils";
import { useWallet, useConnection } from "@solana/wallet-adapter-react";

import {
  getContractStatePDA,
  getEscrowVaultCollateralPDA,
  getFreeVaultCollateralPDA,
  getFreeVaultScontractPDA,
  getLcontractMintPDA,
  getLockedVaultCollateralPDA,
  getLockedVaultScontractPDA,
  getScontractMintPDA,
  getUserStatePDA,
} from "../utils/vayoo-pda";
import { vayooState } from "../utils/types";
import {
  getAssociatedTokenAddressSync,
  TOKEN_PROGRAM_ID,
} from "@solana/spl-token-v2";
import {
  COLLATERAL_MINT,
  PYTH_FEED,
  REFRESH_TIME_INTERVAL,
  USDC_MINT,
  WHIRLPOOL_KEY,
} from "../utils/constants";
import {
  AccountFetcher, buildWhirlpoolClient, ORCA_WHIRLPOOL_PROGRAM_ID, PriceMath, WhirlpoolContext,
} from "@orca-so/whirlpools-sdk";
import {
  parsePriceData,
} from "@pythnetwork/client";
import { WalletOrca } from "../utils/web3-utils";

interface VMStateConfig {
  state: vayooState;
  subscribeTx: (
    txHash: string,
    onTxSent?: any,
    onTxSuccess?: any,
    onTxFailed?: any
  ) => void;
  toggleRefresh: () => void;
  loading: boolean;
}

const VMStateContext = React.createContext<VMStateConfig>({
  state: null,
  subscribeTx: () => {},
  toggleRefresh: () => {},
  loading: false,
});

export function VMStateProvider({ children = undefined as any }) {
  const { connection } = useConnection();
  const wallet = useWallet();

  const [state, setState] = useState<vayooState>(null);
  const [refresh, setRefresh] = useState(false);
  const [loading, setLoading] = useState(true);
  const [toogleUpdateState, setToogleUpdateState] = useState(false);
  const orcaFetcher = new AccountFetcher(connection);
  const [pythData, setPythData] = useState<any>(null);

  const subscribeTx = async (
    txHash: string,
    onTxSent: any,
    onTxSuccess: any,
    onTxFailed: any
  ) => {
    if (txHash) {
      onTxSent();
      console.log("Sent tx: ", txHash);
    } else {
      onTxFailed();
      return;
    }
    // connection.confirmTransaction();
    connection.onSignature(
      txHash,
      async function (signatureResult: SignatureResult) {
        console.log("onProcessed");
        if (!signatureResult.err) {
          onTxSuccess();
        } else {
          onTxFailed();
        }
      },
      "processed"
    );
  };

  const updateState = async () => {
    let accounts: any = {
      collateralMint: USDC_MINT,
      systemProgram: SystemProgram.programId,
      rent: SYSVAR_RENT_PUBKEY,
      tokenProgram: TOKEN_PROGRAM_ID,
    };

    const whirlpoolState = await orcaFetcher.getPool(WHIRLPOOL_KEY, true);
    const whirlpoolClient = buildWhirlpoolClient(WhirlpoolContext.from(connection, wallet as WalletOrca, ORCA_WHIRLPOOL_PROGRAM_ID));
    const whirlpool = await whirlpoolClient.getPool(WHIRLPOOL_KEY);

    const program = await getVayooProgramInstance(connection, wallet);
    const contractStateKey = getContractStatePDA().pda;
    const lcontractMint = getLcontractMintPDA().pda;
    const scontractMint = getScontractMintPDA().pda;
    const escrowVaultCollateral = getEscrowVaultCollateralPDA().pda;
    const contractState = await program.account.contractState.fetchNullable(
      contractStateKey
    );

    const poolPrice = PriceMath.sqrtPriceX64ToPrice(whirlpoolState?.sqrtPrice!, 6, 6);
    const assetPrice = poolPrice.toNumber() + (contractState?.startingPrice.toNumber()! / 1e5) - (contractState?.limitingAmplitude.toNumber()! / 2)

    if (wallet?.publicKey) {
      const userStateKey = getUserStatePDA(wallet.publicKey!).pda;
      const vaultFreeCollateralAta = getFreeVaultCollateralPDA(
        wallet.publicKey!
      ).pda;
      const vaultLockedCollateralAta = getLockedVaultCollateralPDA(
        wallet.publicKey!
      ).pda;
      const vaultFreeScontractAta = getFreeVaultScontractPDA(
        wallet.publicKey!
      ).pda;
      const vaultLockedScontractAta = getLockedVaultScontractPDA(
        wallet.publicKey!
      ).pda;
      const userCollateralAta = getAssociatedTokenAddressSync(
        COLLATERAL_MINT,
        wallet.publicKey!,
        true
      );
      const vaultLcontractAta = getAssociatedTokenAddressSync(
        lcontractMint,
        userStateKey,
        true
      );
      const mmLcontractAta = getAssociatedTokenAddressSync(
        lcontractMint,
        wallet.publicKey,
        true
      );

      const userState = await program.account.userState.fetchNullable(
        userStateKey
      );

      accounts = {
        ...accounts,
        lcontractMint,
        scontractMint,
        escrowVaultCollateral,
        vaultFreeCollateralAta,
        vaultLockedCollateralAta,
        vaultFreeScontractAta,
        vaultLockedScontractAta,
        userState: userStateKey,
        userAuthority: wallet.publicKey,
        contractState: contractStateKey,
        userCollateralAta,
        mmLockedScontractAta: vaultLockedScontractAta,
        mmLcontractAta,
        vaultLcontractAta,
        pythFeed: PYTH_FEED
      };

      setState((prev: vayooState) => ({
        // ...prev,
        accounts: accounts,
        contractState: contractState,
        globalState: null,
        vayooProgram: program,
        userState: userState,
        poolState: whirlpoolState,
        pythData: pythData,
        assetPrice: assetPrice,
        whirlpool: whirlpool,
        orcaFetcher
      }));

      return;
    }

    setState({
      vayooProgram: program,
      accounts: null,
      contractState: contractState,
      globalState: null,
      userState: null,
      poolState: whirlpoolState,
      pythData: pythData,
      assetPrice: assetPrice,
      whirlpool: null,
      orcaFetcher
    });
  };

  useEffect(() => {
    (async () => {
      setLoading(true);
      console.log("--updating state--");
      await updateState();
      console.log("--updated state--");
      setLoading(false);
    })();
  }, [connection, wallet, refresh, toogleUpdateState]);

  useEffect(() => {
    if (connection) {
      if (
        wallet &&
        wallet.connected &&
        !wallet.disconnecting &&
        !wallet.connecting
      ) {
        console.log("--Wallet is connected--");
        connection.onAccountChange(wallet.publicKey!, (acc) => {
          if (acc) {
            console.log("--Wallet balance changed--");
            setRefresh((prev) => !prev);
          }
        });
        // Pyth Feed
        connection.onAccountChange(PYTH_FEED, (account) => {
          const parsedData = parsePriceData(account.data);
          setPythData(parsedData);
          setRefresh((prev) => !prev)
        });
      }
    }
    return () => {};
  }, [connection, wallet, toogleUpdateState]);

  useEffect(() => {
    setInterval(() => {
      setToogleUpdateState((prev) => !prev);
    }, REFRESH_TIME_INTERVAL);
  }, []);

  return (
    <VMStateContext.Provider
      value={{
        state,
        subscribeTx,
        toggleRefresh: () => setRefresh((refresh) => !refresh),
        loading,
      }}
    >
      {children}
    </VMStateContext.Provider>
  );
}

export function useVMState() {
  const context = React.useContext(VMStateContext);

  return {
    state: context.state,
    loading: context.loading,
    toggleRefresh: context.toggleRefresh,
  };
}

export function useSubscribeTx() {
  const context = React.useContext(VMStateContext);

  return context.subscribeTx;
}
