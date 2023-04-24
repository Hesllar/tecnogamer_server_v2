import { Router } from 'express';
import { login, registerUser,resetToken  } from '../controller';
import { validateToken } from '../middleware';

const router: Router = Router();
router.get('/api/auth/reset-token', validateToken, resetToken);
router.post(`/api/auth/login`, login);
router.post(`/api/auth/register`, registerUser);


export default router;


