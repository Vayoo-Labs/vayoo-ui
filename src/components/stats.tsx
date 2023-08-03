import { useSelectedContract, useVMState } from "../contexts/StateProvider";

const StatsComponent = () => {
  const { state, loading } = useVMState();
  const { selectedContract } = useSelectedContract();

  const maturity = new Date(
    state?.contractState?.endingTime.toNumber()! * 1000
  );
  const startTime = new Date(
    state?.contractState?.startingTime.toNumber()! * 1000
  );

  return (
    <div className="w-full max-w-xs px-6 py-6 text-white flex flex-col gap-3 border-2 border-gray-300/10 rounded-xl bg-black/50 z-[2]">
      <div className="flex gap-3">
        <div
          className="text-lg text-gray-200"
        >
          Stats
        </div>
        
      </div>
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
    </div>
  );
};

export default StatsComponent;
