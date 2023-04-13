import React, { useEffect, useState } from "react";
import {
  useOracleState,
  useSelectedContract,
  useSubscribeTx,
  useVMState,
} from "../contexts/StateProvider";
import toast from "react-hot-toast";
import {
  closeLong,
  closeShort,
  openLong,
  openShort,
  userSettle,
} from "../utils/vayoo-web3";
import { useWallet } from "@solana/wallet-adapter-react";
import { UserPosition } from "../utils/types";
import {
  USDC_MINT,
  USER_TRADE_CAP_USD,
  VAYOO_BACKEND_ENDPOINT,
} from "../utils/constants";
import {
  ORCA_WHIRLPOOL_PROGRAM_ID,
  PriceMath,
  swapQuoteByInputToken,
  swapQuoteByOutputToken,
} from "@orca-so/whirlpools-sdk";
import { DecimalUtil, Percentage } from "@orca-so/common-sdk";
import { BN } from "@project-serum/anchor";
import { Line, LineChart, ResponsiveContainer, XAxis, YAxis } from "recharts";
import { fetchAxiosWithRetry } from "../utils/web3-utils";

const Trade = () => {
  const { state, toggleRefresh, loading } = useVMState();
  const wallet = useWallet();
  const subscribeTx = useSubscribeTx();
  const oracleState = useOracleState();
  const { selectedContract } = useSelectedContract();

  const [localState, setLocalState] = useState({
    usdcAmount: 0,
    contractAmount: 0,
    userPosition: UserPosition.Neutral,
    isAmountInUsdc: true,
    lastAmount: 0,
  });
  const [errStr, setErrStr] = useState("");
  const [tradeEnable, setTradeEnable] = useState(true);
  const [usdcInputValue, setUsdcInputValue] = useState("0");
  const [contractInputValue, setContractInputValue] = useState("0");
  const [slippageValue, setSlippageValue] = useState("5");

  // const [priceData, setPriceData] = useState<any>([]);
  // const [yAxisMin, setYAxisMin] = useState(0);
  // const [yAxisMax, setYAxisMax] = useState(0);
  // const [chartStartTime, setChartStartTime] = useState(0);

  //  useEffect(() => {
  //   const interval = setInterval(
  //     () =>
  //       (async () => {
  //         let priceMax = 0;
  //         let priceMin = 0;
  //         let priceFeedData: any[] = (
  //           await fetchAxiosWithRetry(
  //             `${VAYOO_BACKEND_ENDPOINT}/priceFeed/${selectedContract?.name.replace(
  //               "/",
  //               "-"
  //             )}`
  //           )
  //         ).data;
  //         let localPriceFeedData = priceFeedData.map((pricePoint: any) => {
  //           priceMax = Math.max(
  //             pricePoint.assetPrice,
  //             pricePoint.oraclePrice,
  //             priceMax
  //           );
  //           priceMin = Math.min(pricePoint.assetPrice, pricePoint.oraclePrice);
  //           return pricePoint;
  //         });
  //         setPriceData(localPriceFeedData);
  //         setChartStartTime(localPriceFeedData.at(-1)?.timestamp - 900); // last 15 mins
  //         setYAxisMax(priceMax + 0.005 * priceMax);
  //         setYAxisMin(priceMin - 0.005 * priceMax);
  //       })(),
  //     1000
  //   );
  //   return () => {
  //     clearInterval(interval);
  //   };
  // }, [selectedContract]);

  const onClickOpenLong = async () => {
    await openLong(
      state,
      localState.lastAmount,
      localState.isAmountInUsdc,
      Number(slippageValue),
      wallet
    )
      .then((txHash: string) => {
        subscribeTx(
          txHash,
          () => toast("Open Long Transaction Sent"),
          () => toast.success("Open Long Transaction Confirmed."),
          () => toast.error("Open Long Transaction Failed")
        );
      })
      .catch((e) => {
        console.log(e);
        toast.error("Transaction Error!");
      })
      .finally(() => {
        setUsdcInputValue("0");
        setContractInputValue("0");
        setLocalState((prev) => ({
          ...prev,
          usdcAmount: 0,
          contractAmount: 0,
        }));
        toggleRefresh();
      });
  };

  const onClickCloseLong = async () => {
    await closeLong(
      state,
      localState.lastAmount,
      localState.isAmountInUsdc,
      Number(slippageValue),
      wallet
    )
      .then((txHash: string) => {
        subscribeTx(
          txHash,
          () => toast("Close Long Transaction Sent"),
          () => toast.success("Close Long Transaction Confirmed."),
          () => toast.error("Close Long Transaction Failed")
        );
      })
      .catch((e) => {
        console.log(e);
        toast.error("Transaction Error!");
      })
      .finally(() => {
        setUsdcInputValue("0");
        setContractInputValue("0");
        setLocalState((prev) => ({
          ...prev,
          usdcAmount: 0,
          contractAmount: 0,
        }));
        toggleRefresh();
      });
  };

  const onClickOpenShort = async () => {
    await openShort(
      state,
      localState.lastAmount,
      localState.isAmountInUsdc,
      Number(slippageValue),
      wallet
    )
      .then((txHash: string) => {
        subscribeTx(
          txHash,
          () => toast("Open Short Transaction Sent"),
          () => toast.success("Open Short Transaction Confirmed."),
          () => toast.error("Open Short Transaction Failed")
        );
      })
      .catch((e) => {
        console.log(e);
        toast.error("Transaction Error!");
      })
      .finally(() => {
        setUsdcInputValue("0");
        setContractInputValue("0");
        setLocalState((prev) => ({
          ...prev,
          usdcAmount: 0,
          contractAmount: 0,
        }));
        toggleRefresh();
      });
  };

  const onClickCloseShort = async () => {
    await closeShort(
      state,
      localState.lastAmount,
      localState.isAmountInUsdc,
      Number(slippageValue),
      wallet
    )
      .then((txHash: string) => {
        subscribeTx(
          txHash,
          () => toast("Close Short Transaction Sent"),
          () => toast.success("Close Short Transaction Confirmed."),
          () => toast.error("Close Short Transaction Failed")
        );
      })
      .catch((e) => {
        console.log(e);
        toast.error("Transaction Error!");
      })
      .finally(() => {
        setUsdcInputValue("0");
        setContractInputValue("0");
        setLocalState((prev) => ({
          ...prev,
          usdcAmount: 0,
          contractAmount: 0,
        }));
        toggleRefresh();
      });
  };

  const onClickUserSettle = async () => {
    await userSettle(state, wallet)
      .then((txHash: string) => {
        subscribeTx(
          txHash,
          () => toast("User Settle Transaction Sent"),
          () => toast.success("User Settle Transaction Confirmed."),
          () => toast.error("User Settle Transaction Failed")
        );
      })
      .catch((e) => {
        console.log(e);
        toast.error("Transaction Error!");
      })
      .finally(() => {
        toggleRefresh();
      });
  };

  const onChangeSeconderyUsdValue = (value: string) => {
    const parsedValue = value.replace(",", ".").replace(/[^0-9.]/g, "");
    let amountInUsd = Number.parseFloat(parsedValue);
    let contractValue: number;
    if (isNaN(amountInUsd)) amountInUsd = 0.0;
    if (amountInUsd > USER_TRADE_CAP_USD) {
      setErrStr(
        "Amount too high compared to available liquidity, please reduce"
      );
      setTradeEnable(false);
    } else {
      setErrStr("");
      setTradeEnable(true);
      (async () => {
        if (amountInUsd == 0.0) {
          contractValue = 0;
        } else {
          try {
            const swapQuote = await swapQuoteByOutputToken(
              state?.whirlpool!,
              USDC_MINT,
              DecimalUtil.toU64(DecimalUtil.fromNumber(amountInUsd), 6),
              Percentage.fromFraction(Number(slippageValue), 100),
              ORCA_WHIRLPOOL_PROGRAM_ID,
              state?.orcaFetcher!,
              true
            );
            contractValue = swapQuote.estimatedAmountIn.toNumber() / 1e6;

            // Slippage Mechanism
            const initalPoolPrice = PriceMath.sqrtPriceX64ToPrice(
              state?.poolState?.sqrtPrice!,
              6,
              6
            ).toNumber();
            const finalPoolPrice =
              swapQuote.estimatedAmountOut.toNumber() /
              swapQuote.estimatedAmountIn.toNumber();
            const slippagePercentage =
              (Math.abs(finalPoolPrice - initalPoolPrice) * 100) /
              initalPoolPrice;
            console.log("Slippage %:", slippagePercentage.toFixed(2));
            if (slippagePercentage > Number(slippageValue)) {
              setErrStr("Slippage Exceeded, try increasing tolerance");
              setTradeEnable(false);
              contractValue = 0;
            }
          } catch (e) {
            console.log(e);
            setErrStr(
              "Amount too high compared to available liquidity, please reduce"
            );
            setTradeEnable(false);
            contractValue = 0;
          }
        }
        setContractInputValue(contractValue.toString());
      })();
    }

    setUsdcInputValue(parsedValue);
    setLocalState((prev) => ({
      ...prev,
      usdcAmount: amountInUsd,
      contractAmount: contractValue,
      isAmountInUsdc: true,
      lastAmount: amountInUsd,
    }));
  };

  const onChangeSeconderyContractValue = (value: string) => {
    const parsedValue = value.replace(",", ".").replace(/[^0-9.]/g, "");
    let amountInContract = Number.parseFloat(parsedValue);
    let usdcValue: number;

    if (isNaN(amountInContract)) amountInContract = 0.0;
    setErrStr("");
    setTradeEnable(true);
    (async () => {
      if (amountInContract == 0.0) {
        usdcValue = 0;
      } else {
        try {
          const swapQuote = await swapQuoteByInputToken(
            state?.whirlpool!,
            state?.accounts.lcontractMint,
            DecimalUtil.toU64(DecimalUtil.fromNumber(amountInContract), 6),
            Percentage.fromDecimal(
              DecimalUtil.fromNumber(Number(slippageValue))
            ),
            ORCA_WHIRLPOOL_PROGRAM_ID,
            state?.orcaFetcher!,
            true
          );
          usdcValue = swapQuote.estimatedAmountOut.toNumber() / 1e6;

          // Slippage Mechanism
          const initalPoolPrice = PriceMath.sqrtPriceX64ToPrice(
            state?.poolState?.sqrtPrice!,
            6,
            6
          ).toNumber();
          const finalPoolPrice =
            swapQuote.estimatedAmountOut.toNumber() /
            swapQuote.estimatedAmountIn.toNumber();
          const slippagePercentage =
            (Math.abs(finalPoolPrice - initalPoolPrice) * 100) /
            initalPoolPrice;
          console.log("Slippage %:", slippagePercentage.toFixed(2));
          if (slippagePercentage > Number(slippageValue)) {
            setErrStr("Slippage Exceeded, try increasing tolerance");
            setTradeEnable(false);
            usdcValue = 0;
          }
          setUsdcInputValue(usdcValue.toString());
        } catch (e) {
          console.log(e);
          setErrStr(
            "Amount too high compared to available liquidity, please reduce"
          );
          setTradeEnable(false);
        }
      }
    })();
    setContractInputValue(parsedValue);
    setLocalState((prev) => ({
      ...prev,
      usdcAmount: usdcValue,
      contractAmount: amountInContract,
      isAmountInUsdc: false,
      lastAmount: amountInContract,
    }));
  };

  const onChangeSlippageValue = (value: any) => {
    let slippageValue = value.replace(",", ".").replace(/[^0-9.]/g, "");
    if (slippageValue < 50) {
      setSlippageValue(Math.max(0, slippageValue).toString());
    }
  };

  const setMaxUsd = () => {
    const maxAmount = state?.userState
      ? state?.userState?.usdcFree.toNumber()! / 1e6
      : 0;
    onChangeSeconderyUsdValue(maxAmount.toString());
  };

  const setMaxContract = () => {
    let maxAmount = 0;
    if (state?.userPosition == UserPosition.Long) {
      maxAmount = state?.userState?.lcontractBoughtAsUser.toNumber()! / 1e6;
    } else if (state?.userPosition == UserPosition.Short) {
      maxAmount = state?.userState?.scontractSoldAsUser.toNumber()! / 1e6;
    } else if (state?.userState?.lcontractMintedAsMm.toNumber()! > 0) {
      maxAmount =
        BN.max(
          state?.userState?.lcontractBoughtAsUser!,
          state?.userState?.scontractSoldAsUser!
        ).toNumber() / 1e6;
    }
    onChangeSeconderyContractValue(maxAmount.toString());
  };

  return (
    <div className="w-full max-w-xs py-6 text-white flex flex-col gap-3 border-2 border-gray-300/10 rounded-xl bg-black/50 z-10">
      <div className="px-6 text-lg text-gray-200">
        Trade {selectedContract?.extraInfo?.short_name}
      </div>
      {/* <ResponsiveContainer height={200}>
        <LineChart data={priceData}>
          <Line
            type="monotone"
            dataKey="assetPrice"
            stroke="rgb(217,249,157)"
          />
          <Line
            type="monotone"
            dataKey="oraclePrice"
            stroke="gray"
          />
          <XAxis
            dataKey={(v) => parseFloat(v.timestamp)}
            type="number"
            orientation="bottom"
            scale="linear"
            allowDataOverflow={true}
            axisLine={false}
            domain={[chartStartTime, "auto"]}
            tickLine={false}
            tick={false}
            hide={false}
          />
          <YAxis
            dataKey={(v) => parseFloat(v.oraclePrice)}
            type="number"
            domain={[yAxisMin, yAxisMax]}
            orientation="right"
            allowDataOverflow={true}
            scale="linear"
            tickCount={5}
          />
        </LineChart>
      </ResponsiveContainer> */}

      <div className="flex flex-col py-3 justify-between items-center text-gray-200 bg-gradient-to-r from-gray-600/50 via-gray-50/5 to-gray-600/50 border-t border-b border-gray-200/30">
        <div className="flex justify-between gap-4 items-start">
          <div className="flex flex-col items-center">
            <div className="text-gray-300 text-md">
              {oracleState?.price?.toFixed(2) ??
                oracleState?.previousPrice.toFixed(2) ??
                "NIL"}
            </div>
            <div className="text-gray-500 text-xs underline-offset-4">
              <a href={selectedContract?.extraInfo.oracle_link}>oracle</a>
            </div>
          </div>
          |
          <div className="text-lime-200 text-2xl">
            {state?.assetPrice.toFixed(2)}
          </div>
        </div>
      </div>
      {state?.contractState?.isSettling ? (
        state?.userPosition != UserPosition.Long ? (
          <div className="my-3 flex flex-col items-center text-gray-200">
            Contract has been settled.
          </div>
        ) : (
          <div className="my-3 flex flex-col items-center text-gray-200">
            Contract is in settling mode.
            <button
              onClick={onClickUserSettle}
              className="mt-4 px-16 py-2 border-2 text-gray-200 border-gray-100/40 rounded-xl hover:bg-blue-200/20 hover:border-blue-100/80"
            >
              Settle Long Position
            </button>
          </div>
        )
      ) : (
        <div>
          <div className="px-6 mt-1 flex flex-col gap-3 text-sm">
            <div className="flex justify-between items-center text-gray-400">
              Free Margin :
              <div>
                {state?.userState
                  ? (state?.userState?.usdcFree.toNumber()! / 1e6).toFixed(2)
                  : 0}{" "}
                USDC
              </div>
            </div>
          </div>
          <div className="px-6 mt-3 flex gap-5 text-xl items-start text-gray-200">
            <div className="flex flex-col gap-4 items-start">
              <div className="flex flex-col items-end text-lg">
                Amount
                <div className="mt-4 text-gray-500 text-xs underline-offset-4">
                  USDC
                </div>
              </div>
              <div className="mt-4 w-full flex flex-col items-end text-lg">
                <div className="text-gray-500 text-xs underline-offset-4 text-right">
                  No of contracts
                </div>
              </div>
            </div>
            <div className="mt-8 w-full flex flex-col gap-4">
              <div className="flex flex-1 items-center">
                <input
                  value={usdcInputValue}
                  onChange={(e) => onChangeSeconderyUsdValue(e.target.value)}
                  className="w-full py-2 text-sm px-3 text-gray-100 rounded-l-lg border-2 border-gray-100/10 border-r-0 bg-gray-100/10 focus:outline-none"
                />
                <div
                  onClick={setMaxUsd}
                  className="flex flex-col py-2 items-center w-32 text-sm text-gray-400 border-2 border-gray-100/30 rounded-r-lg hover:border-gray-200/60 hover:text-white cursor-pointer"
                >
                  Max
                </div>
              </div>
              <div className="flex flex-1 items-center">
                <input
                  value={contractInputValue}
                  onChange={(e) =>
                    onChangeSeconderyContractValue(e.target.value)
                  }
                  className="w-full py-2 text-sm px-3 text-gray-100 rounded-l-lg border-2 border-gray-100/10 border-r-0 bg-gray-100/10 focus:outline-none"
                />
                <div
                  onClick={setMaxContract}
                  className="flex flex-col py-2 items-center w-32 text-sm text-gray-400 border-2 border-gray-100/30 rounded-r-lg hover:border-gray-200/60 hover:text-white cursor-pointer"
                >
                  Max
                </div>
              </div>
            </div>
          </div>
          <p className="mt-4 ml-20 px-6 text-red-900 text-sm">{errStr}</p>
          <div className="px-8 flex items-center justify-between mt-2">
            <p className="text-sm text-gray-500 font-regular font-poppins dark:text-white-900">
              Slippage Tolerance
            </p>
            <div className="flex items-center border-2 border-gray-500/40 bg-black rounded-lg overflow-hidden">
              <input
                value={slippageValue}
                onChange={(e) => onChangeSlippageValue(e.target.value)}
                className="w-8 py-1 text-sm font-medium text-center text-gray-200 bg-black focus:outline-none border-r border-gray-500/40"
              />
              <p className="px-2 text-sm">%</p>
            </div>
          </div>

          <div className="mt-3 px-6 flex flex-row w-full justify-between gap-3">
            <div className="w-full py-1 rounded-xl">
              <button
                disabled={!tradeEnable || !state?.userState}
                onClick={
                  state?.userPosition == UserPosition.Neutral ||
                  state?.userPosition == UserPosition.Mm
                    ? onClickOpenLong
                    : state?.userPosition == UserPosition.Long
                    ? onClickOpenLong
                    : onClickOpenShort
                }
                className={`${
                  state?.userPosition == UserPosition.Neutral ||
                  state?.userPosition == UserPosition.Mm
                    ? "bg-green-400/30 hover:border-green-400/60"
                    : state?.userPosition == UserPosition.Long
                    ? "bg-green-400/30 hover:border-green-400/60"
                    : "bg-red-400/30 hover:border-red-400/60"
                } w-full py-3 text-gray-100  rounded-lg border-2 border-white/10 text-sm disabled:border disabled:border-gray-500/40 disabled:bg-black disabled:text-gray-400 disabled:cursor-not-allowed`}
              >
                {state?.userPosition == UserPosition.Neutral ||
                state?.userPosition == UserPosition.Mm
                  ? "Long"
                  : state?.userPosition == UserPosition.Long
                  ? "Long"
                  : "Short"}
              </button>
            </div>
            <div className="w-full flex flex-col justify-between items-center py-1 border-green-100/60 rounded-xl">
              <button
                disabled={!tradeEnable || !state?.userState}
                onClick={
                  state?.userPosition == UserPosition.Neutral ||
                  state?.userPosition == UserPosition.Mm
                    ? onClickOpenShort
                    : state?.userPosition == UserPosition.Long
                    ? onClickCloseLong
                    : onClickCloseShort
                }
                className={`${
                  state?.userPosition == UserPosition.Neutral ||
                  state?.userPosition == UserPosition.Mm
                    ? "bg-red-400/30 hover:border-red-400/60"
                    : state?.userPosition == UserPosition.Long
                    ? "bg-green-400/10 hover:border-green-400/40"
                    : "bg-red-400/10 hover:border-red-400/40"
                } w-full py-3 text-gray-100  rounded-lg border-2 border-white/10 text-sm disabled:border disabled:border-gray-500/40 disabled:bg-black disabled:text-gray-400 disabled:cursor-not-allowed`}
              >
                {state?.userPosition == UserPosition.Neutral ||
                state?.userPosition == UserPosition.Mm
                  ? "Short"
                  : state?.userPosition == UserPosition.Long
                  ? "Close Long"
                  : "Close Short"}
              </button>
            </div>
          </div>
          {state?.userPosition == UserPosition.Mm && (
            <div className="mt-1 px-6 flex flex-row w-full justify-between gap-3">
              <div className="w-full py-1 rounded-xl">
                <button
                  disabled={!tradeEnable || !state?.userState}
                  onClick={onClickCloseLong}
                  className={`bg-green-400/10 hover:border-green-400/40
                  w-full py-3 text-gray-100  rounded-lg border-2 border-white/10 text-sm disabled:border disabled:border-gray-500/40 disabled:bg-black disabled:text-gray-400 disabled:cursor-not-allowed`}
                >
                  Close Long
                </button>
              </div>
              <div className="w-full flex flex-col justify-between items-center py-1 border-green-100/60 rounded-xl">
                <button
                  disabled={!tradeEnable || !state?.userState}
                  onClick={onClickCloseShort}
                  className={`bg-red-400/10 hover:border-red-400/40
                  w-full py-3 text-gray-100  rounded-lg border-2 border-white/10 text-sm disabled:border disabled:border-gray-500/40 disabled:bg-black disabled:text-gray-400 disabled:cursor-not-allowed`}
                >
                  Close Short
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Trade;
