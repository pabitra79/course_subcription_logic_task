"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
// src/services/authService.ts
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const User_1 = require("../models/User");
const jwt_config_1 = require("../config/jwt.config");
class AuthService {
    static generateToken(userId, email) {
        return jsonwebtoken_1.default.sign({ id: userId, email }, jwt_config_1.jwtConfig.secret, {
            expiresIn: jwt_config_1.jwtConfig.expiresIn
        });
    }
    static async signup(name, email, password) {
        const existingUser = await User_1.User.findOne({ email });
        if (existingUser) {
            throw new Error('Email already registered');
        }
        const user = await User_1.User.create({ name, email, password });
        const token = this.generateToken(user._id.toString(), user.email);
        return { user, token };
    }
    static async login(email, password) {
        const user = await User_1.User.findOne({ email });
        if (!user) {
            throw new Error('Invalid credentials');
        }
        const isPasswordValid = await user.comparePassword(password);
        if (!isPasswordValid) {
            throw new Error('Invalid credentials');
        }
        const token = this.generateToken(user._id.toString(), user.email);
        return { user, token };
    }
}
exports.AuthService = AuthService;
