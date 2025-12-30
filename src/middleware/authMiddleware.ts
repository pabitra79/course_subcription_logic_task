import { Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { jwtConfig } from '../config/jwt.config';
import { IAuthRequest } from '../interfaces/IAuthRequest';

export const protect = (req: IAuthRequest, res: Response, next: NextFunction): void => {
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
    const decoded = jwt.verify(token, jwtConfig.secret as jwt.Secret) as { id: string; email: string };
    
    // Attach user to request
    req.user = {
      id: decoded.id,
      email: decoded.email
    };

    next();
  } catch (error) {
    res.status(401).redirect('/auth/login?error=Invalid or expired token');
  }
};

// API version without redirect
export const protectAPI = (req: IAuthRequest, res: Response, next: NextFunction): void => {
  try {
    let token = req.cookies?.token;
    
    if (!token && req.headers.authorization?.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
      res.status(401).json({ success: false, message: 'Not authorized' });
      return;
    }

    const decoded = jwt.verify(token, jwtConfig.secret as jwt.Secret) as { id: string; email: string };
    req.user = { id: decoded.id, email: decoded.email };

    next();
  } catch (error) {
    res.status(401).json({ success: false, message: 'Invalid token' });
  }
};