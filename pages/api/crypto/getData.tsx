import clientPromise from '../../../lib/mongodb';
import { ObjectId } from 'mongodb';
import { NextApiRequest, NextApiResponse } from 'next/types';

// http://localhost:3000/api/crypto/getData?page=4&pageSize=10

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

const getData = async (page: number, pageSize: number): Promise<CoinData[]> => {
  const mongoClient = await clientPromise;

  const skip = (page - 1) * pageSize;
  const data = await mongoClient
    .db('myFirstDatabase')
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
      {
        $sort: { market_cap_rank: 1 },
      },
      {
        $skip: skip,
      },
      {
        $limit: pageSize,
      },
    ])
    .toArray();

  return JSON.parse(JSON.stringify(data));
};

const handler = async (req: NextApiRequest, res: NextApiResponse<{ getdata: CoinData[] }>) => {
  const { page = 1, pageSize = 10 } = req.query;
  const data = await getData(parseInt(page as string), parseInt(pageSize as string));
  res.status(200).json({ getdata: data });
};

export default handler;
