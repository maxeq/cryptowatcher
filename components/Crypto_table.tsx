import React, { memo } from "react";

import Loader from "./Loader";
import Status from "./Status";
import { formatPrice } from "@/utils";

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
        explorer: string;
    };
}

function Crypto_table({ crypto, index }: Props) {
    const colorClassName = crypto.prevPrice
    ? crypto.price > crypto.prevPrice
      ? " text-lime-300"
      : "text-rose-300"
    : "text-gray-300";

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
          <span className={colorClassName} title={`${crypto.price}`}>
            {formatPrice(crypto.price)}
          </span>
        </>
      ) : (
        <Loader />
      )}
      </td>
      <td className="table__end">2.34%</td>
      <td className="table__end">0.45%</td>
      <td className="table__end">5.67%</td>
      <td className="table__end">944,123,456,789</td>
      <td className="table__end">23,456,789</td>
      <td className="table__end">18,734,452 BTC</td>
      <td className="table__end">Graph image</td>
    </tr>
  );
}

export default memo(Crypto_table);