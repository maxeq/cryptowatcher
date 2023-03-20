import type { NextApiRequest, NextApiResponse } from 'next';
import { MongoClient, ObjectId } from 'mongodb';
import bcrypt from 'bcryptjs';
import { User as UserType } from '../../../types/user/user';
import { RegistrationData } from '../../../types/user/registration';
import { findUserByEmail } from './userValidation';

// Your MongoDB-related functions here
export type User = UserType;

if (!process.env.MONGODB_URI) {
  throw new Error('Invalid MONGODB_URI');
}

const uri = process.env.MONGODB_URI;
const options = {};
const client = new MongoClient(uri, options);

export async function createUser(
  registrationData: RegistrationData
): Promise<User> {
  await client.connect();
  const db = client.db();

  // Check if the email already exists
  const existingUser = await findUserByEmail(registrationData.email);
  if (existingUser) {
    throw new Error('Email already in use');
  }

  // Hash the password
  const hashedPassword = await bcrypt.hash(registrationData.password, 12);

  // Create the new user
  const newUser: User = {
    _id: new ObjectId(),
    email: registrationData.email,
    password: hashedPassword,
  };

  // Insert the new user into the database
  await db.collection<User>('users').insertOne(newUser);

  return newUser;
}
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const method = req.method;

  switch (method) {
    case 'POST':
      const registrationData: RegistrationData = req.body;

      // Validate the registration data (e.g., check if passwords match, email format, etc.)
      // You can add your own validation logic here

      try {
        const existingUser = await findUserByEmail(registrationData.email);
        if (existingUser) {
          res.status(400).json({ error: 'Email already in use' });
        } else {
          const newUser = await createUser(registrationData);
          res
            .status(200)
            .json({ user: newUser, message: 'User created successfully' });
        }
      } catch (error) {
        res.status(400).json({ error: (error as Error).message });
      }
      break;

    default:
      res.status(405).json({ error: 'Method not allowed' });
  }
}
