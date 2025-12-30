import { Document } from 'mongoose';

export interface ICourse extends Document {
  title: string;
  description: string;
  price: number;
  image?: string;
  createdAt: Date;
}
