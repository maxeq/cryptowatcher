import type { NextApiRequest, NextApiResponse } from 'next';
import clientPromise from '../../../lib/mongodb';
import { CurrentPrice } from '@/types/coins/currentprice';

export const getPictures = async () => {
  const mongoClient = await clientPromise;

  const data = await mongoClient
    .db()
    .collection('coins')
    .aggregate([
      {
        $project: {
          name: '$name',
          image: '$image',
        },
      },
    ])
    .toArray();

  return JSON.parse(JSON.stringify(data));
};

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<{ customers: CurrentPrice[] }>
) => {
  const data = await getPictures();
  res.status(200).json({ customers: data });
};

export default handler;
