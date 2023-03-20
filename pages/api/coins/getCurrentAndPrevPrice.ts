import type { NextApiRequest, NextApiResponse } from 'next';
import clientPromise from '../../../lib/mongodb';
import { CurrentPrice } from '@/types/coins/currentprice';

export const getCurrentAndPrevPrice = async () => {
  const mongoClient = await clientPromise;

  const data = await mongoClient
    .db('myFirstDatabase')
    .collection('coins')
    .aggregate([
      {
        $sort: { dbDateAdded: -1 },
      },
      {
        $group: {
          name: '$name',
          current_price: { $first: '$current_price' },
          price_history: { $push: '$current_price' },
        },
      },
      {
        $addFields: {
          prev_price: {
            $arrayElemAt: ['$price_history', 1],
          },
        },
      },
    ])
    .toArray();
  console.log(data);
  return JSON.parse(JSON.stringify(data));
};

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<{ customers: CurrentPrice[] }>
) => {
  const data = await getCurrentAndPrevPrice();
  res.status(200).json({ customers: data });
};

export default handler;
