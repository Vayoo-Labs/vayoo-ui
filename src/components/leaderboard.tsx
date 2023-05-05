import { useEffect, useState } from "react";
import { useSelectedContract, useVMState } from "../contexts/StateProvider";
import { fetchAxiosWithRetry } from "../utils/web3-utils";
import { VAYOO_BACKEND_ENDPOINT } from "../utils/constants";
import { shortenAddress } from "../utils";
import { useWallet } from "@solana/wallet-adapter-react";

const LeaderboardComponent = () => {
  const { selectedContract } = useSelectedContract();
  const wallet = useWallet();
  const [leaderboardData, setLeaderboardData] = useState<any>();
  const [userRank, setUserRank] = useState<number | null>(null);

  useEffect(() => {
    (async () => {
      const leaderboardData = (
        await fetchAxiosWithRetry(
          `${VAYOO_BACKEND_ENDPOINT}/pnl/leaderboard/${selectedContract?.name}`
        )
      ).data!;
      setLeaderboardData(leaderboardData);
      if (wallet.publicKey) {
        const rank = (
          await fetchAxiosWithRetry(
            `${VAYOO_BACKEND_ENDPOINT}/pnl/rank/${
              selectedContract?.name
            }/${wallet.publicKey.toString()}`
          )
        ).data!;
        setUserRank(rank);
      }
    })();
  }, [selectedContract, wallet.publicKey]);

  return (
    <div className="w-full max-w-5xl px-6 py-10 pb-16 text-white flex flex-col gap-3 border-2 border-gray-300/10 rounded-xl bg-black/50 z-10">
      {userRank ? (
        <>
          <div className="text-xl text-gray-300 text-center">Leaderboard</div>
          <div className="px-8 mt-6 grid grid-cols-4 gap-y-5 text-md text-center">
            <div className="text-gray-500">Rank</div>
            <div className="text-gray-500">User</div>
            <div className="text-gray-500 mb-4">Current Position</div>
            <div className="text-gray-500">PnL</div>
            {leaderboardData &&
              (leaderboardData as any[]).map((userPnl, index) => {
                return (
                  <>
                    <div
                      className={`text-gray-300 ${
                        userRank == index + 1 &&
                        "py-3 border-l border-t border-b border-gray-300/40 rounded-tl-xl rounded-bl-xl"
                      }`}
                      key={`a ${index}`}
                    >
                      {index + 1}
                    </div>
                    <a
                      href={`https://solscan.io/account/${userPnl["userKey"]}`}
                      target="_blank"
                      key={`b ${index}`}
                    >
                      <div
                        className={`text-gray-300 hover:text-gray-100 tracking-widest ${
                          userRank == index + 1 &&
                          "py-3 border-t border-b border-gray-300/40"
                        }`}
                      >
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
                      } ${
                        userRank == index + 1 &&
                        "py-3 border-t border-b border-gray-300/40"
                      }`}
                      key={`c ${index}`}
                    >
                      {userPnl["currentPos"] > 0 && "+"}
                      {userPnl["currentPos"] < 0 && "-"}
                      {userPnl["currentPos"] == 0
                        ? "-"
                        : Math.abs(userPnl["currentPos"]).toFixed(4)}
                    </div>
                    <div
                      className={`${
                        userPnl["totalPnl"] > 0
                          ? "text-green-500"
                          : "text-red-600"
                      } ${
                        userRank == index + 1 &&
                        "py-3 border-r border-t border-b border-gray-300/40 rounded-tr-xl rounded-br-xl"
                      }`}
                      key={`d ${index}`}
                    >
                      {userPnl["totalPnl"].toFixed(4)} $
                    </div>
                  </>
                );
              })}
          </div>
        </>
      ) : (
        <div className="flex flex-col items-center text-2xl text-gray-200">
          Loading...
        </div>
      )}
    </div>
  );
};

export default LeaderboardComponent;
