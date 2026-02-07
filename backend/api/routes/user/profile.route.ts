// import { Router } from 'express';
// import { userRequestHandler } from '../../middlewares/userRequestHandler';
// import { upload } from '../../utils/fileUploaders3';
// import { getProfile, logout, putChangePassword, putProfile } from '../../controllers/user.controller';

// const router = Router();

// router.get('/', userRequestHandler(getProfile));
// router.put('/change-password', userRequestHandler(putChangePassword));

// router.put('/', upload.single('profilePic'), userRequestHandler(putProfile));
// router.post('/logout', userRequestHandler(logout));

// // router.delete('/', userRequestHandler(deleteBusiness));

// export {
//     router as profileRoutes
// }