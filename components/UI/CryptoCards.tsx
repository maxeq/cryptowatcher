import React, { memo } from 'react';
import Image from 'next/image';
import Loader from '../icons/Loader';
import Status from '../Status';
import { formatPercent, formatPrice } from '../../utils/NumberFormatter';
import usePagination from '@/lib/usePagination';
import ErrorMessage from '../errorMessage';
import InfiniteScroll from 'react-infinite-scroll-component';
import Button from '../buttons/Button';
import Link from 'next/link';

export default function CryptoCards() {
  const { data, size, setSize, isReachedEnd, isLoading, error } =
    usePagination('/api/coins/getData');
  const classPriceChangePercent = (value: number) =>
    value < 0 ? 'text-rose-300' : 'text-lime-300';

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
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {data
          ?.flatMap(page => page.getdata)
          .map((crypto: any) => (
            <div key={crypto.id} className="max-w p-6 bg-black shadow-purple-400 hover:shadow-slate-200 hover:text-lime-400 border-gray-100 rounded-lg shadow-lg mx-2">

              <div className="flex items-center justify-between">
                <Image
                  src={crypto.image}
                  alt={crypto.name}
                  width="64"
                  height="64"
                />
                <h5 className="mb-1 text-2xl font-semibold tracking-tight">
                  <span className="flex justify-end">{crypto.symbol.toUpperCase()}</span>
                  <span className="text-sm text-gray-400 justify-end"></span>
                  <span className="text-3xl justify-end">{formatPrice(crypto.current_price)}</span>
                </h5>
              </div>
              <div className="mt-4">
                <div className='justify-between flex'>
                  <span className="text-sm text-cyan-50">24h Low</span>
                  <span className="text-sm text-cyan-50">{formatPrice(crypto.low_24h)}</span>
                </div>
                <div className='justify-between flex'>
                  <span className="text-sm text-cyan-50">24h High </span>
                  <span className="text-sm text-cyan-50">{formatPrice(crypto.high_24h)}</span>
                </div>
                <div className='justify-between flex'>
                  <span className="font-semibold text-cyan-50" >24h Change</span>
                  <span className={`font-semibold text-cyan-50 ${classPriceChangePercent(
                    crypto.price_change_percentage_1h_in_currency
                  )}`}>{formatPercent(crypto.price_change_percentage_24h)}</span>
                </div>
                <div className='text-center mt-8'>
                  <Link href={`/cryptocurrencies/${crypto.id}`}>
                    <Button text="Trade now" />
                  </Link>
                </div>
              </div>
            </div>
          ))
        }
      </div >
    </InfiniteScroll >
  );
}