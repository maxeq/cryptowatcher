import React, { memo } from "react";
import Image from 'next/image';
import Loader from "./icons/Loader";
import Status from "./Status";
import { formatPrice } from "@/utils";

interface Props {
  crypto: {
    id: string;
    name: string;
    symbol: string;
    iconCode: number;
    price: number;
    highPrice: number;
    lowPrice: number;
    prevPrice: number;
    explorer: string;
  };
}

function Crypto({ crypto }: Props) {
  const colorClassName = crypto.prevPrice
    ? crypto.price > crypto.prevPrice
      ? " text-lime-300"
      : "text-rose-300"
    : "text-gray-300";

  return (
    <div className="max-w p-6 bg-black shadow-purple-400 hover:shadow-slate-200 hover:text-lime-400 border-gray-100 rounded-lg shadow-lg">
      <Image
        className="w-10 h-10 mb-2 rounded-full"
        src={`https://s2.coinmarketcap.com/static/img/coins/128x128/${crypto.iconCode}.png`}
        alt="Crypto Icon"
        width={128}
        height={128}
      />
      <h5 className="mb-1 text-2xl font-semibold tracking-tight">
        {crypto.name}
      </h5>

      {crypto.price ? (
        <>
          <span className={colorClassName} title={`${crypto.price}`}>
            {formatPrice(crypto.price)}
          </span>

          <div className="mt-4">
            <Status label="24h High" value={formatPrice(crypto.highPrice)} />
            <Status label="24h Low" value={formatPrice(crypto.lowPrice)} />
            <Status label="Market" value={crypto.symbol} />
          </div>
        </>
      ) : (
        <Loader />
      )}

      <a
        className="inline-flex items-center text-teal-300 mt-6 hover:text-teal-100"
        href={crypto.explorer}
        target="_blank"
        rel="norefferer">
        Explorer
        <svg
          className="w5 h2 ml-2"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M11 3a1 1 0 100 2h2.586l-5.293 5.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V3h-6z"></path>
          <path d="M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-3a1 1 0 10-2 0v3H5V7h3a1 1 0 000-2H5z"></path>
        </svg>
      </a>
    </div>
  );
}

export default memo(Crypto);