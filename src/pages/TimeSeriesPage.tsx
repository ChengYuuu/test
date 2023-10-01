import { useState } from 'react';
import Card from '../components/Card';
import { useAPI } from '../hooks/useAPI';
import type { StockSymbol } from '../types/StockData';
import Search from '../components/Search';
import ErrorBoundary from '../ErrorBoundary';

const TimeSeriesPage = () => {
  const [selectedStockSymbols, setSelectedStockSymbols] = useState<StockSymbol[]>([]);

  const {
    data: stockSymbols,
    isLoading: isStockSymbolsLoading,
    error: stockSymbolsError,
  } = useAPI<StockSymbol[]>(`https://finnhub.io/api/v1/stock/symbol?exchange=US&token=${import.meta.env.VITE_FINNHUB_API_KEY}`);

  const removeSelectedStockSymbol = (selectedStockToRemove: StockSymbol) => {
    setSelectedStockSymbols(selectedStockSymbols.filter((selectedStockSymbol) => selectedStockSymbol.symbol !== selectedStockToRemove.symbol));
  };

  return (
    <ErrorBoundary>
      <div className='container mx-auto p-4'>
        <h1 className='my-4 text-3xl font-bold text-center md:text-4xl lg:text-5xl'>Time series data for stocks</h1>
        {stockSymbols && !stockSymbolsError ?
          <Search
            stockSymbols={stockSymbols}
            selectedStockSymbols={selectedStockSymbols}
            setSelectedStockSymbols={setSelectedStockSymbols}
          /> :
          <p className='text-center text-rose-700'>
            {isStockSymbolsLoading ? 'Please wait for symbols to be fetched from API...' : 'No stock symbols loaded (Please check API Key)'}
          </p>
        }
        {selectedStockSymbols.length !== 0 && !stockSymbolsError && (
          <div className='flex flex-col items-center gap-y-4'>
            <Card selectedStockSymbols={selectedStockSymbols} removeSelectedStockSymbol={removeSelectedStockSymbol} />
          </div>
        )}
      </div>
    </ErrorBoundary>
  );
};

export default TimeSeriesPage;
