import React from "react";
import Crypto_table2 from "./Crypto_table2";
import { NextPage, GetStaticProps, InferGetStaticPropsType } from 'next';
import { ObjectId } from 'mongodb';
import { getData } from '../pages/api/crypto/getData';

interface CryptoProps {
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

export type Customer = {
  _id: ObjectId;
  symbol: string;
  current_price: number;
  array_current_price: number[];
};

export const getStaticProps: GetStaticProps = async (context) => {
  const getdata = await getData();
  return {
    props: {
        getdata: getdata,
    },
    revalidate: 60,
};
};

const Ticker2: NextPage = ({ getdata }: InferGetStaticPropsType<typeof getStaticProps>) => {
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
              {getdata.map((crypto: CryptoProps["crypto"], index: number) => (
                <Crypto_table2 key={crypto.id} index={index} crypto={crypto} />
              ))}
            </tbody>
          </table>
        </div>
  );
}

export default Ticker2;