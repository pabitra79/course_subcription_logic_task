"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const dotenv_1 = __importDefault(require("dotenv"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const database_1 = require("./config/database");
const courseService_1 = require("./services/courseService");
const authMiddleware_1 = require("./middleware/authMiddleware");
const subscriptionController_1 = require("./controller/subscriptionController");
// Import routes
const authRoutes_1 = __importDefault(require("./routes/authRoutes"));
const courseRoutes_1 = __importDefault(require("./routes/courseRoutes"));
const subscriptionRoutes_1 = __importDefault(require("./routes/subscriptionRoutes"));
// Load environment variables
dotenv_1.default.config();
const app = (0, express_1.default)();
const PORT = process.env.PORT || 3000;
// Middleware
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use((0, cookie_parser_1.default)());
app.use(express_1.default.static(path_1.default.join(__dirname, '../public')));
// View engine setup
app.set('view engine', 'ejs');
// FIX: Set views path correctly for both dev and production
// In development: __dirname is 'src', so we go to 'src/views'
// In production: __dirname is 'dist', so we go to 'dist/views' 
app.set('views', path_1.default.join(__dirname, 'views'));
console.log('📁 __dirname:', __dirname);
console.log('📁 Views path:', path_1.default.join(__dirname, 'views'));
// Routes
app.get('/', (req, res) => {
    res.redirect('/auth/login');
});
app.use('/auth', authRoutes_1.default);
app.use('/courses', courseRoutes_1.default);
app.use('/api/subscriptions', subscriptionRoutes_1.default);
app.get('/my-courses', authMiddleware_1.protect, subscriptionController_1.SubscriptionController.getMyCourses);
// 404 handler
app.use((req, res) => {
    res.status(404).render('error', { message: 'Page not found' });
});
// Initialize database and start server
const startServer = async () => {
    try {
        await (0, database_1.connectDatabase)();
        await courseService_1.CourseService.initializeMockCourses();
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
    }
    catch (error) {
        console.error('Failed to start server:', error);
        process.exit(1);
    }
};
// Create dummy users
async function createDummyUsers() {
    const { User } = await Promise.resolve().then(() => __importStar(require('./models/User')));
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
    console.log('✅ Dummy users initialized');
}
startServer();
//# sourceMappingURL=app.js.map