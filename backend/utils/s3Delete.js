const { DeleteObjectCommand } = require("@aws-sdk/client-s3");
const { s3, AWS_S3_BUCKET_NAME } = require("../config/aws");

exports.deleteFromS3 = async (key) => {
  if (!key) return;

  try {
    const command = new DeleteObjectCommand({
      Bucket: AWS_S3_BUCKET_NAME,
      Key: key,
    });

    await s3.send(command);
  } catch (err) {
    console.error("❌ S3 delete failed:", err.message);
  }
};
