import type { NextApiRequest, NextApiResponse } from 'next'
import dbSaveData from '@/database/dbSaveData'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    // Call dbSaveData to save data to the database
    await dbSaveData(req, res);

    // Return a success response
    res.status(200).json({ success: true });
  } catch (error) {
    // Handle any errors that occur
    console.error(error);
    res.status(500).json({ error: 'An error occurred while saving data to the database' });
  }
}
