import { Router } from 'express';
import { getUsers, getUsersById, updateUser, updatePassword } from '../controller';
import { validateToken } from '../middleware';


const router: Router = Router();

router.get('/api/user/get-users',validateToken, getUsers);
router.get('/api/user/get-user-by-id/:userId',validateToken, getUsersById);
router.put('/api/user/update-user/:userId',validateToken, updateUser);
router.patch('/api/user/update-password/:emailUser',validateToken, updatePassword);

export default router;


