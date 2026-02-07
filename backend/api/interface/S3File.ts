export interface S3File extends Express.Multer.File {
    key: string; // S3 object key
    location: string; // URL of the uploaded file
    bucket: string; // Bucket name
    etag: string; // S3 entity tag
    contentType: string; // MIME type of the file
    acl?: string; // Access control list setting
}