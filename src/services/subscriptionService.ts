import { Subscription } from "../models/Subscription";
import { Course } from "../models/Course";
import { ISubscription } from "../interfaces/ISubscription";

export class SubscriptionService {
  static readonly VALID_PROMO_CODE = "BFSALE25";
  static readonly PROMO_DISCOUNT = 0.5; // 50% discount

  static async subscribe(
    userId: string,
    courseId: string,
    promoCode?: string
  ): Promise<ISubscription> {
    console.log('=== Subscribe Request ===');
    console.log('User ID:', userId);
    console.log('Course ID:', courseId);
    console.log('Promo Code Received:', promoCode);
    console.log('Promo Code Type:', typeof promoCode);

    // Check if already subscribed
    const existing = await Subscription.findOne({
      userId,
      courseId,
    });

    if (existing) {
      throw new Error("Already subscribed to this course");
    }

    // Get course details
    const course = await Course.findById(courseId);
    if (!course) {
      throw new Error("Course not found");
    }

    console.log('Course Price:', course.price);

    let pricePaid = course.price;

    // If course is free, subscribe immediately
    if (pricePaid === 0) {
      console.log('Free course - subscribing immediately');
      return await Subscription.create({
        userId,
        courseId,
        pricePaid: 0,
      });
    }

    // Process promo code for paid courses
    if (promoCode) {
      const normalizedCode = promoCode.trim().toUpperCase();
      console.log('Normalized Promo Code:', normalizedCode);
      console.log('Valid Promo Code:', this.VALID_PROMO_CODE);
      console.log('Match:', normalizedCode === this.VALID_PROMO_CODE);

      if (normalizedCode !== this.VALID_PROMO_CODE) {
        console.log('❌ Invalid promo code');
        throw new Error("Invalid promo code");
      }

      // Apply discount
      pricePaid = Number((course.price * this.PROMO_DISCOUNT).toFixed(2));
      console.log('✅ Promo code applied!');
      console.log('Original Price:', course.price);
      console.log('Discounted Price:', pricePaid);
    } else {
      console.log('No promo code provided, using full price');
    }

    console.log('Final Price to be Paid:', pricePaid);

    // Create subscription
    const subscription = await Subscription.create({
      userId,
      courseId,
      pricePaid,
    });

    console.log('✅ Subscription created successfully');
    console.log('======================');

    return subscription;
  }

  static async getUserSubscriptions(userId: string) {
    return await Subscription.find({ userId })
      .populate("courseId")
      .sort({ subscribedAt: -1 });
  }

  static async isUserSubscribed(
    userId: string,
    courseId: string
  ): Promise<boolean> {
    const sub = await Subscription.findOne({
      userId,
      courseId,
    });

    return !!sub;
  }
}