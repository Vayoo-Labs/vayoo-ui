import {
  PublicKey,
  SignatureResult,
  SystemProgram,
  SYSVAR_RENT_PUBKEY,
} from "@solana/web3.js";
import React, { useEffect, useState } from "react";

import { getVayooProgramInstance } from "../utils";
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
import {
  OracleData,
  OracleFeedType,
  selectedContractData,
  UserPosition,
  vayooState,
} from "../utils/types";
import {
  getAssociatedTokenAddressSync,
  TOKEN_PROGRAM_ID,
} from "@solana/spl-token-v2";
import {
  COLLATERAL_MINT,
  DUMMY_PYTH_KEY,
  DUMMY_SWITCHBOARD_KEY,
  REFRESH_TIME_INTERVAL,
  USDC_MINT,
  VAYOO_BACKEND_ENDPOINT,
} from "../utils/constants";
import {
  AccountFetcher,
  buildWhirlpoolClient,
  ORCA_WHIRLPOOL_PROGRAM_ID,
  PDAUtil,
  PriceMath,
  WhirlpoolContext,
} from "@orca-so/whirlpools-sdk";
import { parsePriceData, PriceData } from "@pythnetwork/client";
import { fetchAxiosWithRetry, WalletOrca } from "../utils/web3-utils";
import {
  AggregatorAccount,
  SwitchboardProgram,
} from "@switchboard-xyz/solana.js";
import { sleep } from "../utils/whirlpoolUtils/utils";

interface VMStateConfig {
  state: vayooState;
  oracleState: OracleData;
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
    oracleFeedType: number,
    oracleFeed: PublicKey,
    oracleExponent: number,
    extraInfo: any
  ) => void;
  allContractInfo: any;
}

const VMStateContext = React.createContext<VMStateConfig>({
  state: null,
  oracleState: null,
  subscribeTx: () => {},
  toggleRefresh: () => {},
  loading: false,
  selectedContract: null,
  changeSelectedContract: () => {},
  allContractInfo: null,
});

