import * as React from "react";
import "./index.css";
import {
  widget,
  ChartingLibraryWidgetOptions,
  IChartingLibraryWidget,
} from "../../utils/charting_library";
import { flatten } from "../../utils/tvUtils/utils";
import { useSelectedContract, useVMState } from "../../contexts/StateProvider";
import {
  VAYOO_BACKEND_ENDPOINT,
  decimalPrecisionForLargePricedAssets,
  decimalPrecisionForSmallPricedAssets,
} from "../../utils/constants";

export interface ChartContainerProps {
  symbol: ChartingLibraryWidgetOptions["symbol"];
  interval: ChartingLibraryWidgetOptions["interval"];
  auto_save_delay: ChartingLibraryWidgetOptions["auto_save_delay"];

  // BEWARE: no trailing slash is expected in feed URL
  // datafeed: any;
  datafeedUrl: string;
  libraryPath: ChartingLibraryWidgetOptions["library_path"];
  chartsStorageUrl: ChartingLibraryWidgetOptions["charts_storage_url"];
  chartsStorageApiVersion: ChartingLibraryWidgetOptions["charts_storage_api_version"];
  clientId: ChartingLibraryWidgetOptions["client_id"];
  userId: ChartingLibraryWidgetOptions["user_id"];
  fullscreen: ChartingLibraryWidgetOptions["fullscreen"];
  autosize: ChartingLibraryWidgetOptions["autosize"];
  studiesOverrides: ChartingLibraryWidgetOptions["studies_overrides"];
  containerId: ChartingLibraryWidgetOptions["container"];
  theme: string;
}

export interface ChartContainerState {}

export const TVChartContainer = () => {
  const { selectedContract } = useSelectedContract();
  // let datafeed = useTvDataFeed();
  const defaultProps: ChartContainerProps = {
    symbol: selectedContract?.name,
    // @ts-ignore
    interval: "60",
    auto_save_delay: 5,
    theme: "Dark",
    containerId: "tv_chart_container",
    // datafeed: datafeed,
    libraryPath: "/charting_library/",
    chartsStorageApiVersion: "1.1",
    clientId: "tradingview.com",
    userId: "public_user_id",
    fullscreen: false,
    autosize: true,
    datafeedUrl: VAYOO_BACKEND_ENDPOINT + "/tv",
    studiesOverrides: {},
  };

  const { state } = useVMState();
  const precision =
    state?.assetPrice! > 1
      ? Math.pow(10, decimalPrecisionForLargePricedAssets)
      : Math.pow(10, decimalPrecisionForSmallPricedAssets);

  const chartProperties = JSON.parse(
    localStorage.getItem("chartproperties") || "{}"
  );

  React.useEffect(() => {
    const savedProperties = flatten(chartProperties, {
      restrictTo: ["scalesProperties", "paneProperties", "tradingProperties"],
    });

    const widgetOptions: ChartingLibraryWidgetOptions = {
      symbol: defaultProps.symbol,
      // BEWARE: no trailing slash is expected in feed URL
      // tslint:disable-next-line:no-any
      // @ts-ignore
      // datafeed: datafeed,as
      // @ts-ignore
      datafeed: new Datafeeds.UDFCompatibleDatafeed(
        defaultProps.datafeedUrl,
        2000
      ),
      interval:
        defaultProps.interval as ChartingLibraryWidgetOptions["interval"],
      container:
        defaultProps.containerId as ChartingLibraryWidgetOptions["container"] as string,
      library_path: defaultProps.libraryPath as string,
      // auto_save_delay: 5,
      locale: "en",
      disabled_features: [
        "header_screenshot",
        "header_symbol_search",
        "header_settings",
        "header_compare",
        "header_undo_redo",
        "timeframes_toolbar",
      ],
      enabled_features: ["hide_left_toolbar_by_default"],
      // load_last_chart: true,
      // client_id: defaultProps.clientId,
      // user_id: defaultProps.userId,
      fullscreen: defaultProps.fullscreen,
      autosize: defaultProps.autosize,
      // studies_overrides: defaultProps.studiesOverrides,
      theme: defaultProps.theme === "Dark" ? "Dark" : "Light",
      toolbar_bg: "#000000",
      overrides: {
        ...savedProperties,
        "mainSeriesProperties.candleStyle.upColor": "#B2F93E",
        "mainSeriesProperties.candleStyle.downColor": "#f23645",
        "mainSeriesProperties.candleStyle.borderUpColor": "#B2F93E",
        "mainSeriesProperties.candleStyle.borderDownColor": "#f23645",
        "mainSeriesProperties.candleStyle.wickUpColor": "#B2F93E",
        "mainSeriesProperties.candleStyle.wickDownColor": "#f23645",
        "paneProperties.backgroundType": "gradient",
        "paneProperties.backgroundGradientStartColor": "#131722",
        "paneProperties.backgroundGradientEndColor": "#000000",
        "mainSeriesProperties.minTick": `${precision},1,false`,
      },
    };

    const tvWidget = new widget(widgetOptions);
  }, [selectedContract]);

  return (
    <div
      id={defaultProps.containerId as string}
      className={"TVChartContainer relative z-[2]"}
    />
  );
};
