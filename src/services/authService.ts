// src/services/authService.ts
import jwt from 'jsonwebtoken';
import { User } from '../models/User';
import { IUser } from '../interfaces/IUser';
import { jwtConfig } from '../config/jwt.config';

export class AuthService {
  static generateToken(userId: string, email: string): string {
    return jwt.sign(
      { id: userId, email }, 
      jwtConfig.secret as jwt.Secret, 
      {
        expiresIn: jwtConfig.expiresIn
      }
    );
  }

  static async signup(
    name: string,
    email: string,
    password: string
  ): Promise<{ user: IUser; token: string }> {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      throw new Error('Email already registered');
    }

    const user = await User.create({ name, email, password });
    const token = this.generateToken(user._id.toString(), user.email);

    return { user, token };
  }

  static async login(
    email: string,
    password: string
  ): Promise<{ user: IUser; token: string }> {
    const user = await User.findOne({ email });
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