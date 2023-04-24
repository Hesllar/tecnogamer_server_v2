import { Router } from 'express';
import { getCategories, getCategoryById, createCategory, updateCategory } from '../controller';
import { validateToken } from '../middleware';

const router: Router = Router();

router.get('/api/category/get-categories', getCategories);
router.get('/api/category/get-category-by-id/:categoryId',validateToken, getCategoryById);
router.post('/api/category/create-category',validateToken, createCategory);
router.patch('/api/category/update-category/:categoryId',validateToken, updateCategory);

export default router;


