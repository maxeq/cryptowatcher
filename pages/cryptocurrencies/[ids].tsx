import React from "react";
import { useRouter } from 'next/router';
import useSWR from 'swr';
import Image from 'next/image';
import { formatPrice, formatPercent } from "@/utils";

import { FaShareSquare, FaRegStar } from 'react-icons/fa';

const fetcher = async (url: string) => {
    const res = await fetch(url);
    const data = await res.json();
    return data;
}

export default function DashboardCrypto(): JSX.Element {
    const router = useRouter();
    const ids = Array.isArray(router.query.ids) ? router.query.ids[0] : router.query.ids;
    const { data: cryptocurrencies, error } = useSWR(
        `/api/crypto/getCryptoData?id=${ids}`,
        fetcher,
        {
            shouldRetryOnError: false,
            onSuccess: (data) => {
                return data || [];
            },
            onError: (error) => {
                console.error(error);
            },
            revalidateOnMount: true,
            dedupingInterval: 5000 // Cache for 5 minutes
        }
    );

    const classPriceChangePercent = (value: any) =>
        value
            ? value === "0%"
                ? "text-white-300"
                : value < 0
                    ? "bg-rose-600"
                    : "bg-lime-400"
            : "bg-white-300";


    if (error) return <div>Error fetching data</div>;
    if (!cryptocurrencies || !cryptocurrencies.getdata) return <div>Loading data...</div>;

    const { ath, atl, total_volume, circulating_supply, total_supply, price_change_24h, current_price, high_24h, id, image, low_24h, market_cap, market_cap_rank, name, symbol, fully_diluted_valuation } = cryptocurrencies.getdata;

    return (
        <div key={ids}>
            <div className="p-8 shadow-purple-400 bg-gray-900 border border-solid border-gray-100 rounded-lg shadow-lg">
                <div className="md:flex md:justify-between">
                    <div className="">
                        <div className="">
                            <div className="md:flex md:justify-between items-center">
                                <Image src={image} alt={name} width="64" height="64" className="mr-2" />
                                <div className="text-5xl mb-2 md:mb-0 md:ml-4">{name}</div>
                                <div className="flex pt-4 space-x-3 ml-4">
                                    <div className="border-2 border-gray-500 text-gray-300 rounded-lg p-1 hover:text-gray-200"><FaRegStar size="12" /></div>
                                    <div className="border-2 border-gray-500 text-gray-300 rounded-lg p-1 hover:text-gray-200"><FaShareSquare size="12" /></div>
                                </div>
                            </div>
                            <div className="md:flex md:space-x-3 text-sm mt-4 text-slate-300">
                                <div className="border-b-gray-500 border text-gray-100 bg-gray-800 rounded px-2">Rank #{market_cap_rank}</div>
                                <div className="border-b-gray-500 border bg-gray-800 rounded px-2">Coin</div>
                                <div className="border-b-gray-500 border bg-gray-800 rounded px-2">Followed by {12}</div>
                            </div>
                            <div className="text-lg mt-4">
                                {circulating_supply}</div>
                            <div className="text-lg mt-4">
                                {total_supply}</div>
                        </div>
                        <div className="mt-4">
                            <div className="text-lg">Tags</div>
                        </div>
                    </div>

                    <div className="">
                        <div className="">
                            <div className="text-xl text-slate-300 text-xs">{name} Price ({symbol.toUpperCase()})</div>
                            <div className="flex items-center space-x-2 mt-2">
                                <div className="text-6xl font-bold text-lime-400">{formatPrice(current_price)}</div>
                                <div className="">
                                    <div className="text-center text-slate-300 text-lg">24h</div>
                                    <div className={`text-lg md:text-xl text-white rounded-lg px-2 ${classPriceChangePercent(price_change_24h)}`}>{formatPercent(price_change_24h)}</div>
                                </div>
                            </div>
                            <div className="md:flex md:justify-between mt-4">
                                <div className="text-lg">Low: {formatPrice(low_24h)}</div>
                                <div className="text-lg">High: {formatPrice(high_24h)}</div>
                            </div>
                        </div>
                        <div className="md:flex md:justify-between border-t-2 mt-4">
                            <div>
                                <div className="text-lg">MarketCap</div>
                                <div className="text-xl">{formatPrice(market_cap)}</div>
                            </div>
                            <div>
                                <div className="text-lg">Fully Diluted</div>
                                <div className="text-xl">{formatPrice(fully_diluted_valuation)}</div>
                            </div>
                        </div>
                    </div>

                    <div className="">
                        <div className="">
                            <button className="text-lg font-bold px-4 py-2 rounded-full bg-lime-400 text-gray-900 hover:bg-lime-500">Buy</button>
                        </div>
                        <div className="mt-4">
                            <div className="text-lg">Volume</div>
                            <div className="text-xl">{formatPrice(total_volume)}</div>
                        </div>
                        <div className="mt-4">
                            <div className="text-lg">Circulating Supply</div>
                            <div className="text-xl">{formatPrice(circulating_supply)}</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}
