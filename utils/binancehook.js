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
          const priceHistory = item.priceHistoryBinance || []; // initialize to an empty array if undefined or null
          const lastPrice = parseFloat(cryptoBinanceData?.lastPrice || 0); // convert lastPrice to a number
          const timestamp = new Date().toISOString(); // get current date and time in ISO format
          const priceHistoryWithLast = [...priceHistory.slice(-8), { price: lastPrice, time: timestamp }]; // take last 8 elements of priceHistory and add lastPrice with timestamp to create new array
          const priceList = priceHistoryWithLast.map((price, index) => ({ price: parseFloat(price.price), index }));
          return {
            ...item,
            priceBinance: cryptoBinanceData?.lastPrice || 0,
            priceHistoryBinance: priceList.slice(-9)
          };
        })
      );
    } catch (error) {
      console.log(error);
    }
  }, [cryptocurrenciesBinance]);
  

  useEffect(() => {
    const interval = setInterval(fetchCrypto, 10000);

    return () => clearInterval(interval);
  }, [fetchCrypto]);

  useEffect(() => {
    localStorage.setItem(BINANCE_TICKER_STORAGE_KEY, JSON.stringify(cryptocurrenciesBinance));
  }, [cryptocurrenciesBinance]);

  return cryptocurrenciesBinance;
};


export { useBinanceTicker };
