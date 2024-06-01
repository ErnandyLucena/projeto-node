"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// src/routes/itemRoutes.ts
const express_1 = require("express");
const itemController_1 = require("../controllers/itemController");
const authMiddleware_1 = require("../middlewares/authMiddleware");
const router = (0, express_1.Router)();
router.post('/items', authMiddleware_1.authMiddleware, itemController_1.addItem);
router.get('/items', authMiddleware_1.authMiddleware, itemController_1.getItems);
router.put('/items', authMiddleware_1.authMiddleware, itemController_1.updateItem);
router.delete('/items', authMiddleware_1.authMiddleware, itemController_1.deleteItem);
exports.default = router;
