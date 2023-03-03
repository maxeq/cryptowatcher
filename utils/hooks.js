import { useState, useEffect, useCallback } from "react";

import { getSymbols, findByValue } from "../utils/index.js";
import { CRYPTOCURRENCIES } from "../configs/index.js";

const useTicker = () => {
  const [cryptocurrencies, setCryptocurrencies] = useState(CRYPTOCURRENCIES);

  const fetchCrypto = useCallback(async () => {
    try {

      const response = await fetch(
        `https://api.binance.com/api/v3/ticker/24hr`
        );

      const data = await response.json();
      console.log(data)

      setCryptocurrencies(
        cryptocurrencies.map((item) => {
          const { lastPrice, lowPrice, highPrice, priceChangePercent } =
            findByValue(data, item.symbol) || {};
          console.log(lastPrice, lowPrice, highPrice, priceChangePercent)

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
      console.log(highPrice, lowPrice, lastPrice, priceChangePercent)
    } catch (error) {
      console.log(error);
    }
  }, [cryptocurrencies]);

  useEffect(() => {
    const interval = setInterval(fetchCrypto, 10000);

    return () => clearInterval(interval);
  });

  return cryptocurrencies;
};

export { useTicker };