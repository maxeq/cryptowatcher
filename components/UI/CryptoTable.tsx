import usePagination from '@/lib/usePagination';
import InfiniteScroll from 'react-infinite-scroll-component';
import Loader from '../icons/Loader';
import Image from 'next/image';
import Link from 'next/link';
import ChartFetcher from '../charts/ChartFetcher';
import { formatPrice } from '../../utils/NumberFormatter';
import ErrorMessage from '.././errorMessage';
import { IoInformationCircle } from 'react-icons/io5';
import { useState } from 'react';
import PriceChange from '@/utils/PriceArrowFormatter';

export default function CryptoTableList() {

  //default sort
  const [sortKey, setSortKey] = useState('market_cap_rank');
  const [sortDirection, setSortDirection] = useState('asc');

  //fetching and pagination
  const { data, size, setSize, isReachedEnd, isLoading, error } = usePagination(
    `/api/coins/getData`,
    sortKey,
    sortDirection
  );

  // sort
  const handleSort = (newSortKey: string) => {
    if (sortKey === newSortKey) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortKey(newSortKey);
      setSortDirection('desc');
    }
    setSize(1);
  };

  // tooltips for bar
  const [showTooltipx, setShowTooltipx] = useState<Record<number, boolean>>({});

  const handleTooltipVisibility = (index: any, visible: any) => {
    setShowTooltipx((prev) => ({ ...prev, [index]: visible }));
  };

  // tooltips
  const [showTooltip, setShowTooltip] = useState(false);
  const handleMouseEnter = () => {
    setShowTooltip(true);
  };
  const handleMouseLeave = () => {
    setShowTooltip(false);
  };

  const [showTooltipVolume, setShowTooltipVolume] = useState(false);
  const handleMouseEnterVolume = () => {
    setShowTooltipVolume(true);
  };
  const handleMouseLeaveVolume = () => {
    setShowTooltipVolume(false);
  };

  const [showTooltipCirc, setShowTooltipCirc] = useState(false);
  const handleMouseEnterCirc = () => {
    setShowTooltipCirc(true);
  };
  const handleMouseLeaveCirc = () => {
    setShowTooltipCirc(false);
  };

  if (error) {
    return <ErrorMessage error={error} />;
  }

  if (isLoading) {
    return <Loader />;
  }

  return (
    <InfiniteScroll
      next={() => setSize(size + 1)}
      hasMore={!isReachedEnd}
      loader={<Loader />}
      dataLength={data?.length ?? 0}
    >
      <div className="overflow-x-auto">
        <table className={`table mobile-solid-background`}>
          <thead>
            <tr className={`table-header`}>
              <th className="hidden md:table-cell table__start sticky z-0 backdrop-opacity-0">
                <div className="h-full w-full flex items-center justify-center">
                  #
                </div>
              </th>
              <th
                className="table__start sticky z-0 backdrop-opacity-0"
                onClick={() => handleSort('name')}
              >
                Name
              </th>
              <th
                className="table__end whitespace-nowrap"
                onClick={() => handleSort('current_price')}
              >Price (USD)</th>
              <th className="table__end" onClick={() => handleSort('price_change_percentage_1h_in_currency')}>1h %</th>
              <th className="table__end" onClick={() => handleSort('price_change_percentage_24h')}>24h %</th>
              <th className="table__end" onClick={() => handleSort('price_change_percentage_7d_in_currency')}>7d %</th>
              <th className="table__end">
                <div className="relative inline-flex items-center" onClick={() => handleSort('market_cap')}>
                  Market Cap
                  <div
                    className="ml-1"
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                  >
                    <IoInformationCircle size={18} color="gray" className='md:block hidden ' />
                    {showTooltip && (
                      <div
                        className="hidden md:block absolute bg-slate-900 text-slate-300 text-xs rounded-lg py-2 pl-4 pr-1 leading-relaxed -right-60 -bottom-28 normal-case text-left"
                      >
                        The total market value of a cryptocurrency's circulating supply. It is analogous to the free-float capitalization in the stock market.
                        <br></br><br></br>
                        Market Cap = Current Price x Circulating Supply.
                      </div>
                    )}
                  </div>
                </div>
              </th>
              <th className="table__end">
                <div className="relative inline-flex items-center" onClick={() => handleSort('total_volume')}>
                  Volume (24h)
                  <div
                    className="ml-1"
                    onMouseEnter={handleMouseEnterVolume}
                    onMouseLeave={handleMouseLeaveVolume}
                  >
                    <IoInformationCircle size={18} color="gray" className='md:block hidden ' />
                    {showTooltipVolume && (
                      <div
                        className="hidden md:block absolute bg-slate-900 text-slate-300 text-xs rounded-lg py-2 pl-4 pr-1 leading-relaxed -right-48 -bottom-14 normal-case text-left"
                      >
                        A measure of how much of a cryptocurrency was traded in the last 24 hours.
                      </div>
                    )}
                  </div>
                </div>
              </th>
              <th className="table__end">
                <div className="relative inline-flex items-center" onClick={() => handleSort('circulating_supply')}>
                  Circulating Supply
                  <div
                    className="ml-1"
                    onMouseEnter={handleMouseEnterCirc}
                    onMouseLeave={handleMouseLeaveCirc}
                  >
                    <IoInformationCircle size={18} color="gray" className='md:block hidden ' />
                    {showTooltipCirc && (
                      <div
                        className="hidden md:block absolute bg-slate-900 text-slate-300 text-xs rounded-lg py-2 pl-4 pr-1 leading-relaxed -right-36 -bottom-20 normal-case text-left"
                      >
                        The amount of coins that are circulating in the market and are in public hands. It is analogous to the flowing shares in the stock market.
                      </div>
                    )}
                  </div>
                </div>
              </th>


              <th className="table__end">Last 7 days</th>
            </tr>
          </thead>
          <tbody>
            {data
              ?.flatMap(page => page.getdata)
              .map((crypto: any, index: number) => (
                <tr key={crypto.id}>
                  <td className="hidden md:table-cell table__start sticky z-0 backdrop-opacity-0">
                    <div className="h-full w-full flex items-center justify-center">
                      {index + 1}
                    </div>
                  </td>
                  <td className="table__start sticky z-0 backdrop-opacity-0">
                    <div className={`flex items-center max-w-xs mr-5 md:mr-0`}>
                      <Image
                        src={crypto.image}
                        alt={crypto.name}
                        width="32"
                        height="32"
                        className="mr-3"
                      />
                      <Link href={`/cryptocurrencies/${crypto.id}`}>
                        <div className="">
                          <span className="flex flex-col md:flex-items">
                            <span className="mr-2">{crypto.name}</span>
                            <span className="uppercase text-slate-300 text-12px mr-3">
                              <span className="md:hidden mr-2 bg-slate-700 px-2 py-1 rounded-md text-left">
                                {index + 1}</span>{crypto.symbol}</span>
                          </span>
                        </div>
                      </Link>
                    </div>
                  </td>
                  <td className="table__end">
                    {formatPrice(crypto.current_price, 2)}
                  </td>
                  <td
                    className={`table__end`}>
                    <PriceChange value={crypto.price_change_percentage_1h_in_currency} />
                  </td>
                  <td
                    className={`table__end`}
                  >
                    <PriceChange value={crypto.price_change_percentage_24h} />
                  </td>
                  <td
                    className={`table__end`}
                  >
                    <PriceChange value={crypto.price_change_percentage_7d_in_currency} />
                  </td>
                  <td className="table__end">
                    {formatPrice(crypto.market_cap)}
                  </td>
                  <td className="table__end">
                    <div>
                      {formatPrice(crypto.total_volume)}
                    </div>
                    <div className='text-slate-300 text-12px'>
                      {formatPrice(crypto.total_volume / crypto.current_price, 0, false)} {crypto.symbol.toUpperCase()}
                    </div>
                  </td>
                  <td className="table__end whitespace-nowrap">

                    {formatPrice(crypto.circulating_supply).replace('$', '')} {crypto.symbol.toUpperCase()}

                    {crypto.max_supply !== 0 && crypto.circulating_supply !== 0 && isFinite(crypto.circulating_supply / crypto.max_supply) ? (
                      <div
                        className="relative w-3/4 h-2 bg-slate-100/50 rounded-full ml-auto"
                        onMouseEnter={() => handleTooltipVisibility(index, true)}
                        onMouseLeave={() => handleTooltipVisibility(index, false)}
                      >
                        <div
                          className="absolute left-0 h-2 text-xs font-medium text-blue-100 text-center p-0.5 leading-none rounded-full"
                          style={{
                            width: `${((crypto.circulating_supply / crypto.max_supply) * 100).toFixed(0)}%`,
                            backgroundColor: 'rgba(0, 0, 0, 0.5)',
                            // add the following styles to change the color to reverse and add transparency
                            backgroundImage: 'linear-gradient(to right, rgba(0, 0, 0, 0.5) 50%, transparent 50%)',
                            backgroundSize: '200% 100%',
                            backgroundPosition: 'right bottom',
                            transition: 'background-position 0.5s ease-out'
                          }}
                        ></div>
                        {showTooltipx[index] && (
                          <div className="hidden md:block absolute bg-slate-900 text-slate-300 text-xs rounded-lg py-2 pl-4 pr-4 leading-relaxed normal-case text-left">
                            {((crypto.circulating_supply / crypto.max_supply) * 100).toFixed(0)}%
                          </div>
                        )}
                      </div>
                    ) : null}


                  </td>
                  <td className={`table__end`}>
                    <ChartFetcher _id={crypto.id} width='150px' height='75px' />
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </InfiniteScroll>
  );
}
