import type { NextApiRequest, NextApiResponse } from 'next';
import clientPromise from '../../../lib/mongodb';
import { ArrayData } from '../../../types/coins/arraydata';
import Redis from 'ioredis';

const redis = new Redis(process.env.REDIS_URL as string);

const fetchAndCacheArrayData = async (): Promise<void> => {
  const mongoClient = await clientPromise;
  const latestDate = await mongoClient
    .db('myFirstDatabase')
    .collection('coins')
    .find()
    .sort({ dbDateAdded: -1 })
    .limit(1)
    .toArray();

  const latestDateValue = latestDate[0].dbDateAdded;
  const date24HoursAgo = new Date(latestDateValue.getTime() - 24 * 60 * 60 * 1000); // latest date minus 24 hours

  const data = await mongoClient
    .db('myFirstDatabase')
    .collection('coins')
    .aggregate([
      {
        $match: {
          dbDateAdded: {
            $gte: date24HoursAgo,
            $lte: latestDateValue,
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

  const result = JSON.parse(JSON.stringify(data)).map((item: ArrayData) => {
    return {
      ...item,
      array_current_price: item.array_current_price.reverse(),
    };
  });

  const cacheKey = 'arrayData';
  await redis.set(cacheKey, JSON.stringify(result), 'EX', 5 * 60); // Cache for 5 minutes
};

export const getArrayData = async (): Promise<ArrayData[]> => {
  const cacheKey = 'arrayData';
  const cacheData = await redis.get(cacheKey);

  if (cacheData) {
    return JSON.parse(cacheData);
  }

  await fetchAndCacheArrayData();
  const newData = await redis.get(cacheKey);
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

process.on('exit', () => {
  redis.disconnect();
});
