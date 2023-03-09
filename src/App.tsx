import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { useEffect, useState } from "react";
import { getAtaTokenBalanceByOwner, shortenAddress } from "./utils";
import { ADMIN_KEYS, USDC_MINT } from "./utils/constants";
import { useSubscribeTx, useVMState } from "./contexts/StateProvider";
import AdminComponent from "./components/admin";
import toast, { Toaster } from "react-hot-toast";
import {
  burnAsMm,
  closeLong,
  closeShort,
  depositCollateral,
  initUserState,
  mintAsMm,
  openLong,
  openShort,
  withdrawCollateral,
} from "./utils/vayoo-web3";

function App() {
  const wallet = useWallet();
  const subscribeTx = useSubscribeTx();
  const { connected } = useWallet();
  const { connection } = useConnection();
  const { state, toggleRefresh, loading } = useVMState();
  const [refresh, setRefresh] = useState(false);
  const [primaryInputValue, setPrimaryInputValue] = useState("0");
  const [seconderyInputValue, setSeconderyInputValue] = useState("0");
  const [localState, setLocalState] = useState({
    usdBalance: 0,
    userExist: false,
    adminMode: false,
    mmMode: false,
    primaryAmount: 0,
    seconderyAmount: 0,
  });

  const toggleLocalRefresh = () => {
    toggleRefresh();
    setRefresh((refresh) => !refresh);
  };

  useEffect(() => {
    async () => {
      if (wallet.publicKey) {
        const cSubId = connection.onAccountChange(wallet.publicKey!, (acc) => {
          if (acc) {
            console.log("--Wallet balance changed--");
            setRefresh((prev) => !prev);
          }
        });
        return await connection.removeAccountChangeListener(cSubId);
      }
    };
  }, [wallet.connected, wallet.publicKey]);

  useEffect(() => {
    (async () => {
      console.log(state?.pythData);
      if (wallet?.publicKey) {
        if (ADMIN_KEYS.includes(wallet.publicKey.toString()!)) {
          setLocalState((prev) => ({
            ...prev,
            adminMode: true,
          }));
        } else {
          setLocalState((prev) => ({
            ...prev,
            adminMode: false,
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
        console.log(localState);
      }
    })();
  }, [
    refresh,
    wallet.connected,
    wallet.publicKey,
    state,
    localState.mmMode,
    state?.pythData,
  ]);

  const onClickInitUserState = async () => {
    await initUserState(state, wallet)
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

  const onClickDeposit = async () => {
    await depositCollateral(state, localState.primaryAmount, wallet)
      .then((txHash: string) => {
        subscribeTx(
          txHash,
          () => toast("Deposit Transaction Sent"),
          () => toast.success("Deposit Confirmed."),
          () => toast.error("Deposit Transaction Failed")
        );
      })
      .catch((e) => {
        console.log(e);
        toast.error("Transaction Error!");
      })
      .finally(() => {
        setPrimaryInputValue("0");
        setLocalState((prev) => ({ ...prev, primaryAmount: 0 }));
        toggleLocalRefresh();
      });
  };

  const onClickWithdraw = async () => {
    await withdrawCollateral(state, localState.primaryAmount, wallet)
      .then((txHash: string) => {
        subscribeTx(
          txHash,
          () => toast("Withdraw Transaction Sent"),
          () => toast.success("Withdraw Confirmed."),
          () => toast.error("Withdraw Transaction Failed")
        );
      })
      .catch((e) => {
        console.log(e);
        toast.error("Transaction Error!");
      })
      .finally(() => {
        setPrimaryInputValue("0");
        setLocalState((prev) => ({ ...prev, primaryAmount: 0 }));
        toggleLocalRefresh();
      });
  };

  const onClickOpenLong = async () => {
    await openLong(state, localState.seconderyAmount, wallet)
      .then((txHash: string) => {
        subscribeTx(
          txHash,
          () => toast("Open Long Transaction Sent"),
          () => toast.success("Open Long Transaction Confirmed."),
          () => toast.error("Open Long Transaction Failed")
        );
      })
      .catch((e) => {
        console.log(e);
        toast.error("Transaction Error!");
      })
      .finally(() => {
        setSeconderyInputValue("0");
        setLocalState((prev) => ({ ...prev, seconderyAmount: 0 }));
        toggleLocalRefresh();
      });
  };

  const onClickCloseLong = async () => {
    await closeLong(state, localState.seconderyAmount, wallet)
      .then((txHash: string) => {
        subscribeTx(
          txHash,
          () => toast("Close Long Transaction Sent"),
          () => toast.success("Close Long Transaction Confirmed."),
          () => toast.error("Close Long Transaction Failed")
        );
      })
      .catch((e) => {
        console.log(e);
        toast.error("Transaction Error!");
      })
      .finally(() => {
        setSeconderyInputValue("0");
        setLocalState((prev) => ({ ...prev, seconderyAmount: 0 }));
        toggleLocalRefresh();
      });
  };

  const onClickOpenShort = async () => {
    await openShort(state, localState.seconderyAmount, wallet)
      .then((txHash: string) => {
        subscribeTx(
          txHash,
          () => toast("Open Short Transaction Sent"),
          () => toast.success("Open Short Transaction Confirmed."),
          () => toast.error("Open Short Transaction Failed")
        );
      })
      .catch((e) => {
        console.log(e);
        toast.error("Transaction Error!");
      })
      .finally(() => {
        setSeconderyInputValue("0");
        setLocalState((prev) => ({ ...prev, seconderyAmount: 0 }));
        toggleLocalRefresh();
      });
  };

  const onClickCloseShort = async () => {
    await closeShort(state, localState.seconderyAmount, wallet)
      .then((txHash: string) => {
        subscribeTx(
          txHash,
          () => toast("Close Short Transaction Sent"),
          () => toast.success("Close Short Transaction Confirmed."),
          () => toast.error("Close Short Transaction Failed")
        );
      })
      .catch((e) => {
        console.log(e);
        toast.error("Transaction Error!");
      })
      .finally(() => {
        setSeconderyInputValue("0");
        setLocalState((prev) => ({ ...prev, seconderyAmount: 0 }));
        toggleLocalRefresh();
      });
  };

  const onClickMintAsMm = async () => {
    await mintAsMm(state, localState.primaryAmount, wallet)
      .then((txHash: string) => {
        subscribeTx(
          txHash,
          () => toast("Mint Transaction Sent"),
          () => toast.success("Mint Transaction Confirmed."),
          () => toast.error("Mint Transaction Failed")
        );
      })
      .catch((e) => {
        console.log(e);
        toast.error("Transaction Error!");
      })
      .finally(() => {
        setPrimaryInputValue("0");
        setLocalState((prev) => ({ ...prev, primaryAmount: 0 }));
        toggleLocalRefresh();
      });
  };

  const onClickBurnAsMm = async () => {
    await burnAsMm(state, localState.primaryAmount, wallet)
      .then((txHash: string) => {
        subscribeTx(
          txHash,
          () => toast("Burn Transaction Sent"),
          () => toast.success("Burn Transaction Confirmed."),
          () => toast.error("Burn Transaction Failed")
        );
      })
      .catch((e) => {
        console.log(e);
        toast.error("Transaction Error!");
      })
      .finally(() => {
        setPrimaryInputValue("0");
        setLocalState((prev) => ({ ...prev, primaryAmount: 0 }));
        toggleLocalRefresh();
      });
  };

  const onChangeAmountValue = (value: string, primary: boolean) => {
    const parsedValue = value.replace(",", ".").replace(/[^0-9.]/g, "");
    let amount = Number.parseFloat(parsedValue);
    if (isNaN(amount)) amount = 0.0;
    if (primary) {
      setPrimaryInputValue(parsedValue);
      setLocalState((prev) => ({
        ...prev,
        primaryAmount: amount,
      }));
    } else {
      setSeconderyInputValue(parsedValue);
      setLocalState((prev) => ({
        ...prev,
        seconderyAmount: amount,
      }));
    }
  };

  const toggleMode = () => {
    setLocalState((prev) => ({
      ...prev,
      mmMode: !prev.mmMode,
    }));
  };

  return (
    <div className="App">
      <div className="flex flex-col w-screen h-screen items-center bg-black relative overflow-hidden">
        {/* Header */}
        <div className="w-full flex flex-col items-center">
          <div className="w-full flex justify-between p-3 max-w-9xl items-center">
            <div className="ml-2 flex gap-0 items-center">
              <p className="text-lime-200 text-2xl italic">Vayoo</p>
              <p className="text-slate-300 text-2xl italic">Markets</p>
              <p className="text-lime-200 text-2xl italic">.</p>
            </div>
            <div className="flex justify-around gap-2 items-center">
              {connected && (
                <div className="flex gap-3">
                  {localState.userExist && (
                    <div
                      className="border-2 border-gray-400/40 rounded-2xl px-4 py-1 hover:border-gray-400/70 cursor-pointer"
                      onClick={toggleMode}
                    >
                      <div className="py-1 text-sm text-slate-300">
                        {localState.mmMode
                          ? "Switch to User Mode"
                          : "Switch to MM Mode"}
                      </div>
                    </div>
                  )}
                  <div className="border-2 border-gray-400/40 rounded-2xl px-4 py-1 hover:border-gray-400/70">
                    <div className="py-1 text-sm text-slate-300">
                      {localState.usdBalance.toFixed(2)} $
                    </div>
                  </div>
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
        <div className="w-full h-full flex flex-col items-center">
          <div className="w-full max-w-6xl px-6 lg:px-0">
            {localState.adminMode ? (
              <AdminComponent />
            ) : localState.userExist ? (
              localState.mmMode ? (
                <div className="w-full flex items-center gap-7">
                  <div className="mt-10 px-6 py-6 text-white flex flex-col gap-3 w-1/2 border-2 border-gray-300/10 max-w-5xl rounded-xl bg-black/50 z-10">
                    <div className="text-2xl">Your MM Account</div>
                    <div className="flex flex-col gap-3 text-sm">
                      <div className="flex justify-between">
                        Total Deposited:
                        <div>
                          {(
                            state?.userState?.usdcDeposited.toNumber()! / 1e6
                          ).toFixed(4)}
                        </div>
                      </div>
                      <div className="flex justify-between">
                        Collateral Locked:{" "}
                        <div>
                          {(
                            state?.userState?.usdcCollateralLockedAsMm.toNumber()! /
                            1e6
                          ).toFixed(2)}
                        </div>
                      </div>
                      <div className="flex justify-between">
                        L Contract Minted:{" "}
                        <div>
                          {(
                            state?.userState?.lcontractMintedAsMm.toNumber()! /
                            1e6
                          ).toFixed(4)}
                        </div>
                      </div>
                    </div>
                    <div className="mt-5 flex gap-5 text-xl items-center">
                      Amount:{" "}
                      <input
                        value={primaryInputValue}
                        onChange={(e) =>
                          onChangeAmountValue(e.target.value, true)
                        }
                        className="w-full py-3 text-sm text-center text-gray-100 rounded-lg border-2 bg-white-900 rouneded-xl border-gray-100/10 bg-gray-100/10 focus:outline-none"
                      />
                    </div>
                    <div className="mt-4 mb-1 flex flex-row w-full justify-between gap-5">
                      <button
                        onClick={onClickMintAsMm}
                        className="w-full px-4 py-4 border-2 border-gray-100/40 rounded-xl hover:bg-blue-200/20 hover:border-blue-100/80"
                      >
                        Mint
                      </button>
                      <button
                        onClick={onClickBurnAsMm}
                        className="w-full px-4 py-4 border-2 border-gray-100/40 rounded-xl hover:bg-blue-200/20 hover:border-blue-100/80"
                      >
                        Burn
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="w-full flex items-start gap-10">
                  <div className="w-1/2 flex flex-col">
                    <div className="w-full mt-10 px-6 py-6 text-white flex flex-col gap-3 border-2 border-gray-300/10 max-w-5xl rounded-xl bg-black/50 z-10">
                      <div className="text-2xl text-lime-200/80">
                        Your Account
                      </div>
                      <div className="mt-1 flex flex-col gap-3 text-sm">
                        <div className="flex justify-between items-center text-gray-200">
                          Total Deposited:
                          <div>
                            {(
                              state?.userState?.usdcDeposited.toNumber()! / 1e6
                            ).toFixed(4)}
                          </div>
                        </div>
                      </div>
                      <div className="mt-5 flex gap-5 text-xl items-center text-gray-200">
                        Amount:{" "}
                        <input
                          value={primaryInputValue}
                          onChange={(e) =>
                            onChangeAmountValue(e.target.value, true)
                          }
                          className="w-full py-3 text-sm text-center text-gray-100 rounded-lg border-2 bg-white-900 rouneded-xl border-gray-100/10 bg-gray-100/10 focus:outline-none"
                        />
                      </div>
                      <div className="mt-4 mb-1 flex flex-row w-full justify-between gap-5">
                        <button
                          onClick={onClickDeposit}
                          className="w-full px-4 py-4 border-2 border-gray-100/40 rounded-xl hover:bg-blue-200/20 hover:border-blue-100/80"
                        >
                          Deposit
                        </button>
                        <button
                          onClick={onClickWithdraw}
                          className="w-full px-4 py-4 border-2 border-gray-100/40 rounded-xl hover:bg-blue-200/20 hover:border-blue-100/80"
                        >
                          Withdraw
                        </button>
                      </div>
                    </div>
                    <div className="w-full mt-7 px-6 py-6 text-white flex flex-col gap-3 border-2 border-gray-300/10 max-w-5xl rounded-xl bg-black/50 z-10">
                      <div className="text-2xl">Stats</div>
                      <div className="mt-1 flex flex-col gap-3 text-sm">
                        <div className="flex justify-between items-center text-gray-200 ">
                          Asset Name:
                          <div className="text-gray-200 underline underline-offset-4">
                            <a href="https://pyth.network/price-feeds/equity-us-spy-usd?cluster=mainnet-beta">
                              Equity.US.SPY/USD
                            </a>
                          </div>
                        </div>
                        <div className="flex justify-between items-center text-gray-200 ">
                          Oracle Price (Pyth):
                          <div className="text-gray-200">
                            {state?.pythData?.price?.toFixed(2) ??
                              state?.pythData?.previousPrice.toFixed(2)}
                          </div>
                        </div>
                        <div className="flex justify-between items-center text-gray-200 ">
                          Asset Price :
                          <div className="text-gray-200">
                            {state?.assetPrice.toFixed(2)}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="mt-10 px-6 py-6 text-white flex flex-col gap-3 w-1/2 border-2 border-gray-300/10 max-w-5xl rounded-xl bg-black/50 z-10">
                    <div className="text-2xl ">Your Position (SPY)</div>
                    <div className="mt-1 flex flex-col gap-3 text-sm">
                      <div className="flex justify-between items-center text-gray-200">
                        Net Position:
                        <div className="font-bold text-2xl text-green-600">
                          +
                          {(
                            state?.userState?.contractPositionNet.toNumber()! /
                            1e6
                          ).toFixed(4)}
                        </div>
                      </div>
                      <div className="flex justify-between items-center text-gray-200">
                        Long Position:
                        <div>
                          {(
                            state?.userState?.lcontractBoughtAsUser.toNumber()! /
                            1e6
                          ).toFixed(4)}
                        </div>
                      </div>
                      <div className="flex justify-between items-center text-gray-200">
                        Short Position:
                        <div>
                          {(
                            state?.userState?.scontractSoldAsUser.toNumber()! /
                            1e6
                          ).toFixed(4)}
                        </div>
                      </div>
                      <div className="flex justify-between items-center text-gray-200">
                        Free Collateral:
                        <div>
                          {(
                            state?.userState?.usdcDeposited.toNumber()! / 1e6
                          ).toFixed(4)}
                        </div>
                      </div>
                    </div>
                    <div className="mt-5 flex gap-5 text-xl items-center text-gray-200">
                      Amount:{" "}
                      <input
                        value={seconderyInputValue}
                        onChange={(e) =>
                          onChangeAmountValue(e.target.value, false)
                        }
                        className="w-full py-3 text-sm text-center text-gray-100 rounded-lg border-2 bg-white-900 rouneded-xl border-gray-100/10 bg-gray-100/10 focus:outline-none"
                      />
                    </div>
                    <div className="mt-4 mb-1 flex flex-row w-full justify-between gap-2">
                      <div className="w-full flex flex-col justify-between items-center py-1 rounded-xl gap-[0.5px]">
                        <div className="w-full py-2 bg-green-400/30 rounded-t-xl border-2 border-black hover:border-green-400/60">
                          <button
                            onClick={onClickOpenLong}
                            className="w-full text-sm"
                          >
                            Open Long
                          </button>
                        </div>
                        <div className="w-full py-2 bg-green-400/10 rounded-b-xl border-2 border-black hover:border-green-400/40">
                          <button
                            onClick={onClickCloseLong}
                            className="w-full text-sm"
                          >
                            Close Long
                          </button>
                        </div>
                      </div>
                      <div className="w-full flex flex-col justify-between items-center py-1 border-green-100/60 rounded-xl">
                        <div className="w-full py-2 bg-red-400/30 rounded-t-xl border-2 border-black hover:border-red-400/60">
                          <button
                            onClick={onClickOpenShort}
                            className="w-full text-sm"
                          >
                            Open Short
                          </button>
                        </div>
                        <div className="w-full py-2 bg-red-400/10 rounded-b-xl border-2 border-black hover:border-red-400/40">
                          <button
                            onClick={onClickCloseShort}
                            className="w-full text-sm"
                          >
                            Close Short
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )
            ) : (
              <div className="w-full mt-56 flex flex-col items-center">
                <div className="px-12 py-10 text-white border-2 border-gray-400 bg-black/50 z-10 rounded-2xl">
                  <div className="flex flex-col gap-5 justify-between items-center">
                    You seem to not have a user account with us.
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

        <div className="absolute z-[0] w-[55%] h-[50%] -left-[10%] top-60 gray__gradient"></div>
        {/* <div className="absolute z-[0] w-[25%] h-[30%] left-[10%] top-40 white__gradient"></div> */}
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
