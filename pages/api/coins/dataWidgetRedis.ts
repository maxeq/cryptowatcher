import clientPromise from '../../../lib/mongodb';
import { NextApiRequest, NextApiResponse } from 'next/types';
import { CoinData } from '../../../types/coins/coindata';
import Redis from 'ioredis';

const fetchAndCacheData = async (
    param: string,
    value: string,
    order: 'asc' | 'desc',
    limit: number
): Promise<void> => {
    const redis = new Redis(process.env.REDIS_URL as string); // Create a new Redis instance here

    const mongoClient = await clientPromise;

    const query = value ? { [param]: value } : {};
    const sortOrder = order === 'asc' ? 1 : -1;
    const setLimit = limit ? limit : 3;

    const data = await mongoClient
        .db('myFirstDatabase')
        .collection('coins')
        .find(query)
        .limit(setLimit)
        .sort({ dbDateAdded: -1, [param]: sortOrder })
        .toArray();

    const result = JSON.parse(JSON.stringify(data));
    const cacheKey = `dataWidget:${param}:${value}:${order}:${limit}`;
    await redis.set(cacheKey, JSON.stringify(result), 'EX', 5 * 60); // Cache for 5 minutes
    redis.disconnect(); // Disconnect the Redis instance here
};

const getData = async (
    param: string,
    value: string,
    order: 'asc' | 'desc',
    limit: number
): Promise<CoinData[]> => {
    const redis = new Redis(process.env.REDIS_URL as string); // Create a new Redis instance here
    const cacheKey = `dataWidget:${param}:${value}:${order}:${limit}`;
    const cacheData = await redis.get(cacheKey);

    if (cacheData) {
        redis.disconnect(); // Disconnect the Redis instance here
        return JSON.parse(cacheData);
    }

    await fetchAndCacheData(param, value, order, limit);
    const newData = await redis.get(cacheKey);
    redis.disconnect(); // Disconnect the Redis instance here
    return newData ? JSON.parse(newData) : [];
};


const handler = async (
    req: NextApiRequest,
    res: NextApiResponse<{ getdata: CoinData[] }>
) => {
    const { param, value, order, limit } = req.query;

    let parsedLimit;
    if (typeof limit === 'string') {
        parsedLimit = parseInt(limit, 10);
        if (isNaN(parsedLimit)) {
            parsedLimit = undefined;
        }
    }

    const data = await getData(
        param as string,
        value as string,
        order as 'asc' | 'desc',
        parsedLimit as number
    );
    res.setHeader('Cache-Control', 'public, max-age=300, s-maxage=300, stale-while-revalidate=300');
    res.status(200).json({ getdata: data });
};

const paramCombinations: {
    param: string;
    order: 'asc' | 'desc';
    limit: number;
}[] = [
        {
            param: 'price_change_percentage_1h_in_currency',
            order: 'desc',
            limit: 3
        },
        {
            param: 'price_change_percentage_24h',
            order: 'asc',
            limit: 3
        },
        {
            param: 'market_cap_change_percentage_24h',
            order: 'desc',
            limit: 3
        },
    ];

const refreshCacheEveryFiveMinutes = () => {
    paramCombinations.forEach(async (combination) => {
        await fetchAndCacheData(combination.param, '', combination.order, combination.limit);
    });
};


refreshCacheEveryFiveMinutes();
setInterval(refreshCacheEveryFiveMinutes, 4.5 * 60 * 1000); // 4.5 minutes in milliseconds

export default handler;
