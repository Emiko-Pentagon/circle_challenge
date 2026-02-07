// import multer from "multer";
// import { S3Client, DeleteObjectCommand } from '@aws-sdk/client-s3';
// import multerS3 from "multer-s3";
// import { nanoid } from "nanoid";
// import { config } from "../config";

// // aws.config.update({
// //     secretAccessKey: config.s3.secretKey,
// //     accessKeyId: config.s3.accessKey,
// //     region: 'eu-central-1'
// // });

// const s3 = new S3Client({
//     credentials: {
//         secretAccessKey: config.s3.secretKey,
//         accessKeyId: config.s3.accessKey,
//     },
//     region: 'eu-north-1'

// });

// const storage = multerS3({
//     s3: s3,
//     bucket: config.s3.bucketName,
//     key: function (req, file, cb) {
//         cb(null, `${nanoid(6)}_${file.originalname}`);
//     }
// });

// export const upload = multer({
//     storage: storage, limits: {
//         fileSize: 1000 * 1 * 3000
//     }
// });

// export const deleteFile = async (key: string) => {
//     try {
//         const deleteParams = {
//             Bucket: config.s3.bucketName,  // Your bucket name
//             Key: key,                      // The key of the file to delete
//         };

//         const data = await s3.send(new DeleteObjectCommand(deleteParams));
//         console.log('File deleted successfully', data);
//         return data;
//     } catch (error) {
//         console.error('Error deleting file', error);
//         throw error;
//     }
// };