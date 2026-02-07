// import jwt, { Secret, SignOptions } from 'jsonwebtoken';
// import Web3 from 'web3';
// import moment from 'moment';
// import { isValidate } from './validatePassword.service';
// import { APIError } from '../../utils/error';
// import { OAuthKind, Users } from '../../entity/Users';
// import { AuthVerification } from '../../entity/AuthVerification';
// import { AddAuthenticationDto } from '../../dto/auth/authenticationDto';
// import { JWTPAYLOAD } from '../../interface/JWTPayload';
// import { config } from '../../config';
// import { isLinkExpired } from '../../utils/commonHelper';
// // import { resendVerificationEmail } from './resetPassword.service';
// import { verifyGoogleCaptcha } from '../../libs/google/verifyCaptcha';

// /**
//  * Helper for creating access + refresh tokens with correct typing
//  */
// const createTokens = (payload: object | string) => {
//     if (!config.jwt_secret) throw new Error("Missing jwt_secret");
//     if (!config.refresh_jwt_secret) throw new Error("Missing refresh_jwt_secret");

//     const accessSecret = config.jwt_secret as Secret;
//     const refreshSecret = config.refresh_jwt_secret as Secret;

//     const accessOptions: SignOptions = {
//         expiresIn: config.jwt_life as SignOptions["expiresIn"]
//     };

//     const refreshOptions: SignOptions = {
//         expiresIn: config.refresh_jwt_life as SignOptions["expiresIn"]
//     };

//     const token = jwt.sign(payload, accessSecret, accessOptions);
//     const refreshToken = jwt.sign(payload, refreshSecret, refreshOptions);

//     return { token, refreshToken };
// };

// // ------------------ AUTHENTICATE USER ------------------
// // export const authenticateUser = async (addAuthenticationDto: AddAuthenticationDto) => {
// //     const tokens = await preProcessing(addAuthenticationDto);
// //     return tokens;
// // };

// // ------------------ LOGOUT ------------------
// export const logoutUser = async (userId: number) => {
//     await Users.update({ refreshToken: null }, { where: { id: userId } });
// };

// // ------------------ REFRESH TOKEN ------------------
// export const refreshToken = async (refreshToken: string) => {
//     const user = await Users.findOne({ where: { refreshToken } });

//     if (!user || !user.isActive)
//         throw new APIError(400, { message: "Cannot access the site. Contact moderator." });

//     jwt.verify(refreshToken, config.refresh_jwt_secret as Secret);

//     const payload: JWTPAYLOAD = {
//         userId: user.id,
//         typeOfUser: user.typeOfUser,
//         profilePic: user.profilePic,
//         isGoogleAuth: false,
//         username: user.username,
//         address: user.address,
//     };

//     const { token } = createTokens(payload);
//     return token;
// };

// // ------------------ PRE-PROCESS LOGIN ------------------
// // async function preProcessing(addAuthenticationDto: AddAuthenticationDto) {
// //     const user = await Users.findOne({
// //         where: { username: addAuthenticationDto.username },
// //     });

// //     if (!user || !user.password)
// //         throw new APIError(401, { message: 'Invalid Username or Password' });

// //     if (!user.isActive) {
// //         const verification = await AuthVerification.findOne({
// //             where: { userId: user.id, code: addAuthenticationDto.code },
// //         });

// //         if (!verification) {
// //             await resendVerificationEmail(user.username, 'signin');
// //             throw new APIError(401, {
// //                 message: 'Verification failed. A new email was sent.',
// //             });
// //         }

// //         if (isLinkExpired(verification.expiryDate)) {
// //             await resendVerificationEmail(user.username, 'signin');
// //             throw new APIError(400, { message: 'Link expired. Check your email.' });
// //         }

// //         verification.isVerified = true;
// //         verification.verifiedAt = moment.utc().format('YYYY-MM-DD HH:mm:ss');
// //         await verification.save();

// //         user.isActive = true;
// //         await user.save();
// //     }

// //     const isValid = await isValidate(addAuthenticationDto.password, user.password);
// //     if (!isValid) throw new APIError(401, { message: 'Invalid Username or Password' });

// //     const payload: JWTPAYLOAD = {
// //         userId: user.id,
// //         typeOfUser: user.typeOfUser,
// //         profilePic: user.profilePic,
// //         isGoogleAuth: false,
// //         username: user.username,
// //         address: user.address,
// //     };

// //     const { token, refreshToken } = createTokens(payload);

// //     user.lastLogin = moment.utc().format();
// //     user.refreshToken = refreshToken;
// //     user.accessToken = '';
// //     user.tokenKind = 'efc';
// //     await user.save();

// //     return { token, refreshToken };
// // }

// // ------------------ GOOGLE AUTH ------------------
// // export const preProcessingGO = async (username: string, address: string, payloadOf: string) => {
// //     const user = await Users.findOne({
// //         where: { username },
// //     });

// //     if (!user) throw new APIError(401, { message: 'Invalid Username or Password' });

// //     const payload: JWTPAYLOAD = {
// //         userId: user.id,
// //         username: user.username,
// //         token: user.accessToken,
// //         isGoogleAuth: true,
// //         address,
// //         typeOfUser: 'owner',
// //     };

// //     const { token } = createTokens(payload);
// //     return token;
// // };
