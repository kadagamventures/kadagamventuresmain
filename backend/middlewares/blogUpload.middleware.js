const multer = require("multer");
const multerS3 = require("multer-s3");
const { s3, AWS_S3_BUCKET_NAME } = require("../config/aws");

module.exports = multer({
  storage: multerS3({
    s3,
    bucket: AWS_S3_BUCKET_NAME,
    key: (req, file, cb) => {
      cb(null, `blogs/${Date.now()}-${file.originalname}`);
    },
  }),
  fileFilter: (req, file, cb) => {
    if (!file.mimetype.startsWith("image/")) {
      cb(new Error("Only image files allowed"));
    }
    cb(null, true);
  },
});
