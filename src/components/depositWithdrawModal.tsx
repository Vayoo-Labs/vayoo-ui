import { useState, useEffect, useRef } from "react";
import { IoMdClose } from 'react-icons/io';
import tw from "tailwind-styled-components";
import {
    useSubscribeTx,
  useVMState,
} from "../contexts/StateProvider";
import { depositCollateral, withdrawCollateral } from "../utils/vayoo-web3";
import toast from "react-hot-toast";
import { useWallet } from "@solana/wallet-adapter-react";

const DepositWithdrawModal = () => {
  const { state, toggleRefresh } = useVMState();
  const wallet = useWallet();
  const subscribeTx = useSubscribeTx();
  const [isOpen, setIsOpen] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);
  const modalButtonRef = useRef<HTMLButtonElement>(null);
  const [inputValue, setInputValue] = useState("0");
  const [amount, setAmount] = useState(0);

  const onChangeAmount = (value: string) => {
    const parsedValue = value.replace(",", ".").replace(/[^0-9.]/g, "");
    let amount = Number.parseFloat(parsedValue);
    if (isNaN(amount)) amount = 0.0;
    setInputValue(parsedValue);
    setAmount(amount);
  };

  const onClickDeposit = async () => {
    await depositCollateral(state, amount, wallet)
      .then((txHash: string) => {
        subscribeTx(
          txHash,
          () => toast("Deposit Transaction Sent"),
          () => {
            setIsOpen(false);
            return toast.success("Deposit Confirmed.")
          },
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
          () => {
            setIsOpen(false);
            return toast.success("Withdraw Confirmed.")
          },
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

  useEffect(() => {
    // handle auto closing of dropdown, if clicked outside the componenet
    function handleClickOutside(event: any) {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target) &&
        !modalButtonRef.current?.contains(event.target)
      ) {
        setIsOpen(false);
      }
    }

    // Bind the event listener
    document.addEventListener("click", handleClickOutside);

    // Unbind the event listener on cleanup
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [modalRef]);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
      <button
        type="button"
        className="flex justify-center w-full rounded-xl border-2 border-gray-400/40 shadow-sm px-4 py-2 bg-black text-sm  text-slate-300 hover:border-gray-400/70"
        id="menu-button"
        aria-expanded="true"
        aria-haspopup="true"
        onClick={toggleMenu}
        ref={modalButtonRef}
      >
        <div className="flex gap-1">Deposit/Withdraw</div>
      </button>

      {isOpen && (
        <div
          className={`fixed inset-0 bg-black bg-opacity-60 z-50`}
        ></div>
      )}
      {isOpen && (
        <div className="fixed inset-0 z-50 w-screen h-screen">
          <div className="mt-[250px] w-screen h-screen flex flex-col items-center">
            <div className="relative w-full max-w-sm px-6 py-6 text-white flex flex-col gap-3 border-2 border-gray-300/40 rounded-xl bg-black z-50"
            ref={modalRef}>
            <div className="flex justify-between">
              <div className="text-lg text-lime-200/90">Deposit/Withdraw</div>
                <IoMdClose
              size={24}
              className="cursor-pointer top-5 right-5 hover:opacity-75 text-white"
              onClick={() => {
                setIsOpen(false);
              }}
            />

            </div>
              <div className="mt-4 flex flex-col gap-3 text-sm">
                <div className="flex justify-between items-center text-gray-300">
                  Available Balance :
                  <div>
                    {(state?.userState?.usdcFree.toNumber()! / 1e6).toFixed(6)}{" "}
                    USDC
                  </div>
                </div>
              </div>
              <div className="mt-2 flex gap-5 text-xl items-start text-gray-300/90">
                <div className="flex flex-col items-end text-sm">
                  Amount
                  <div className="text-gray-500 text-xs underline-offset-4">
                    (USDC)
                  </div>
                </div>
                <input
                  value={inputValue}
                  onChange={(e) => onChangeAmount(e.target.value)}
                  className="w-full py-2 px-3 text-sm text-gray-100 rounded-lg border-2 bg-white-900 rouneded-xl border-gray-100/10 bg-gray-100/10 focus:outline-none"
                />
              </div>
              <div className="mt-4 mb-1 flex flex-row w-full justify-between gap-5 text-md">
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
          </div>
        </div>
      )}
    </div>
  );
};

export default DepositWithdrawModal;