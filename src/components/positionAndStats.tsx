import { useEffect, useState } from "react";
import { useSelectedContract, useVMState } from "../contexts/StateProvider";
import { UserPosition } from "../utils/types";

const PositionAndStatsComponent = () => {
  const { state, loading } = useVMState();
  const [isStats, setisStats] = useState(false);
  const { selectedContract } = useSelectedContract();

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
    <div className="w-full max-w-xs px-6 py-6 text-white flex flex-col gap-3 border-2 border-gray-300/10 rounded-xl bg-black/50 z-10">
      <div className="flex gap-3">
        <div
          className={`cursor-pointer text-lg ${
            isStats ? "text-gray-600" : "text-gray-300"
          }`}
          onClick={onClickPosition}
        >
          Your Positions
        </div>
        <div
          className={`cursor-pointer text-lg ${
            !isStats ? "text-gray-600" : "text-gray-300"
          }`}
          onClick={onClickStats}
        >
          Stats
        </div>
      </div>
      {!isStats ? (
        <div className="mt-1 flex flex-col gap-3 text-sm">
          <div className="flex justify-between items-center text-gray-400">
            Net Position:
            <div
              className={`font-bold text-lg text-gray-400 ${
                state?.userPosition == UserPosition.Long &&
               "text-green-600" 
              } ${
                state?.userPosition == UserPosition.Short &&
               "text-red-600" 
              }`}
            >
              {state?.userPosition == UserPosition.Long && "+"}
              {state?.userPosition == UserPosition.Short && "-"}
              {state?.userState ? Math.abs(
                state?.userState?.contractPositionNet.toNumber()! / 1e6
              ).toFixed(6) : 0}{" "}
              {selectedContract?.extraInfo.short_name}
            </div>
          </div>
          <div className="flex justify-between items-center text-gray-400">
            Long Position:
            <div>
              {state?.userState? (
                state?.userState?.lcontractBoughtAsUser.toNumber()! / 1e6
              ).toFixed(6) : 0}
            </div>
          </div>
          <div className="flex justify-between items-center text-gray-400">
            Short Position:
            <div>
              {state?.userState ? (
                state?.userState?.scontractSoldAsUser.toNumber()! / 1e6
              ).toFixed(6) : 0}
            </div>
          </div>
        </div>
      ) : (
        <div className="mt-1 flex flex-col gap-3 text-xs text-right">
          <div className="flex justify-between items-center text-gray-400">
            Limiting Amplitude :<div>{state?.contractState?.limitingAmplitude.toNumber()}</div>
          </div>
          <div className="flex justify-between text-gray-400">
            <div className="whitespace-nowrap">
              Time of Maturity :
              </div>
              <div className="">{maturity.toUTCString()}</div>
          </div>
          {(state?.contractState?.isSettling) && (
            <div className="flex justify-between items-center text-gray-400">
              Price at Maturity :
              <div>
                {(
                  state?.contractState?.endingPrice.toNumber()! / selectedContract?.oracleExponent!
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
                state?.contractState?.startingPrice.toNumber()! / selectedContract?.oracleExponent!
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
            Oracle Feed :
            <div className="underline underline-offset-4">
              <a href={selectedContract?.extraInfo.oracle_link}>{selectedContract?.extraInfo.long_name}</a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PositionAndStatsComponent;
