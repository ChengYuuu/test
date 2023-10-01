import { StockDetail, StockPeriodType, StockPriceType, StockSymbol } from '../types/StockData';
import { useEffect, useMemo, useState } from 'react';
import DateRangePicker from './DateRangePicker';
import dayjs from 'dayjs';
import LineChart from './LineChart';
import Select from './Select';
import Radio from './Radio';

type CardProps = {
  selectedStockSymbols: StockSymbol[];
  removeSelectedStockSymbol: (selectedStockToRemove: StockSymbol) => void;
};

const Card = ({ selectedStockSymbols, removeSelectedStockSymbol }: CardProps) => {
  const [priceType, setPriceType] = useState<StockPriceType>('o');
  const [startDate, setStartDate] = useState(dayjs().subtract(14, 'day').startOf('day'));
  const [endDate, setEndDate] = useState(dayjs().endOf('day'));
  const [stockPeriodType, setStockPeriodType] = useState<StockPeriodType>('D');
  const [stockDetailsMap, setStockDetails] = useState<{ symbol: string; stockDetail: StockDetail }[]>([]);
  const [isStockDetailLoading, setIsStockDetailLoading] = useState(false);
  const [stockDetailError, setStockDetailError] = useState<unknown>(null);

  useEffect(() => {
    setIsStockDetailLoading(true);
    Promise.all(selectedStockSymbols.map(async (selectedStockSymbol) => {
      const response = await fetch(`https://finnhub.io/api/v1/stock/candle?symbol=${selectedStockSymbol.symbol}
        &resolution=${stockPeriodType}&from=${startDate.unix()}&to=${endDate.unix()}&token=${import.meta.env.VITE_FINNHUB_API_KEY}`)
      return { symbol: selectedStockSymbol.symbol, stockDetail: await response.json() as StockDetail};
    }))
    .then((value) => {
      setStockDetails(value);
      setStockDetailError(null);
    })
    .catch((error) => setStockDetailError(error))
    .finally(() => setIsStockDetailLoading(false));
  }, [selectedStockSymbols, startDate, endDate, stockPeriodType])

  const stockTimeScaleData = useMemo(() => {
    return stockDetailsMap
      .filter((stockDetailMap) =>stockDetailMap.stockDetail.s !== 'no_data')
      .map((stockDetailMap) => {
        const stockDataWithPriceType = stockDetailMap.stockDetail[priceType];
        const stockDataTimeScale = stockDetailMap.stockDetail.t;
        const timeScaleData = stockDataTimeScale.map((timeStamp, index) => {
          return {
            x: dayjs.unix(timeStamp).toDate(),
            y: stockDataWithPriceType[index],
          };
        });

        return { data: timeScaleData, id: stockDetailMap.symbol }

      });
  }, [priceType, stockDetailsMap])

  return (
    <div className='w-full max-w-5xl bg-white border border-gray-200 rounded-lg shadow'>
      <div className='flex flex-col items-center p-4'>
        <div className='flex flex-col items-center gap-y-2'>
          {selectedStockSymbols.map((selectedStockSymbol) => (
            <div key={selectedStockSymbol.symbol} className='flex w-full justify-between'>
              <h5 className='text-base font-bold text-blue-700'>{selectedStockSymbol.description} ({selectedStockSymbol.symbol})</h5>
              <div className='flex justify-end pl-4'>
                <button
                  className='inline-block text-gray-500 hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg text-sm'
                  type='button'
                  onClick={() => removeSelectedStockSymbol(selectedStockSymbol)}
                >
                  <svg width='28' height='28' viewBox='0 0 40 40'>
                    <path d='M 10,10 L 30,30 M 30,10 L 10,30' stroke='black' strokeWidth='2' />
                  </svg>
                </button>
              </div>
            </div>
          ))}
        </div>
        <div className='flex flex-wrap w-full justify-center my-4 md:my-6 gap-4 md:gap-6'>
          <Select
            selectValues={{
              o: 'Open Prices',
              h: 'High Prices',
              l: 'Low Prices',
              c: 'ClosePrices',
            }}
            value={priceType}
            onChange={setPriceType}
          />
          <DateRangePicker startDate={startDate} setStartDate={setStartDate} endDate={endDate} setEndDate={setEndDate} />
        </div>
        {stockTimeScaleData.length !== 0 && !stockDetailError ?
          <div className='h-64 md:h-96 w-full'>
            <LineChart data={stockTimeScaleData} />
          </div> :
          <p className='flex h-64 md:h-96 items-center'>{isStockDetailLoading ? 'Loading...' : 'No stock price data' }</p>
        }
        <Radio
          radioValues={{
            D: 'Day',
            W: 'Week',
            M: 'Month',
          }}
          value={stockPeriodType}
          onChange={setStockPeriodType}
        />
      </div>
    </div>
  );
};

export default Card;
