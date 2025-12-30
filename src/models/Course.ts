import mongoose, { Schema } from 'mongoose';
import { ICourse } from '../interfaces/ICourse';

const courseSchema = new Schema<ICourse>({
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true,
    default: 0
  },
  image: {
    type: String
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

export const Course = mongoose.model<ICourse>('Course', courseSchema);
