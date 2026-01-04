// src/controllers/courseController.ts
import { Response } from 'express';
import { CourseService } from '../services/courseService';
import { SubscriptionService } from '../services/subscriptionService';
import { IAuthRequest } from '../interfaces/IAuthRequest';

export class CourseController {
  static async getAllCourses(req: IAuthRequest, res: Response): Promise<void> {
    try {
      const courses = await CourseService.getAllCourses();
      const userId = req.user?.id;
      const subscriptionChecks = await Promise.all(
        courses.map(async (course) => ({
          ...course.toObject(),
          isSubscribed: userId ? await SubscriptionService.isUserSubscribed(userId, course._id.toString()) : false
        }))
      );

      res.render('courses/home', { 
        courses: subscriptionChecks,
        user: req.user 
      });
    } catch (error: any) {
      res.status(500).render('error', { message: error.message });
    }
  }

  static async getCourseDetail(req: IAuthRequest, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const course = await CourseService.getCourseById(id);

      if (!course) {
        res.status(404).render('error', { message: 'Course not found' });
        return;
      }

      const isSubscribed = req.user
        ? await SubscriptionService.isUserSubscribed(req.user.id, id)
        : false;

      res.render('courses/details', { 
        course,
        isSubscribed,
        user: req.user 
      });
    } catch (error: any) {
      res.status(500).render('error', { message: error.message });
    }
  }
}