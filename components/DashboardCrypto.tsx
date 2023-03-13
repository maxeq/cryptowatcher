import React from "react";
import useSWR from 'swr';
import Image from 'next/image';
import { formatPrice, formatPercent } from "@/utils";

import { FaShareSquare, FaRegStar } from 'react-icons/fa';


const fetcher = async (url: string) => {
    const res = await fetch(url);
    const data = await res.json();
    return data;
}

interface DashboardCryptoProps {
    id: string;
}

export default function DashboardCrypto(props: DashboardCryptoProps): JSX.Element {
    const { data: cryptocurrency, error } = useSWR(
        `/api/crypto/getCryptoData?id=${props.id}`,
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
    if (!cryptocurrency || !cryptocurrency.getdata) return <div>Loading data...</div>;

    const { ath, atl, total_volume, circulating_supply, price_change_24h, current_price, high_24h, id, image, low_24h, market_cap, market_cap_rank, name, symbol, fully_diluted_valuation } = cryptocurrency.getdata;

    return (
        <div>
            <div key={id} className="p-8 shadow-purple-400 bg-gray-800 hover:bg-gray-900 border border-solid border-gray-100 rounded-lg shadow-lg">
                <div className="md:flex md:justify-between">
                    <div className="">
                        <div className="">
                            <div className="md:flex md:justify-between">
                                <Image src={image} alt={name} width="64" height="64" className="mr-2" />
                                <div className="text-6xl">{name}</div>
                                <div className="flex self-center ">
                                    <div className="border-2 border-gray-100 rounded-lg p-2"><FaRegStar size="16" /></div>
                                    <div className="border-2 border-gray-100 rounded-lg p-2"><FaShareSquare size="16" /></div>
                                </div>
                            </div>
                            <div className="md:flex md:justify-between">
                                <div>{market_cap_rank}</div>
                                <div>Type</div>
                                <div>FavouriteTimes</div>
                            </div>
                            <div>Content</div>
                        </div>
                        <div className="">
                            <div>Tags</div>
                        </div>
                    </div>

                    <div className="">
                        <div className="">
                            <div>{symbol}</div>
                            <div className="flex items-center space-x-2">
                                <div className="text-lg md:text-6xl text-lime-400">${current_price}</div>
                                <div className="">
                                    <div className="text-center text-gray-300">24h</div>
                                    <div className={`text-sm md:text-base text-white rounded-lg px-2 ${classPriceChangePercent(price_change_24h)}`}>{formatPercent(price_change_24h)}</div>
                                </div>
                            </div>
                            <div className="md:flex md:justify-between">
                                <div>Low: {formatPrice(low_24h)}</div>
                                <div>High: {formatPrice(high_24h)}</div>
                            </div>
                        </div>
                        <div className="md:flex md:justify-between border-t-2 ">
                            <div >
                                <div>
                                    <div>MarketCap</div>
                                    <div>{formatPrice(market_cap)}</div>
                                </div>
                            </div>
                            <div>
                                <div>Fully Diluted</div>
                                <div>{formatPrice(fully_diluted_valuation)}</div>
                            </div>
                        </div>
                    </div>

                    <div className="">
                        <div className="">
                            <div>Buttons</div>
                        </div>
                        <div className="">
                            <div className="">
                                <div>Volume</div>
                                <div>{formatPrice(total_volume)}</div>
                            </div>
                            <div className="">
                                <div>Circulating Supply</div>
                                <div>{formatPrice(circulating_supply)}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
