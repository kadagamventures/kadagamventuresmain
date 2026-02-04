const jwt = require("jsonwebtoken");
const AppError = require("../utils/appError");

module.exports = (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) {
    return next(new AppError("Admin login required", 401));
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.admin = decoded;
    next();
  } catch (err) {
    return next(new AppError("Token expired or invalid", 401));
  }
};
