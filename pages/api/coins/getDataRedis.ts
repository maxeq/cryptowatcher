import { MongoClient } from 'mongodb';
import { NextApiRequest, NextApiResponse } from 'next';
import { CoinData } from '../../../types/coins/coindata';
import clientPromise from '../../../lib/mongodb';
import Redis from 'ioredis';

const redis = new Redis(process.env.REDIS_URL as string);

const cacheAllData = async (): Promise<string> => {
    const mongoClient: MongoClient = await clientPromise;

    const allData = await mongoClient
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
        ])
        .toArray();

    await redis.set('allData', JSON.stringify(allData), 'EX', 5 * 60);
    return JSON.stringify(allData);
};

const sortData = (data: CoinData[], sortKey: string, sortDirection: string): CoinData[] => {
    return data.sort((a, b) => {
        const key = sortKey as keyof CoinData;
        const aValue = a[key];
        const bValue = b[key];
        if (typeof aValue === 'number' && typeof bValue === 'number') {
            return sortDirection === 'asc' ? aValue - bValue : bValue - aValue;
        } else if (typeof aValue === 'string' && typeof bValue === 'string') {
            return sortDirection === 'asc' ? aValue.localeCompare(bValue) : bValue.localeCompare(aValue);
        }
        return 0;
    });
};

const getData = async (
    page: number,
    pageSize: number,
    sortKey: string,
    sortDirection: string
): Promise<CoinData[]> => {
    let cacheData = await redis.get('allData');

    if (!cacheData) {
        // If the requested data is not in Redis, cache all data
        cacheData = await cacheAllData();
    }

    const allData = JSON.parse(cacheData || '[]');
    const sortedData = sortData(allData, sortKey, sortDirection);
    const start = (page - 1) * pageSize;
    const end = start + pageSize;

    return sortedData.slice(start, end);
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
    res.setHeader('Cache-Control', 'public, max-age=300, s-maxage=300, stale-while-revalidate=300');
    res.status(200).json({ getdata: data });
};

const fetchAndCacheDataEveryFiveMinutes = async () => {
    await cacheAllData();
};

fetchAndCacheDataEveryFiveMinutes();

setInterval(fetchAndCacheDataEveryFiveMinutes, 5 * 60 * 1000); // 5 minutes in milliseconds

export default handler;

// Handle application termination for closing Redis connection
process.on('SIGINT', () => {
    redis.disconnect();
    process.exit(0);
});

process.on('SIGTERM', () => {
    redis.disconnect();
    process.exit(0);
});
