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
                image: 'https://images.unsplash.com/photo-1515879218367-8466d910aaa4?w=400'
            },
            {
                title: 'Introduction to Nodejs',
                description: 'Full course Backend Development.',
                price: 49,
                image: 'https://images.unsplash.com/photo-1515879218367-8466d910aaa4?w=400'
            }
        ];
        for (const course of courses) {
            const exists = await Course_1.Course.findOne({ title: course.title });
            if (!exists) {
                await Course_1.Course.create(course);
            }
        }
        console.log('✅ Courses synced');
    }
}
exports.CourseService = CourseService;
