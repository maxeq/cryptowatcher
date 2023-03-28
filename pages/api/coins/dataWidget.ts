import clientPromise from '../../../lib/mongodb';
import { NextApiRequest, NextApiResponse } from 'next/types';
import { CoinData } from '../../../types/coins/coindata';

const getData = async (
    param: string,
    value: string,
    order: 'asc' | 'desc',
    limit: number
): Promise<CoinData[]> => {
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

    return JSON.parse(JSON.stringify(data));
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
    res.status(200).json({ getdata: data });
};


export default handler;