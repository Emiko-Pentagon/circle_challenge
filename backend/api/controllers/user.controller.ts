// import { Request, Response, NextFunction } from 'express';
// import Joi from '@hapi/joi';
// // import { authenticateUser, logoutUser, refreshToken } from '../services/auth-service/login.service';
// import { AddAuthenticationDto } from '../dto/auth/authenticationDto';
// import { validate } from '../libs/validator/validate';
// import { IUserRequest } from '../interface/IUserRequest';
// import { changePassword } from '../services/auth-service/changePassword.service';
// import { forgotPassword } from '../services/auth-service/forgotPassword.service';
// // import { resendVerificationEmail, resetPassword } from '../services/auth-service/resetPassword.service';
// import { UpdateProfileDto } from '../dto/profile/updateProfileDto';
// import { showProfile, updateProfile } from '../services/profile-service/updateProfile.service';
// import { ShowProfileDto } from '../dto/profile/showProfileDto';
// import { PASSWORD_REGEX } from '../utils/commonHelper';

// export const loginUser = async (req: Request, res: Response, next: NextFunction) => {
//     try {
//         const addAuthenticationDto: AddAuthenticationDto = {
//             username: req.body.username,
//             // address: req.body.address.toLowerCase(),
//             password: req.body.password,
//             // ipAddress: req.ip,
//             // googleCaptcha: req.body.g_recaptcha_response,
//             code: req.body.code
//         };
//         const token = await authenticateUser(addAuthenticationDto);
//         res.status(200).json({
//             data: { token }
//         });
//     } catch (err) {
//         next(err);
//     }
// };

// export const logout = async (req: IUserRequest, res: Response) => {
//     await logoutUser(req.user.userId);
//     res.sendStatus(204);
// };

// export const postForgotPassword = async (req: Request, res: Response, next: NextFunction) => {
//     try {
//         const expiryTime = await forgotPassword({
//             username: req.body.username,
//             googleCaptcha: req.body.g_recaptcha_response,
//             ipAddress: req.ip
//         });

//         res.status(200).json({
//             status: 'success',
//             data: expiryTime,
//             message: 'Email sent for password change'
//         });
//     } catch (err) {
//         next(err);
//     }
// };


// export const postVerifyForgotPassword = async (req: Request, res: Response, next: NextFunction) => {
//     try {
//         const schema = Joi.object({
//             code: Joi.string()
//                 .required(),
//             newPassword: Joi.string()
//                 .min(8)
//                 .required(),
//             confirmPassword: Joi.ref('newPassword')
//         }).with('newPassword', 'confirmPassword');

//         const { error } = validate(schema, req.body);
//         if (error) {
//             throw error;
//         }

//         await resetPassword(req.body.code, req.body.newPassword, req.body.confirmPassword);

//         res.status(200).json({
//             status: 'success',
//             data: 'Password has been updated'
//         });
//     } catch (err) {
//         return next(err);
//     }
// };


// export const tokenRefresh = async (req: Request, res: Response, next: NextFunction) => {
//     const oldToken = req.body.refreshToken;
//     try {
//         const token = await refreshToken(oldToken);
//         res.status(200).json({
//             data: { token }
//         });
//     } catch (err) {
//         next(err);
//     }
// };

// export const putChangePassword = async (req: IUserRequest, res: Response, next: NextFunction) => {
//     const schema = Joi.object({
//         currentPassword: Joi.string().regex(PASSWORD_REGEX)
//             .required(),
//         newPassword: Joi.string().regex(PASSWORD_REGEX)
//             .min(8)
//             .required(),
//         confirmPassword: Joi.ref('newPassword')
//     });

//     const { error } = validate(schema, req.body);
//     if (error) {
//         throw error;
//     }
//     try {
//         await changePassword({
//             currentPassword: req.body.currentPassword,
//             newPassword: req.body.newPassword,
//             userId: req.user.userId
//         });
//         res.status(200).json({ status: 'success' });
//     } catch (err) {
//         next(err);
//     }
// };


// export const putProfile = async (req: IUserRequest, res: Response, next: NextFunction) => {
//     const updateProfileDto: UpdateProfileDto = {
//         firstName: req.body.firstName,
//         lastName: req.body.lastName,
//         address: req.body.address,
//         profilePic: req.file
//     }

//     try {
//         await updateProfile(req.user.userId, updateProfileDto);
//         res.status(200).json({ status: 'success' });

//     } catch (err) {
//         next(err);
//     }
// }

// export const getProfile = async (req: IUserRequest, res: Response, next: NextFunction) => {
//     try {
//         const showProfileDto: ShowProfileDto = await showProfile(req.user.userId);
//         res.status(200).json({ data: showProfileDto });
//     } catch (err) {
//         next(err);
//     }
// }

// export const postResendVerification = async (req: Request, res: Response, next: NextFunction) => {
//     try {
//         await resendVerificationEmail(req.body.username, req.body.emailType);
//         res.status(200).json({ status: 'success' });
//     } catch (err) {
//         next(err);
//     }
// }