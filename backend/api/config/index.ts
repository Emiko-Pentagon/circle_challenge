import { config } from 'dotenv';

const result = config();
if (result.error) {
    throw result.error;
}

const configuration = {
    mode: process.env.MODE as 'dev' | 'prod' | 'test',
    port: +(process.env.PORT as string),
    base_url: process.env.BASE_URL as string,
    server_url: process.env.SERVER_URL as string,
    db: {
        password: process.env.DB_PASSWORD as string
    },
    client_url: {
        landing_url: process.env.LANDING_URL as string,
        owner_url: process.env.OWNER_URL as string
    },
    // s3: {
    //     secretKey: process.env.S3_SECRET_KEY as string,
    //     accessKey: process.env.S3_ACCESS_KEY as string,
    //     bucketName: process.env.S3_BUCKET_NAME as string
    // },
    // ssh: {
    //     host: process.env.FILE_SERVER_HOST,
    //     port: +(process.env.FILE_SERVER_PORT as string),
    //     username: process.env.FILE_SERVER_USERNAME,
    //     password: process.env.FILE_SERVER_PASSWORD,
    //     root_file_path: process.env.FILE_SERVER_ROOT_FILE_PATH as string,
    //     url: process.env.FILE_SERVER_URL as string
    // },
    jwt_secret: process.env.JWT_SECRET as string,
    jwt_life: process.env.JWT_LIFE as string,
    refresh_jwt_secret: process.env.REFRESH_JWT_SECRET as string,
    refresh_jwt_life: process.env.REFRESH_JWT_LIFE,
    // mail: {
    //     host: process.env.MAIL_HOST as string,
    //     username: process.env.MAIL_USERNAME as string,
    //     password: process.env.MAIL_PASSWORD as string,
    //     bcc: process.env.BCC as string,
    // },
    // google: {
    //     client_id: process.env.GOOGLE_CLIENT_ID as any,
    //     client_secret: process.env.GOOGLE_CLIENT_SECRET as any,
    //     captcha_secret_key: process.env.GOOGLE_CAPTCHA_SECRET as string
    // }

};

export { configuration as config };