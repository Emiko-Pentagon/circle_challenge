import { Router } from 'express';
// import { auth, superadminAuth, isSuperadmin, googleAuth, googleAuthCallBack } from '../middlewares/auth';
// import { authRoutes } from './auth.routes';
import { characterRoutes } from './character.routes';
// import { userRoutes } from './user';

const router = Router();

// router.use('/auth', authRoutes);
router.use('/character', characterRoutes);
// router.get('/google-auth', googleAuth);
// router.get('/google-auth/callback', googleAuthCallBack);
// router.use('/user', auth(), userRoutes);


export {
    router as apiRoutes
};
