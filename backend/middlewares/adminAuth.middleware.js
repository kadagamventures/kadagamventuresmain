// const jwt = require("jsonwebtoken");
// const AppError = require("../utils/appError");
// const authConfig = require("../config/auth.config");

// exports.adminProtect = (req, res, next) => {
//   const token =
//     req.headers.authorization?.split(" ")[1];

//   if (!token) {
//     return next(new AppError("No token provided", 401));
//   }

//   try {
//     const decoded = jwt.verify(
//       token,
//       authConfig.jwt.accessSecret
//     );

//     req.admin = decoded;
//     next();
//   } catch {
//     next(new AppError("Token expired or invalid", 401));
//   }
// };

const jwt = require("jsonwebtoken");
const AppError = require("../utils/appError");
const authConfig = require("../config/auth.config");

module.exports = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return next(new AppError("No token provided", 401));
  }

  try {
    const decoded = jwt.verify(token, authConfig.jwt.accessSecret);
    req.admin = decoded;
    next();
  } catch {
    next(new AppError("Token expired or invalid", 401));
  }
};
