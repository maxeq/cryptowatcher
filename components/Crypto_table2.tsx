import React, { memo } from "react";

import Loader from "./Loader";
import { formatPrice, formatPercent } from "@/utils";
import Charts from "./Chart";
import { ObjectId } from 'mongodb';
import { getCustomers } from '../pages/api/customers/index';


export type getStaticProps = {
    id: string;
    dbDateAdded: Date;
    symbol: string;
    name: string;
    image: string;
    current_price: number;
    market_cap: number;
    market_cap_rank: number;
    fully_diluted_valuation?: number | null;
    total_volume: number;
    high_24h: number;
    low_24h: number;
    price_change_24h: number;
    price_change_percentage_24h: number;
    market_cap_change_24h: number;
    market_cap_change_percentage_24h: number;
    circulating_supply: number;
    total_supply?: number | null;
    max_supply?: number | null;
    ath: number;
    ath_change_percentage: number;
    ath_date: Date;
    atl: number;
    atl_change_percentage: number;
    atl_date: Date;
    roi?: object | null;
    last_updated: Date;
    price_change_percentage_1h_in_currency?: number | null;
    price_change_percentage_30d_in_currency?: number | null;
    price_change_percentage_7d_in_currency?: number | null;
  }

function Crypto_table2(crypto: any , index: number) {

    const classPriceChangePercent = (value: any) =>
        value
            ? value === "0%"
                ? "text-white-300"
                : value < 0
                    ? "text-rose-300"
                    : "text-lime-300"
            : "text-white-300";

    return (
        <tr className="table__row">
            <td className="table__start sticky z-0 backdrop-opacity-0 max-sm:bg-gray-800">
                {index + 1}
            </td>
            <td className="table__start sticky z-0 backdrop-opacity-0 max-sm:bg-gray-800">
                {crypto.name}
            </td>
            <td className="table__end">
                {crypto.current_price ? (
                    <>
                        <span title={`${crypto.current_price}`}>
                            {formatPrice(crypto.current_price)}
                        </span>
                    </>
                ) : (
                    <Loader />
                )}
            </td>
            <td className="table__end">
                {crypto.price_change_percentage_1h_in_currency ? (
                    <span className=
                        {classPriceChangePercent(crypto.price_change_percentage_1h_in_currency)}
                        title=
                        {`${crypto.price_change_percentage_1h_in_currency}`}>
                        {formatPercent(crypto.price_change_percentage_1h_in_currency)}
                    </span>
                ) : (
                    <Loader />
                )}
            </td>
            <td className="table__end">
                {crypto.price_change_percentage_24h ? (
                    <span className=
                        {classPriceChangePercent(crypto.price_change_percentage_24h)}
                        title=
                        {`${crypto.price_change_percentage_24h}`}>
                        {formatPercent(crypto.price_change_percentage_24h)}
                    </span>
                ) : (
                    <Loader />
                )}
            </td>
            <td className="table__end">
                {crypto.price_change_percentage_7d ? (
                    <span className=
                        {classPriceChangePercent(crypto.price_change_percentage_7d)}
                        title=
                        {`${crypto.price_change_percentage_7d}`}>
                        {formatPercent(crypto.price_change_percentage_7d)}
                    </span>
                ) : (
                    <Loader />
                )}
            </td>
            <td className="table__end">
                {formatPrice(crypto.marketCap) ? (formatPrice(crypto.marketCap)) : (<Loader />)}
            </td>
            <td className="table__end">
                {formatPrice(crypto.volume) ? (formatPrice(crypto.volume)) : (<Loader />)}
            </td>
            <td className="table__end">
                {formatPrice(crypto.circulatingSupply) ? (formatPrice(crypto.circulatingSupply)) : (<Loader />)}
            </td>
            {/* <td className="table__end">
                {<Charts symbol={crypto.symbol} /> ? <Charts symbol={crypto.symbol} /> : <Loader />}
            </td> */}
        </tr>
    );
}

export default Crypto_table2