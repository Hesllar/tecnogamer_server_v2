import { Router } from 'express';
import { getMarks, getMarkById, createMark, updateMark } from '../controller';
import { validateToken } from '../middleware';
const router: Router = Router();

router.get('/api/mark/get-marks', getMarks);
router.get('/api/mark/get-mark/by-id/:markId',validateToken, getMarkById);
router.post('/api/mark/create-mark',validateToken, createMark);
router.patch('/api/mark/update-mark/:markId',validateToken, updateMark);

export default router;


