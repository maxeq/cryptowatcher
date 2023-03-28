import type { NextApiRequest, NextApiResponse } from 'next';
import clientPromise from '../../../lib/mongodb';
import { ArrayData } from '../../../types/coins/arraydata';
import Redis from 'ioredis';

const fetchAndCacheArrayData = async (): Promise<void> => {
  const redis = new Redis(process.env.REDIS_URL as string);

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

  const result = JSON.parse(JSON.stringify(data));
  const cacheKey = 'arrayData';
  await redis.set(cacheKey, JSON.stringify(result), 'EX', 5 * 60); // Cache for 5 minutes
  redis.disconnect();
};

export const getArrayData = async (): Promise<ArrayData[]> => {
  const redis = new Redis(process.env.REDIS_URL as string);
  const cacheKey = 'arrayData';
  const cacheData = await redis.get(cacheKey);

  if (cacheData) {
    redis.disconnect();
    return JSON.parse(cacheData);
  }

  await fetchAndCacheArrayData();
  const newData = await redis.get(cacheKey);
  redis.disconnect();
  return newData ? JSON.parse(newData) : [];
};

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<{ getarray: ArrayData[] }>
) => {
  const data = await getArrayData();
  res.setHeader('Cache-Control', 'public, max-age=300, s-maxage=300, stale-while-revalidate=300');
  res.status(200).json({ getarray: data });
};

const refreshCache = async () => {
  await fetchAndCacheArrayData();
};

refreshCache();
setInterval(refreshCache, 5 * 60 * 1000); // Refresh cache every 5 minutes

export default handler;
