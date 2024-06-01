// src/routes/itemRoutes.ts
import { Router } from 'express';
import { addItem, getItems, updateItem, deleteItem } from '../controllers/itemController';
import { authMiddleware } from '../middlewares/authMiddleware';

const router = Router();

router.post('/items', authMiddleware, addItem);
router.get('/items', authMiddleware, getItems);
router.put('/items', authMiddleware, updateItem);
router.delete('/items', authMiddleware, deleteItem);

export default router;
