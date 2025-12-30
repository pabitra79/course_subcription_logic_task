
// src/routes/subscriptionRoutes.ts
import { Router } from 'express';
import { SubscriptionController } from '../controller/subscriptionController';
import { protectAPI } from '../middleware/authMiddleware';

const router = Router();

router.post('/subscribe', protectAPI, SubscriptionController.subscribe);

export default router;