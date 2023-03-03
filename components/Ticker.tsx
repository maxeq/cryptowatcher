import React from "react";

import Crypto from "./Crypto";
import Crypto_table from "./Crypto_table";
import { useTicker } from "../utils/hooks";

interface TickerProps {
  pageName: string;
}

export default function Ticker({ pageName }: TickerProps): JSX.Element {
  const cryptocurrencies = useTicker();

  const CryptoComponent = pageName === "Crypto" ? Crypto : Crypto_table;

  return (
    <>
      {pageName === "Crypto" ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {cryptocurrencies.map((crypto: any) => (
            <Crypto key={crypto.id} crypto={crypto} />
          ))}
        </div>
      ) : (
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
                <th className="table__end">Last 7 Days</th>
              </tr>
            </thead>
            <tbody>
              {cryptocurrencies.map((crypto: any, index: number) => (
                <Crypto_table key={crypto.id} index={index} crypto={crypto} />
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
}