// src/controllers/subscriptionController.ts
import { Response } from 'express';
import { SubscriptionService } from '../services/subscriptionService';
import { IAuthRequest } from '../interfaces/IAuthRequest';

export class SubscriptionController {
  static async subscribe(req: IAuthRequest, res: Response): Promise<void> {
    try {
      const { courseId, promoCode } = req.body;
      const userId = req.user!.id;

      await SubscriptionService.subscribe(userId, courseId, promoCode);

      res.json({ success: true, message: 'Subscription successful!' });
    } catch (error: any) {
      res.status(400).json({ success: false, message: error.message });
    }
  }

  static async getMyCourses(req: IAuthRequest, res: Response): Promise<void> {
    try {
      const userId = req.user!.id;
      const subscriptions = await SubscriptionService.getUserSubscriptions(userId);

      res.render('my-courses', { 
        subscriptions,
        user: req.user 
      });
    } catch (error: any) {
      res.status(500).render('error', { message: error.message });
    }
  }
}