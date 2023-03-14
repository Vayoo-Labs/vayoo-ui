import toast, { Toaster } from "react-hot-toast";
import { useState } from "react";
import { useSubscribeTx, useVMState } from "../contexts/StateProvider";
import {
  adminSettle,
  initContract,
  triggerSettleMode,
} from "../utils/vayoo-web3";
import { useWallet } from "@solana/wallet-adapter-react";
import { PositionAndStatsComponentParams, UserPosition } from "../utils/types";
import {
  ASSET_LINK,
  ASSET_LONG_NAME,
  ASSET_SHORT_NAME,
  PYTH_EXPONENT,
} from "../utils/constants";

const PositionAndStatsComponent = ({ userPosition }: PositionAndStatsComponentParams) => {
  const { state, loading } = useVMState();
  const [isStats, setisStats] = useState(false);

  const maturity = new Date(
    state?.contractState?.endingTime.toNumber()! * 1000
  );
  const startTime = new Date(
    state?.contractState?.startingTime.toNumber()! * 1000
  );

  const onClickPosition = () => {
    setisStats(false);
  };

  const onClickStats = () => {
    setisStats(true);
  };

  return (
    <div className="w-full px-6 py-6 text-white flex flex-col gap-3 border-2 border-gray-300/10 max-w-5xl rounded-xl bg-black/50">
      <div className="flex gap-3">
        <div
          className={`cursor-pointer text-2xl ${
            isStats ? "text-gray-600" : "text-gray-200"
          }`}
          onClick={onClickPosition}
        >
          Your Position
        </div>
        <div
          className={`cursor-pointer text-2xl ${
            !isStats ? "text-gray-600" : "text-gray-200"
          }`}
          onClick={onClickStats}
        >
          Stats
        </div>
      </div>
      {!isStats ? (
        <div className="mt-1 flex flex-col gap-3 text-sm">
          <div className="flex justify-between items-center text-gray-300">
            Net Position:
            <div
              className={`font-bold text-2xl ${
                userPosition != UserPosition.Neutral &&
                (userPosition == UserPosition.Long
                  ? "text-green-600"
                  : "text-red-600")
              }`}
            >
              {userPosition != UserPosition.Neutral &&
                (userPosition == UserPosition.Long ? "+" : "-")}
              {Math.abs(
                state?.userState?.contractPositionNet.toNumber()! / 1e6
              ).toFixed(6)}{" "}
              {ASSET_SHORT_NAME}
            </div>
          </div>
          <div className="flex justify-between items-center text-gray-400">
            Long Position:
            <div>
              {(
                state?.userState?.lcontractBoughtAsUser.toNumber()! / 1e6
              ).toFixed(6)}
            </div>
          </div>
          <div className="flex justify-between items-center text-gray-400">
            Short Position:
            <div>
              {(
                state?.userState?.scontractSoldAsUser.toNumber()! / 1e6
              ).toFixed(6)}
            </div>
          </div>
        </div>
      ) : (
        <div className="mt-1 flex flex-col gap-3 text-sm">
          <div className="flex justify-between items-center text-gray-400">
            Time of Maturity :<div>{maturity.toUTCString()}</div>
          </div>
          {(state?.contractState?.isSettling) && (
            <div className="flex justify-between items-center text-gray-400">
              Price at Maturity :
              <div>
                {(
                  state?.contractState?.endingPrice.toNumber()! / PYTH_EXPONENT
                ).toFixed(2)}{" "}
                USD
              </div>
            </div>
          )}

          <div className="flex justify-between items-center text-gray-400">
            Starting Time :<div>{startTime.toUTCString()}</div>
          </div>
          <div className="flex justify-between items-center text-gray-400">
            Starting Price :
            <div>
              {(
                state?.contractState?.startingPrice.toNumber()! / PYTH_EXPONENT
              ).toFixed(2)}{" "}
              USD
            </div>
          </div>
          <div className="flex justify-between items-center text-gray-400">
            Settling :<div>{state?.contractState?.isSettling.toString()}</div>
          </div>
          <div className="flex justify-between items-center text-gray-400">
            Halted :<div>{state?.contractState?.isHalted.toString()}</div>
          </div>
          <div className="flex justify-between items-center text-gray-400 ">
            Pyth Feed :
            <div className="underline underline-offset-4">
              <a href={ASSET_LINK}>{ASSET_LONG_NAME}</a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PositionAndStatsComponent;
