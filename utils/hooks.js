import { useState, useEffect, useCallback } from "react";

import { getSymbols, findByValue } from "../utils/index.js";
import { CRYPTOCURRENCIES } from "../configs/index.js";

const TICKER_STORAGE_KEY = "ticker";

const useTicker = () => {
  const [cryptocurrencies, setCryptocurrencies] = useState(
    JSON.parse(localStorage.getItem(TICKER_STORAGE_KEY)) || CRYPTOCURRENCIES
  );

  const fetchCrypto = useCallback(async () => {
    try {
      const response = await fetch(`https://api.binance.com/api/v3/ticker/24hr`);

      const data = await response.json();

      setCryptocurrencies(
        cryptocurrencies.map((item) => {
          const { lastPrice, lowPrice, highPrice, priceChangePercent } =
            findByValue(data, item.symbol) || {};

          return {
            ...item,
            highPrice,
            lowPrice,
            price: lastPrice,
            prevPrice: item?.price || 0,
            priceChangePercent,
          };
        })
      );
    } catch (error) {
      console.log(error);
    }
  }, [cryptocurrencies]);

  useEffect(() => {
    const interval = setInterval(fetchCrypto, 10000);

    return () => clearInterval(interval);
  }, [fetchCrypto]);

  useEffect(() => {
    localStorage.setItem(TICKER_STORAGE_KEY, JSON.stringify(cryptocurrencies));
  }, [cryptocurrencies]);

  return cryptocurrencies;
};

export { useTicker };
