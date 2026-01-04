"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SubscriptionController = void 0;
const subscriptionService_1 = require("../services/subscriptionService");
class SubscriptionController {
    static async subscribe(req, res) {
        try {
            const { courseId, promoCode } = req.body;
            const userId = req.user.id;
            await subscriptionService_1.SubscriptionService.subscribe(userId, courseId, promoCode);
            res.json({ success: true, message: 'Subscription successful!' });
        }
        catch (error) {
            res.status(400).json({ success: false, message: error.message });
        }
    }
    static async getMyCourses(req, res) {
        try {
            const userId = req.user.id;
            const subscriptions = await subscriptionService_1.SubscriptionService.getUserSubscriptions(userId);
            res.render('my-courses', {
                subscriptions,
                user: req.user
            });
        }
        catch (error) {
            res.status(500).render('error', { message: error.message });
        }
    }
}
exports.SubscriptionController = SubscriptionController;
//# sourceMappingURL=subscriptionController.js.map