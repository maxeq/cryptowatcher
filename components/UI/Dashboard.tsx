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
import { IoInformationCircle } from 'react-icons/io5';
import { IoMdArrowDropdown } from 'react-icons/io';
import Logo from '../icons/LogoNew';

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
    `/api/coins/getCryptoDataRedis?id=${ids}`,
    fetcher,
    {
      revalidateOnMount: true,
      dedupingInterval: 300000, // Cache for 5 minutes
    }
  );

  const classPriceChangePercent = (value: number) =>
    value < 0
      ? 'bg-rose-600'
      : 'bg-lime-600'

  if (error) return <div>Error fetching data</div>;
  if (!cryptocurrencies || !cryptocurrencies.getdata)
    return <div></div>;

  const {
    max_supply,
    market_cap_change_percentage_24h,
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
      <div className="flex-wrap xs:flex container p-4 md:p-0">
        <Breadcrumbs />
        <div className="md:flex md:justify-between">
          <div className="md:mr-1">
            <div >
              <div className="flex justify-start items-center flex-wrap">
                <Image src={image} alt={name} width="36" height="36" className="md:ml-0 mr-4 rounded-full" />
                <div className="text-4xl font-bold tracking-wider">
                  {name}
                </div>
                <div className="flex pt-4 space-x-1 md:space-x-2 items-center md:mr-2">
                  <span className="text-sm bg-cmc/25 text-slate-200 tracking-wider opacity-70 bg-opacity-70 rounded-md px-1.5 py-1 mx-2 font-bold">{symbol.toUpperCase()}</span>
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
                  On 3,908,483 watch-list
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
              </div>
            </div>
          </div>
          {/* // 2nd column */}
          <div className="">
            <div className="md:flex md:justify-end md:flex-grow">
              <div className="column lg:min-w-[437px] w-full">
                <div className="md:pt-2 pt-4">
                  <div className="text-gray-300/80 font-bold text-sm justify-start lg:flex">
                    {name} Price ({symbol.toUpperCase()})
                  </div>
                  <div className="flex items-center space-x-2 mt-2 lg:flex lg:justify-start">
                    <div className="text-4xl font-bold">
                      {formatPrice(current_price)}
                    </div>
                    <div className="lg:px-2">
                      <div
                        className={`text-base font-bold rounded-xl px-2 py-1.5 ${classPriceChangePercent(price_change_percentage_24h)}`}>
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
                    <div className="text-sm text-gray-300/80 whitespace-nowrap">Low:<span className="font-bold text-white text-base">{formatPrice(low_24h)}</span> </div>
                    <div className="relative w-full h-2 mt-2.5 bg-slate-500/50 rounded-full mx-4">
                      <div
                        className="h-2 bg-gradient-to-r from-lime-400 to-lime-600 rounded-full"
                        style={{
                          width: `${((circulating_supply / max_supply) * 100).toFixed(0)}%`,
                          backgroundSize: '200% 100%',
                          backgroundPosition: 'left bottom',
                          transition: 'background-position 0.5s ease-out'
                        }}
                      ></div>
                    </div>
                    <div className="text-sm text-gray-300/80 whitespace-nowrap">Low:<span className="font-bold text-white text-base">{formatPrice(high_24h)}</span><span className="bg-cmc/25 text-sm w-min text-gray-300/80 rounded px-2 py-1 ml-2">24h</span></div></div>
                </div>
                <div className="md:flex md:justify-between border-t mt-6 border-[#858ca2]/25 md:py-10">
                  <div className="space-y-1 my-4">
                    <div className="flex items-center">
                      <div className="text-gray-300/80 text-12px">
                        Market Cap
                      </div>
                      <div>
                        <IoInformationCircle size={18} color="gray" className='md:block hidden ml-1' />
                      </div>
                    </div>
                    <div className="text-base">{formatPrice(market_cap)}</div>
                    <div className="flex justify-start">
                      <PriceChange value={market_cap_change_percentage_24h} />
                    </div>
                    <div className="md:pt-8 pt-4 pb-2 text-gray-300/80 text-sm">
                      24h Volume / Market Cap <span className="text-white ml-4 ">{((market_cap_change_24h / total_volume).toFixed(4))}
                      </span>
                    </div>
                  </div>
                  <div className="md:flex md:justify-between border-r border-[#858ca2]/25"></div>
                  <div>
                    <div className="space-y-1 my-4">
                      <div className="flex items-center mb-1 md:mb-0">
                        <div className="text-gray-300/80 text-12px ">
                          Fully Diluted Market Cap
                        </div>
                        <div>
                          <IoInformationCircle size={18} color="gray" className='md:block hidden ml-1' />
                        </div>
                      </div>
                      <div className="text-base">{formatPrice(fully_diluted_valuation)}</div>
                      <div className="flex justify-start">
                        <PriceChange value={fully_diluted_valuation / market_cap} />
                      </div>
                    </div>
                  </div>
                  <div className="md:flex md:justify-between border-r border-[#858ca2]/25"></div>
                </div>
              </div>
              {/* 3rd */}
              <div className="column lg:max-w-[437] w-full md:flex-grow">
                <div className="flex md:justify-end whitespace-nowrap flex-wrap md:space-y-1 md:h-[39px]">
                  <div className=""><Web3Connect className="" text={`Buy ${name}`} /></div>
                  <button className="rounded-lg bg-lime-600 p-2 mr-2 hover:bg-lime-500 flex items-center">Exchange <IoMdArrowDropdown /></button>
                  <button className="rounded-lg bg-lime-600 p-2 mr-2 hover:bg-lime-500 flex items-center">Gaming <IoMdArrowDropdown /></button>
                  <button className="rounded-lg bg-lime-600 p-2 mr-2 hover:bg-lime-500 flex items-center md:mt-0 mt-1.5">Earn crypto <IoMdArrowDropdown /></button>
                  <div className="md:justify-end flex text-10px text-gray-300/80 items-center m-2">
                    <Logo size={15} className="m-1" /> Sponsored
                  </div>
                </div>

                <div className="md:flex md:justify-start border-t border-[#858ca2]/25 md:py-10 md:mb-[33px] mt-5 md:mt-[115px]">
                  <div className="space-y-1 my-45">
                    <div className="space-y-1 my-4 md:mx-8">
                      <div className="flex items-center">
                        <div className="text-gray-300/80 text-12px mb-2 md:mb-0">
                          Volume <span className="bg-cmc/25 text-xs w-min text-gray-300/80 rounded-md px-2 py-1">24h</span>
                        </div>
                        <div>
                          <IoInformationCircle size={18} color="gray" className='md:block hidden ml-2' />
                        </div>
                      </div>
                      <div className="text-base">{formatPrice(market_cap)}</div>
                      <div className="flex justify-start">
                        <PriceChange value={market_cap_change_percentage_24h} />
                      </div>

                      <div className="mt-4 space-y-2">
                        <div className="mt-4 justify-between flex">
                          <div className="text-12px text-gray-300/80 flex items-center whitespace-nowrap">CEX Vol <IoInformationCircle size={18} color="gray" className='md:block hidden ml-1' /></div>
                          <div>
                            {formatPrice(max_supply).replace('$', '')}
                          </div>
                        </div>
                        <div className="mt-4 justify-between flex">
                          <div className="text-12px text-gray-300/80 flex items-center whitespace-nowrap md:mr-5">DEX Vol <IoInformationCircle size={18} color="gray" className='md:block hidden ml-1' /></div>
                          <div>
                            {formatPrice(total_supply).replace('$', '')}
                          </div>
                        </div>
                      </div>
                    </div>

                  </div>
                  <div className="md:flex border-r border-[#858ca2]/25"></div>
                  <div>
                    <div className="space-y-1 my-4 md:mx-8">
                      <div className="flex items-center">
                        <div className="text-12px text-gray-300/80 flex items-center mb-2 md:mb-0 whitespace-nowrap">Circulating Supply
                          <IoInformationCircle size={18} color="gray" className='md:block hidden ml-1' />
                        </div>
                      </div>
                      <div className="text-md flex justify-between">
                        {formatPrice(circulating_supply).replace('$', '')} {symbol.toUpperCase()}
                        <span className="text-gray-300/80">
                          {isFinite((circulating_supply / max_supply) * 100) ? `${((circulating_supply / max_supply) * 100).toFixed(0)}%` : ''}
                        </span>
                      </div>
                      {!isFinite((circulating_supply / max_supply) * 100) ? <div className="md:h-[14px] "></div> : (
                        <div className="flex justify-start">
                          <div className="w-full h-2 mt-2 bg-slate-500/50 rounded-full">
                            <div
                              className="h-2 bg-gradient-to-r from-lime-400 to-lime-600 rounded-full"
                              style={{
                                width: `${((circulating_supply / max_supply) * 100).toFixed(0)}%`,
                                backgroundSize: '200% 100%',
                                backgroundPosition: 'left bottom',
                                transition: 'background-position 0.5s ease-out',
                              }}
                            ></div>
                          </div>
                        </div>
                      )}
                      <div className="mt-4 space-y-2">
                        <div className="mt-6 justify-between flex ">
                          <div className="text-12px text-gray-300/80 flex items-center whitespace-nowrap">Max Supply <IoInformationCircle size={18} color="gray" className='md:block hidden ml-1' /></div>
                          <div>
                            {formatPrice(max_supply).replace('$', '')}
                          </div>
                        </div>
                        <div className="mt-4 justify-between flex md:min-w-fit">
                          <div className="text-12px text-gray-300/80 flex items-center whitespace-nowrap md:mr-5">Total Supply <IoInformationCircle size={18} color="gray" className='md:block hidden ml-1' /></div>
                          <div>
                            {formatPrice(total_supply).replace('$', '')}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="md:flex md:justify-between border-b md:-mt-10 border-[#858ca2]/25"></div>
        </div>
      </div >
    </div>
  );
}
