import React from "react";
import { formatPrice, formatPercent } from "@/utils";
import Loader from "./Loader";
import useSWR from 'swr';
import Image from 'next/image';
import ChartFetcher from "./charts/ChartFetcher";

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

const fetcher = async (url: string) => {
  const res = await fetch(url);
  const data = await res.json();
  return data;
}

export default function Crypto_table3({ }: CryptoProps): JSX.Element {
  const { data: cryptocurrencies, error } = useSWR(
    "/api/crypto/getData",
    fetcher,
    {
      // Parse the JSON data into an array
      shouldRetryOnError: false,
      onSuccess: (data) => {
        return data || [];
      },
      onError: (error) => {
        console.error(error);
      },
      revalidateOnMount: true,
      dedupingInterval: 300000 // Cache for 5 minutes
    }
  );


  const classPriceChangePercent = (value: any) =>
    value
      ? value === "0%"
        ? "text-white-300"
        : value < 0
          ? "text-rose-300"
          : "text-lime-300"
      : "text-white-300";

  return (
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
            <th className="table__end">Live data</th>
          </tr>
        </thead>
        <tbody>
          {!error && cryptocurrencies ? (
            cryptocurrencies.getdata.map((crypto: any, index: number) => (
              <tr key={crypto.id}>
                <td className="table__start sticky z-0 backdrop-opacity-0 max-sm:bg-gray-800">{index + 1}</td>
                <td className="table__start sticky z-0 backdrop-opacity-0 max-sm:bg-gray-800">
                  <Image
                    src={crypto.image}
                    alt={crypto.name}
                    width="32"
                    height="32"
                    className="mr-2"
                  />
                  <span className="font-medium">{crypto.name}</span>
                </td>
                <td className="table__end">{formatPrice(crypto.current_price)}</td>
                <td className={`table__end ${classPriceChangePercent(formatPercent(crypto.price_change_percentage_1h_in_currency))}`}>
                  {formatPercent(crypto.price_change_percentage_1h_in_currency)}
                </td>
                <td className={`table__end ${classPriceChangePercent(formatPercent(crypto.price_change_percentage_24h))}`}>
                  {formatPercent(crypto.price_change_percentage_24h)}
                </td>
                <td className={`table__end ${classPriceChangePercent(formatPercent(crypto.price_change_percentage_7d_in_currency))}`}>
                  {formatPercent(crypto.price_change_percentage_7d_in_currency)}
                </td>
                <td className="table__end">{formatPrice(crypto.market_cap)}</td>
                <td className="table__end">{formatPrice(crypto.total_volume)}</td>
                <td className="table__end">{formatPrice(crypto.circulating_supply)}</td>
                <td className="table__end">
                  <ChartFetcher _id={crypto.name} />
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={9}>
                <Loader />
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
