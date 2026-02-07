import { S3File } from "../../interface/S3File";

export interface AddOwnerDto {
    firstName: string;
    lastName: string;
    username: string;
    password: string;
    confirmPassword: string;
    address: string;
    isActive?: boolean;
    phone: string;
    profilePic?: S3File;
}