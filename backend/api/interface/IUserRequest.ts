import { Request } from 'express';
import { JWTPAYLOAD } from './JWTPayload';
import { S3File } from './S3File';

export interface IUserRequest extends Request {
    file: S3File;
    user: JWTPAYLOAD;
}