"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.protectAPI = exports.protect = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const jwt_config_1 = require("../config/jwt.config");
const protect = (req, res, next) => {
    try {
        // Get token from cookie or authorization header
        let token = req.cookies?.token;
        if (!token && req.headers.authorization?.startsWith('Bearer')) {
            token = req.headers.authorization.split(' ')[1];
        }
        if (!token) {
            res.status(401).redirect('/auth/login?error=Please login to access this page');
            return;
        }
        // Verify token with proper type casting
        const decoded = jsonwebtoken_1.default.verify(token, jwt_config_1.jwtConfig.secret);
        // Attach user to request
        req.user = {
            id: decoded.id,
            email: decoded.email
        };
        next();
    }
    catch (error) {
        res.status(401).redirect('/auth/login?error=Invalid or expired token');
    }
};
exports.protect = protect;
// API version without redirect
const protectAPI = (req, res, next) => {
    try {
        let token = req.cookies?.token;
        if (!token && req.headers.authorization?.startsWith('Bearer')) {
            token = req.headers.authorization.split(' ')[1];
        }
        if (!token) {
            res.status(401).json({ success: false, message: 'Not authorized' });
            return;
        }
        const decoded = jsonwebtoken_1.default.verify(token, jwt_config_1.jwtConfig.secret);
        req.user = { id: decoded.id, email: decoded.email };
        next();
    }
    catch (error) {
        res.status(401).json({ success: false, message: 'Invalid token' });
    }
};
exports.protectAPI = protectAPI;
//# sourceMappingURL=authMiddleware.js.map