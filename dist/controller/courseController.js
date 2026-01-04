"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CourseController = void 0;
const courseService_1 = require("../services/courseService");
const subscriptionService_1 = require("../services/subscriptionService");
class CourseController {
    static async getAllCourses(req, res) {
        try {
            const courses = await courseService_1.CourseService.getAllCourses();
            const userId = req.user?.id;
            const subscriptionChecks = await Promise.all(courses.map(async (course) => ({
                ...course.toObject(),
                isSubscribed: userId ? await subscriptionService_1.SubscriptionService.isUserSubscribed(userId, course._id.toString()) : false
            })));
            res.render('courses/home', {
                courses: subscriptionChecks,
                user: req.user
            });
        }
        catch (error) {
            res.status(500).render('error', { message: error.message });
        }
    }
    static async getCourseDetail(req, res) {
        try {
            const { id } = req.params;
            const course = await courseService_1.CourseService.getCourseById(id);
            if (!course) {
                res.status(404).render('error', { message: 'Course not found' });
                return;
            }
            const isSubscribed = req.user
                ? await subscriptionService_1.SubscriptionService.isUserSubscribed(req.user.id, id)
                : false;
            res.render('courses/details', {
                course,
                isSubscribed,
                user: req.user
            });
        }
        catch (error) {
            res.status(500).render('error', { message: error.message });
        }
    }
}
exports.CourseController = CourseController;
//# sourceMappingURL=courseController.js.map