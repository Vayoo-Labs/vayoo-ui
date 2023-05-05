import { useEffect, useState } from "react";
import { useSelectedContract, useVMState } from "../contexts/StateProvider";
import { fetchAxiosWithRetry } from "../utils/web3-utils";
import { VAYOO_BACKEND_ENDPOINT } from "../utils/constants";
import { shortenAddress } from "../utils";

const LeaderboardComponent = () => {
  const { selectedContract } = useSelectedContract();
  const [leaderboardData, setLeaderboardData] = useState<any>();

  useEffect(() => {
    (async () => {
      const leaderboardData = (
        await fetchAxiosWithRetry(
          `${VAYOO_BACKEND_ENDPOINT}/pnl/leaderboard/${selectedContract?.name}`
        )
      ).data!;
      setLeaderboardData(leaderboardData);
    })();
  }, [selectedContract]);

  return (
    <div className="w-full max-w-4xl px-6 py-6 text-white flex flex-col gap-3 border-2 border-gray-300/10 rounded-xl bg-black/50 z-10">
      {leaderboardData ? 
      <>
      <div className="text-xl text-gray-300 text-center">Leaderboard</div>
      <div className="mt-4 grid grid-cols-4 gap-y-4 text-md text-center">
        <div className="text-gray-500">Rank</div>
        <div className="text-gray-500">User</div>
        <div className="text-gray-500">Current Position</div>
        <div className="text-gray-500">PnL</div>
        {leaderboardData &&
          (leaderboardData as any[]).map((userPnl, index) => {
            return (
              <>
                <div className="text-gray-300">{index + 1}</div>
                <a
                  href={`https://solscan.io/account/${userPnl["userKey"]}`}
                  target="_blank"
                >
                  <div className="text-gray-300 hover:text-gray-100 tracking-widest">
                    {shortenAddress(userPnl["userKey"], 4, 10)}
                  </div>
                </a>
                <div
                  className={`${
                    userPnl["currentPos"] == 0
                      ? "text-gray-300"
                      : userPnl["currentPos"] > 0
                      ? "text-green-500"
                      : "text-red-600"
                  }`}
                >
                  {userPnl["currentPos"] > 0 && "+"}
                  {userPnl["currentPos"] < 0 && "-"}
                  {userPnl["currentPos"] == 0 ? '-' : Math.abs(userPnl["currentPos"]).toFixed(4)}
                </div>
                <div
                  className={`${
                    userPnl["totalPnl"] > 0 ? "text-green-500" : "text-red-600"
                  }`}
                >
                  {userPnl["totalPnl"].toFixed(4)} $
                </div>
              </>
            );
          })}
      </div>
      </>
      :
      <div className="flex flex-col items-center text-2xl text-white">Loading...</div>}
    </div>
  );
};

export default LeaderboardComponent;
