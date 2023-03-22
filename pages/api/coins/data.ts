import clientPromise from '../../../lib/mongodb';
import { NextApiRequest, NextApiResponse } from 'next/types';
import { CoinData } from '../../../types/coins/coindata';

const getData = async (param: string, value: string): Promise<CoinData[]> => {
    const mongoClient = await clientPromise;

    const query = value ? { [param]: value } : {};

    const data = await mongoClient
        .db('myFirstDatabase')
        .collection('coins')
        .find(query)
        .sort({ dbDateAdded: -1 })
        .limit(3)
        .toArray();

    return JSON.parse(JSON.stringify(data));
};


const handler = async (
    req: NextApiRequest,
    res: NextApiResponse<{ getdata: CoinData[] }>
) => {
    const { param } = req.query;
    const data = await getData(param as string, '');
    res.status(200).json({ getdata: data });
};

export default handler;