export function VMStateProvider({ children = undefined as any }) {
  const { connection } = useConnection();
  const wallet = useWallet();
  const [allContractInfo, setAllContractInfo] = useState();

  const [selectedContract, setSelectedContract] =
    useState<selectedContractData>(null);
  const [state, setState] = useState<vayooState>(null);
  const [refresh, setRefresh] = useState(false);
  const [loading, setLoading] = useState(true);
  const [toogleUpdateState, setToogleUpdateState] = useState(false);
  const orcaFetcher = new AccountFetcher(connection);
  const whirlpoolClient = buildWhirlpoolClient(
    WhirlpoolContext.from(
      connection,
      wallet as WalletOrca,
      ORCA_WHIRLPOOL_PROGRAM_ID
    )
  );
  const [switchboardProgram, setSwitchboardProgram] =
    useState<SwitchboardProgram | null>(null);
  const [oracleState, setOracleState] = useState<OracleData>(null);

  const changeContract = (
    name: string,
    whirlpoolKey: PublicKey,
    oracleFeedType: number,
    oracleFeed: PublicKey,
    oracleExponent: number,
    extraInfo: any
  ) => {
    oracleExponent = 1 / 10 ** oracleExponent;
    setSelectedContract({
      name,
      whirlpoolKey,
      oracleFeedType,
      oracleFeed,
      oracleExponent,
      extraInfo,
    });
    return;
  };

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

  const updateFullState = async () => {
    let accounts: any = {
      collateralMint: USDC_MINT,
      systemProgram: SystemProgram.programId,
      rent: SYSVAR_RENT_PUBKEY,
      tokenProgram: TOKEN_PROGRAM_ID,
      pythFeed: DUMMY_PYTH_KEY,
      switchboardFeed: DUMMY_SWITCHBOARD_KEY,
    };

    const whirlpool = await whirlpoolClient.getPool(
      selectedContract?.whirlpoolKey!,
      true
    );
    const whirlpoolState = whirlpool.getData();
    const whirlpoolOraclePda = PDAUtil.getOracle(
      ORCA_WHIRLPOOL_PROGRAM_ID,
      selectedContract?.whirlpoolKey!
    ).publicKey;

    const program = await getVayooProgramInstance(connection, wallet);
    const contractStateKey = getContractStatePDA(selectedContract?.name!).pda;
    const lcontractMint = getLcontractMintPDA(selectedContract?.name!).pda;
    const scontractMint = getScontractMintPDA(selectedContract?.name!).pda;
    const escrowVaultCollateral = getEscrowVaultCollateralPDA(
      selectedContract?.name!
    ).pda;
    const contractState = await program.account.contractState.fetchNullable(
      contractStateKey
    );
    const poolPrice = PriceMath.sqrtPriceX64ToPrice(
      whirlpoolState?.sqrtPrice!,
      6,
      6
    );
    const assetPrice =
      poolPrice.toNumber() +
      contractState?.startingPrice.toNumber()! /
        selectedContract?.oracleExponent! -
      contractState?.limitingAmplitude.toNumber()! / 2;

    if (wallet?.publicKey) {
      const userStateKey = getUserStatePDA(
        selectedContract?.name!,
        wallet.publicKey!
      ).pda;
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

      if (contractState?.feedType == OracleFeedType.Pyth) {
        accounts = {
          ...accounts,
          pythFeed: selectedContract?.oracleFeed,
        };
      } else if (contractState?.feedType == OracleFeedType.Switchboard) {
        accounts = {
          ...accounts,
          switchboardFeed: selectedContract?.oracleFeed,
        };
      }

      let userPosition: UserPosition;
      if (userState?.lcontractMintedAsMm.toNumber()! > 0) {
        userPosition = UserPosition.Mm;
      } else {
        if (userState?.lcontractBoughtAsUser.toNumber()! > 0) {
          userPosition = UserPosition.Long;
        } else if (userState?.scontractSoldAsUser.toNumber()! < 0) {
          userPosition = UserPosition.Short;
        } else {
          userPosition = UserPosition.Neutral;
        }
      }
    
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
        userPosition,
        poolState: whirlpoolState,
        assetPrice: assetPrice,
        whirlpool: whirlpool,
        orcaFetcher,
      }));

      return;
    }

    setState({
      vayooProgram: program,
      accounts: null,
      contractState: contractState,
      globalState: null,
      userState: null,
      userPosition: UserPosition.Neutral,
      poolState: whirlpoolState,
      assetPrice: assetPrice,
      whirlpool: null,
      orcaFetcher,
    });
  };

  // const updateMiniState = async () => {
  //   console.log('Updating Mini State');
  //   const whirlpool = await whirlpoolClient.getPool(
  //     selectedContract?.whirlpoolKey!,
  //     true
  //   );
  //   const whirlpoolState = whirlpool.getData();
  //   const contractState = await state?.vayooProgram.account.contractState.fetchNullable(
  //     state.accounts.contractState
  //   )!;
  //   const poolPrice = PriceMath.sqrtPriceX64ToPrice(
  //     whirlpoolState?.sqrtPrice!,
  //     6,
  //     6
  //   );
  //   const assetPrice =
  //     poolPrice.toNumber() +
  //     contractState?.startingPrice.toNumber()! /
  //       selectedContract?.oracleExponent! -
  //     contractState?.limitingAmplitude.toNumber()! / 2;

  //   let userPosition: UserPosition;
  //   const userState = await state?.vayooProgram.account.userState.fetchNullable(
  //     state.accounts.userState
  //     )!;
  //     if (userState?.lcontractBoughtAsUser.toNumber()! > 0) {
  //       userPosition = UserPosition.Long;
  //     } else if (userState?.scontractSoldAsUser.toNumber()! < 0) {
  //       userPosition = UserPosition.Short;
  //     } else {
  //       userPosition = UserPosition.Neutral;
  //     }
  //     if (state?.userState?.lcontractMintedAsMm.toNumber()! > 0) {
  //       userPosition = UserPosition.Mm;
  //     }
  //     setState((prev: vayooState) => ({
  //       ...prev!,
  //       contractState,
  //       userState: userState,
  //       userPosition,
  //       poolState: whirlpoolState,
  //       assetPrice: assetPrice,
  //       whirlpool: whirlpool,
  //     }));
  // }

  useEffect(() => {
    if (!loading) {
      (async () => {
        console.log("--updating state--");
        await updateFullState();
        console.log("--updated state--");
        await sleep(500);
        await updateFullState();
        console.log("---updated state---");
      })();
    }
  }, [connection, wallet, refresh, toogleUpdateState, selectedContract]);

  useEffect(() => {
    if (!loading) {
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
        }
          if (selectedContract?.oracleFeedType == OracleFeedType.Pyth) {
            // Pyth Feed Initial Fetching
            (async () => {
              const pythAccount = (
                await connection.getAccountInfo(selectedContract?.oracleFeed!)
              )?.data!;
              const parsedPythData = parsePriceData(pythAccount);
              setOracleState({
                price: parsedPythData.price!,
                previousPrice: parsedPythData.previousPrice,
              });
            })();
            // Add listener on pyth account for refreshes
            controller = connection.onAccountChange(
              selectedContract?.oracleFeed!,
              (account) => {
                const parsedPythData = parsePriceData(account.data);
                setOracleState({
                  price: parsedPythData.price!,
                  previousPrice: parsedPythData.previousPrice,
                });
              }
            );
          } else if (
            selectedContract?.oracleFeedType == OracleFeedType.Switchboard
          ) {
            // Switchboard Feed Initial Fetching
            (async () => {
              const aggregatorAccount = new AggregatorAccount(
                switchboardProgram!,
                selectedContract?.oracleFeed
              );
              const result = (
                await aggregatorAccount.fetchLatestValue()
              )?.toNumber()!;
              setOracleState({
                price: result,
                previousPrice: result,
              });
              // Add listener on switchboard account for refreshes
              controller = connection.onAccountChange(
                selectedContract?.oracleFeed!,
                () => {
                  (async (account) => {
                    const aggregatorAccount = new AggregatorAccount(
                      switchboardProgram!,
                      selectedContract?.oracleFeed
                    );
                    const result = (
                      await aggregatorAccount.fetchLatestValue()
                    )?.toNumber()!;
                    setOracleState({
                      price: result,
                      previousPrice: result,
                    });
                  })();
                }
              );
            })();
          }
        }
      return () => {
        if (
          selectedContract?.oracleFeedType == OracleFeedType.Pyth &&
          controller
        ) {
          connection.removeAccountChangeListener(controller);
        } else if (
          selectedContract?.oracleFeedType == OracleFeedType.Switchboard &&
          controller
        ) {
          connection.removeAccountChangeListener(controller);
        }
      };
    }
  }, [connection, wallet, toogleUpdateState, selectedContract]);

  useEffect(() => {
    setInterval(() => {
      setToogleUpdateState((prev) => !prev);
    }, REFRESH_TIME_INTERVAL);
  }, []);

  useEffect(() => {
    if (!allContractInfo) {
      setLoading(true);
      (async () => {
        const switchboardProgram = await SwitchboardProgram.load(
          "mainnet-beta",
          connection
        );
        setSwitchboardProgram(switchboardProgram);
        const _allContractInfo = (
          await fetchAxiosWithRetry(`${VAYOO_BACKEND_ENDPOINT}/contracts`)
        ).data;
        setAllContractInfo(_allContractInfo);
        const defaultContract = _allContractInfo[0];
        if (defaultContract) {
          changeContract(
            defaultContract.name,
            new PublicKey(defaultContract.whirlpool_key),
            defaultContract.oracle_feed_type,
            new PublicKey(defaultContract.oracle_feed_key),
            defaultContract.oracle_exponent,
            defaultContract
          );
          if (_allContractInfo) setLoading(false);
        }
      })();
    }
  }, [allContractInfo]);

  return (
    <VMStateContext.Provider
      value={{
        state,
        oracleState,
        subscribeTx,
        toggleRefresh: () => setRefresh((refresh) => !refresh),
        loading,
        changeSelectedContract: changeContract,
        selectedContract,
        allContractInfo,
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

export function useOracleState() {
  const context = React.useContext(VMStateContext);

  return context.oracleState;
}

export function useSelectedContract() {
  const context = React.useContext(VMStateContext);

  return {
    selectedContract: context.selectedContract,
    changeSelectedContract: context.changeSelectedContract,
  };
}

export function getAllContractInfos() {
  const context = React.useContext(VMStateContext);

  return context.allContractInfo;
}
