import type { NextApiRequest, NextApiResponse } from 'next';
import clientPromise from '../../../lib/mongodb';
import { ObjectId } from 'mongodb';

export type Customer = {
    _id: ObjectId;
    current_price: number;
    name: string;
    dbDateAdded: Date;
};

export const getCustomers = async () => {
    const mongoClient = await clientPromise;

    const data = await mongoClient
        .db()
        .collection('coins')
        .aggregate([
            {
                $project: {
                    name: "$name",
                    image: "$image"
                }
            }
        ])
        .toArray();


    return JSON.parse(JSON.stringify(data));
};

const handler = async (req: NextApiRequest, res: NextApiResponse<{ customers: Customer[] }>) => {
    const data = await getCustomers();
    res.status(200).json({ customers: data });
};

export default handler;
