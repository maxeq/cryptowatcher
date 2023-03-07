import type { NextApiRequest, NextApiResponse } from 'next';
import clientPromise from '../../../lib/mongodb';

export default async (req: NextApiRequest, res: NextApiResponse) => {

    const mongoClient = await clientPromise;

    const data = await mongoClient
    .db()
    .collection('coin')
    .find()
    .toArray();


    res.status(200).json(JSON.stringify(data));
};