import { useState } from "react";
import { useSubscribeTx, useVMState } from "../contexts/StateProvider";
import toast from "react-hot-toast";
import { depositCollateral, withdrawCollateral } from "../utils/vayoo-web3";
import { useWallet } from "@solana/wallet-adapter-react";

const YourUserAccount = () => {
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
    setAmount(amount)
  };

  const onClickDeposit = async () => {
    await depositCollateral(state, amount, wallet)
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
        setInputValue("0");
        setAmount(0);
        toggleRefresh();
      });
  };

  const onClickWithdraw = async () => {
    await withdrawCollateral(state, amount, wallet)
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
        setInputValue("0");
        setAmount(0);
        toggleRefresh();
      });
  };

  return (
    <div className="w-full max-w-xs px-4 py-6 text-white flex flex-col gap-3 border-2 border-gray-300/10 rounded-xl bg-black/50 z-10">
    <div className="text-lg text-lime-200/90">
      Your Account
    </div>
    <div className="mt-1 flex flex-col gap-3 text-sm">
      <div className="flex justify-between items-center text-gray-300">
        Net Account Value :
        <div>
          {(
            state?.userState?.usdcFree.toNumber()! /
            1e6
          ).toFixed(6)}{" "}
          USDC
        </div>
      </div>
    </div>
    <div className="mt-4 flex gap-5 text-xl items-start text-gray-300/90">
      <div className="flex flex-col items-end text-sm">
        Amount
        <div className="text-gray-500 text-xs underline-offset-4">
          (USDC)
        </div>
      </div>
      <input
        value={inputValue}
        onChange={(e) =>
          onChangeAmount(e.target.value)
        }
        className="w-full py-2 px-3 text-sm text-gray-100 rounded-lg border-2 bg-white-900 rouneded-xl border-gray-100/10 bg-gray-100/10 focus:outline-none"
      />
    </div>
    <div className="mt-4 mb-1 flex flex-row w-full justify-between gap-5 text-xs">
      <button
        onClick={onClickDeposit}
        className="w-full px-4 py-3 border-2 text-gray-300 border-gray-100/20 rounded-xl hover:border hover:border-white/80"
      >
        Deposit
      </button>
      <button
        onClick={onClickWithdraw}
        className="w-full px-4 py-3 border-2 text-gray-300 border-gray-100/20 rounded-xl hover:border hover:border-white/80"
      >
        Withdraw
      </button>
    </div>
  </div>
  );
};

export default YourUserAccount;