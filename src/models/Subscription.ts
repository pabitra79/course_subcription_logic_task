import mongoose, { Schema } from 'mongoose';
import { ISubscription } from '../interfaces/ISubscription';

const subscriptionSchema = new Schema<ISubscription>({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  courseId: {
    type: Schema.Types.ObjectId,
    ref: 'Course',
    required: true
  },
  pricePaid: {
    type: Number,
    required: true
  },
  subscribedAt: {
    type: Date,
    default: Date.now
  }
});

// prevent duplicate subscription for same user & course
subscriptionSchema.index({ userId: 1, courseId: 1 }, { unique: true });

export const Subscription = mongoose.model<ISubscription>(
  'Subscription',
  subscriptionSchema
);
