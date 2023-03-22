import clientPromise from '../../../lib/mongodb';
import { NextApiRequest, NextApiResponse } from 'next/types';
import { CoinData } from '../../../types/coins/coindata';

const getDataForPast10Mins = async (): Promise<CoinData[]> => {
    const mongoClient = await clientPromise;
    const currentTime = new Date();
    const oneHour = new Date(currentTime.getTime() - 60 * 60 * 1000);

    const data = await mongoClient
        .db('myFirstDatabase')
        .collection('coins')
        .find({ dbDateAdded: { $gte: oneHour } })
        .toArray();

    return JSON.parse(JSON.stringify(data));
};

const handler = async (
    req: NextApiRequest,
    res: NextApiResponse<{ getdata: CoinData[] }>
) => {
    const data = await getDataForPast10Mins();
    res.status(200).json({ getdata: data });
};

export default handler;