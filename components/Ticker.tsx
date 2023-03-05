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
    <>
      {pageName === "Crypto" ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {cryptocurrencies.map((crypto: CryptoProps["crypto"]) => (
            <Crypto key={crypto.id} crypto={crypto} />
          ))}
        </div>
      ) : pageName === "Crypto_table" ? (
        <div className="relative overflow-x-auto">
          <table className={`table mx-auto`}>
            <thead>
              <tr className={`table-header`}>
                <th className="table__start sticky z-0 backdrop-opacity-2 max-sm:bg-gray-800">#</th>
                <th className="table__start sticky z-0 backdrop-opacity-0 max-sm:bg-gray-800">Cryptocurrency</th>
                <th className="table__end">Price (USD)</th>
                <th className="table__end">1h %</th>
                <th className="table__end">24h %</th>
                <th className="table__end">7d %</th>
                <th className="table__end">Market Cap</th>
                <th className="table__end">Volume (24h)</th>
                <th className="table__end">Circulating Supply</th>
                <th className="table__end">Last 1h graph</th>
              </tr>
            </thead>
            <tbody>
              {cryptocurrencies.map((crypto: CryptoProps["crypto"], index: number) => (
                <Crypto_table key={crypto.id} index={index} crypto={crypto} />
              ))}
            </tbody>
          </table>
        </div>
      ) : null}
    </>
  );
}
