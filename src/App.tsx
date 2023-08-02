import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { useEffect, useState } from "react";
import { getAtaTokenBalanceByOwner, shortenAddress } from "./utils";
import {
  ADMIN_KEYS,
  USDC_MINT,
  VAYOO_BACKEND_ENDPOINT,
} from "./utils/constants";
import {
  useSelectedContract,
  useSubscribeTx,
  useVMState,
} from "./contexts/StateProvider";
import AdminComponent from "./components/admin";
import toast, { Toaster } from "react-hot-toast";
import { initUserState } from "./utils/vayoo-web3";
import StatsComponent from "./components/stats";
import twitterLogo from "./assets/twitter-logo.svg";
import telegramLogo from "./assets/telegram-logo.svg";
import ContractDropDownSelectorComponent from "./components/contractDropdownSelector";
import { TVChartContainer } from "./components/TradingView";
import YourMmAccount from "./components/yourMmAccount";
import Trade from "./components/trade";
import DepositWithdrawModal from "./components/depositWithdrawModal";
import Positions from "./components/positions";
import LeaderboardComponent from "./components/leaderboard";
import { fetchAxiosWithRetry } from "./utils/web3-utils";

function App() {
  const wallet = useWallet();
  const subscribeTx = useSubscribeTx();
  const { connected } = useWallet();
  const { connection } = useConnection();
  const { state, toggleRefresh, loading } = useVMState();
  const { selectedContract } = useSelectedContract();
  const [refresh, setRefresh] = useState(false);

  const [localState, setLocalState] = useState({
    userExist: false,
    isAdmin: false,
    adminMode: true,
    leaderboardMode: false,
    mmMode: false,
    netAccountValueUsd: 0,
    rank: null,
  });

  const toggleLocalRefresh = () => {
    toggleRefresh();
    setRefresh((refresh) => !refresh);
  };

  useEffect(() => {
    (async () => {
      if (wallet?.publicKey && selectedContract) {
        if (ADMIN_KEYS.includes(wallet.publicKey.toString()!)) {
          setLocalState((prev) => ({
            ...prev,
            isAdmin: true,
          }));
        } else {
          setLocalState((prev) => ({
            ...prev,
            isAdmin: false,
          }));
        }
        const userExist = state?.userState ? true : false;
        let rank = (
          await fetchAxiosWithRetry(
            `${VAYOO_BACKEND_ENDPOINT}/pnl/rank/${
              selectedContract?.name
            }/${wallet.publicKey.toString()}`
          )
        ).data!;
        if (!rank.err)  {
          setLocalState((prev) => ({
            ...prev,
            userExist,
            rank,
          }));
        } else {
          setLocalState((prev) => ({
            ...prev,
            userExist,
            rank: null,
          }));
        }
      }
      if (!wallet.connected) {
        setLocalState((prev) => ({
          ...prev,
          userExist: false,
          rank: null,
        }));
      }
    })();
  }, [
    refresh,
    wallet.connected,
    wallet.publicKey,
    state,
    localState.mmMode,
    selectedContract,
  ]);

  useEffect(() => {
    if (state?.assetPrice) {
      document.title = `${state?.assetPrice.toFixed(2)} ${
        selectedContract?.extraInfo.short_name
      } - Vayoo Markets`;
    }
  }, [state?.assetPrice]);

  const onClickInitUserState = async () => {
    await initUserState(state, selectedContract?.name!, wallet)
      .then((txHash: string) => {
        subscribeTx(
          txHash,
          () => toast("Init User Transaction Sent"),
          () => toast.success("Init User Transaction Confirmed."),
          () => toast.error("Init User Transaction Failed")
        );
      })
      .catch((e) => {
        console.log(e);
        toast.error("Transaction Error!");
      })
      .finally(() => {
        toggleLocalRefresh();
      });
  };

  const toggleMmMode = () => {
    setLocalState((prev) => ({
      ...prev,
      mmMode: !prev.mmMode,
      leaderboardMode: false,
    }));
  };

  const toggleAdminMode = () => {
    setLocalState((prev) => ({
      ...prev,
      adminMode: !prev.adminMode,
      leaderboardMode: false,
    }));
  };

  const toggleLeaderboardMode = (forced = false) => {
    if (forced) {
      setLocalState((prev) => ({
        ...prev,
        leaderboardMode: true,
      }));
    } else {
      setLocalState((prev) => ({
        ...prev,
        leaderboardMode: !prev.leaderboardMode,
      }));
    }
  };

  return (
    <div className="App">
      <div className="flex flex-col w-screen items-center bg-black relative overflow-x-hidden">
        {/* Header */}
        <div className="w-full flex flex-col items-center">
          <div className="w-full flex justify-between p-3 max-w-9xl items-center">
            <div className="flex justify-between gap-5 items-center">
              <a href="https://vayoo.markets">
                <div className="ml-2 flex gap-0 items-center">
                  <p className="text-lime-200 text-2xl italic">Vayoo</p>
                  <p className="text-slate-300 text-2xl italic">Markets</p>
                  <p className="text-lime-200 text-2xl italic">.</p>
                </div>
              </a>
              {wallet.connected && localState.rank && 
              <div
                className="cursor-pointer underline underline-offset-4 decoration-gray-400 hover:decoration-gray-300"
                onClick={() => toggleLeaderboardMode()}
              >
                <p className="text-gray-400 hover:text-gray-300 text-sm">
                  {!localState.leaderboardMode ? "Leaderboards" : "Trade"}
                </p>
              </div>
              }
              {localState.rank && (
                <div
                  className="cursor-pointer border-2 rounded-xl px-3 py-1 border-lime-200/50 hover:border-gray-200/60 text-gray-200 hover:text-white glow_green"
                  onClick={() => toggleLeaderboardMode(true)}
                >
                  <p className=" text-md">Rank : {localState.rank}</p>
                </div>
              )}
            </div>

            <div className="flex justify-around gap-2 items-center">
              {!loading && (
                <div className="flex gap-3 items-center">
                  <div className="z-50">
                    <ContractDropDownSelectorComponent />
                  </div>
                  {connected && localState.isAdmin && (
                    <div
                      className="border-2 border-gray-400/40 rounded-2xl px-4 py-1 hover:border-gray-400/70 cursor-pointer"
                      onClick={toggleAdminMode}
                    >
                      <div className="py-1 text-sm text-slate-300">
                        {localState.adminMode
                          ? "Switch to User"
                          : "Switch to Admin"}
                      </div>
                    </div>
                  )}

                  {localState.userExist ? (
                    <div className="flex gap-3">
                      <DepositWithdrawModal />
                      {state?.userState && (
                        <div className="border-2 border-gray-400/40 rounded-xl px-4 py-1 hover:border-gray-400/70">
                          <div className="py-1 text-sm text-slate-300">
                            {(
                              state?.userState?.usdcFree.toNumber() / 1e6
                            ).toFixed(2)}{" "}
                            $
                          </div>
                        </div>
                      )}
                      <div
                        className="border-2 border-gray-400/40 rounded-xl px-4 py-1 hover:border-gray-400/70 cursor-pointer"
                        onClick={toggleMmMode}
                      >
                        <div className="py-1 text-sm text-slate-300">
                          {localState.mmMode
                            ? "Switch to User Mode"
                            : "Switch to MM Mode"}
                        </div>
                      </div>
                    </div>
                  ) :
                  connected && !localState.userExist && (
                    <div
                      className="bg-gradient-to-r from-gray-400/20 via-gray-50/5 to-gray-400/20 hover:from-gray-400/20 hover:via-gray-50/5 hover:to-gray-400/30 text-sm border-2 text-slate-300 border-gray-400/50 rounded-xl px-4 py-2 hover:border-2 hover:border-gray-400/70 cursor-pointer overflow-hidden"
                      onClick={onClickInitUserState}
                    >
                      Create Vayoo Account
                    </div>
                  )}
                </div>
              )}
              <WalletMultiButton className="">
                {!connected
                  ? "Connect Wallet"
                  : shortenAddress(`${wallet?.publicKey}`)}
              </WalletMultiButton>
            </div>
          </div>
        </div>
        {/* Body */}
        <div className="w-full min-h-[calc(100vh-150px)] flex flex-col items-center">
          {loading ? (
            <div className="flex flex-col items-center text-2xl text-white">
              Loading
            </div>
          ) : (
            <div className="w-full px-6">
              <div className="w-full h-full flex flex-col items-center">
                <div className="w-full px-6 lg:px-0">
                  {localState.adminMode && localState.isAdmin ? (
                    <AdminComponent />
                  ) : localState.mmMode ? (
                    <div className="w-full flex flex-col items-center">
                      <YourMmAccount />
                    </div>
                  ) : localState.leaderboardMode ? (
                    <div className="mt-10 flex flex-col items-center">
                      <LeaderboardComponent />
                    </div>
                  ) : (
                    <>
                      <div className="flex mt-2 gap-5 items-start min-h-[560px] h-[calc(100vh-480px)]">
                        <div className="w-full h-full overflow-hidden rounded-xl">
                          <TVChartContainer />
                        </div>
                        <Trade />
                      </div>
                      <div className="mt-6 w-full flex gap-5">
                        <Positions />
                        <StatsComponent />
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
        {/* Footer */}
        <div className="mt-4 w-full h-[50px] bottom-4 right-2 py-3 px-6 flex flex-col items-end">
          <div className="flex gap-4 items-center">
            <div className="text-sm text-gray-300 hover:underline-offset-4 hover:underline">
              <a href="https://vayoo-markets.gitbook.io/vayoo-labs-docs/">
                Read the Docs
              </a>
            </div>
            <div className="flex gap-2 -mt-1">
              <a
                className="hover:opacity-70 transition duration-200 ease-in-out"
                href="https://twitter.com/VayooMarkets"
              >
                <img
                  className="h-6"
                  src={twitterLogo}
                  alt="Twitter of Vayoo Markets"
                />
              </a>
              <a
                className="hover:opacity-70 transition duration-200 ease-in-out"
                href="https://t.me/+UrUNxjJxU1w1NTg1"
              >
                <img
                  className="h-6"
                  src={telegramLogo}
                  alt="Telegram Channel of Vayoo Markets"
                />
              </a>
            </div>
          </div>
        </div>
        <div className="absolute z-[0] w-[55%] h-[50%] -left-[10%] top-60 gray__gradient"></div>
        <div className="absolute z-[0] w-[50%] h-[70%] -right-[45%] bottom-20 gray__gradient"></div>
        <Toaster
          position="bottom-left"
          reverseOrder={false}
          gutter={8}
          containerClassName="ml-6 mb-6"
          containerStyle={{}}
          toastOptions={{
            // Define default options
            className: "mb-2 p-4",
            duration: 4000,
            style: {
              background: "#363636",
              color: "#fff",
            },

            // Default options for specific types
            success: {
              duration: 5000,
              style: {
                background: "green",
                color: "black",
              },
            },
          }}
        />
      </div>
    </div>
  );
}

export default App;
