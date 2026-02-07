// import { Users } from "../../entity/Users";
// import { APIError } from "../../utils/error";
// import Web3 from "web3";
// import { deleteFile } from "../../utils/fileUploaders3";
// import { UpdateProfileDto } from "../../dto/profile/updateProfileDto";
// import { ShowProfileDto } from "../../dto/profile/showProfileDto";

// /**
//  * Show user profile by ID
//  */
// export const showProfile = async (id: number): Promise<ShowProfileDto> => {
//   const user = await Users.findByPk(id); // Sequelize equivalent of findOne({_id})
//   if (!user) {
//     throw new APIError(404, { message: "User not found" });
//   }

//   const showProfileDto: ShowProfileDto = {
//     firstName: user.firstName,
//     lastName: user.lastName,
//     profilePic: user.profilePic ?? "",
//     address: user.address,
//     isActive: user.isActive,
//   };

//   return showProfileDto;
// };

// /**
//  * Update user profile
//  */
// export const updateProfile = async (
//   id: number,
//   updateProfileDto: UpdateProfileDto
// ): Promise<void> => {
//   const user = await Users.findByPk(id);
//   if (!user) {
//     throw new APIError(404, { message: "User cannot be updated" });
//   }

//   // Validate blockchain address if provided
//   if (updateProfileDto.address) {
//     if (!Web3.utils.isAddress(updateProfileDto.address)) {
//       throw new APIError(400, {
//         message: "Address is invalid",
//         error: "invalid_send_to_address",
//       });
//     }
//     user.address = updateProfileDto.address.toLowerCase();
//   }

//   // Update name fields
//   user.firstName = updateProfileDto.firstName ?? user.firstName;
//   user.lastName = updateProfileDto.lastName ?? user.lastName;

//   // Handle profile picture update
//   if (updateProfileDto.profilePic) {
//     if (user.profilePic) {
//       await deleteFile(user.profilePic);
//     }
//     user.profilePic = updateProfileDto.profilePic.key;
//   }

//   await user.save();
// };
