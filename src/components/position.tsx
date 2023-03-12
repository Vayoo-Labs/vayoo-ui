import toast, { Toaster } from "react-hot-toast";
import { useState } from "react";
import { useSubscribeTx, useVMState } from "../contexts/StateProvider";
import {
  adminSettle,
  initContract,
  triggerSettleMode,
} from "../utils/vayoo-web3";
import { useWallet } from "@solana/wallet-adapter-react";
import { PositionComponentParams, UserPosition } from "../utils/types";
import { ASSET_LONG_NAME, ASSET_SHORT_NAME } from "../utils/constants";

const PositionComponent = ({ userPosition }: PositionComponentParams) => {
  const { state, loading } = useVMState();

  return (
    <div className="w-full px-6 py-6 text-white flex flex-col gap-3 border-2 border-gray-300/10 max-w-5xl rounded-xl bg-black/50">
      <div className="text-2xl">Your Position</div>
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
            {(state?.userState?.contractPositionNet.toNumber()! / 1e6).toFixed(
              6
            )}{" "}
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
            {(state?.userState?.scontractSoldAsUser.toNumber()! / 1e6).toFixed(
              6
            )}
          </div>
        </div>
        <div className="flex justify-between items-center text-gray-400 ">
          Asset :
          <div className="underline underline-offset-4">
            <a href="https://pyth.network/price-feeds/equity-us-spy-usd?cluster=mainnet-beta">
              {ASSET_LONG_NAME}
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PositionComponent;
