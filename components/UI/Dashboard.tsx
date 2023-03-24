import React from 'react';
import { useRouter } from 'next/router';
import useSWR from 'swr';
import Image from 'next/image';
import { formatPrice, formatPercent } from '../../utils/NumberFormatter';
import { FaShareSquare, FaRegStar } from 'react-icons/fa';
import Web3Connect from '../buttons/Web3Connect';
import ErrorMessage from '../errorMessage';
import Loader from '../icons/Loader';

const fetcher = async (url: string) => {
  const res = await fetch(url);
  const data = await res.json();
  return data;
};

export default function Dashboard(): JSX.Element {
  const router = useRouter();
  const ids = Array.isArray(router.query.ids)
    ? router.query.ids[0]
    : router.query.ids;
  const { data: cryptocurrencies, isLoading, error } = useSWR(
    `/api/coins/getCryptoData?id=${ids}`,
    fetcher,
    {
      revalidateOnMount: true,
      dedupingInterval: 5000, // Cache for 5 minutes
    }
  );

  const classPriceChangePercent = (value: number) =>
    value < 0
      ? 'bg-rose-600'
      : 'bg-lime-600'

  if (error) return <div>Error fetching data</div>;
  if (!cryptocurrencies || !cryptocurrencies.getdata)
    return <div>Loading data...</div>;

  const {
    max_supply,
    total_volume,
    circulating_supply,
    market_cap_change_24h,
    total_supply,
    price_change_percentage_24h,
    current_price,
    high_24h,
    image,
    low_24h,
    market_cap,
    market_cap_rank,
    name,
    symbol,
    fully_diluted_valuation,
  } = cryptocurrencies.getdata;

  if (error) {
    return <ErrorMessage error={error} />;
  }

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div key={ids}>
      <div className="md:p-8 p-4 shadow-purple-400 bg-gray-900 border border-solid border-gray-100 rounded-lg shadow-lg">
        <div className="md:flex md:justify-between">
          <div >
            <div >
              <div className="flex md:justify-between items-center">
                <Image
                  src={image}
                  alt={name}
                  width="64"
                  height="64"
                  className="mr-2"
                />
                <div className="text-5xl md:ml-3">{name}</div>
                <div className="flex pt-4 space-x-3 ml-3">
                  <div className="border-2 border-gray-500 text-gray-300 rounded-lg p-1 hover:text-gray-200">
                    <FaRegStar size="24" />
                  </div>
                  <div className="border-2 border-gray-500 text-gray-300 rounded-lg p-1 hover:text-gray-200">
                    <FaShareSquare size="24" />
                  </div>
                </div>
              </div>
              <div className="flex space-x-3 text-sm mt-4 text-slate-300">
                <div className="border-b-gray-500 border text-gray-100 bg-gray-800 rounded px-2">
                  Rank #{market_cap_rank}
                </div>
                <div className="border-b-gray-500 border bg-gray-800 rounded px-2">
                  Coin
                </div>
                <div className="border-b-gray-500 border bg-gray-800 rounded px-2">
                  Followed by {12}
                </div>
              </div>
              <div className="text-lg mt-4">
                <div className="mt-4">
                  <div className="text-sm text-slate-300">Volume</div>
                  <div className="text-xl">{formatPrice(total_volume)}</div>
                </div>
                <div className="mt-4">
                  <div className="text-sm text-slate-300">
                    Fully Diluted Valuation
                  </div>
                  <div className="text-xl">
                    {formatPrice(fully_diluted_valuation)}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div >
            <div className="pt-2">
              <div className="text-slate-300 text-xs justify-center lg:flex lg:justify-center">
                {name} Price ({symbol.toUpperCase()})
              </div>
              <div className="flex items-center space-x-2 mt-2 lg:flex lg:justify-center">
                <div className="text-6xl font-bold">
                  {formatPrice(current_price, 2)}
                </div>
                <div className="lg:px-2">
                  <div className="text-center text-slate-300 text-lg">24h</div>
                  <div
                    className={`text-base md:text-xl text-white rounded-lg px-2 ${classPriceChangePercent(
                      price_change_percentage_24h
                    )}`}
                  >
                    {formatPercent(price_change_percentage_24h)}
                  </div>
                </div>
              </div>
              <div className="flex justify-between mt-4">
                <div className="text-lg">Low: {formatPrice(low_24h, 2)}</div>
                <div className="text-lg">High: {formatPrice(high_24h, 2)}</div>
              </div>
            </div>
            <div className="md:flex md:justify-between border-t-2 mt-4 border-t-purple-400 py-4">
              <div className="mr-20">
                <div className="text-slate-300 text-xs">MarketCap</div>
                <div className="text-xl">{formatPrice(market_cap)}</div>
              </div>
              <div>
                <div className="text-slate-300 text-xs pt-4 md:pt-0">
                  Market Cap Change 24h
                </div>
                <div className="text-xl">
                  {formatPrice(market_cap_change_24h)}
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <div className="mt-4">
              <div className="text-sm text-slate-300">Circulating Supply</div>
              <div className="text-xl">
                {formatPrice(circulating_supply).replace('$', '')}
              </div>
              <div className="mt-2">
                <div className="md:w-2/3 w-1/3 bg-gray-200 rounded-full dark:bg-gray-700">
                  <div
                    className={`bg-slate-400 text-xs font-medium text-blue-100 text-center p-0.5 leading-none rounded-full`}
                  >
                    {((circulating_supply / max_supply) * 100).toFixed(0)}%
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-4 space-y-2">
              <div className="mt-4">
                <div className="text-sm text-slate-300">Max Supply</div>
                <div className="text-xl">
                  {formatPrice(max_supply).replace('$', '')}
                </div>
              </div>
              <div >
                <div className="text-sm text-slate-300">Total Supply</div>
                <div className="text-xl">
                  {formatPrice(total_supply).replace('$', '')}
                </div>
              </div>
            </div>
            <div className="flex justify-center">
              <Web3Connect text={`Buy ${name}`} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
