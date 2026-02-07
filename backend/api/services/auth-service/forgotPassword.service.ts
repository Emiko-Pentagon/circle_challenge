// import moment from "moment";
// import { config } from "../../config";
// import { AuthVerification } from "../../entity/AuthVerification";
// import { nanoid } from 'nanoid';
// import { Users } from "../../entity/Users";
// import { verifyGoogleCaptcha } from "../../libs/google/verifyCaptcha";
// import { sendMail } from "../../libs/mail/mail";
// import { APIError } from "../../utils/error";
// import { isLinkExpired } from "../../utils/commonHelper";

// interface ForgotPasswordDto {
//     username: string;
//     googleCaptcha: string;
//     ipAddress: string | undefined;
// }

// // Uses backend API base URL instead of client_url
// const sendPasswordVerificationEmail = (user: Users, code: string) =>
//     sendMail({
//         subject: 'Request For Password Reset',
//         to: user.username,
//         template: 'password-change-verification',
//         context: {
//             fullName: user.fullName,
//             url: `${config.base_url}/reset-password?code=${code}`
//         }
//     });

// export const forgotPassword = async ({ username, googleCaptcha, ipAddress }: ForgotPasswordDto) => {

//     const isCaptchaValid = await verifyGoogleCaptcha(googleCaptcha, ipAddress);
//     if (!isCaptchaValid) {
//         throw new APIError(400, { message: 'Invalid Captcha' });
//     }

//     const user = await Users.findOne({ where: { username } });

//     if (!user || !username) {
//         throw new APIError(404, { message: 'User not found' });
//     }

//     if (!user.isActive) {
//         throw new APIError(400, { message: 'Please verify via your email' });
//     }

//     const expiryDate = moment.utc().add(5, 'minutes').format('YYYY-MM-DD HH:mm:ss');
//     const newCode = nanoid();

//     let passwordVerification = await AuthVerification.findOne({ where: { userId: user.id } });

//     if (!passwordVerification) {
//         passwordVerification = await AuthVerification.create({
//             userId: user.id,
//             code: newCode,
//             isVerified: false,
//             expiryDate,
//         });
//     } else {
//         // If link NOT expired → do nothing (return)
//         if (!isLinkExpired(passwordVerification.expiryDate)) {
//             return;
//         }

//         // Link expired → update code
//         await passwordVerification.update({
//             code: newCode,
//             isVerified: false,
//             expiryDate,
//         });
//     }

//     // Send email with backend URL
//     await sendPasswordVerificationEmail(user, passwordVerification.code);
// };
