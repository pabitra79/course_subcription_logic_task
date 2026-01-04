"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectDatabase = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const connectDatabase = async () => {
    try {
        const mongoUri = process.env.MONGODB_URI || 'mongodb://lomongodb+srv://barikpabitra101:R2YgmYUCCCu4v5Bh@cluster0.dafdba1.mongodb.net/Course_subscriptioncalhost:27017/course-';
        await mongoose_1.default.connect(mongoUri);
        console.log(' MongoDB Connected Successfully');
    }
    catch (error) {
        console.error(' MongoDB Connection Error:', error);
        process.exit(1);
    }
};
exports.connectDatabase = connectDatabase;
mongoose_1.default.connection.on('disconnected', () => {
    console.log('MongoDB Disconnected');
});
mongoose_1.default.connection.on('error', (err) => {
    console.error('MongoDB Error:', err);
});
//# sourceMappingURL=database.js.map