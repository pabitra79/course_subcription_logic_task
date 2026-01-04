"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// src/routes/authRoutes.ts
const express_1 = require("express");
const authController_1 = require("../controller/authController");
const router = (0, express_1.Router)();
router.get('/signup', authController_1.AuthController.renderSignup);
router.post('/signup', authController_1.AuthController.signup);
router.get('/login', authController_1.AuthController.renderLogin);
router.post('/login', authController_1.AuthController.login);
router.get('/logout', authController_1.AuthController.logout);
exports.default = router;
//# sourceMappingURL=authRoutes.js.map