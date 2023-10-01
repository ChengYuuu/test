type StockSymbol = {
  currency: string;
  description: string;
  displaySymbol: string;
  figi: string;
  mic: string;
  symbol: string;
  type: string;
};

type StockDetail = {
  c: number[];
  h: number[];
  l: number[];
  o: number[];
  s: string;
  t: number[];
  v: number[];
};

type StockPriceType = 'c' | 'h' | 'l' | 'o';

type StockPeriodType = 'D' | 'W' | 'M';

export type { StockSymbol, StockDetail, StockPriceType, StockPeriodType };
