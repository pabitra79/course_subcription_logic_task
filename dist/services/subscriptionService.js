"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SubscriptionService = void 0;
const Subscription_1 = require("../models/Subscription");
const Course_1 = require("../models/Course");
class SubscriptionService {
    static async subscribe(userId, courseId, promoCode) {
        const existing = await Subscription_1.Subscription.findOne({ userId, courseId });
        if (existing) {
            throw new Error('Already subscribed');
        }
        const course = await Course_1.Course.findById(courseId);
        if (!course) {
            throw new Error('Course not found');
        }
        let pricePaid = course.price;
        if (pricePaid === 0) {
            return Subscription_1.Subscription.create({ userId, courseId, pricePaid: 0 });
        }
        if (promoCode) {
            if (promoCode.toUpperCase() !== this.VALID_PROMO_CODE) {
                throw new Error('Invalid promo code');
            }
            pricePaid = course.price * this.PROMO_DISCOUNT;
        }
        return Subscription_1.Subscription.create({ userId, courseId, pricePaid });
    }
    static async getUserSubscriptions(userId) {
        return Subscription_1.Subscription.find({ userId })
            .populate('courseId')
            .sort({ subscribedAt: -1 });
    }
    static async isUserSubscribed(userId, courseId) {
        return !!(await Subscription_1.Subscription.findOne({ userId, courseId }));
    }
}
exports.SubscriptionService = SubscriptionService;
SubscriptionService.VALID_PROMO_CODE = 'BFSALE25';
SubscriptionService.PROMO_DISCOUNT = 0.5;
