import { Router } from 'express';
import { authMiddleware } from '../middlewares/authMiddleware';
import { getItems, updateItem, deleteItem } from '../controllers/itemController';

const router = Router();

router.get('/items', authMiddleware, getItems);

router.put('/items/:id', authMiddleware, updateItem);

router.delete('/items/:id', authMiddleware, deleteItem);

export default router;
