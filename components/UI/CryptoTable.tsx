import usePagination from "@/lib/usePagination";
import InfiniteScroll from "react-infinite-scroll-component";
import Loader from "../icons/Loader";
import Image from 'next/image';
import Link from "next/link";
import ChartFetcher from "../charts/ChartFetcher";
import { formatPrice, formatPercent } from "@/utils";

export default function CryptoTableList() {

    const { data, size, setSize, isReachedEnd, loadingMore, isLoading, error } = usePagination('/api/coins/getData');
    // TODO: refactor nested ternary conditionals. Bad for readability.
    const classPriceChangePercent = (value: any) =>
        value
            ? value === "0%"
                ? "text-white-300"
                : value < 0
                    ? "text-rose-300"
                    : "text-lime-300"
            : "text-white-300";

    // Add error handling using `error`
    if (isLoading) {
        return <Loader />;
    }

    return (
        <InfiniteScroll next={() => setSize(size + 1)}
            hasMore={!isReachedEnd}
            loader={<Loader />}
            dataLength={data?.length ?? 0}>
            <div className="overflow-x-auto ">
                <table className={`table`}>
                    <thead>
                        <tr className={`table-header`}>
                            <th className="table__start sticky z-0 backdrop-opacity-2 max-sm:bg-gray-800 py-2">#</th>
                            <th className="table__start sticky z-0 backdrop-opacity-0 max-sm:bg-gray-800">Cryptocurrency</th>
                            <th className="table__end">Price (USD)</th>
                            <th className="table__end">1h %</th>
                            <th className="table__end">24h %</th>
                            <th className="table__end">7d %</th>
                            <th className="table__end">Market Cap</th>
                            <th className="table__end">Volume (24h)</th>
                            <th className="table__end">Circulating Supply</th>
                            <th className="table__end">Last 7 days</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data?.flatMap((page) => page.getdata).map((crypto: any, index: number) => (
                            <tr key={crypto.id} className=""> 
                                <td className="table__start sticky z-0 backdrop-opacity-0 max-sm:bg-gray-800 py-12    ">{index + 1}</td>
                                <td className="table__start sticky z-0 backdrop-opacity-0 max-sm:bg-gray-800 text-center">
                                    <div className={`flex items-center max-w-xs`}>
                                        <Image src={crypto.image} alt={crypto.name} width="32" height="32" className="mr-3 ml-3" />
                                        <Link href={`/cryptocurrencies/${crypto.id}`}>
                                        <span className="max-sm:mr-12">{crypto.name}</span>
                                        </Link>
                                    </div>
                                </td>
                                <td className="table__end">{formatPrice(crypto.current_price)}</td>
                                <td className={`table__end ${classPriceChangePercent(crypto.price_change_percentage_1h_in_currency)}`}>
                                    {formatPercent(crypto.price_change_percentage_1h_in_currency)}
                                </td>
                                <td className={`table__end ${classPriceChangePercent(crypto.price_change_percentage_24h)}`}>
                                    {formatPercent(crypto.price_change_percentage_24h)}
                                </td>
                                <td className={`table__end ${classPriceChangePercent(crypto.price_change_percentage_7d_in_currency)}`}>
                                    {formatPercent(crypto.price_change_percentage_7d_in_currency)}
                                </td>
                                <td className="table__end">{formatPrice(crypto.market_cap)}</td>
                                <td className="table__end">{formatPrice(crypto.total_volume)}</td>
                                <td className="table__end">{formatPrice(crypto.circulating_supply)}</td>
                                <td className={`table__end max-w-[200px] min-w-[200px]`}>
                                    <ChartFetcher _id={crypto.id} />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </InfiniteScroll>
    );
}

