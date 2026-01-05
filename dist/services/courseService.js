"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CourseService = void 0;
const Course_1 = require("../models/Course");
class CourseService {
    static async getAllCourses() {
        return Course_1.Course.find().sort({ createdAt: -1 });
    }
    static async getCourseById(courseId) {
        return Course_1.Course.findById(courseId);
    }
    static async createCourse(data) {
        return Course_1.Course.create(data);
    }
    static async initializeMockCourses() {
        const courses = [
            {
                title: 'Complete Web Development Bootcamp',
                description: 'Learn HTML, CSS, JavaScript, React, Node.js and more.',
                price: 99.99,
                image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=400'
            },
            {
                title: 'Python for Data Science',
                description: 'Master Python, NumPy, Pandas, and ML fundamentals.',
                price: 79.99,
                image: 'https://images.unsplash.com/photo-1526379095098-d400fd0bf935?w=400'
            },
            {
                title: 'Introduction to Programming',
                description: 'Free course covering programming basics.',
                price: 0,
                image: 'https://images.unsplash.com/photo-1515879218367-8466d910aaa4?w=400'
            },
            {
                title: 'Introduction to Javascript',
                description: 'Course covering JavaScript basics.',
                price: 39,
                image: 'https://images.unsplash.com/photo-1667372393086-9d4001d51cf1?q=80&w=1332&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
            },
            {
                title: 'Introduction to Nodejs',
                description: 'Full course Backend Development.',
                price: 49,
                image: 'https://plus.unsplash.com/premium_photo-1669075651892-ad3b64f2145c?q=80&w=880&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
            }
        ];
        for (const course of courses) {
            const exists = await Course_1.Course.findOne({ title: course.title });
            if (!exists) {
                await Course_1.Course.create(course);
            }
        }
        console.log(' Courses synced');
    }
}
exports.CourseService = CourseService;
//# sourceMappingURL=courseService.js.map