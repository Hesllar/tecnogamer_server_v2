import { Router } from 'express';
import { createSale } from '../controller';
import { validateToken, validateSale } from '../middleware';

const router: Router = Router();

router.post('/api/sale/create-sale', [validateToken, validateSale], createSale);

export default router;
