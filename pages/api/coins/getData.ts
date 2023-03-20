import clientPromise from '../../../lib/mongodb';
import { NextApiRequest, NextApiResponse } from 'next/types';
import { CoinData } from '../../../types/coins/coindata';

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
