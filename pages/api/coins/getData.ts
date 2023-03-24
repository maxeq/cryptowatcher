import { MongoClient } from 'mongodb';
import { NextApiRequest, NextApiResponse } from 'next';
import { CoinData } from '../../../types/coins/coindata';
import clientPromise from '../../../lib/mongodb';

const getData = async (
  page: number,
  pageSize: number,
  sortKey: string,
  sortDirection: string
): Promise<CoinData[]> => {
  const mongoClient: MongoClient = await clientPromise;

  const skip = (page - 1) * pageSize;

  // Set the sort direction
  const direction = sortDirection === 'asc' ? 1 : -1;

  // Create a dynamic sort object
  const sortObj: Record<string, number> = {};
  sortObj[sortKey] = direction;

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
        $sort: sortObj,
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

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<{ getdata: CoinData[] }>
) => {
  const { page = 1, pageSize = 10, sortKey = 'market_cap_rank', sortDirection = 'asc' } = req.query;

  const data = await getData(
    parseInt(page as string),
    parseInt(pageSize as string),
    sortKey as string,
    sortDirection as string
  );

  res.status(200).json({ getdata: data });
};

export default handler;
