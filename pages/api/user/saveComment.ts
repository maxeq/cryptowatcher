// api/saveComment.ts
import { NextApiRequest, NextApiResponse } from 'next';
import { connectToDatabase } from '../../../lib/db';

interface Comment {
  id: string;
  author: string;
  content: string;
  createdAt: Date;
  likes: number;
  likedBy: string[];
  page_id: any;
}

export default async function saveComment(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    const comment = req.body.comment as Comment;
    try {
      const { db } = await connectToDatabase();
      await db.collection('comments').insertOne(comment);
      return res.status(200).json({ message: 'Comment saved successfully' });
    } catch (error) {
      return res.status(500).json({ message: 'Error saving comment', error });
    }
  } else {
    res.setHeader('Allow', 'POST');
    res.status(405).end('Method Not Allowed');
  }
}
