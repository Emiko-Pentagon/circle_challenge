import moment from 'moment';
import bcryptjs from 'bcryptjs';
// ➡️ Sequelize Model Imports
import { Users } from '../../entity/Users';
import { AuthVerification } from '../../entity/AuthVerification';
// Note: We no longer need the IUsers interface since we'll use the Sequelize model instance
// import { sendMail } from '../../libs/mail/mail';
import { APIError } from '../../utils/error';
import { isLinkExpired } from '../../utils/commonHelper';
import { nanoid } from 'nanoid';
import { config } from '../../config';


export const typeOfEmails = ['signin', 'reset-pass'] as const;
export type typeOfEmail = typeof typeOfEmails[number];

// ➡️ Use the actual Users model type
// const sendPasswordChangeNotification = (user: Users) => {
//     return sendMail({
//         subject: 'Your password has been changed',
//         // ➡️ Sequelize models use properties directly, no need for `as string` unless the model property is optional.
//         to: user.username,
//         // ➡️ Access the virtual field `fullName`
//         text: `Dear ${user.fullName}, your password has been updated.`
//     });
// };


/**
 * Used to reset password after user forgets password
 * @param code unique code
 * @param newPassword
 */
// export const resetPassword = async (code: string, newPassword: string, confirmPassword: string) => {
//     if (!newPassword || newPassword.length < 8) {
//         throw new APIError(400, { message: 'Password must have a minimum length of 8 characters' });
//     }
//     if (newPassword !== confirmPassword) {
//         throw new APIError(400, { message: 'New password and confirm password do not match' });
//     }

//     // ➡️ Sequelize: Use findOne
//     const savedPwdChangeVerify = await AuthVerification.findOne({ where: { code } });

//     if (!savedPwdChangeVerify || savedPwdChangeVerify.isVerified) {
//         throw new APIError(400, { message: 'Link expired or bad request' });
//     }

//     if (isLinkExpired(savedPwdChangeVerify.expiryDate)) {
//         throw new APIError(400, { message: 'Link expired' });
//     }

//     // ➡️ Sequelize: Find user by the foreign key `userId`
//     const user = await Users.findByPk(savedPwdChangeVerify.userId);
//     if (!user) {
//         throw new APIError(400, { message: 'Link expired or bad request' });
//     }

//     if (!user.isActive) {
//         throw new APIError(400, { message: 'Please verify via your email' });
//     }

//     // ➡️ update user password
//     user.password = bcryptjs.hashSync(newPassword);
//     // ➡️ Sequelize: Update and save the instance
//     await user.save();

//     // ➡️ update password change verification
//     // ➡️ Sequelize: Update and save the instance
//     await savedPwdChangeVerify.update({
//         isVerified: true,
//         verifiedAt: moment.utc().format('YYYY-MM-DD HH:mm:ss')
//     });

//     sendPasswordChangeNotification(user);
// };


// export const resendVerificationEmail = async (username: string, emailType: typeOfEmail) => {

//     // ➡️ Sequelize: Use findOne with where clause
//     const user = await Users.findOne({ where: { username } });
//     if (!user) {
//         return null;
//     }


//     // ➡️ Sequelize: Use findOne with where clause on the foreign key `userId`
//     let verification = await AuthVerification.findOne({ where: { userId: user.id } });

//     // Determine if we need to create a new one or update an existing one
//     const newCode = nanoid();
//     const expiryDate = moment.utc().add(5, 'minutes').format('YYYY-MM-DD HH:mm:ss');

//     if (!verification) {
//         // ➡️ Sequelize: Use create to insert a new record
//         verification = await AuthVerification.create({
//             userId: user.id,
//             code: newCode,
//             isVerified: false,
//             expiryDate: expiryDate,
//         });
//     } else {
//         const exp = isLinkExpired(verification.expiryDate);
//         // if (!exp)
//         //     return; // Original logic commented out, keeping it as is for conversion

//         // ➡️ Sequelize: Update the existing record
//         await verification.update({
//             code: newCode,
//             isVerified: false,
//             expiryDate: expiryDate,
//         });

//         // Use the updated instance for the emails
//     }


//     if (emailType === 'signin') {
//         sendMail({
//             subject: 'Sign In',
//             to: user.username,
//             template: 'owner-signup',
//             context: {
//                 fullName: user.fullName,
//                 username: user.username,
//                 signinUrl: config.client_url.owner_url + `/signin?code=${verification.code}`
//             }
//         });
//     }

//     else if (emailType === 'reset-pass') {
//         sendMail({
//             subject: 'Request For Password Reset',
//             to: user.username,
//             template: 'password-change-verification',
//             context: {
//                 fullName: user.fullName,
//                 url: config.client_url.owner_url + '/reset-password?code=' + verification.code
//             }
//         });
//     }
// }