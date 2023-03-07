import classNames from "classnames";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import {
  getAtaTokenBalanceByOwner,
  getVayooProgramInstance,
  shortenAddress,
  sleep,
} from "./utils";
import { USDC_MINT } from "./utils/constants";
import { useSubscribeTx, useVMState } from "./contexts/StateProvider";
import { getATAKey } from "./utils/vayoo-pda";
import { getAccount } from "@solana/spl-token";
import AdminComponent from "./components/admin";
import toast, { Toaster } from "react-hot-toast";
import { depositCollateral, initUserState } from "./utils/vayoo-web3";
import SingleInputModal from "./components/Modal";

function App() {
  const wallet = useWallet();
  const subscribeTx = useSubscribeTx();
  const { connected } = useWallet();
  const { connection } = useConnection();
  const { state, loading } = useVMState();
  const [refresh, setRefresh] = useState(false);
  const [localState, setLocalState] = useState({
    usdBalance: 0,
    userExist: false,
    adminMode: false,
    amount: 0,
  });

  useEffect(() => {
    (async () => {
      console.log(1);
      if (wallet?.publicKey) {
        console.log(2);
        if (
          wallet.publicKey?.toString() ==
          "4gNFEk4qvgxE6iM8ukfDUDaCT8itAeWXxURbnqNZXZXp"
        ) {
          setLocalState((prev) => ({
            ...prev,
            adminMode: true,
          }));
        }
        const userExist = state?.userState ? true : false;
        console.log(userExist);
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
  }, [refresh, wallet, wallet.publicKey, state]);

  const onClickInitUserState = async () => {
    await initUserState(state, wallet)
      .then((txHash: string) => {
        subscribeTx(
          txHash,
          () => toast("Init Contract Transaction Sent"),
          () => toast.success("Init Contract Confirmed."),
          () => toast.error("Init Contract Transaction Failed")
        );
      })
      .catch((e) => {
        console.log(e);
        toast.error("Transaction Error!");
      })
      .finally(() => {
        setRefresh(!refresh);
      });
  };

  const onClickDeposit = async () => {
    await depositCollateral(state, localState.amount, wallet)
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
        setRefresh(!refresh);
      });
  };

  const onChangeAmount = (value: string) => {
    let amount = Number.parseInt(value);
    if (isNaN(amount)) amount = 0;
    setLocalState((prev) => ({
      ...prev,
      amount,
    }));
  };

  return (
    <div className="App">
      <div className="flex flex-col w-screen h-screen items-center bg-black relative overflow-hidden">
        {/* Header */}
        <div className="w-full flex flex-col items-center">
          <div className="w-full flex justify-between p-3 max-w-5xl items-center">
            <div className="flex gap-0 items-center">
              <p className="text-lime-200 text-2xl italic">Vayoo</p>
              <p className="text-gray-300 text-2xl italic">Markets</p>
              <p className="text-lime-200 text-2xl italic">.</p>
            </div>
            <div className="flex justify-around gap-2 items-center">
              {connected && (
                <div className="border-2 border-gray-400/40 rounded-2xl px-4 py-1 hover:border-gray-400/70">
                  <div className="py-1 text-sm text-slate-300">
                    {localState.usdBalance.toFixed(2)} USDC
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
          {localState.adminMode ? (
            <AdminComponent />
          ) : localState.userExist ? (
            <div className="w-full flex items-center max-w-5xl gap-7">
              <div className="mt-10 px-6 py-4 text-white flex flex-col gap-3 w-1/2 border-2 border-gray-400 max-w-5xl rounded-xl bg-black/50 z-10 hover:border-lime-100/80">
                <div className="text-2xl">Your Account</div>
                <div className="flex flex-col gap-3 text-sm">
                  <div className="flex justify-between">
                    Total Deposited:
                    <div>
                      {state?.userState?.usdcDeposited.toNumber().toFixed(2)}
                    </div>
                  </div>
                  <div className="flex justify-between">
                    Contract Position Net:{" "}
                    <div>
                      {state?.userState?.contractPositionNet
                        .toNumber()
                        .toFixed(2)}
                    </div>
                  </div>
                  <div className="flex justify-between">
                    Collateral Locked:{" "}
                    <div>
                      {state?.userState?.usdcCollateralLockedAsUser
                        .toNumber()
                        .toFixed(2)}
                    </div>
                  </div>
                  <div className="flex justify-between">
                    L Contract Bought:{" "}
                    <div>
                      {state?.userState?.lcontractBoughtAsUser
                        .toNumber()
                        .toFixed(2)}
                    </div>
                  </div>
                  <div className="flex justify-between">
                    S Contract Sold:{" "}
                    <div>
                      {state?.userState?.scontractSoldAsUser
                        .toNumber()
                        .toFixed(2)}
                    </div>
                  </div>
                  <div className="flex justify-between">
                    Total Withdrawn:{" "}
                    <div>
                      {state?.userState?.usdcWithdrawn.toNumber().toFixed(2)}
                    </div>
                  </div>
                </div>
                <div className="mt-5 flex gap-5 text-xl items-center">
                  Amount:{" "}
                  <input
                    value={localState.amount}
                    onChange={(e) => onChangeAmount(e.target.value)}
                    className="w-full py-3 text-sm font-medium text-center text-gray-100 border-r rounded-lg bg-white-900 dark:bg-gray-800 dark:text-white-900 focus:outline-none rouneded-xl border-white-500 dark:border-gray-600 font-poppins"
                  />
                </div>
                <div className="flex flex-row w-full justify-between p-2 gap-5">
                  <button
                    onClick={onClickDeposit}
                    className="w-full px-4 py-2 border-2 border-lime-100/80 rounded-xl hover:bg-fuchsia-200/20 hover:border-fuchsia-100/80"
                  >
                    Deposit
                  </button>
                  <button
                    onClick={onClickDeposit}
                    className="w-full px-4 py-2 border-2 border-lime-100/80 rounded-xl hover:bg-fuchsia-200/20 hover:border-fuchsia-100/80"
                  >
                    Withdraw
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="mt-56 flex items-center max-w-5xl">
              <div className="px-12 py-10 text-white border-2 border-gray-400 bg-black/50 z-10 rounded-2xl">
                <div className="flex flex-col gap-5 justify-between items-center">
                  You seem to not have a user account with us.
                  <button
                    onClick={onClickInitUserState}
                    className="px-4 py-2 border-2 border-lime-100/80 rounded-xl hover:bg-fuchsia-200/20 hover:border-fuchsia-100/80"
                  >
                    Create Now.
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="absolute z-[0] w-[25%] h-[30%] -left-[20%] -top-10 white__gradient"></div>
        <div className="absolute z-[0] w-[50%] h-[70%] -right-[45%] bottom-20 blue__gradient"></div>
        <Toaster
          position="bottom-left"
          reverseOrder={false}
          gutter={8}
          containerClassName="ml-4 mb-10"
          containerStyle={{}}
          toastOptions={{
            // Define default options
            className: "mb-2",
            duration: 5000,
            style: {
              background: "#363636",
              color: "#fff",
            },

            // Default options for specific types
            success: {
              duration: 3000,
              style: {
                background: "green",
                color: "black",
              },
            },
            error: {
              duration: 3000,
              style: {
                background: "red",
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
