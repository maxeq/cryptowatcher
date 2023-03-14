import type { NextApiRequest, NextApiResponse } from 'next';
import clientPromise from '../../../lib/mongodb';
import { ObjectId } from 'mongodb';

export type ArrayData = {
    _id: string;
    array_current_price: number[];
    count: number;
};

export const getArrayData = async () => {
  const mongoClient = await clientPromise;

  const data = await mongoClient
    .db('myFirstDatabase')
    .collection('coins')
    .aggregate([
      {
        $match: {
          dbDateAdded: {
            $gte: new Date('2023-03-07T00:53:33.634Z'),
            $lte: new Date('2023-03-08T23:53:33.634Z'),
          },
        },
      },
      {
        $group: {
          _id: "$id",
          array_current_price: { $push: "$current_price" },
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
