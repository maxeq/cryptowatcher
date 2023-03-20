import clientPromise from '../../../lib/mongodb';
import { NextApiRequest, NextApiResponse } from 'next/types';
import { CoinData } from '../../../types/coins/coindata';

const getData = async (id: string): Promise<CoinData> => {
  const mongoClient = await clientPromise;

  const data = await mongoClient
    .db('myFirstDatabase')
    .collection('coins')
    .findOne({ id }, { sort: { dbDateAdded: -1 } });

  return JSON.parse(JSON.stringify(data));
};

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<{ getdata: CoinData }>
) => {
  const { id } = req.query;
  const data = await getData(id as string);
  res.status(200).json({ getdata: data });
};

export default handler;
