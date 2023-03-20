import { NextApiRequest, NextApiResponse } from 'next';
import { connectToDatabase } from '../../../lib/db';

export default async function getComments(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'GET') {
    try {
      const { db } = await connectToDatabase();
      const comments = await db.collection('comments').find({}).toArray();
      return res.status(200).json(comments);
    } catch (error) {
      return res
        .status(500)
        .json({ message: 'Error fetching comments', error });
    }
  } else {
    res.setHeader('Allow', 'GET');
    res.status(405).end('Method Not Allowed');
  }
}
