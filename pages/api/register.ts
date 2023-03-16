import type { NextApiRequest, NextApiResponse } from 'next';
import { RegistrationData } from '../../types/registration';
import { registerUser } from '../../lib/user';
import clientPromise from '@/lib/mongodb';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    const registrationData: RegistrationData = req.body;

    // Validate the registration data (e.g., check if passwords match, email format, etc.)
    // You can add your own validation logic here

    try {
      const mongoClient = await clientPromise;
      const newUser = await registerUser(registrationData);
      res.status(200).json({ user: newUser, message: 'User created successfully' });
    } catch (error) {
      res.status(400).json({ error: (error as Error).message });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
