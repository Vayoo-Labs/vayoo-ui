import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { useEffect, useState } from "react";
import { getAtaTokenBalanceByOwner, shortenAddress } from "./utils";
import { ADMIN_KEYS, USDC_MINT } from "./utils/constants";
import {
  useSelectedContract,
  useSubscribeTx,
  useVMState,
} from "./contexts/StateProvider";
import AdminComponent from "./components/admin";
import toast, { Toaster } from "react-hot-toast";
import { initUserState } from "./utils/vayoo-web3";
import PositionAndStatsComponent from "./components/positionAndStats";
import twitterLogo from "./assets/twitter-logo.svg";
import telegramLogo from "./assets/telegram-logo.svg";
import ContractDropDownSelectorComponent from "./components/contractDropdownSelector";
import { TVChartContainer } from "./components/TradingView";
import YourMmAccount from "./components/yourMmAccount";
import Trade from "./components/trade";
import DepositWithdrawModal from "./components/depositWithdrawModal";

function App() {
  const wallet = useWallet();
  const subscribeTx = useSubscribeTx();
  const { connected } = useWallet();
  const { connection } = useConnection();
  const { state, toggleRefresh, loading } = useVMState();
  const { selectedContract } = useSelectedContract();
  const [refresh, setRefresh] = useState(false);

  const [localState, setLocalState] = useState({
    usdBalance: 0,
    userExist: false,
    isAdmin: false,
    adminMode: true,
    mmMode: false,
    netAccountValueUsd: 0,
  });

  const toggleLocalRefresh = () => {
    toggleRefresh();
    setRefresh((refresh) => !refresh);
  };

  useEffect(() => {
    (async () => {
      if (wallet?.publicKey) {
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
        const usdBalance =
          (await getAtaTokenBalanceByOwner(
            connection,
            wallet.publicKey!,
            USDC_MINT
          )) / 1e6;
        setLocalState((prev) => ({
          ...prev,
          usdBalance,
          userExist,
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
    }));
  };

  const toggleAdminMode = () => {
    setLocalState((prev) => ({
      ...prev,
      adminMode: !prev.adminMode,
    }));
  };

  return (
    <div className="App">
      <div className="flex flex-col w-screen items-center bg-black relative overflow-x-hidden">
        {/* Header */}
        <div className="w-full flex flex-col items-center">
          <div className="w-full flex justify-between p-3 max-w-9xl items-center">
            <a href="https://vayoo.markets">
              <div className="ml-2 flex gap-0 items-center">
                <p className="text-lime-200 text-2xl italic">Vayoo</p>
                <p className="text-slate-300 text-2xl italic">Markets</p>
                <p className="text-lime-200 text-2xl italic">.</p>
              </div>
            </a>
            <div className="flex justify-around gap-2 items-center">
              {connected && (
                <div className="flex gap-3 items-center">
                  {localState.isAdmin && (
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
                  {!loading && (
                    <div className="z-50">
                      <ContractDropDownSelectorComponent />
                    </div>
                  )}
                  {localState.userExist && (
                    <div className="flex gap-3">
                      <DepositWithdrawModal />
                      {state?.userState && 
                  <div className="border-2 border-gray-400/40 rounded-2xl px-4 py-1 hover:border-gray-400/70">
                    <div className="py-1 text-sm text-slate-300">
                      {(state?.userState?.usdcFree.toNumber() / 1e6).toFixed(2)} $
                    </div>
                  </div>
                  }
                    <div
                      className="border-2 border-gray-400/40 rounded-2xl px-4 py-1 hover:border-gray-400/70 cursor-pointer"
                      onClick={toggleMmMode}
                    >
                      <div className="py-1 text-sm text-slate-300">
                        {localState.mmMode
                          ? "Switch to User Mode"
                          : "Switch to MM Mode"}
                      </div>
                    </div>
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
                  ) : localState.userExist ? (
                    localState.mmMode ? (
                      <div className="w-full flex flex-col items-center">
                        <YourMmAccount />
                      </div>
                    ) : (
                      <div className="flex mt-2 gap-7 items-start">
                        <div className="w-full max-w-xs flex flex-col gap-4">
                          <PositionAndStatsComponent />
                        </div>
                        <div className="w-full h-[600px] overflow-hidden rounded-xl">
                          <TVChartContainer />
                        </div>
                        <Trade />
                      </div>
                    )
                  ) : (
                    <div className="w-full mt-56 flex flex-col items-center">
                      <div className="px-12 py-10 text-white border-2 border-gray-400 bg-black/50 z-10 rounded-2xl">
                        <div className="flex flex-col gap-5 justify-between items-center">
                          You seem to not have a user account for this contract.
                          <button
                            onClick={onClickInitUserState}
                            className="px-4 py-2 border-2 border-gray-100/40 rounded-xl hover:bg-blue-200/20 hover:border-blue-100/80"
                          >
                            Create Now.
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>

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
