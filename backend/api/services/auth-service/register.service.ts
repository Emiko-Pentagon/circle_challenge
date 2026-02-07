// import bcrypt from 'bcryptjs';
// import Web3 from 'web3';
// import Joi from '@hapi/joi';
// import moment from 'moment';
// import { nanoid } from 'nanoid';
// // ➡️ Import Op for Sequelize queries
// import { Op } from 'sequelize';
// import { validate } from '../../libs/validator/validate';
// // ➡️ Sequelize Model Imports
// import { Users } from '../../entity/Users';
// import { AddOwnerDto } from '../../dto/auth/addOwnerDto';
// import { APIError } from '../../utils/error';
// import { config } from '../../config';
// import { PASSWORD_REGEX } from '../../utils/commonHelper';
// import { sendMail } from '../../libs/mail/mail';
// import { AuthVerification } from '../../entity/AuthVerification'; // Sequelize Model Import

// // ➡️ Use the actual Sequelize Users model type
// export const insertUserAsOwner = async (addOwnerDto: AddOwnerDto) => {

//     await ownerSignupValidation(addOwnerDto);

//     if (addOwnerDto.password !== addOwnerDto.confirmPassword)
//         throw new APIError(400, { 'message': "Password does not match" });

//     const hashedPassword = await bcrypt.hash(addOwnerDto.password, bcrypt.genSaltSync(10));

//     // ➡️ Sequelize: Use Users.create() to build and save the instance in one step
//     const user = await Users.create({
//         firstName: addOwnerDto.firstName,
//         lastName: addOwnerDto.lastName,
//         username: addOwnerDto.username,
//         // Ensure address is lowercase as per original logic
//         address: addOwnerDto.address.toLowerCase(),
//         password: hashedPassword,
//         typeOfUser: 'owner',
//         isActive: true, // Default is false, enable only if config.mode === 'dev' logic is added
//         // Assuming profilePic key is passed directly
//         profilePic: addOwnerDto.profilePic ? addOwnerDto.profilePic.key : null,
//     });

//     const expiryDate = moment.utc().add(5, 'minutes').format('YYYY-MM-DD HH:mm:ss');

//     // ➡️ Sequelize: Use AuthVerification.create()
//     const verification = await AuthVerification.create({
//         // Foreign key linkage
//         userId: user.id,
//         code: nanoid(),
//         isVerified: false,
//         expiryDate: expiryDate,
//     });

//     // Use the created user and verification code to send the email
//     // sendSuccessSignupMail(user, verification.code);
// };

// // ➡️ Use the actual Sequelize Users model type
// export const sendSuccessSignupMail = (user: Users, code?: string, bcc: string | string[] = []) => {
//     sendMail({
//         subject: 'Sign In',
//         to: user.username,
//         template: 'owner-signup',
//         bcc: user.username,
//         context: {
//             // Access the virtual property `fullName`
//             fullName: user.fullName,
//             username: user.username,
//             signinUrl: config.client_url.owner_url + `/signin?code=${code}`
//         },
//         // bcc,
//     })
//         .then(console.log)
//         .catch(console.error);
// };

// export const usernameOrAddressExists = async (username: string, address: string): Promise<boolean> => {
//     // ➡️ Sequelize: Use findOne with Op.or for logical OR
//     const alreadyExists = await Users.findOne({
//         where: {
//             [Op.or]: [
//                 { username: username },
//                 { address: address }
//             ]
//         }
//     });
//     return alreadyExists ? true : false;
// };

// // ... (Joi Schema remains the same)

// export const ownerSchema = {
//     firstName: Joi.string()
//         .required(),
//     lastName: Joi.string()
//         .required(),
//     username: Joi.string()
//         .email()
//         .required(),
//     password: Joi.string().regex(PASSWORD_REGEX)
//         .required(),
//     confirmPassword: Joi.string().regex(PASSWORD_REGEX)
//         .min(8)
//         .required(),
//     address: Joi.string()
//         .required(),
//     profilePic: Joi.object()
//         .optional()
// };

// export const ownerSignupValidation = async (value: AddOwnerDto) => {
//     // if (!Web3.utils.isAddress(value.address))
//     //     throw new APIError(400, {
//     //         message: 'Address is invalid',
//     //         error: 'invalid_send_to_address'
//     //     });

//     const schema = Joi.object(ownerSchema);

//     const { error } = validate(schema, value);
//     if (error) throw error;

//     await throwOnDuplicateOwner(value.username, value.address.toLowerCase());
// };

// const throwOnDuplicateOwner = async (email: string, address: string) => {
//     const [
//         isDuplicate
//     ] = await Promise.all([
//         usernameOrAddressExists(email, address)
//     ]);

//     if (isDuplicate) {
//         throw new APIError(400, {
//             message: 'Username or Address exists' // Updated message to reflect checking both
//         });
//     }
// };