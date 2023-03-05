import { useState, useEffect, useCallback } from "react";

import { CRYPTOCURRENCIES } from "../configs/index.js";

const BINANCE_TICKER_STORAGE_KEY = "binanceticker";

const useBinanceTicker = () => {
  const [cryptocurrenciesBinance, setCryptocurrencies] = useState(
    typeof window !== 'undefined' && JSON.parse(localStorage.getItem(BINANCE_TICKER_STORAGE_KEY)) || CRYPTOCURRENCIES
  );

  const fetchCrypto = useCallback(async () => {
    try {
      const response = await fetch(`https://api.binance.com/api/v3/ticker/24hr`);
      const data = await response.json();

      setCryptocurrencies(
        cryptocurrenciesBinance.map((item) => {
          const cryptoBinanceData = data.find((cryptoBinance) => cryptoBinance.symbol === item.symbol);
          return {
            ...item,
            priceBinance: cryptoBinanceData?.lastPrice || 0,
            symbol: cryptoBinanceData?.symbol || 0,
            prevPriceBinance: item?.priceBinance || 0,
            priceHistoryBinance: [
              ...(item.priceHistoryBinance || []).slice(0, 9),
              cryptoBinanceData?.lastPrice || 0
            ]
          };
        })
      );
    } catch (error) {
  console.log(error);
}
  }, [cryptocurrenciesBinance]);


useEffect(() => {
  const interval = setInterval(fetchCrypto, 30000);

  return () => clearInterval(interval);
}, [fetchCrypto]);

useEffect(() => {
  localStorage.setItem(BINANCE_TICKER_STORAGE_KEY, JSON.stringify(cryptocurrenciesBinance));
}, [cryptocurrenciesBinance]);

return cryptocurrenciesBinance;
};


export { useBinanceTicker };
