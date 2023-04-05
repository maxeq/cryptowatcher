import useSWRInfinite from 'swr/infinite';

export const usePagination = (baseUrl: string, sortKey: string, sortDirection: string) => {
  const fetcher = (url: any) => fetch(url).then(res => res.json());
  const PAGE_SIZE = 20;
  const getKey = (pageIndex: number, previousPageData: any) => {
    pageIndex = pageIndex + 1;
    if (previousPageData && !previousPageData.getdata.length) return null;

    return `${baseUrl}?page=${pageIndex}&pageSize=${PAGE_SIZE}&sortKey=${sortKey}&sortDirection=${sortDirection}`;
  };

  const { data, size, setSize, isLoading, error } = useSWRInfinite(
    (pageIndex, previousPageData) =>
      getKey(pageIndex, previousPageData),
    fetcher
  );

  const isReachedEnd =
    !data || data[data.length - 1].getdata.length < PAGE_SIZE;

  const loadingMore = size > 0 && data && typeof data[size - 1] === 'undefined';

  return {
    data,
    size,
    setSize,
    isReachedEnd,
    loadingMore,
    isLoading,
    error,
  };
};

export default usePagination;
