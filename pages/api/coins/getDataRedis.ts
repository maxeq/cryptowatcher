import { MongoClient } from 'mongodb';
import { NextApiRequest, NextApiResponse } from 'next';
import { CoinData } from '../../../types/coins/coindata';
import clientPromise from '../../../lib/mongodb';
import Redis from 'ioredis';

const redis = new Redis(process.env.REDIS_URL as string);

const cacheAllPages = async (pageSize: number, sortKey: string, sortDirection: string): Promise<void> => {
    const mongoClient: MongoClient = await clientPromise;

    const direction = sortDirection === 'asc' ? 1 : -1;
    const sortObj: Record<string, number> = {};
    sortObj[sortKey] = direction;

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
            {
                $sort: sortObj,
            },
        ])
        .toArray();

    const totalPages = Math.ceil(allData.length / pageSize);

    for (let page = 1; page <= totalPages; page++) {
        const skip = (page - 1) * pageSize;
        const pageData = allData.slice(skip, skip + pageSize);
        const cacheKey = `data:${page}:${pageSize}:${sortKey}:${sortDirection}`;

        // Cache the page data in Redis for 5 minutes (300 seconds)
        await redis.set(cacheKey, JSON.stringify(pageData), 'EX', 5 * 60);
    }
};

const getData = async (
    page: number,
    pageSize: number,
    sortKey: string,
    sortDirection: string
): Promise<CoinData[]> => {
    const cacheKey = `data:${page}:${pageSize}:${sortKey}:${sortDirection}`;
    const cacheData = await redis.get(cacheKey);

    if (cacheData) {
        return JSON.parse(cacheData);
    }

    // If the requested data is not in Redis, cache all pages
    await cacheAllPages(pageSize, sortKey, sortDirection);

    const newData = await redis.get(cacheKey);

    return newData ? JSON.parse(newData) : [];
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

export default handler;