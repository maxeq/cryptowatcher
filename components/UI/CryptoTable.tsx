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
  const { data, size, setSize, isReachedEnd, isLoading, error } =
    usePagination('/api/coins/getData');

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
              <th className="xs:block hidden table__start sticky z-0 backdrop-opacity-2 py-2">
                #
              </th>
              <th className="table__start sticky z-0 backdrop-opacity-0">
                Name
              </th>
              <th className="table__end whitespace-nowrap">Price (USD)</th>
              <th className="table__end">1h %</th>
              <th className="table__end">24h %</th>
              <th className="table__end">7d %</th>
              <th className="table__end">
                <div className="relative inline-flex items-center">
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
                <div className="relative inline-flex items-center">
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
                <div className="relative inline-flex items-center">
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
                <tr key={crypto.id} >
                  <td className="xs:block hidden table__start sticky z-0 backdrop-opacity-0 ">
                    {index + 1}
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
                    {formatPrice(crypto.current_price)}
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
                    {formatPrice(crypto.total_volume)}
                  </td>
                  <td className="table__end whitespace-nowrap">
                    {formatPrice(crypto.circulating_supply).replace('$', '')} {crypto.symbol.toUpperCase()}
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
