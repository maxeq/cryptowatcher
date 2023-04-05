import usePagination from '@/lib/usePagination';
import InfiniteScroll from 'react-infinite-scroll-component';
import Loader from '../../icons/Loader';
import Image from 'next/image';
import Link from 'next/link';
import ChartFetcher from '../../charts/ChartFetcher';
import { formatPrice } from '../../../utils/NumberFormatter';
import { useState } from 'react';
import PriceChange from '@/utils/PriceArrowFormatter';
import CryptoLoadingSkeleton from './CryptoTableSkeleton';
import CryptoTableHeader from './CryptoTableHeader';
import CryptoTableBody from './CryptoTableBody';

export default function CryptoTableList() {

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

  //default sort
  const [sortKey, setSortKey] = useState('market_cap_rank');
  const [sortDirection, setSortDirection] = useState('asc');

  //fetching and pagination
  const { data, size, setSize, isReachedEnd, isLoading, error } = usePagination(
    `/api/coins/getDataRedis`,
    sortKey,
    sortDirection
  );


  if (error) {
    return <CryptoLoadingSkeleton />;
  }

  return (
    <InfiniteScroll
      next={() => setSize(size + 1)}
      hasMore={!isReachedEnd}
      loader={<Loader />}
      dataLength={data?.length ?? 0}
    >
      <div className="overflow-x-auto">
        <table className={`table mobile-solid-background w-full justify-evenly`}>
          <thead>
            <CryptoTableHeader handleSort={handleSort} sortKey={sortKey} sortDirection={sortDirection} />
          </thead>
          <tbody>
            {isLoading
              ? Array.from({ length: 10 }).map((_, index) => (
                <CryptoLoadingSkeleton key={index} />
              ))
              : data
                ?.flatMap(page => page.getdata)
                .map((crypto: any, index: number) => (
                  <CryptoTableBody crypto={crypto} index={index} />
                ))}
          </tbody>
        </table>
      </div>
    </InfiniteScroll>
  );
}
