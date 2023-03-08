import React from "react";

import Crypto from "./Crypto";
import Crypto_table2 from "./Crypto_table2";
import { NextPage, GetStaticProps, InferGetStaticPropsType } from 'next';
import { ObjectId } from 'mongodb';
import { getData } from '../pages/api/crypto/getData';

interface TickerProps {
  pageName: string;
}

export type coinData = {
  index: number;
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

export type Customer = {
  _id: ObjectId;
  symbol: string;
  current_price: number;
  array_current_price: number[];
};

export const getStaticProps: GetStaticProps = async (context) => {
  const data = await fetch('api/crypto/getData');
  setInterval(async () => {
    const data = await getData();
    console.log(data);
  }, 1000);

  return {
      props: {
          getdata: data,
      },
      revalidate: 60,
  };
};

const Getdata: NextPage = ({ getdata }: InferGetStaticPropsType<typeof getStaticProps>) => {
  const index = 0;
  return (
        <div className="relative overflow-x-auto">
          <table className={`table mx-auto`}>
            <thead>
              <tr className={`table-header`}>
                <th className="table__start sticky z-0 backdrop-opacity-2 max-sm:bg-gray-800">#</th>
                <th className="table__start sticky z-0 backdrop-opacity-0 max-sm:bg-gray-800">Cryptocurrency</th>
                <th className="table__end">Price (USD)</th>
                <th className="table__end">1h %</th>
                <th className="table__end">24h %</th>
                <th className="table__end">7d %</th>
                <th className="table__end">Market Cap</th>
                <th className="table__end">Volume (24h)</th>
                <th className="table__end">Circulating Supply</th>
                <th className="table__end">Live data</th>
              </tr>
            </thead>
            <tbody>
              {getdata.map((crypto: coinData, index: number) => (
                <Crypto_table2 key={crypto.id} index={index} crypto={crypto} />
              ))}
            </tbody>
          </table>
        </div>
  );
}

export default Getdata;