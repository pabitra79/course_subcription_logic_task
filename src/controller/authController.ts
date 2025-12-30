import { Request, Response } from 'express';
import { AuthService } from '../services/authService';
import { jwtConfig } from '../config/jwt.config';

export class AuthController {
  static renderSignup(req: Request, res: Response): void {
    res.render('auth/signup', { error: null });
  }

  static renderLogin(req: Request, res: Response): void {
    const error = req.query.error as string;
    res.render('auth/login', { error });
  }

  static async signup(req: Request, res: Response): Promise<void> {
    try {
      const { name, email, password } = req.body;

      if (!email || !password) {
        res.render('auth/signup', { error: 'Email and password are required' });
        return;
      }

      const { user, token } = await AuthService.signup(name, email, password);

      res.cookie('token', token, jwtConfig.cookieOptions);
      res.redirect('/courses');
    } catch (error: any) {
      res.render('auth/signup', { error: error.message });
    }
  }

  static async login(req: Request, res: Response): Promise<void> {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        res.render('auth/login', { error: 'Email and password are required' });
        return;
      }

      const { user, token } = await AuthService.login(email, password);

      res.cookie('token', token, jwtConfig.cookieOptions);
      res.redirect('/courses');
    } catch (error: any) {
      res.render('auth/login', { error: error.message });
    }
  }

  static logout(req: Request, res: Response): void {
    res.clearCookie('token');
    res.redirect('/auth/login');
  }
}