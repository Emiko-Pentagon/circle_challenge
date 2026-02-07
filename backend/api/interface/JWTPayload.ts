export interface JWTPAYLOAD {
    userId: number; // Sequelize primary key is numeric (auto-increment)
    username: string;
    profilePic?: string | null;
    address: string;
    isGoogleAuth: boolean;
    typeOfUser: 'customer' | 'owner' | 'superadmin';
    token?: string | null;
}