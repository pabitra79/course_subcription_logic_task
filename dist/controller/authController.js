"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const authService_1 = require("../services/authService");
const jwt_config_1 = require("../config/jwt.config");
class AuthController {
    static renderSignup(req, res) {
        res.render('auth/signup', { error: null });
    }
    static renderLogin(req, res) {
        const error = req.query.error;
        res.render('auth/login', { error });
    }
    static async signup(req, res) {
        try {
            const { name, email, password } = req.body;
            if (!email || !password) {
                res.render('auth/signup', { error: 'Email and password are required' });
                return;
            }
            const { user, token } = await authService_1.AuthService.signup(name, email, password);
            res.cookie('token', token, jwt_config_1.jwtConfig.cookieOptions);
            res.redirect('/courses');
        }
        catch (error) {
            res.render('auth/signup', { error: error.message });
        }
    }
    static async login(req, res) {
        try {
            const { email, password } = req.body;
            if (!email || !password) {
                res.render('auth/login', { error: 'Email and password are required' });
                return;
            }
            const { user, token } = await authService_1.AuthService.login(email, password);
            res.cookie('token', token, jwt_config_1.jwtConfig.cookieOptions);
            res.redirect('/courses');
        }
        catch (error) {
            res.render('auth/login', { error: error.message });
        }
    }
    static logout(req, res) {
        res.clearCookie('token');
        res.redirect('/auth/login');
    }
}
exports.AuthController = AuthController;
