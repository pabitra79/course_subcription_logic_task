import { Document, Types } from 'mongoose';

export interface ISubscription extends Document {
  userId: Types.ObjectId;
  courseId: Types.ObjectId;
  pricePaid: number;
  subscribedAt: Date;
}
