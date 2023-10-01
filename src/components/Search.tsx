import { ChangeEvent, Dispatch, SetStateAction, useState } from 'react';
import { StockSymbol } from '../types/StockData';

type SearchProps = {
  selectedStockSymbols: StockSymbol[];
  setSelectedStockSymbols: Dispatch<SetStateAction<StockSymbol[]>>;
  stockSymbols: StockSymbol[];
};

const Search = ({
  selectedStockSymbols,
  setSelectedStockSymbols,
  stockSymbols,
}: SearchProps) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredStockSymbols, setFilteredStockSymbols] = useState<StockSymbol[]>([]);

  const handleSearchEvent = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);

    if (event.target.value.length > 1) {
      const lowerCasedSearchQuery = event.target.value.toLowerCase();
      // Looks for symbols that match "displaySymbol" or "description"
      // Also ensures that the symbol lists does not contain already selected symbols
      const searchedStockSymbols = stockSymbols.filter(
        (stockSymbol) =>
          (stockSymbol.displaySymbol.toLowerCase().startsWith(lowerCasedSearchQuery) ||
          stockSymbol.description.toLowerCase().includes(lowerCasedSearchQuery)) &&
          !selectedStockSymbols.find((selectedStockSymbol) => selectedStockSymbol.symbol === stockSymbol.symbol)
      );
      setFilteredStockSymbols(searchedStockSymbols);
    } else {
      setFilteredStockSymbols([]);
    }
  };

  const handleClick = (currentSelectedStock: StockSymbol) => {
    setSearchQuery('');
    setFilteredStockSymbols([]);

    if (selectedStockSymbols.length >= 3) {
      alert("You can only view 3 stock's time series at a single time. Please close one of the stock's time series view");
      return;
    }

    if (selectedStockSymbols.find((selectedStockSymbol) => selectedStockSymbol.symbol === currentSelectedStock.symbol)) {
      return;
    }

    const updatedStockySymbols = [...selectedStockSymbols, currentSelectedStock];
    setSelectedStockSymbols(updatedStockySymbols);
  };

  return (
    <div className='flex flex-col items-center mb-8'>
      <input
        type='search'
        className='block w-full max-w-md p-4 text-sm border border-gray-300 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:border-blue-500'
        placeholder='Search Stock Symbols'
        value={searchQuery}
        onChange={handleSearchEvent}
      />
      {searchQuery !== '' && filteredStockSymbols.length > 0 && (
        <div className='absolute bg-gray-50 w-11/12 max-w-md max-h-48 mt-14 overflow-y-auto'>
          {filteredStockSymbols.map((filteredStockSymbol, index) => (
            <div key={index} className='py-2 px-4 hover:bg-gray-200 cursor-pointer' onClick={() => handleClick(filteredStockSymbol)}>
              {filteredStockSymbol.description} ({filteredStockSymbol.displaySymbol})
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Search;
