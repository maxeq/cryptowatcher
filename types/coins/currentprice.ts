import { ObjectId } from 'mongodb';

export type CurrentPrice = {
  _id: ObjectId;
  current_price: number;
  name: string;
  dbDateAdded: Date;
};
