import React, { useEffect, useState } from "react";
import { AiOutlineSwap } from "react-icons/ai";
import { MdSwapVert } from "react-icons/md";
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
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { UserPosition } from "../utils/types";
import {
  USDC_MINT,
  USER_TRADE_CAP_USD,
  VAYOO_BACKEND_ENDPOINT,
} from "../utils/constants";
import {
  ORCA_WHIRLPOOL_PROGRAM_ID,
  PoolUtil,
  PriceMath,
  swapQuoteByInputToken,
  swapQuoteByOutputToken,
} from "@orca-so/whirlpools-sdk";
import { DecimalUtil, Percentage } from "@orca-so/common-sdk";
import { BN } from "@project-serum/anchor";
import { Line, LineChart, ResponsiveContainer, XAxis, YAxis } from "recharts";
import { fetchAxiosWithRetry } from "../utils/web3-utils";
import { getAccount, getMint } from "@solana/spl-token-v2";
import { getTokenBalance } from "../utils/whirlpoolUtils/utils/token";
import { toUiAmount } from "../utils";

const Trade = () => {
  const { state, toggleRefresh, loading } = useVMState();
  const wallet = useWallet();
  const { connection } = useConnection();
  const subscribeTx = useSubscribeTx();
  const oracleState = useOracleState();
  const { selectedContract } = useSelectedContract();

  const [localState, setLocalState] = useState({
    marginAmount: 0,
    contractAmount: 0,
    isAmountInUsdc: true,
    lastAmount: 0,
  });
  const [errStr, setErrStr] = useState<string | null>(null);
  const [tradeEnable, setTradeEnable] = useState(true);
  const [usdcInputValue, setUsdcInputValue] = useState("0");
  const [contractInputValue, setContractInputValue] = useState("0");
  const [slippageTolerance, setSlippageTolerance] = useState(1);
  const [slippage, setSlippage] = useState(0);
  const [diffPoolPrice, setDiffPoolPrice] = useState(0);
  const [executionPrice, setExecutionPrice] = useState(0);
  const [feeValue, setFeeValue] = useState(0);
  const [liquidityValue, setLiquidityValue] = useState(0);
  const [marginUsedValue, setMarginUsedValue] = useState(0);
  const [leverageValue, setLeverageValue] = useState(0);
  const [isLongTrade, setIsLongTrade] = useState(true);

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

  useEffect(() => {
    if (
      state?.userPosition == UserPosition.Short ||
      state?.userPosition == UserPosition.MmAndShort
    ) {
      setIsLongTrade(false);
    } else {
      setIsLongTrade(true);
    }
  }, [state?.userPosition]);

  const onClickOpenLong = async () => {
    await openLong(
      state,
      localState.lastAmount,
      localState.isAmountInUsdc,
      Number(slippageTolerance),
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
          marginAmount: 0,
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
      Number(slippageTolerance),
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
          marginAmount: 0,
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
      Number(slippageTolerance),
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
          marginAmount: 0,
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
      Number(slippageTolerance),
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
          marginAmount: 0,
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

  const onChangeUsdcValue = (value: string) => {
    const parsedValue = value.replace(",", ".").replace(/[^0-9.]/g, "");
    let amountInNominalUsd = Number.parseFloat(parsedValue);
    let marginUsed = amountInNominalUsd / leverageValue;
    let contractValue: number;
    if (isNaN(marginUsed)) marginUsed = 0.0;
    if (marginUsed > USER_TRADE_CAP_USD) {
      setErrStr(
        "Amount too high compared to available liquidity, please reduce"
      );
      setTradeEnable(false);
    } else {
      setErrStr(null);
      setTradeEnable(true);
      (async () => {
        if (marginUsed == 0.0) {
          contractValue = 0;
          setContractInputValue("0");
        } else {
          try {
            const swapQuote = await swapQuoteByOutputToken(
              state?.whirlpool!,
              USDC_MINT,
              DecimalUtil.toU64(DecimalUtil.fromNumber(marginUsed), 6),
              Percentage.fromFraction(Number(slippageTolerance), 100),
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
            const executionPoolPrice =
              swapQuote.estimatedAmountOut.toNumber() /
              swapQuote.estimatedAmountIn.toNumber();
            const diffPoolPrice = Math.abs(
              executionPoolPrice - initalPoolPrice
            );
            setDiffPoolPrice(diffPoolPrice);
            const slippagePercentage =
              (diffPoolPrice * 100) / state?.assetPrice!;
            setSlippage(slippagePercentage);
            if (slippagePercentage > Number(slippageTolerance)) {
              setErrStr("Slippage Exceeded, try increasing tolerance");
              setTradeEnable(false);
            }
            // Position Margin
            setMarginUsedValue(marginUsed);
            // Fee Value Calc
            const feeValue = PoolUtil.getFeeRate(state?.poolState?.feeRate!)
              .toDecimal()
              .mul(DecimalUtil.fromNumber(amountInNominalUsd))
              .div(DecimalUtil.fromNumber(leverageValue))
              .toNumber();
            setFeeValue(feeValue);
          } catch (e) {
            console.log(e);
            setErrStr(
              "Amount too high compared to available liquidity, please reduce"
            );
            setTradeEnable(false);
            contractValue = 0;
          }
        }
        setContractInputValue(
          (amountInNominalUsd / state?.assetPrice!).toFixed(6)
        );
      })();
    }

    setUsdcInputValue(parsedValue);
    setLocalState((prev) => ({
      ...prev,
      marginAmount: marginUsed,
      contractAmount: contractValue,
      isAmountInUsdc: true,
      lastAmount: marginUsed,
    }));
  };

  const onChangeContractValue = (value: string) => {
    const parsedValue = value.replace(",", ".").replace(/[^0-9.]/g, "");
    let amountInContract = Number.parseFloat(parsedValue);
    let marginUsed: number;

    if (isNaN(amountInContract)) amountInContract = 0.0;
    setErrStr(null);
    setTradeEnable(true);
    (async () => {
      if (amountInContract == 0.0) {
        marginUsed = 0;
        setUsdcInputValue("0");
      } else {
        try {
          const swapQuote = await swapQuoteByInputToken(
            state?.whirlpool!,
            state?.accounts.lcontractMint,
            DecimalUtil.toU64(DecimalUtil.fromNumber(amountInContract), 6),
            Percentage.fromDecimal(
              DecimalUtil.fromNumber(Number(slippageTolerance))
            ),
            ORCA_WHIRLPOOL_PROGRAM_ID,
            state?.orcaFetcher!,
            true
          );
          marginUsed = swapQuote.estimatedAmountOut.toNumber() / 1e6;
          setMarginUsedValue(marginUsed);
          // Slippage Mechanism
          const initalPoolPrice = PriceMath.sqrtPriceX64ToPrice(
            state?.poolState?.sqrtPrice!,
            6,
            6
          ).toNumber();
          const executionPoolPrice =
            swapQuote.estimatedAmountOut.toNumber() /
            swapQuote.estimatedAmountIn.toNumber();
          const diffPoolPrice = Math.abs(executionPoolPrice - initalPoolPrice);
          setDiffPoolPrice(diffPoolPrice);
          const slippagePercentage = (diffPoolPrice * 100) / state?.assetPrice!;
          setSlippage(slippagePercentage);
          if (slippagePercentage > Number(slippageTolerance)) {
            setErrStr("Slippage Exceeded, try increasing tolerance");
            setTradeEnable(false);
          }
          const amountInNominalUsd = marginUsed * leverageValue;
          setUsdcInputValue((amountInContract * state?.assetPrice!).toFixed(6));
          // Fee Value Calc
          const feeValue = PoolUtil.getFeeRate(state?.poolState?.feeRate!)
            .toDecimal()
            .mul(DecimalUtil.fromNumber(amountInNominalUsd))
            .div(DecimalUtil.fromNumber(leverageValue))
            .toNumber();
          setFeeValue(feeValue);
        } catch (e) {
          console.log(e);
          setErrStr(
            "Amount too high compared to available liquidity, please reduce"
          );
          setTradeEnable(false);
          marginUsed = 0;
        }
      }
    })();
    setContractInputValue(parsedValue);
    setLocalState((prev) => ({
      ...prev,
      marginAmount: marginUsed,
      contractAmount: amountInContract,
      isAmountInUsdc: false,
      lastAmount: amountInContract,
    }));
  };

  const onChangeSlippageValue = (value: any) => {
    let slippageValue = value.replace(",", ".").replace(/[^0-9.]/g, "");
    if (slippageValue < 50) {
      setSlippageTolerance(Math.max(0, slippageValue));
    }
  };

  const setMaxUsd = () => {
    const maxMarginAmount = state?.userState
      ? state?.userState?.usdcFree.toNumber()! / 1e6
      : 0;
    const maxNominalAmount = maxMarginAmount * leverageValue;
    onChangeUsdcValue(maxNominalAmount.toFixed(6));
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
    onChangeContractValue(maxAmount.toString());
  };

  useEffect(() => {
    isLongTrade
      ? setExecutionPrice(state?.assetPrice! + diffPoolPrice)
      : setExecutionPrice(state?.assetPrice! - diffPoolPrice);
  }, [isLongTrade, slippage]);

  useEffect(() => {
    if (localState.isAmountInUsdc) {
      const nominalValue = localState.marginAmount * leverageValue;
      onChangeUsdcValue(nominalValue.toString());
    } else {
      onChangeContractValue(localState.contractAmount.toString());
    }
  }, [slippageTolerance]);

  useEffect(() => {
    onChangeContractValue("0");
    onChangeUsdcValue("0");
  }, [selectedContract]);

  useEffect(() => {
    // Leverage Calc
    const poolPrice = PriceMath.sqrtPriceX64ToPrice(
      state?.poolState?.sqrtPrice! ?? 0,
      6,
      6
    ).toNumber();

    if (isLongTrade) {
      const leverage = state?.assetPrice! / poolPrice;
      setLeverageValue(leverage);
    } else {
      const leverage =
        state?.assetPrice! /
        (state?.contractState?.limitingAmplitude.toNumber()! - poolPrice);
      setLeverageValue(leverage);
    }
    (async () => {
      if (state?.poolState) {
        // Liquidity Calc
        const tokenA = Number(
          (
            await getAccount(connection, state?.poolState?.tokenVaultA!)
          ).amount.toString()
        );
        const tokenADecimals = (
          await getMint(connection, state?.poolState?.tokenMintA!)
        ).decimals;
        const tokenAUi = toUiAmount(tokenA, tokenADecimals);
        const tokenB = Number(
          (
            await getAccount(connection, state?.poolState?.tokenVaultB!)
          ).amount.toString()
        );
        const tokenBDecimals = (
          await getMint(connection, state?.poolState?.tokenMintB!)
        ).decimals;
        const tokenBUi = toUiAmount(tokenB, tokenBDecimals);
        // Assuming Token B = USDC
        const tokenAUsdValue = tokenAUi * state?.assetPrice!;
        const totalLiquidityUsdc = tokenAUsdValue + tokenBUi;
        setLiquidityValue(totalLiquidityUsdc);
      }
    })();
  }, [state?.assetPrice, isLongTrade]);

  return (
    <div className="h-full min-h-[560px] w-full max-w-xs py-6 text-white flex flex-col gap-3 border-2 border-gray-300/10 rounded-xl bg-black/50 z-10 relative">
      <button
        className={`absolute top-0 right-0 py-[6px] p-4 pr-2 pt-1 flex justify-between gap-1 items-center border-l-[0.5px] border-b-[0.5px] rounded-bl-lg rounded-tr-lg text-sm cursor-pointer disabled:cursor-not-allowed ${
          isLongTrade
            ? "bg-lime-200/20 border-lime-200/60 text-lime-200/90"
            : "bg-red-400/20 border-red-400/60 text-red-400/90"
        } opacity-80 hover:opacity-100`}
        onClick={() => {
          setIsLongTrade(!isLongTrade);
        }}
        disabled={
          !(
            state?.userPosition == UserPosition.Mm ||
            state?.userPosition == UserPosition.Neutral
          )
        }
      >
        {isLongTrade ? "Long" : "Short"}
        <MdSwapVert
          size={16}
          title={isLongTrade ? "Switch to Short Mode" : "Switch to Long Mode"}
        />
      </button>
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
        <div className="h-full flex flex-col justify-between">
          <div>
            <div className="px-8 mt-4 flex flex-col gap-5 text-gray-200 items-center">
              <div className="w-full flex justify-between gap-4 items-start text-xs text-gray-500">
                <div className="py-2 w-14">USDC (Nominal)</div>
                <div className="w-8 flex flex-1 items-center">
                  <input
                    value={usdcInputValue}
                    onChange={(e) => onChangeUsdcValue(e.target.value)}
                    className="w-full py-2 text-sm px-3 text-gray-100 rounded-l-lg border-2 border-gray-100/10 border-r-0 bg-gray-100/10 focus:outline-none"
                  />
                  <div
                    onClick={setMaxUsd}
                    className="flex flex-col py-2 items-center w-32 text-sm text-gray-400 border-2 border-gray-100/30 rounded-r-lg hover:border-gray-200/60 hover:text-white cursor-pointer"
                  >
                    Max
                  </div>
                </div>
              </div>
              <div className="w-full flex gap-4 justify-between items-start text-xs text-gray-500">
                <div className="w-14">No of Contracts</div>
                <div className="w-48 flex flex-1 items-center">
                  <input
                    value={contractInputValue}
                    onChange={(e) => onChangeContractValue(e.target.value)}
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
            <div className="mt-4 px-8 flex items-center justify-between">
              <p className="text-xs text-gray-500">Slippage Tolerance</p>
              <div className="flex items-center border-2 border-gray-500/40 bg-black rounded-lg overflow-hidden">
                <input
                  value={slippageTolerance}
                  onChange={(e) => onChangeSlippageValue(e.target.value)}
                  className="w-8 py-1 text-xs font-medium text-center text-gray-200 bg-black focus:outline-none border-r border-gray-500/40"
                />
                <p className="px-2 text-xs text-gray-300">%</p>
              </div>
            </div>
            {errStr && (
              <p className="mt-4 px-8 py-1 text-red-500/50 text-sm">{errStr}</p>
            )}
            {!errStr && (
              <div>
                <div className="py-1 mt-3 px-6 flex flex-row w-full justify-between gap-3">
                  <div className="w-full rounded-xl">
                    <button
                      disabled={!tradeEnable || !state?.userState}
                      onClick={isLongTrade ? onClickOpenLong : onClickOpenShort}
                      className={`${
                        isLongTrade
                          ? "bg-lime-200/30 hover:border-lime-200/60 text-lime-200/70 hover:text-lime-200"
                          : "bg-red-400/20 hover:border-red-400/60 text-red-400/70 hover:text-red-400"
                      } w-full py-3 text-gray-100  rounded-lg border-2 border-white/10 text-sm disabled:border disabled:border-gray-500/40 disabled:bg-black disabled:text-gray-400 disabled:cursor-not-allowed`}
                    >
                      {isLongTrade ? "Long" : "Short"}
                    </button>
                  </div>
                  {!(
                    state?.userPosition == UserPosition.Neutral ||
                    state?.userPosition == UserPosition.Mm
                  ) && (
                    <div className="w-full flex flex-col justify-between items-center border-green-100/60 rounded-xl">
                      <button
                        disabled={!tradeEnable || !state?.userState}
                        onClick={
                          state?.userPosition == UserPosition.Long ||
                          state?.userPosition == UserPosition.MmAndLong
                            ? onClickCloseLong
                            : onClickCloseShort
                        }
                        className={`${
                          state?.userPosition == UserPosition.Long ||
                          state?.userPosition == UserPosition.MmAndLong
                            ? "bg-lime-200/10 hover:border-lime-200/40 text-lime-200/40 hover:text-lime-200/60"
                            : "bg-red-400/10 hover:border-red-400/40 text-red-400/40 hover:text-red-400/60"
                        } w-full py-3 text-gray-100  rounded-lg border-2 border-white/10 text-sm disabled:border disabled:border-gray-500/40 disabled:bg-black disabled:text-gray-400 disabled:cursor-not-allowed`}
                      >
                        {state?.userPosition == UserPosition.Long ||
                        state?.userPosition == UserPosition.MmAndLong
                          ? "Close Long"
                          : "Close Short"}
                      </button>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
          <div className="pb-2">
            {localState.marginAmount != 0 ? (
              localState.contractAmount != 0 ? (
                <div>
                  <div className="mt-4 px-6 w-full flex justify-between text-xs text-gray-400">
                    Slippage:{" "}
                    <div
                      className={`${
                        slippage < slippageTolerance
                          ? "text-green-300/50"
                          : "text-red-500/50"
                      }`}
                    >
                      ~ {slippage.toFixed(2)} %
                    </div>
                  </div>
                  <div className="mt-3 px-6 w-full flex justify-between text-xs text-gray-400">
                    Execution Price:{" "}
                    <div className="flex justify-between gap-1 items-center">
                      {executionPrice.toFixed(2)}
                    </div>
                  </div>
                  <div className="mt-3 px-6 w-full flex justify-between text-xs text-gray-400">
                    Margin Used:{" "}
                    <div className="flex justify-between gap-1 items-center">
                      {marginUsedValue.toFixed(2)} $
                    </div>
                  </div>
                  <div className="mt-3 px-6 w-full flex justify-between text-xs text-gray-400">
                    Leverage:{" "}
                    <div className="flex justify-between gap-1 items-center">
                      {leverageValue.toFixed(2)} x
                    </div>
                  </div>
                  <div className="mt-3 px-6 w-full flex justify-between text-xs text-gray-400">
                    Fee :{" "}
                    <div className="flex justify-between gap-1 items-center">
                      {feeValue.toFixed(2)} $
                    </div>
                  </div>
                  <div className="mt-3 px-6 w-full flex justify-between text-xs text-gray-400">
                    Liquidity (USD) :{" "}
                    <div className="flex justify-between gap-1 items-center">
                      {liquidityValue.toFixed(2)} $
                    </div>
                  </div>
                </div>
              ) : null
            ) : null}{" "}
          </div>
        </div>
      )}
    </div>
  );
};

export default Trade;
