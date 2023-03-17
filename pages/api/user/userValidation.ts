import { MongoClient, ObjectId } from 'mongodb';
import bcrypt from 'bcryptjs';
import { User as UserType } from '../../../types/user/user';

export type User = UserType;

if (!process.env.MONGODB_URI) {
    throw new Error('Invalid MONGODB_URI');
}

const uri = process.env.MONGODB_URI;
const options = {}
const client = new MongoClient(uri, options);

export async function findUserByEmail(email: string): Promise<User | null> {
    await client.connect();
    const db = client.db();

    // Find user by email
    const user = await db.collection<User>('users').findOne({ email });
    return user;
}

export async function validateUserPassword(password: string, hashedPassword: string): Promise<boolean> {
    return await bcrypt.compare(password, hashedPassword);
}

export async function findUserById(id: string): Promise<User | null> {
    await client.connect();
    const db = client.db();

    // Find user by id
    const user = await db.collection<User>('users').findOne({ _id: new ObjectId(id) });
    return user;
}
