import clientPromise from '../../../lib/mongodb';
import { NextApiRequest, NextApiResponse } from 'next/types';
import { CoinData } from '../../../types/coins/coindata';
import Redis from 'ioredis';

const redis = new Redis(process.env.REDIS_URL as string);

const fetchAndCacheData = async (id: string): Promise<void> => {
  const mongoClient = await clientPromise;

  const data = await mongoClient
    .db('myFirstDatabase')
    .collection('coins')
    .findOne({ id }, { sort: { dbDateAdded: -1 } });

  const result = JSON.parse(JSON.stringify(data));
  const cacheKey = `coinData:${id}`;
  await redis.set(cacheKey, JSON.stringify(result), 'EX', 5 * 60); // Cache for 5 minutes
};

const getData = async (id: string): Promise<CoinData> => {
  const cacheKey = `coinData:${id}`;
  const cacheData = await redis.get(cacheKey);

  if (cacheData) {
    return JSON.parse(cacheData);
  }

  await fetchAndCacheData(id);
  const newData = await redis.get(cacheKey);
  return newData ? JSON.parse(newData) : null;
};

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<{ getdata: CoinData }>
) => {
  const { id } = req.query;
  const data = await getData(id as string);
  res.setHeader('Cache-Control', 'public, max-age=300, s-maxage=300, stale-while-revalidate=300');
  res.status(200).json({ getdata: data });
};

const fetchCoinIds = async (): Promise<string[]> => {
  const mongoClient = await clientPromise;
  const coinDocs = await mongoClient
    .db('myFirstDatabase')
    .collection('coins')
    .find({}, { projection: { id: 1, _id: 0 } })
    .toArray();

  return coinDocs.map(doc => doc.id);
};

const refreshCache = async () => {
  const coinIds = await fetchCoinIds();
  for (const id of coinIds) {
    await fetchAndCacheData(id);
  }
};

refreshCache();
setInterval(refreshCache, 5 * 60 * 1000); // Refresh cache every 5 minutes

export default handler;

// Handle application termination for closing Redis connection
process.on('SIGINT', () => {
  console.log('Closing Redis connection...');
  redis.disconnect();
  process.exit();
});

process.on('SIGTERM', () => {
  console.log('Closing Redis connection...');
  redis.disconnect();
  process.exit();
});
