import React from 'react';
import { useRouter } from 'next/router';
import useSWR from 'swr';
import Image from 'next/image';
import { formatPrice, formatPercent } from '../../utils/NumberFormatter';
import { FiShare, FiStar } from 'react-icons/fi';
import Web3Connect from '../buttons/Web3Connect';
import ErrorMessage from '../errorMessage';
import Loader from '../icons/Loader';
import Breadcrumbs from '../Breadcrumbs';
import PriceChange from '@/utils/PriceArrowFormatter';

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
      <div className="">
        <Breadcrumbs />
        <div className="md:flex md:justify-between">
          <div >
            <div >
              <div className="flex md:justify-between items-center justify-center">
                <Image src={image} alt={name} width="36" height="36" className="mr-4 rounded-full" />
                <div className="text-4xl font-bold tracking-wider">
                  {name}
                  <span className="text-sm bg-cmc/25 text-slate-200 tracking-wider opacity-70 bg-opacity-70 rounded-md px-1.5 py-1 mx-3 font-bold space-">{symbol.toUpperCase()}</span>
                </div>
                <div className="flex pt-4 space-x-3">
                  <div className="border border-opacity-50 border-gray-500 hover:bg-gray-500/10 text-gray-300 rounded-lg p-2">
                    <FiStar size="16" className=" text-white " />
                  </div>
                  <div className="border border-opacity-50 border-gray-500 hover:bg-gray-500/10 text-gray-300 rounded-lg p-2">
                    <FiShare size="16" className="text-white" />
                  </div>
                </div>
              </div>
              <div className="flex space-x-3 text-xs mt-4">
                <div className=" bg-cmc font-bold rounded-md px-2 py-1 text-white">
                  Rank #{market_cap_rank}
                </div>
                <div className="bg-cmc/25 text-gray-300/80 rounded-md px-2 py-1 text-white">
                  Coin
                </div>
                <div className="bg-cmc/25 text-gray-300/80 rounded-md px-2 py-1">
                  On 3,908,483 watchlists
                </div>
              </div>
              <div className="">
                <div className="mt-4 text-sm font-bold whitespace-nowrap">
                  <div className="flex items-center h-10 space-x-2">
                    <div className="w-min hover:bg-cmc px-4 py-1.5 bg-cmc/25 rounded-lg text-center">bitcoing.org</div>
                    <div className="w-min hover:bg-cmc px-4 py-1.5 bg-cmc/25 rounded-lg text-center">Explorers</div>
                    <div className="w-min hover:bg-cmc px-4 py-1.5 bg-cmc/25 rounded-lg text-center">Community</div>
                  </div>
                  <div className="flex items-center h-10 space-x-2">
                    <div className="w-min hover:bg-cmc px-4 py-1.5 bg-cmc/25 rounded-lg text-center">Source code</div>
                    <div className="w-min hover:bg-cmc px-4 py-1.5 bg-cmc/25 rounded-lg text-center">Whitepaper</div>
                  </div>
                </div>
                <div className="text-slate-300/80 text-sm py-2">Tags:</div>
                <div className="flex items-center space-x-3 whitespace-nowrap">
                  <div className="bg-cmc/25 text-xs w-min text-gray-300/80 rounded-md px-2 py-1">Mineable</div>
                  <div className="bg-cmc/25 text-xs w-min text-gray-300/80 rounded-md px-2 py-1">PoW</div>
                  <div className="bg-cmc/25 text-xs w-min text-gray-300/80 rounded-md px-2 py-1">SHA-256</div>
                  <div className="bg-cmc/25 text-xs w-min text-gray-300/80 rounded-md px-2 py-1">Store of Value</div>
                  <div className="bg-teal-900/25 text-xs w-min rounded-md px-2 py-1 text-teal-400">View all</div>
                </div>
                {/* <div className="mt-4">
                  <div className="text-sm text-slate-300">Volume</div>
                  <div className="text-xl">{formatPrice(total_volume)}</div>
                  <div className="text-sm text-slate-300">
                    Fully Diluted Valuation
                  </div>
                  <div className="text-xl">
                    {formatPrice(fully_diluted_valuation)}
                  </div>
                </div> */}
              </div>
            </div>
          </div>

          <div className="flex justify-end">
            <div className="" style={{ maxWidth: '437px', minWidth: '437px' }}>
              <div className="pt-2">
                <div className="text-gray-300/80 font-bold text-sm justify-start lg:flex">
                  {name} Price ({symbol.toUpperCase()})
                </div>
                <div className="flex items-center space-x-2 mt-2 lg:flex lg:justify-start">
                  <div className="text-4xl font-bold">
                    {formatPrice(current_price, 0)}
                  </div>
                  <div className="lg:px-2">
                    <div
                      className={`text-base font-bold rounded-xl px-2 py-1.5 bg-rose-500`}>
                      <PriceChange value={price_change_percentage_24h} disableColor />
                    </div>
                  </div>
                </div>
                <div className="flex space-x-4 mt-3">
                  <div className="text-md font-normal text-gray-300/80">15.67 ETH
                  </div>
                  <div><PriceChange value={price_change_percentage_24h} />
                  </div>
                </div>
                <div className="flex justify-evenly my-4">
                  <div className="text-sm text-gray-300/80 whitespace-nowrap">Low:<span className="font-bold text-white text-base">{formatPrice(low_24h, 0)}</span> </div>
                  <div className="relative w-full h-2 mt-2.5 bg-slate-500/50 rounded-full mx-4">
                    <div
                      className="h-2 bg-gradient-to-r from-green-400 to-lime-500 rounded-full"
                      style={{
                        width: `${((circulating_supply / max_supply) * 100).toFixed(0)}%`,
                        backgroundSize: '200% 100%',
                        backgroundPosition: 'left bottom',
                        transition: 'background-position 0.5s ease-out'
                      }}
                    ></div>
                  </div>
                  <div className="text-sm text-gray-300/80 whitespace-nowrap">Low:<span className="font-bold text-white text-base">{formatPrice(high_24h, 0)}</span><span className="bg-cmc/25 text-xs w-min text-gray-300/80 rounded-md px-2 py-1">24h</span> </div> </div>
              </div>
              <div className="md:flex md:justify-between border-t mt-6 border-[#858ca2]/25 py-10">
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

            <div className="" style={{ maxWidth: '437px', minWidth: '437px' }}>
              <div className="mt-4 ">
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
                  <div className="md:flex md:justify-between border-t mt-6 border-[#858ca2]/25 py-10"></div>
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
    </div >
  );
}
