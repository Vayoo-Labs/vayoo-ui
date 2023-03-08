import toast, { Toaster } from "react-hot-toast";
import { useState } from "react";
import { useSubscribeTx, useVMState } from "../contexts/StateProvider";
import { initContract } from "../utils/vayoo-web3";
import { useWallet } from "@solana/wallet-adapter-react";
import { VayooContracts } from '../utils/vayoo_contracts';
import { translateError } from "../utils/errors";

const AdminComponent = () => {
  const { state, loading } = useVMState();
  const wallet = useWallet();
  const subscribeTx = useSubscribeTx();

  const [formData, setFormData] = useState({
    amplitude: 0,
    name: "",
    duration: 0,
    pythFeed: ''
  });

  const onChangeName = (name: string) => {
    setFormData((formData) => ({
      ...formData,
      name,
    }));
  };

  const onChangePythFeed = (id: string) => {
    setFormData((formData) => ({
      ...formData,
      pythFeed: id,
    }));
  };

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
      await initContract(state, formData.name, formData.amplitude, formData.duration, formData.pythFeed, wallet)
        .then((txHash: string) => {
          subscribeTx(
            txHash,
            () => toast('Init Contract Transaction Sent'),
            () => toast.success('Init Contract Confirmed.'),
            () => toast.error('Init Contract Transaction Failed')
          );
        })
        .catch((e) => {
          console.log(e);
          toast.error('Transaction Error!');
        })
        .finally(() => {
        });
    };

  return (
    <div className="mt-56 flex items-center">
      <div className="px-12 py-10 text-white border-2 border-gray-400 bg-black/50 z-10 rounded-2xl">
        <div className="flex flex-col gap-5 justify-between">
          <div className="text-xl font-bold">
            
            Init Contract
            </div>
          <div className="flex gap-5">
            Name:{" "}
            <input
              value={formData.name}
              onChange={(e) => onChangeName(e.target.value)}
              className="w-96 py-1 text-sm font-medium text-center text-gray-100 border-r rounded-tl-sm rounded-bl-sm bg-white-900 dark:bg-gray-800 dark:text-white-900 focus:outline-none rouneded-xl border-white-500 dark:border-gray-600 font-poppins"
            />
          </div>
          <div className="flex gap-5">
            Pyth Feed:{" "}
            <input
              value={formData.pythFeed}
              onChange={(e) => onChangePythFeed(e.target.value)}
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
            className="px-4 py-2 border-2 border-lime-100/80 rounded-xl hover:bg-fuchsia-200/20 hover:border-fuchsia-100/80"
          >
            Create Now.
          </button>
          
        </div>
      </div>
    </div>
  );
};

export default AdminComponent;
