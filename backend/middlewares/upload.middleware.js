// const multer = require("multer");
// const multerS3 = require("multer-s3");
// const { s3, AWS_S3_BUCKET_NAME } = require("../config/aws");

// const upload = multer({
//   storage: multerS3({
//     s3,
//     bucket: AWS_S3_BUCKET_NAME,
//     contentType: multerS3.AUTO_CONTENT_TYPE,
//     key: (req, file, cb) => {
//       cb(null, `resumes/${Date.now()}-${file.originalname}`);
//     },
//   }),
//   fileFilter: (req, file, cb) => {
//     if (file.mimetype !== "application/pdf") {
//       return cb(new Error("Only PDF resumes are allowed"));
//     }
//     cb(null, true);
//   },
//   limits: { fileSize: 5 * 1024 * 1024 },
// });

// module.exports = upload;


const multer = require("multer");
const path = require("path");
const fs = require("fs");

const isProduction = process.env.NODE_ENV === "production";

// =====================================================
// FILE FILTER
// =====================================================

const fileFilter = (req, file, cb) => {
  if (file.mimetype !== "application/pdf") {
    return cb(new Error("Only PDF resumes are allowed"), false);
  }

  cb(null, true);
};

// =====================================================
// LOCAL STORAGE
// =====================================================

const localStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = path.join(
      __dirname,
      "../uploads/resumes"
    );

    // Create folder if it doesn't exist
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, {
        recursive: true,
      });
    }

    cb(null, uploadPath);
  },

  filename: (req, file, cb) => {
    const safeName = file.originalname
      .replace(/\s+/g, "-")
      .replace(/[^a-zA-Z0-9.-]/g, "");

    cb(
      null,
      `${Date.now()}-${safeName}`
    );
  },
});

// =====================================================
// PRODUCTION - AWS S3
// =====================================================

let uploadStorage;

if (isProduction) {
  const multerS3 = require("multer-s3");

  const {
    s3,
    AWS_S3_BUCKET_NAME,
  } = require("../config/aws");

  uploadStorage = multerS3({
    s3,
    bucket: AWS_S3_BUCKET_NAME,

    contentType: multerS3.AUTO_CONTENT_TYPE,

    key: (req, file, cb) => {
      const safeName = file.originalname
        .replace(/\s+/g, "-")
        .replace(/[^a-zA-Z0-9.-]/g, "");

      cb(
        null,
        `resumes/${Date.now()}-${safeName}`
      );
    },
  });
} else {
  uploadStorage = localStorage;
}

// =====================================================
// MULTER
// =====================================================

const upload = multer({
  storage: uploadStorage,

  fileFilter,

  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB
  },
});

module.exports = upload;