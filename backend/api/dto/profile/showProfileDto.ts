export interface ShowProfileDto {
    firstName: string;
    lastName: string;
    address: string;
    phone?: string;
    isActive: boolean;
    profilePic: string;
}