
import useSWRInfinite from "swr/infinite";

export const usePagination = (url:string) => {
const fetcher = (url: any) => fetch(url).then((res) => res.json());
const PAGE_SIZE = 8;
const getKey = (pageIndex: number, previousPageData: any) => {
    pageIndex = pageIndex + 1;
    if (previousPageData && !previousPageData.getdata.length) return null;

    return `${url}?page=${pageIndex}&pageSize=${PAGE_SIZE}`;
};

const { data, size, setSize } = useSWRInfinite(getKey, fetcher);

const isReachedEnd = !data || data[data.length - 1].getdata.length < PAGE_SIZE;

const loadingMore = size > 0 && data && typeof data[size - 1] === "undefined";

return { data, size, setSize, isReachedEnd, loadingMore };
};

export default usePagination;