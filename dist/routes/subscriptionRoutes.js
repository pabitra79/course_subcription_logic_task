"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// src/routes/subscriptionRoutes.ts
const express_1 = require("express");
const subscriptionController_1 = require("../controller/subscriptionController");
const authMiddleware_1 = require("../middleware/authMiddleware");
const router = (0, express_1.Router)();
router.post('/subscribe', authMiddleware_1.protectAPI, subscriptionController_1.SubscriptionController.subscribe);
exports.default = router;
//# sourceMappingURL=subscriptionRoutes.js.map