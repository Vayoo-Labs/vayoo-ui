import * as React from 'react';
import './index.css';
import {
  widget,
  ChartingLibraryWidgetOptions,
  IChartingLibraryWidget,
} from '../../utils/charting_library';
import { flatten } from '../../utils/tvUtils/utils';
import { useSelectedContract } from '../../contexts/StateProvider';
import { VAYOO_BACKEND_ENDPOINT } from '../../utils/constants';

export interface ChartContainerProps {
  symbol: ChartingLibraryWidgetOptions['symbol'];
  interval: ChartingLibraryWidgetOptions['interval'];
  auto_save_delay: ChartingLibraryWidgetOptions['auto_save_delay'];

  // BEWARE: no trailing slash is expected in feed URL
  // datafeed: any;
  datafeedUrl: string;
  libraryPath: ChartingLibraryWidgetOptions['library_path'];
  chartsStorageUrl: ChartingLibraryWidgetOptions['charts_storage_url'];
  chartsStorageApiVersion: ChartingLibraryWidgetOptions['charts_storage_api_version'];
  clientId: ChartingLibraryWidgetOptions['client_id'];
  userId: ChartingLibraryWidgetOptions['user_id'];
  fullscreen: ChartingLibraryWidgetOptions['fullscreen'];
  autosize: ChartingLibraryWidgetOptions['autosize'];
  studiesOverrides: ChartingLibraryWidgetOptions['studies_overrides'];
  containerId: ChartingLibraryWidgetOptions['container'];
  theme: string;
}

export interface ChartContainerState {}

export const TVChartContainer = () => {
  const { selectedContract } = useSelectedContract();
  // let datafeed = useTvDataFeed();
  const defaultProps: ChartContainerProps = {
    symbol: selectedContract?.name,
    // @ts-ignore
    interval: '1',
    auto_save_delay: 5,
    theme: 'Dark',
    containerId: 'tv_chart_container',
    // datafeed: datafeed,
    libraryPath: '/charting_library/',
    chartsStorageApiVersion: '1.1',
    clientId: 'tradingview.com',
    userId: 'public_user_id',
    fullscreen: false,
    autosize: true,
    datafeedUrl: VAYOO_BACKEND_ENDPOINT + '/tv',
    studiesOverrides: {},
  };

  const chartProperties = JSON.parse(
    localStorage.getItem('chartproperties') || '{}',
  );

  React.useEffect(() => {
    const savedProperties = flatten(chartProperties, {
      restrictTo: ['scalesProperties', 'paneProperties', 'tradingProperties'],
    });

    const widgetOptions: ChartingLibraryWidgetOptions = {
      symbol:
        defaultProps.symbol,
      // BEWARE: no trailing slash is expected in feed URL
      // tslint:disable-next-line:no-any
      // @ts-ignore
      // datafeed: datafeed,as
      // @ts-ignore
      datafeed: new Datafeeds.UDFCompatibleDatafeed(
        defaultProps.datafeedUrl,
      ),
      interval: defaultProps.interval as ChartingLibraryWidgetOptions['interval'],
      container: defaultProps.containerId as ChartingLibraryWidgetOptions['container'] as string,
      library_path: defaultProps.libraryPath as string,
      // auto_save_delay: 5,
      locale: 'en',
      // disabled_features: ['use_localstorage_for_settings'],
      // enabled_features: ['study_templates'],
      // load_last_chart: true,
      // client_id: defaultProps.clientId,
      // user_id: defaultProps.userId,
      fullscreen: defaultProps.fullscreen,
      autosize: defaultProps.autosize,
      // studies_overrides: defaultProps.studiesOverrides,
      theme: defaultProps.theme === 'Dark' ? 'Dark' : 'Light',
      overrides: {
        ...savedProperties,
        'mainSeriesProperties.candleStyle.upColor': '#41C77A',
        'mainSeriesProperties.candleStyle.downColor': '#F23B69',
        'mainSeriesProperties.candleStyle.borderUpColor': '#41C77A',
        'mainSeriesProperties.candleStyle.borderDownColor': '#F23B69',
        'mainSeriesProperties.candleStyle.wickUpColor': '#41C77A',
        'mainSeriesProperties.candleStyle.wickDownColor': '#F23B69',
      },
    };

    const tvWidget = new widget(widgetOptions);

  }, [selectedContract]);

  return <div id={defaultProps.containerId as string} className={'TVChartContainer relative z-10'} />;
};
