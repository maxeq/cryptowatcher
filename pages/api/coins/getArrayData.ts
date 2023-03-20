import type { NextApiRequest, NextApiResponse } from 'next';
import clientPromise from '../../../lib/mongodb';
import { ArrayData } from '../../../types/coins/arraydata';

export const getArrayData = async () => {
  const mongoClient = await clientPromise;
  const date24HoursAgo = new Date(Date.now() - 24 * 60 * 60 * 1000); // current date minus 24 hours

  const data = await mongoClient
    .db('myFirstDatabase')
    .collection('coins')
    .aggregate([
      {
        $match: {
          dbDateAdded: {
            $gte: date24HoursAgo,
            $lte: new Date(),
          },
        },
      },
      {
        $group: {
          _id: '$id',
          array_current_price: { $push: '$current_price' },
          count: { $sum: 1 },
        },
      },
    ])
    .toArray();

  return JSON.parse(JSON.stringify(data));
};

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<{ getarray: ArrayData[] }>
) => {
  const data = await getArrayData();
  res.status(200).json({ getarray: data });
};

export default handler;
