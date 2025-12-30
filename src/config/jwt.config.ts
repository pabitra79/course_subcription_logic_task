import { SignOptions } from "jsonwebtoken";

export const jwtConfig = {
  secret: process.env.JWT_SECRET || 'your_super_secret_key_change_in_production',
  expiresIn: '7d' as SignOptions['expiresIn'],
  cookieOptions: {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
  }
};