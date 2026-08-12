// const { S3Client } = require("@aws-sdk/client-s3");
// const { SESClient } = require("@aws-sdk/client-ses");
// require("dotenv").config();

// const {
//   AWS_REGION,
//   AWS_S3_BUCKET_NAME,
//   AWS_SES_SENDER_EMAIL,
//   AWS_ACCESS_KEY_ID,
//   AWS_SECRET_ACCESS_KEY,
// } = process.env;

// if (
//   !AWS_REGION ||
//   !AWS_S3_BUCKET_NAME ||
//   !AWS_SES_SENDER_EMAIL ||
//   !AWS_ACCESS_KEY_ID ||
//   !AWS_SECRET_ACCESS_KEY
// ) {
//   throw new Error("❌ Missing AWS environment variables");
// }

// const credentials = {
//   accessKeyId: AWS_ACCESS_KEY_ID,
//   secretAccessKey: AWS_SECRET_ACCESS_KEY,
// };

// const s3 = new S3Client({ region: AWS_REGION, credentials });
// const ses = new SESClient({ region: AWS_REGION, credentials });

// module.exports = {
//   s3,
//   ses,
//   AWS_S3_BUCKET_NAME,
//   AWS_SES_SENDER_EMAIL,
// };

const { S3Client } = require("@aws-sdk/client-s3");
require("dotenv").config();

const {
    AWS_REGION,
    AWS_S3_BUCKET_NAME,
    AWS_ACCESS_KEY_ID,
    AWS_SECRET_ACCESS_KEY,
} = process.env;


// ==========================================
// AWS S3 CONFIGURATION
// ==========================================

if (
    !AWS_REGION ||
    !AWS_S3_BUCKET_NAME ||
    !AWS_ACCESS_KEY_ID ||
    !AWS_SECRET_ACCESS_KEY
) {
    throw new Error(
        "❌ Missing AWS S3 environment variables"
    );
}


const credentials = {
    accessKeyId: AWS_ACCESS_KEY_ID,
    secretAccessKey: AWS_SECRET_ACCESS_KEY,
};


// ==========================================
// S3 CLIENT
// ==========================================

const s3 = new S3Client({
    region: AWS_REGION,
    credentials,
});


// ==========================================
// EXPORT
// ==========================================

module.exports = {
    s3,
    AWS_S3_BUCKET_NAME,
};