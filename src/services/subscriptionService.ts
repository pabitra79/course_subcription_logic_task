import { Subscription } from '../models/Subscription';
import { Course } from '../models/Course';
import { ISubscription } from '../interfaces/ISubscription';

export class SubscriptionService {
  static readonly VALID_PROMO_CODE = 'BFSALE25';
  static readonly PROMO_DISCOUNT = 0.5;

  static async subscribe(
    userId: string,
    courseId: string,
    promoCode?: string
  ): Promise<ISubscription> {
    const existing = await Subscription.findOne({ userId, courseId });
    if (existing) {
      throw new Error('Already subscribed');
    }

    const course = await Course.findById(courseId);
    if (!course) {
      throw new Error('Course not found');
    }

    let pricePaid = course.price;

    if (pricePaid === 0) {
      return Subscription.create({ userId, courseId, pricePaid: 0 });
    }

    if (promoCode) {
      if (promoCode.toUpperCase() !== this.VALID_PROMO_CODE) {
        throw new Error('Invalid promo code');
      }
      pricePaid = course.price * this.PROMO_DISCOUNT;
    }

    return Subscription.create({ userId, courseId, pricePaid });
  }

  static async getUserSubscriptions(userId: string) {
    return Subscription.find({ userId })
      .populate('courseId')
      .sort({ subscribedAt: -1 });
  }

  static async isUserSubscribed(
    userId: string,
    courseId: string
  ): Promise<boolean> {
    return !!(await Subscription.findOne({ userId, courseId }));
  }
}
