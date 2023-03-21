import {
  PublicKey,
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
import { selectedContractData, vayooState } from "../utils/types";
import {
  getAssociatedTokenAddressSync,
  TOKEN_PROGRAM_ID,
} from "@solana/spl-token-v2";
import {
  COLLATERAL_MINT,
  REFRESH_TIME_INTERVAL,
  USDC_MINT,
  CONTRACT_LIST,
} from "../utils/constants";
import {
  AccountFetcher, buildWhirlpoolClient, ORCA_WHIRLPOOL_PROGRAM_ID, PDAUtil, PriceMath, WhirlpoolContext,
} from "@orca-so/whirlpools-sdk";
import {
  parsePriceData, PriceData,
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
  selectedContract: selectedContractData;
  changeSelectedContract: (
    name: string,
    whirlpoolKey: PublicKey,
    pythFeed: PublicKey,
    pythExponent: number
  ) => void;
}

const VMStateContext = React.createContext<VMStateConfig>({
  state: null,
  subscribeTx: () => {},
  toggleRefresh: () => {},
  loading: false,
  selectedContract: null,
  changeSelectedContract: () => {},
});

export function VMStateProvider({ children = undefined as any }) {
  const { connection } = useConnection();
  const wallet = useWallet();

  const [selectedContract, setSelectedContract] = useState<selectedContractData>({
    name: CONTRACT_LIST[0].name,
    whirlpoolKey: CONTRACT_LIST[0].whirlpoolKey,
    pythFeed: CONTRACT_LIST[0].pythFeed,
    pythExponent: CONTRACT_LIST[0].pythExponent
  });
  const [state, setState] = useState<vayooState>(null);
  const [refresh, setRefresh] = useState(false);
  const [loading, setLoading] = useState(true);
  const [toogleUpdateState, setToogleUpdateState] = useState(false);
  const orcaFetcher = new AccountFetcher(connection);
  const whirlpoolClient = buildWhirlpoolClient(WhirlpoolContext.from(connection, wallet as WalletOrca, ORCA_WHIRLPOOL_PROGRAM_ID));
  const [pythData, setPythData] = useState<PriceData | null>(null);

  const changeContract = (name: string, whirlpoolKey: PublicKey, pythFeed: PublicKey, pythExponent: number) => {
    setSelectedContract({
      name,
      whirlpoolKey,
      pythFeed,
      pythExponent
    })
    return;
  }

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

    const whirlpool = await whirlpoolClient.getPool(selectedContract?.whirlpoolKey!, true);
    const whirlpoolState = whirlpool.getData();
    const whirlpoolOraclePda = PDAUtil.getOracle(ORCA_WHIRLPOOL_PROGRAM_ID, selectedContract?.whirlpoolKey!).publicKey;

    const program = await getVayooProgramInstance(connection, wallet);
    const contractStateKey = getContractStatePDA(selectedContract?.name!).pda;
    const lcontractMint = getLcontractMintPDA(selectedContract?.name!).pda;
    const scontractMint = getScontractMintPDA(selectedContract?.name!).pda;
    const escrowVaultCollateral = getEscrowVaultCollateralPDA(selectedContract?.name!).pda;
    const contractState = await program.account.contractState.fetchNullable(
      contractStateKey
    );

    const poolPrice = PriceMath.sqrtPriceX64ToPrice(whirlpoolState?.sqrtPrice!, 6, 6);
    const assetPrice = poolPrice.toNumber() + (contractState?.startingPrice.toNumber()! / selectedContract?.pythExponent!) - (contractState?.limitingAmplitude.toNumber()! / 2)

    if (wallet?.publicKey) {
      const userStateKey = getUserStatePDA(selectedContract?.name!, wallet.publicKey!).pda;
      const vaultFreeCollateralAta = getFreeVaultCollateralPDA(
        selectedContract?.name!,
        wallet.publicKey!
      ).pda;
      const vaultLockedCollateralAta = getLockedVaultCollateralPDA(
        selectedContract?.name!,
        wallet.publicKey!
      ).pda;
      const vaultFreeScontractAta = getFreeVaultScontractPDA(
        selectedContract?.name!,
        wallet.publicKey!
      ).pda;
      const vaultLockedScontractAta = getLockedVaultScontractPDA(
        selectedContract?.name!,
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
        mmCollateralWalletAta: userCollateralAta,
        vaultLcontractAta,
        pythFeed: selectedContract?.pythFeed,
        whirlpoolProgram: ORCA_WHIRLPOOL_PROGRAM_ID,
        whirlpool: selectedContract?.whirlpoolKey!,
        tokenVaultA: whirlpoolState.tokenVaultA,
        tokenVaultB: whirlpoolState.tokenVaultB,
        oracle: whirlpoolOraclePda,
      };

      setState((prev: vayooState) => ({
        // ...prev,
        accounts: accounts,
        contractState: contractState,
        globalState: null,
        vayooProgram: program,
        userState: userState,
        poolState: whirlpoolState,
        pythData: pythData!,
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
      pythData: pythData!,
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
  }, [connection, wallet, refresh, toogleUpdateState, selectedContract]);

  useEffect(() => {
    let controller: number;
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
        // Pyth Feed Initial Fetching
        (async () => {
          const pythAccount = (await connection.getAccountInfo(selectedContract?.pythFeed!))?.data!;
          const parsedPythData = parsePriceData(pythAccount);
          setPythData(parsedPythData);
          setRefresh((prev) => !prev);
        })()
        // Add listener on pyth account for refreshes
        controller = connection.onAccountChange(selectedContract?.pythFeed!, (account) => {
          const parsedData = parsePriceData(account.data);
          setPythData(parsedData);
          setRefresh((prev) => !prev)
        });
      }
    }
    return () => {
      connection.removeAccountChangeListener(controller as number)
    };
  }, [connection, wallet, toogleUpdateState, selectedContract]);

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
        changeSelectedContract: changeContract,
        selectedContract
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

export function useSelectedContract() {
  const context = React.useContext(VMStateContext);

  return {
    selectedContract: context.selectedContract,
    changeSelectedContract: context.changeSelectedContract
  }
}