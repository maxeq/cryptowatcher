import usePagination from "@/lib/usePagination";
import { useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import useSWRInfinite from "swr/infinite";
import Loader from "./Loader";

export default function Crypto_table() {

const { data, size, setSize, isReachedEnd, loadingMore } = usePagination('/api/crypto/getData');

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
