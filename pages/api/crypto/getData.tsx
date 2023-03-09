import clientPromise from '../../../lib/mongodb';
import { ObjectId } from 'mongodb';
import { NextApiRequest, NextApiResponse } from 'next/types';

export type CoinData = {
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

export const getData = async (): Promise<CoinData[]> => {
  const mongoClient = await clientPromise;

  const data = await mongoClient
    .db()
    .collection('coins')
    .aggregate([
      {
        $group: {
          _id: '$name',
          latestData: { $last: '$$ROOT' },
        },
      },
      {
        $replaceRoot: { newRoot: '$latestData' },
      },
    ])
    .toArray();

  return JSON.parse(JSON.stringify(data));
};

const handler = async (req: NextApiRequest, res: NextApiResponse<{ getdata: CoinData[] }>) => {
  const data = await getData();
  res.status(200).json({ getdata: data });
};

export default handler;
