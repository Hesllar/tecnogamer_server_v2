import { Router } from 'express';
import { createProduct, getProducts, getProductById, updateProduct, deleteProduct } from '../controller';
import { validateToken } from '../middleware';

const router: Router = Router();

router.get('/api/product/get-products', getProducts);
router.get('/api/product/get-product-by-id/:productId', getProductById);
router.post('/api/product/create-product',validateToken, createProduct);
router.put('/api/product/update-product/:productId',validateToken, updateProduct);
router.delete('/api/product/delete-product/:productId',validateToken, deleteProduct);

export default router;


