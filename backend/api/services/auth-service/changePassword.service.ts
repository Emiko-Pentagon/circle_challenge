import { Users } from '../../entity/Users'; // ➡️ Sequelize Model Import
import { APIError } from '../../utils/error';
import bcryptjs from 'bcryptjs';

interface UpdateProfilePasswordDto {
    currentPassword: string;
    newPassword: string;
    // ➡️ Use number for the primary key (id) in Sequelize
    userId: number; 
}

export const changePassword = async ({
    currentPassword,
    newPassword,
    userId
}: UpdateProfilePasswordDto) => {
    
    // ➡️ Sequelize: Use findByPk to find by primary key (id)
    const user = await Users.findByPk(userId);
    if (!user) {
        throw new APIError(400, { message: 'User does not exist' });
    }

    // Sequelize models might return null for optional fields like password, so check before comparing
    if (!user.password) {
        throw new APIError(400, { message: 'User account has no password set' });
    }

    // Compare current password with the hashed password from the database
    const isPasswordEqual = bcryptjs.compareSync(currentPassword, user.password);
    if (!isPasswordEqual) {
        throw new APIError(400, { message: 'Password is incorrect' });
    }

    // Hash the new password
    const newHashedPassword = bcryptjs.hashSync(newPassword, 10);
    
    // ➡️ Sequelize: Update the instance property and save
    user.password = newHashedPassword;
    await user.save();
    
    // Alternatively, you could use:
    // await user.update({ password: newHashedPassword });
};