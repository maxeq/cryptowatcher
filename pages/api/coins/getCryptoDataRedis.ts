import clientPromise from '../../../lib/mongodb';
import { NextApiRequest, NextApiResponse } from 'next/types';
import { CoinData } from '../../../types/coins/coindata';
import Redis from 'ioredis';

const fetchAndCacheData = async (id: string): Promise<void> => {
  const redis = new Redis(process.env.REDIS_URL as string);

  const mongoClient = await clientPromise;

  const data = await mongoClient
    .db('myFirstDatabase')
    .collection('coins')
    .findOne({ id }, { sort: { dbDateAdded: -1 } });

  const result = JSON.parse(JSON.stringify(data));
  const cacheKey = `coinData:${id}`;
  await redis.set(cacheKey, JSON.stringify(result), 'EX', 5 * 60); // Cache for 5 minutes
  redis.disconnect();
};

const getData = async (id: string): Promise<CoinData> => {
  const redis = new Redis(process.env.REDIS_URL as string);
  const cacheKey = `coinData:${id}`;
  const cacheData = await redis.get(cacheKey);

  if (cacheData) {
    redis.disconnect();
    return JSON.parse(cacheData);
  }

  await fetchAndCacheData(id);
  const newData = await redis.get(cacheKey);
  redis.disconnect();
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
