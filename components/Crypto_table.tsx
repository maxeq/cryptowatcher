import React, { memo } from "react";

import Loader from "./Loader";
import { formatPrice, formatPercent } from "@/utils";
import Charts from "../components/charts/Chart";
import { ObjectId } from 'mongodb';
import { getCustomers } from '../pages/api/customers/index';

interface Props {
    index: number;
    crypto: {
        id: string;
        name: string;
        symbol: string;
        iconCode: number;
        price: number;
        highPrice: number;
        lowPrice: number;
        prevPrice: number;
        price_change_percentage_24h: number;
        price_change_percentage_1h: number;
        price_change_percentage_7d: number;
        explorer: string;
        circulatingSupply: number;
        marketCap: number;
        volume: number;
        quoteVolume: number;
    };
}

function Crypto_table({ crypto, index }: Props) {

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
                {crypto.price ? (
                    <>
                        <span title={`${crypto.price}`}>
                            {formatPrice(crypto.price)}
                        </span>
                    </>
                ) : (
                    <Loader />
                )}
            </td>
            <td className="table__end">
                {crypto.price_change_percentage_1h ? (
                    <span className=
                        {classPriceChangePercent(crypto.price_change_percentage_1h)}
                        title=
                        {`${crypto.price_change_percentage_1h}`}>
                        {formatPercent(crypto.price_change_percentage_1h)}
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

export default memo(Crypto_table);