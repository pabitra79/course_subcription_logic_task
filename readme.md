🎓 Mini Course Subscription Application
A full-stack web application built with Node.js, Express, TypeScript, MongoDB, JWT authentication, and EJS templating. Users can browse courses, subscribe based on pricing (free or paid), and apply promo codes for discounts.

Features
Authentication System: JWT-based signup/login with secure password hashing
Course Browsing: View all available courses with images, descriptions, and pricing
Course Detail Page: Detailed information about each course
Subscription Logic:
Free courses: Instant enrollment
Paid courses: Promo code support with validation
My Courses Page: View all enrolled courses with subscription details
Promo Code: BFSALE25 provides 50% discount on paid courses
Mock Payment: No real payment integration (mock-only)
Protected Routes: JWT middleware for authentication
Tech Stack
Backend: Node.js + Express + TypeScript
Database: MongoDB (with Mongoose ODM)
Authentication: JWT (JSON Web Tokens)
View Engine: EJS (Embedded JavaScript Templates)
Password Security: Bcrypt.js
Architecture: MVC Pattern
📁 Project Structure
course-subscription-app/
├── src/
│ ├── config/
│ │ ├── database.ts # MongoDB connection
│ │ └── jwt.config.ts # JWT configuration
│ ├── interfaces/
│ │ ├── IUser.ts
│ │ ├── ICourse.ts
│ │ ├── ISubscription.ts
│ │ └── IAuthRequest.ts
│ ├── models/
│ │ ├── User.ts # User schema & model
│ │ ├── Course.ts # Course schema & model
│ │ └── Subscription.ts # Subscription schema & model
│ ├── services/
│ │ ├── authService.ts # Authentication business logic
│ │ ├── courseService.ts # Course management logic
│ │ └── subscriptionService.ts # Subscription logic
│ ├── controllers/
│ │ ├── authController.ts # Auth request handlers
│ │ ├── courseController.ts # Course request handlers
│ │ └── subscriptionController.ts
│ ├── middleware/
│ │ └── authMiddleware.ts # JWT verification middleware
│ ├── routes/
│ │ ├── authRoutes.ts
│ │ ├── courseRoutes.ts
│ │ └── subscriptionRoutes.ts
│ └── app.ts # Main application file
├── views/
│ ├── auth/
│ │ ├── login.ejs
│ │ └── signup.ejs
│ ├── courses/
│ │ ├── home.ejs
│ │ └── detail.ejs
│ ├── my-courses.ejs
│ └── error.ejs
├── .env # Environment variables
├── package.json
├── tsconfig.json
└── README.md
Setup Instructions
Prerequisites
Node.js (v16 or higher)
MongoDB (local or MongoDB Atlas)
npm or yarn
Installation
Clone or create the project directory
bash
mkdir course-subscription-app
cd course-subscription-app
Initialize the project and install dependencies
bash
npm init -y
npm install express mongoose jsonwebtoken bcryptjs ejs dotenv cors cookie-parser
npm install -D typescript @types/express @types/node @types/jsonwebtoken @types/bcryptjs ts-node nodemon @types/cookie-parser
Initialize TypeScript
bash
npx tsc --init
Copy the tsconfig.json content from the artifacts above.

Create the folder structure
bash
mkdir -p src/{config,interfaces,models,services,controllers,middleware,routes}
mkdir -p views/{auth,courses}
Create all source files
Copy all the code from the artifacts above into their respective files.

Create .env file
env
PORT=3000
MONGODB_URI=mongodb://localhost:27017/course-subscription
JWT_SECRET=your_super_secret_key_change_this_in_production
JWT_EXPIRES_IN=7d
NODE_ENV=development
Update package.json scripts
json
{
"scripts": {
"dev": "nodemon src/app.ts",
"build": "tsc",
"start": "node dist/app.js"
}
}
Create nodemon.json (optional but recommended)
json
{
"watch": ["src"],
"ext": "ts,ejs",
"exec": "ts-node src/app.ts"
}
Running the Application
Start MongoDB (if running locally)
bash
mongod
Run in development mode
bash
npm run dev
Build for production
bash
npm run build
npm start
The application will start on http://localhost:3000

👤 Dummy User Credentials
The application automatically creates 3 dummy users on startup:

Email: user1@test.com |......
Email: user2@test.com | ...........
Email: user3@test.com | Password:...........
🎟️ Promo Code
Use promo code BFSALE25 to get 50% discount on any paid course!

API Endpoints
Authentication
GET /auth/signup - Render signup page
POST /auth/signup - Register new user
GET /auth/login - Render login page
POST /auth/login - Login user
GET /auth/logout - Logout user
Courses
GET /courses - List all courses (protected)
GET /courses/:id - Course detail page (protected)
Subscriptions
POST /api/subscriptions/subscribe - Subscribe to a course (protected)
GET /my-courses - View enrolled courses (protected)
Database Schema
Users Collection
typescript
{
\_id: ObjectId,
name: string,
email: string (unique),
password: string (hashed),
createdAt: Date
}
Courses Collection
typescript
{
\_id: ObjectId,
title: string,
description: string,
price: number,
image: string,
createdAt: Date
}
Subscriptions Collection
typescript
{
\_id: ObjectId,
userId: ObjectId (ref: User),
courseId: ObjectId (ref: Course),
pricePaid: number,
subscribedAt: Date
}
Authentication Flow
User signs up or logs in
Server generates JWT token with user ID and email
Token is stored in HTTP-only cookie
Protected routes verify JWT using middleware
User info is attached to request object for authorized routes
Key Implementation Details
JWT Middleware
Checks for token in cookies or Authorization header
Verifies token signature
Attaches user data to request object
Redirects to login if unauthorized
Subscription Logic
Free courses: Instant enrollment without promo code
Paid courses:
Optional promo code validation
Mock payment processing
Prevents duplicate subscriptions
Security Features
Passwords hashed with bcrypt (12 salt rounds)
JWT tokens for stateless authentication
Protected routes middleware
Input validation
Screenshots
The application includes the following pages:

Login Page - User authentication
Signup Page - New user registration
Courses Home - Browse all available courses
Course Detail - Detailed course information with subscription
My Courses - User's enrolled courses
Styling
The application uses inline CSS with:

Gradient backgrounds
Card-based layouts
Responsive design
Hover effects
Clean, modern UI
Future Enhancements
Add real payment gateway integration (Stripe/PayPal)
Implement course progress tracking
Add course reviews and ratings
Create admin panel for course management
Add email verification
Implement password reset functionality
Add course categories and filtering
Create user profile page
Add course search functionality
Implement pagination for courses
Notes
This is a mock application - no real payments are processed
Promo code validation happens on the backend
All routes except auth are protected with JWT middleware
Mock courses are automatically seeded on application startup
Images are fetched from Unsplash for demonstration
Troubleshooting
MongoDB Connection Error
Ensure MongoDB is running
Check MONGODB_URI in .env file
Verify database permissions
JWT Token Issues
Clear browser cookies
Check JWT_SECRET in .env
Verify token expiration time
Port Already in Use
Change PORT in .env file
Kill process using: npx kill-port 3000
License
This project is created for internship demonstration purposes.

Contributing
This is an internship project. For any issues or suggestions, please create an issue in the repository.

Built with using Node.js, Express, TypeScript, MongoDB, and EJS

