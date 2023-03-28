import { MongoClient } from 'mongodb';
import { NextApiRequest, NextApiResponse } from 'next';
import { CoinData } from '../../../types/coins/coindata';
import clientPromise from '../../../lib/mongodb';
import Redis from 'ioredis';

const redis = new Redis(process.env.REDIS_URL as string);

const cacheAllPages = async (pageSize: number): Promise<void> => {
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

    const totalPages = Math.ceil(allData.length / pageSize);

    for (let page = 1; page <= totalPages; page++) {
        const skip = (page - 1) * pageSize;
        const pageData = allData.slice(skip, skip + pageSize);
        const cacheKey = `data:${page}:${pageSize}`;

        // Cache the page data in Redis for 5 minutes (300 seconds)
        await redis.set(cacheKey, JSON.stringify(pageData), 'EX', 5 * 60);
    }
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
    const cacheKey = `data:${page}:${pageSize}`;
    const cacheData = await redis.get(cacheKey);

    if (cacheData) {
        const data = JSON.parse(cacheData);
        return sortData(data, sortKey, sortDirection);
    }

    // If the requested data is not in Redis, cache all pages
    await cacheAllPages(pageSize);

    const newData = await redis.get(cacheKey);

    return newData ? sortData(JSON.parse(newData), sortKey, sortDirection) : [];
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

    res.status(200).json({ getdata: data });
};

const fetchAndCacheDataEveryFiveMinutes = async () => {
    const pageSize = 10;

    await cacheAllPages(pageSize);
    setTimeout(fetchAndCacheDataEveryFiveMinutes, 4.5 * 60 * 1000); // 4.5 minutes in milliseconds
};

fetchAndCacheDataEveryFiveMinutes();

export default handler;