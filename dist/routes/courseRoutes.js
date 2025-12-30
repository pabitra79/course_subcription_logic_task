"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// src/routes/courseRoutes.ts
const express_1 = require("express");
const courseController_1 = require("../controller/courseController");
const authMiddleware_1 = require("../middleware/authMiddleware");
const router = (0, express_1.Router)();
router.get('/', authMiddleware_1.protect, courseController_1.CourseController.getAllCourses);
router.get('/:id', authMiddleware_1.protect, courseController_1.CourseController.getCourseDetail);
exports.default = router;
