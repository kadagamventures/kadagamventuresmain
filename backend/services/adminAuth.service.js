const bcrypt = require("bcryptjs");
const AppError = require("../utils/appError");
const authConfig = require("../config/auth.config");

exports.loginAdmin = async ({ email, password }) => {
  if (email !== authConfig.admin.email) {
    throw new AppError("Invalid email or password", 401);
  }

  const isMatch = await bcrypt.compare(
    password,
    authConfig.admin.passwordHash
  );

  if (!isMatch) {
    throw new AppError("Invalid email or password", 401);
  }

  return {
    id: "ADMIN_001",
    role: "admin",
    email,
  };
};
