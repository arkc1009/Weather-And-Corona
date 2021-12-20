import { Router } from 'express';
import { getProfile, updateProfile } from '../controllers/userController';
import { authorization } from './middlewares/authorization';

const router = Router();

router.get('/profile/me', authorization, getProfile);
router.post('/profile', authorization, updateProfile);

export default router;
