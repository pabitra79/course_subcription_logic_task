"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SubscriptionService = void 0;
const Subscription_1 = require("../models/Subscription");
const Course_1 = require("../models/Course");
class SubscriptionService {
    static async subscribe(userId, courseId, promoCode) {
        console.log('=== Subscribe Request ===');
        console.log('User ID:', userId);
        console.log('Course ID:', courseId);
        console.log('Promo Code Received:', promoCode);
        console.log('Promo Code Type:', typeof promoCode);
        // Check if already subscribed
        const existing = await Subscription_1.Subscription.findOne({
            userId,
            courseId,
        });
        if (existing) {
            throw new Error("Already subscribed to this course");
        }
        // Get course details
        const course = await Course_1.Course.findById(courseId);
        if (!course) {
            throw new Error("Course not found");
        }
        console.log('Course Price:', course.price);
        let pricePaid = course.price;
        // If course is free, subscribe immediately
        if (pricePaid === 0) {
            console.log('Free course - subscribing immediately');
            return await Subscription_1.Subscription.create({
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
        }
        else {
            console.log('No promo code provided, using full price');
        }
        console.log('Final Price to be Paid:', pricePaid);
        // Create subscription
        const subscription = await Subscription_1.Subscription.create({
            userId,
            courseId,
            pricePaid,
        });
        console.log('✅ Subscription created successfully');
        console.log('======================');
        return subscription;
    }
    static async getUserSubscriptions(userId) {
        return await Subscription_1.Subscription.find({ userId })
            .populate("courseId")
            .sort({ subscribedAt: -1 });
    }
    static async isUserSubscribed(userId, courseId) {
        const sub = await Subscription_1.Subscription.findOne({
            userId,
            courseId,
        });
        return !!sub;
    }
}
exports.SubscriptionService = SubscriptionService;
SubscriptionService.VALID_PROMO_CODE = "BFSALE25";
SubscriptionService.PROMO_DISCOUNT = 0.5; // 50% discount
//# sourceMappingURL=subscriptionService.js.map