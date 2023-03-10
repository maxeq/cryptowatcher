import { useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import useSWRInfinite from "swr/infinite";
import Loader from "./Loader";

const fetcher = (url: any) => fetch(url).then((res) => res.json());
const PAGE_SIZE = 8;

export default function CoinList() {
    const [currentPage, setCurrentPage] = useState(1);

    const getKey = (pageIndex: number, previousPageData: any) => {
        pageIndex = pageIndex + 1;
        if (previousPageData && !previousPageData.getdata.length) return null;

        return `/api/crypto/getData?page=${pageIndex}&pageSize=${PAGE_SIZE}`;
    };

    const { data, size, setSize } = useSWRInfinite(getKey, fetcher);

    const isReachedEnd = !data || data[data.length - 1].getdata.length < PAGE_SIZE;

    const loadingMore = size > 0 && data && typeof data[size - 1] === "undefined";

    console.log(data);

    return (
        <div>
            <InfiniteScroll next={() => setSize(size + 1)} 
            hasMore={!isReachedEnd} 
            loader={<Loader />} 
            endMessage={<p>Reached end</p>} 
            dataLength={data?.length ?? 0}>

                {data && data.map((page, index) => (

                    <div key={index}>
                        {page.getdata.map((item: any) => (
                            <div key={item.id}>
                                <p>{item.name}</p>
                                <p>{item.symbol}</p>
                                <p>{item.current_price}</p>
                            </div>
                        ))}
                    </div>
                ))}

            </InfiniteScroll>
{/* 
            {loadingMore && <Loader />}
            {!isReachedEnd && <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                onClick={() => setSize(size + 1)}
            >
                Load more
            </button>} */}
        </div>
    );
}
