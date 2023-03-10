import { useState } from "react";
import useSWRInfinite from "swr/infinite";

const fetcher = (url: any) => fetch(url).then((res) => res.json());
const PAGE_SIZE = 6;

export default function CoinList() {
  const [currentPage, setCurrentPage] = useState(1);

  const getKey = (pageIndex: number, previousPageData: any) => {
    return `/api/crypto/getData?page=${pageIndex + 1}&pageSize=${PAGE_SIZE}`;
  };
  
  const { data, size, setSize } = useSWRInfinite(getKey, fetcher);

  console.log(data);

  return (
    <div>
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
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={() => setSize(size + 1)}
      >
        Load more
      </button>
    </div>
  );
}
