import React from "react";

import Crypto from "./Crypto";
import Crypto_table from "./Crypto_table";
import { useCoingeckoTicker } from "../utils/coingeckohooks";



interface TickerProps {
  pageName: string;
}

interface CryptoProps {
  index: number;
  crypto: {
    id: string;
    name: string;
    symbol: string;
    iconCode: number;
    price: number;
    highPrice: number;
    lowPrice: number;
    prevPrice: number;
    price_change_percentage_24h: number;
    price_change_percentage_1h: number;
    price_change_percentage_7d: number;
    explorer: string;
    circulatingSupply: number;
    marketCap: number;
    volume: number;
    quoteVolume: number;
  };
}

export default function Ticker({ pageName }: TickerProps): JSX.Element {
  const cryptocurrencies = useCoingeckoTicker();

  return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {cryptocurrencies.map((crypto: CryptoProps["crypto"]) => (
            <Crypto key={crypto.id} crypto={crypto} />
          ))}
        </div>
  );
}
