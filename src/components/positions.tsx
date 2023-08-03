import { useEffect, useState } from "react";
import {
  useOracleState,
  useSelectedContract,
  useVMState,
} from "../contexts/StateProvider";
import { UserPosition } from "../utils/types";
import { PriceMath } from "@orca-so/whirlpools-sdk";
import { fetchAxiosWithRetry } from "../utils/web3-utils";
import { VAYOO_BACKEND_ENDPOINT } from "../utils/constants";
import { useWallet } from "@solana/wallet-adapter-react";

const Positions = () => {
  const { state, loading } = useVMState();
  const wallet = useWallet();
  const { selectedContract } = useSelectedContract();
  const oracleState = useOracleState();
  const [localState, setLocalState] = useState({
    position: 0,
    positionMargin: 0,
    usdValue: 0,
    leverage: 0,
    entryPrice: 0,
    upnl: 0,
    upnlIsGains: true,
    positionExist: false,
  });

  useEffect(() => {
    const position =
      (state?.userState?.lcontractBoughtAsUser!.toNumber() != 0
        ? state?.userState?.lcontractBoughtAsUser!.toNumber()!
        : state?.userState?.scontractSoldAsUser.toNumber()!) / 1e6;
    if (!position || position == 0) {
      setLocalState((prev) => ({
        ...prev,
        positionExist: false,
      }));
      return;
    }
    const poolPrice = PriceMath.sqrtPriceX64ToPrice(
      state?.poolState?.sqrtPrice! ?? 0,
      6,
      6
    ).toNumber();
    const positionMargin = position * poolPrice;
    const leverage = state?.assetPrice! / poolPrice;
    const usdValue = positionMargin * leverage;

    setLocalState((prev) => ({
      ...prev,
      position,
      positionMargin,
      usdValue,
      leverage,
      positionExist: true,
    }));
  }, [state?.poolState, state?.userState, oracleState]);

  useEffect(() => {
    (async () => {
      updatePnL();
    })();
    const intervel = setInterval(() => {
      if (localState.positionExist) {
        (async () => {
          await updatePnL();
        })();
      }
    }, 5000);
    return () => {
      clearInterval(intervel);
    };
  }, [localState.position]);

  const updatePnL = async () => {
    if (state?.accounts.lcontractMint) {
      const pnlUserDump = (
        await fetchAxiosWithRetry(
          `${VAYOO_BACKEND_ENDPOINT}/pnl/${state.accounts.lcontractMint.toString()}/${wallet.publicKey!}`
        )
      ).data!;
      const entryPoolPrice = pnlUserDump["avgCurrentPrice"];
      const poolPrice = PriceMath.sqrtPriceX64ToPrice(
        state?.poolState?.sqrtPrice! ?? 0,
        6,
        6
      ).toNumber();
      let upnl: number | null;
      if (
        state.userPosition == UserPosition.Short ||
        state.userPosition == UserPosition.MmAndShort
      ) {
        upnl = (entryPoolPrice - poolPrice) * localState.position;
      } else {
        upnl = (poolPrice - entryPoolPrice) * localState.position;
      }
      const upnlIsGains = upnl! > 0;
      let entryPrice =
        state?.contractState?.startingPrice.toNumber()! /
          state?.contractState?.oraclePriceMultiplier.toNumber()! -
        state?.contractState?.limitingAmplitude.toNumber()! / 2 +
        entryPoolPrice;
      if (isNaN(entryPrice) || entryPoolPrice == 0 || Math.abs(pnlUserDump["currentPos"]) != localState.position) {
        entryPrice = null;
        upnl = null;
      }
      setLocalState((prev) => ({
        ...prev,
        entryPrice,
        upnl: upnl!,
        upnlIsGains,
      }));
    }
  };

  return (
    <div className="relative w-full px-6 py-6 text-white flex flex-col gap-3 border-2 border-gray-300/10 rounded-xl bg-black/50 z-[2]">
      <div className="flex gap-3">
        <div className={`text-lg text-gray-200`}>Your Position</div>
      </div>
      {localState.positionExist ? (
        <div className="mt-1 grid grid-cols-7 gap-y-3 text-xs">
          <div className="text-gray-400">Contract</div>
          <div className="text-gray-400">Size</div>
          <div className="text-gray-400">Leverage</div>
          <div className="text-gray-400">Margin(USD)</div>
          <div className="text-gray-400">Entry Price</div>
          <div className="text-gray-400">Mark Price</div>
          <div className="text-gray-400">Unrealized PnL</div>
          <div className="text-gray-200 text-sm">
            {selectedContract?.extraInfo.short_name}
          </div>
          <div className="-mt-[4px] flex flex-col gap-1">
            <div
              className={`font-bold text-lg ${
                (state?.userPosition == UserPosition.Long ||
                  state?.userPosition == UserPosition.MmAndLong) &&
                "text-green-600"
              } ${
                (state?.userPosition == UserPosition.Short ||
                  state?.userPosition == UserPosition.MmAndShort) &&
                "text-red-600"
              }`}
            >
              {(state?.userPosition == UserPosition.Long ||
                state?.userPosition == UserPosition.MmAndLong) &&
                "+"}
              {(state?.userPosition == UserPosition.Short ||
                state?.userPosition == UserPosition.MmAndShort) &&
                "-"}
              {localState.position}
            </div>
            <div className="ml-9 text-xs text-gray-400">
              ({localState.usdValue.toFixed(2)} $)
            </div>
          </div>
          <div className="text-gray-300 text-sm">
            {localState.leverage.toFixed(2)}x
          </div>
          <div className="text-gray-300 text-sm">
            {localState.positionMargin.toFixed(2)} $
          </div>
          <div className="text-gray-300 text-sm">
            {localState.entryPrice ? localState.entryPrice?.toFixed(2) : "-"}
          </div>
          <div className="text-gray-300 text-sm">
            {state?.assetPrice.toFixed(2)}
          </div>
          <div
            className={`text-sm text-gray-300 ${
              localState.entryPrice && localState.upnlIsGains
                ? "text-green-500"
                : "text-red-600"
            }`}
          >
            {localState.upnl ? `${localState.upnl.toFixed(4)} $` : "-"}
          </div>
        </div>
      ) : (
        <div className="text-sm flex flex-col items-center py-4 text-gray-300">
          No Positions Founds.
        </div>
      )}
    </div>
  );
};

export default Positions;
