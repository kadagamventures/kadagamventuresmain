const {
    PutObjectCommand,
    GetObjectCommand,
    DeleteObjectCommand,
  } = require("@aws-sdk/client-s3");
  const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");
  const s3 = require("../config/s3.config");
  
  // 🔼 UPLOAD FILE
  exports.uploadToS3 = async ({ file, folder }) => {
    const key = `${folder}/${Date.now()}-${file.originalname}`;
  
    await s3.send(
      new PutObjectCommand({
        Bucket: process.env.AWS_S3_BUCKET_NAME,
        Key: key,
        Body: file.buffer,
        ContentType: file.mimetype,
      })
    );
  
    return key;
  };
  
  // 🔗 GET SIGNED URL (7 DAYS)
  exports.getSignedImageUrl = async (key) => {
    if (!key) return null;
  
    return getSignedUrl(
      s3,
      new GetObjectCommand({
        Bucket: process.env.AWS_S3_BUCKET_NAME,
        Key: key,
      }),
      { expiresIn: 60 * 60 * 24 * 7 }
    );
  };
  
  // 🗑 DELETE FROM S3
  exports.deleteFromS3 = async (key) => {
    if (!key) return;
  
    await s3.send(
      new DeleteObjectCommand({
        Bucket: process.env.AWS_S3_BUCKET_NAME,
        Key: key,
      })
    );
  };
  