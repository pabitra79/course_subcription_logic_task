// src/routes/authRoutes.ts
import { Router } from 'express';
import { AuthController } from '../controller/authController';

const router = Router();

router.get('/signup', AuthController.renderSignup);
router.post('/signup', AuthController.signup);
router.get('/login', AuthController.renderLogin);
router.post('/login', AuthController.login);
router.get('/logout', AuthController.logout);

export default router;

