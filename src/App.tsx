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
import { useVMState } from "./contexts/StateProvider";
import { getATAKey } from "./utils/vayoo-pda";
import { getAccount } from "@solana/spl-token";
import AdminComponent from "./components/admin";
import { Toaster } from "react-hot-toast";

function App() {
  const wallet = useWallet();
  const { connected } = useWallet();
  const { connection } = useConnection();
  const { state, loading } = useVMState();
  const [refresh, setRefresh] = useState();
  const [localState, setLocalState] = useState({
    usdBalance: 0,
    userExist: false,
    adminMode: false,
  });
  useEffect(() => {
    (async () => {
      if (wallet?.connected) {
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
  }, [refresh, wallet, wallet.connected]);

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
                  <p className="text-sm text-slate-300">
                    {localState.usdBalance.toFixed(2)} USDC
                  </p>
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
              <div className="mt-10 p-4 text-white flex w-1/2 border-2 border-gray-400 max-w-5xl rounded-xl bg-black/50 z-10 hover:border-lime-100/80">
                <div className="p-2 text-md">Your Account</div>
              </div>
            </div>
          ) : (
            <div className="mt-56 flex items-center max-w-5xl">
              <div className="px-12 py-10 text-white border-2 border-gray-400 bg-black/50 z-10 rounded-2xl">
                <div className="flex flex-col gap-5 justify-between items-center">
                  You seem to not have a user account with us.
                  <button className="px-4 py-2 border-2 border-lime-100/80 rounded-xl hover:bg-fuchsia-200/20 hover:border-fuchsia-100/80">
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
