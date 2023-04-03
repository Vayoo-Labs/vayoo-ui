import toast, { Toaster } from "react-hot-toast";
import { useState } from "react";
import { useSubscribeTx, useVMState } from "../contexts/StateProvider";
import {
  adminSettle,
  initContract,
  triggerSettleMode,
} from "../utils/vayoo-web3";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { OracleFeedType } from "../utils/types";

const AdminComponent = () => {
  const { state, loading } = useVMState();
  const { connection } = useConnection();
  const wallet = useWallet();
  const subscribeTx = useSubscribeTx();

  const [formData, setFormData] = useState({
    amplitude: 0,
    name: "",
    duration: 0,
    oracleFeedKey: "",
    oracleFeedType: OracleFeedType.Pyth,
  });

  const onChangeName = (name: string) => {
    setFormData((formData) => ({
      ...formData,
      name,
    }));
  };

  const onChangeFeedKey = (id: string) => {
    setFormData((formData) => ({
      ...formData,
      oracleFeedKey: id,
    }));
  };

  const onFeedOptionChange = (event: any) => {
    setFormData((formData) => ({
      ...formData,
      oracleFeedType: event.target.value
    }))
}

  const onChangeAmplitude = (value: string) => {
    let amplitude = Number.parseInt(value);
    if (isNaN(amplitude)) amplitude = 0;
    setFormData((formData) => ({
      ...formData,
      amplitude,
    }));
  };

  const onChangeEndTime = (value: string) => {
    let duration = Number.parseInt(value);
    if (isNaN(duration)) duration = 0;
    setFormData((formData) => ({
      ...formData,
      duration,
    }));
  };

  const onClickInitContract = async () => {
    await initContract(
      connection,
      state,
      formData.name,
      formData.amplitude,
      formData.duration,
      formData.oracleFeedType,
      formData.oracleFeedKey,
      wallet
    )
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
      .finally(() => {});
  };

  const onClickTriggerSettleMode = async () => {
    await triggerSettleMode(state, wallet)
      .then((txHash: string) => {
        subscribeTx(
          txHash,
          () => toast("Trigger Settle Mode Transaction Sent"),
          () => toast.success("Trigger Settle Mode Contract Confirmed."),
          () => toast.error("Trigger Settle Mode Contract Transaction Failed")
        );
      })
      .catch((e) => {
        console.log(e);
        toast.error("Transaction Error!");
      })
      .finally(() => {});
  };

  const onClickAdminSettle = async () => {
    await adminSettle(state, wallet)
      .then((txHash: string) => {
        subscribeTx(
          txHash,
          () => toast("Admin Settle Transaction Sent"),
          () => toast.success("Admin Settle Mode Contract Confirmed."),
          () => toast.error("Admin Settle Mode Contract Transaction Failed")
        );
      })
      .catch((e) => {
        console.log(e);
        toast.error("Transaction Error!");
      })
      .finally(() => {});
  };

  return (
    <div className="flex flex-col items-center">
      <div className="mt-2 flex items-center">
        <div className="px-12 py-10 text-white border-2 border-gray-400 bg-black/50 z-10 rounded-2xl">
          <div className="flex flex-col gap-5 justify-between">
            <div className="text-xl font-bold">Init Contract</div>
            <div className="flex gap-5">
              Name:{" "}
              <input
                value={formData.name}
                onChange={(e) => onChangeName(e.target.value)}
                className="w-96 py-1 text-sm font-medium text-center text-gray-100 border-r rounded-tl-sm rounded-bl-sm bg-white-900 dark:bg-gray-800 dark:text-white-900 focus:outline-none rouneded-xl border-white-500 dark:border-gray-600 font-poppins"
              />
            </div>
            <div className="flex gap-5">
            Feed Type:{" "}
            <select onChange={onFeedOptionChange} className="px-2 bg-black border border-white focus:outline-none rounded-lg">
                    <option key={OracleFeedType.Pyth} value={OracleFeedType.Pyth}>Pyth</option>
                    <option key={OracleFeedType.Switchboard} value={OracleFeedType.Switchboard}>Switchboard</option>
                </select>
            </div>
            <div className="flex gap-5">
              Feed Key:{" "}
              <input
                value={formData.oracleFeedKey}
                onChange={(e) => onChangeFeedKey(e.target.value)}
                className="w-96 py-1 text-sm font-medium text-center text-gray-100 border-r rounded-tl-sm rounded-bl-sm bg-white-900 dark:bg-gray-800 dark:text-white-900 focus:outline-none rouneded-xl border-white-500 dark:border-gray-600 font-poppins"
              />
            </div>
            <div className="flex gap-5">
              Amplitude:{" "}
              <input
                value={formData.amplitude}
                onChange={(e) => onChangeAmplitude(e.target.value)}
                className="w-32 py-1 text-sm font-medium text-center text-gray-100 border-r rounded-tl-sm rounded-bl-sm bg-white-900 dark:bg-gray-800 dark:text-white-900 focus:outline-none rouneded-xl border-white-500 dark:border-gray-600 font-poppins"
              />
            </div>
            <div className="flex gap-5">
              Duration:{" "}
              <input
                value={formData.duration}
                onChange={(e) => onChangeEndTime(e.target.value)}
                className="w-32 py-1 text-sm font-medium text-center text-gray-100 border-r rounded-tl-sm rounded-bl-sm bg-white-900 dark:bg-gray-800 dark:text-white-900 focus:outline-none rouneded-xl border-white-500 dark:border-gray-600 font-poppins"
              />
            </div>
            <button
              onClick={onClickInitContract}
              className="mt-4 px-4 py-2 border-2 border-lime-100/80 rounded-xl hover:bg-fuchsia-200/20 hover:border-fuchsia-100/80"
            >
              Create Now.
            </button>
            <button
              onClick={onClickTriggerSettleMode}
              className="mt-2 px-4 py-2 border-2 border-lime-100/80 rounded-xl hover:bg-fuchsia-200/20 hover:border-fuchsia-100/80"
            >
              Trigger Settle Mode
            </button>
            <button
              onClick={onClickAdminSettle}
              className="mt-2 px-4 py-2 border-2 border-lime-100/80 rounded-xl hover:bg-fuchsia-200/20 hover:border-fuchsia-100/80"
            >
              Admin Settle
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminComponent;
