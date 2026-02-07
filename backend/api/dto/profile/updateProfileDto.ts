import { S3File } from "../../interface/S3File";

export interface UpdateProfileDto {
    firstName?: string;
    lastName?: string;
    address?: string;
    phone?: string;
    profilePic?: S3File;
}