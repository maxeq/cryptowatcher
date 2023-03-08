import { useState, useEffect, useCallback } from "react";

import { CRYPTOCURRENCIES } from "../configs/index.js";

const TICKER_STORAGE_KEY = "ticker";

const useCoingeckoTicker = () => {
  const [cryptocurrencies, setCryptocurrencies] = useState(
    () => JSON.parse(typeof window !== 'undefined' ? localStorage.getItem(TICKER_STORAGE_KEY) : null) || CRYPTOCURRENCIES
  );

  const fetchCrypto = useCallback(async () => {
    try {
      const response = await fetch(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&price_change_percentage=1h,7d`);
      const data = await response.json();

      setCryptocurrencies(
        cryptocurrencies.map((item) => {
          const cryptoData = data.find((crypto) => crypto.name === item.name);

          return {
            ...item,
            highPrice: cryptoData?.high_24h || 0,
            lowPrice: cryptoData?.low_24h || 0,
            price: cryptoData?.current_price || 0,
            prevPrice: item?.price || 0,
            price_change_percentage_24h: cryptoData?.price_change_percentage_24h || 0,
            price_change_percentage_1h:
              cryptoData?.price_change_percentage_1h_in_currency || 0,
            price_change_percentage_7d:
              cryptoData?.price_change_percentage_7d_in_currency || 0,
            volume: cryptoData?.total_volume || 0,
            total_supply: cryptoData?.total_supply || 0,
            marketCap: cryptoData?.market_cap || 0,
            circulatingSupply: cryptoData?.circulating_supply || 0,
            Symbol: cryptoData?.symbol || 0,
            priceHistoryCoinGecko: [
              ...(item.priceHistoryCoinGecko || []).slice(0, 240),
              cryptoData?.current_price || 0
            ]
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
    if (typeof window !== 'undefined') {
      localStorage.setItem(TICKER_STORAGE_KEY, JSON.stringify(cryptocurrencies));
    }
  }, [cryptocurrencies]);

  return cryptocurrencies;
};


export { useCoingeckoTicker };
