import express, { Request, Response } from 'express';
import path from 'path';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import { connectDatabase } from './config/database';
import { CourseService } from './services/courseService';
import { protect } from './middleware/authMiddleware';
import { SubscriptionController } from './controller/subscriptionController';

// Import routes
import authRoutes from './routes/authRoutes';
import courseRoutes from './routes/courseRoutes';
import subscriptionRoutes from './routes/subscriptionRoutes';

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '../public')));

// View engine setup
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));



// Routes
app.get('/', (req: Request, res: Response) => {
  res.redirect('/auth/login');
});

app.use('/auth', authRoutes);
app.use('/courses', courseRoutes);
app.use('/api/subscriptions', subscriptionRoutes);
app.get('/my-courses', protect, SubscriptionController.getMyCourses);

// 404 handler
app.use((req: Request, res: Response) => {
  res.status(404).render('error', { message: 'Page not found' });
});

// Initialize database and start server
const startServer = async () => {
  try {
    await connectDatabase();
    await CourseService.initializeMockCourses();
    
    // Create dummy users
    await createDummyUsers();

    app.listen(PORT, () => {
      console.log(`🚀 Server running on http://localhost:${PORT}`);
      console.log(`📚 Access the app at http://localhost:${PORT}/auth/login`);
      console.log(`\n👤 Dummy Users:`);
      console.log(`   Email: user1@test.com | Password: password123`);
      console.log(`   Email: user2@test.com | Password: password123`);
      console.log(`   Email: user3@test.com | Password: password123`);
      console.log(`\n🎟️  Promo Code: BFSALE25 (50% discount)`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
};

// Create dummy users
async function createDummyUsers() {
  const { User } = await import('./models/User');
  
  const dummyUsers = [
    { name: 'Test User 1', email: 'user1@test.com', password: 'password123' },
    { name: 'Test User 2', email: 'user2@test.com', password: 'password123' },
    { name: 'Test User 3', email: 'user3@test.com', password: 'password123' }
  ];

  for (const userData of dummyUsers) {
    const exists = await User.findOne({ email: userData.email });
    if (!exists) {
      await User.create(userData);
    }
  }
  
  console.log(' Dummy users initialized');
}

startServer();