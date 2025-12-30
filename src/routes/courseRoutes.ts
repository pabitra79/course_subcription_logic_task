// src/routes/courseRoutes.ts
import { Router } from 'express';
import { CourseController } from '../controller/courseController';
import { protect } from '../middleware/authMiddleware';

const router = Router();

router.get('/', protect, CourseController.getAllCourses);
router.get('/:id', protect, CourseController.getCourseDetail);

export default router;
