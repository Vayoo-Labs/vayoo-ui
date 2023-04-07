import { useState } from "react";
import { useSubscribeTx, useVMState } from "../contexts/StateProvider";
import toast from "react-hot-toast";
import {
  burnAsMm,
  mintAsMm,
  mmSettle,
} from "../utils/vayoo-web3";
import { useWallet } from "@solana/wallet-adapter-react";

const YourMmAccount = () => {
  const { state, toggleRefresh, loading } = useVMState();
  const wallet = useWallet();
  const subscribeTx = useSubscribeTx();
  const [inputValue, setInputValue] = useState("0");
  const [amount, setAmount] = useState(0);

  const onChangeAmount = (value: string) => {
    const parsedValue = value.replace(",", ".").replace(/[^0-9.]/g, "");
    let amount = Number.parseFloat(parsedValue);
    if (isNaN(amount)) amount = 0.0;
    setInputValue(parsedValue);
    setAmount(amount);
  };

  const onClickMintAsMm = async () => {
    await mintAsMm(state, amount, wallet)
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
        setInputValue("0");
        setAmount(0);
        toggleRefresh();
      });
  };

  const onClickBurnAsMm = async () => {
    await burnAsMm(state, amount, wallet)
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
        setInputValue("0");
        setAmount(0);
        toggleRefresh();
      });
  };

  const onClickMmSettle = async () => {
    await mmSettle(state, amount, wallet)
      .then((txHash: string) => {
        subscribeTx(
          txHash,
          () => toast("Mm Settle Transaction Sent"),
          () => toast.success("Mm Settle Transaction Confirmed."),
          () => toast.error("Mm Settle Transaction Failed")
        );
      })
      .catch((e) => {
        console.log(e);
        toast.error("Transaction Error!");
      })
      .finally(() => {
        setInputValue("0");
        setAmount(0);
        toggleRefresh();
      });
  };

  return (
    <div className="w-full flex items-center gap-7 mt-4">
      <div className="px-6 py-6 text-white flex flex-col gap-3 border-2 border-gray-300/10 rounded-xl bg-black/50 z-10">
        <div className="text-2xl text-lime-200/80">Your MM Account</div>
        <div className="flex flex-col gap-3 text-sm">
          <div className="flex justify-between">
            Available Balance:
            <div>
              {(state?.userState?.usdcFree.toNumber()! / 1e6).toFixed(4)}
            </div>
          </div>
          <div className="flex justify-between">
            Collateral Locked:{" "}
            <div>
              {(
                state?.userState?.usdcCollateralLockedAsMm.toNumber()! / 1e6
              ).toFixed(2)}
            </div>
          </div>
          <div className="flex justify-between">
            L Contract Minted:{" "}
            <div>
              {(
                state?.userState?.lcontractMintedAsMm.toNumber()! / 1e6
              ).toFixed(4)}
            </div>
          </div>
        </div>
        <div className="mt-5 flex gap-5 text-xl items-center">
          Amount:{" "}
          <input
            value={inputValue}
            onChange={(e) => onChangeAmount(e.target.value)}
            className="w-full py-3 text-sm text-center text-gray-100 rounded-lg border-2 bg-white-900 rouneded-xl border-gray-100/10 bg-gray-100/10 focus:outline-none"
          />
        </div>
        {state?.contractState?.isSettling ? (
          <div className="my-3 flex flex-col items-center">
            Contract is in settling mode.
            <button
              onClick={onClickMmSettle}
              className="mt-4 px-16 py-2 border-2 border-gray-100/40 rounded-xl hover:bg-blue-200/20 hover:border-blue-100/80"
            >
              Settle MM Position
            </button>
          </div>
        ) : (
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
        )}
      </div>
    </div>
  );
};

export default YourMmAccount;
