
// const multer = require("multer");

// const storage = multer.memoryStorage();

// const fileFilter = (req, file, cb) => {
//   if (file.mimetype.startsWith("image/")) cb(null, true);
//   else cb(new Error("Only image files allowed"), false);
// };

// const upload = multer({
//   storage,
//   fileFilter,
//   limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
// });

// module.exports = upload;

const multer = require("multer");
const multerS3 = require("multer-s3");
const { s3, AWS_S3_BUCKET_NAME } = require("../config/aws");

const upload = multer({
  storage: multerS3({
    s3,
    bucket: AWS_S3_BUCKET_NAME,
    contentType: multerS3.AUTO_CONTENT_TYPE,
    key: (req, file, cb) => {
      cb(null, `resumes/${Date.now()}-${file.originalname}`);
    },
  }),
  fileFilter: (req, file, cb) => {
    if (file.mimetype !== "application/pdf") {
      return cb(new Error("Only PDF resumes are allowed"));
    }
    cb(null, true);
  },
  limits: { fileSize: 5 * 1024 * 1024 },
});

module.exports = upload;
