import { ObjectId } from 'mongodb';

export type User = {
  _id: ObjectId;
  email: string;
  password: string;
  // Add any other fields for your User model
};
