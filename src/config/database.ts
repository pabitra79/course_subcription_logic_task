import mongoose from 'mongoose';

export const connectDatabase = async (): Promise<void> => {
  try {
    const mongoUri = process.env.MONGODB_URI || 'mongodb://lomongodb+srv://barikpabitra101:R2YgmYUCCCu4v5Bh@cluster0.dafdba1.mongodb.net/Course_subscriptioncalhost:27017/course-';
    
    await mongoose.connect(mongoUri);
    
    console.log(' MongoDB Connected Successfully');
  } catch (error) {
    console.error(' MongoDB Connection Error:', error);
    process.exit(1);
  }
};

mongoose.connection.on('disconnected', () => {
  console.log('MongoDB Disconnected');
});

mongoose.connection.on('error', (err) => {
  console.error('MongoDB Error:', err);
});